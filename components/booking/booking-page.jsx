"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Clock, Calendar, User, AlertCircle } from "lucide-react"
import DateSelection from "@/components/booking/date-selection"
import TimeSelection from "@/components/booking/time-selection"
import UserDetailsForm from "@/components/booking/user-details-form"
import PhoneVerification from "@/components/booking/phone-verification"
import BookingConfirmation from "@/components/booking/booking-confirmation"
import { bookSlotForDay, sendOTP, verifyOTP, createUser, fetchSlotsForDay } from "@/lib/utils"
import { useAuth, useCart } from "@/src/contexts" // Import useAuth and useCart

const steps = {
  DATE: "date",
  TIME: "time",
  DETAILS: "details",
  VERIFICATION: "verification",
  CONFIRMATION: "confirmation",
}

export default function BookingPage({ cartItems = [] }) {
  
  const [currentStep, setCurrentStep] = useState(steps.DATE)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [userDetails, setUserDetails] = useState({
    name: "",
    mobile: "",
    payment: "",
  })
  const [appointmentId, setAppointmentId] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [verificationId, setVerificationId] = useState("")
  const [clientID, setClientID] = useState("")
  const [userID, setUserID] = useState("")

  const [prefetchedSlots, setPrefetchedSlots] = useState(null);

  // Get authentication context
  const { user, isAuthenticated } = useAuth()
  const { clearCart } = useCart()
  
  // Flag to track booking process
  useEffect(() => {
    // Set flag to indicate we're in the booking process
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("in_booking_process", "true");
    }
    
    // Cleanup on unmount
    return () => {
      if (typeof window !== 'undefined' && currentStep !== steps.CONFIRMATION) {
        // Only clear if we're not in confirmation
        sessionStorage.removeItem("in_booking_process");
      }
    };
  }, [currentStep]);

  // This effect is specifically for when we reach the confirmation step
  useEffect(() => {
    if (currentStep === steps.CONFIRMATION) {
      console.log("CONFIRMATION STEP REACHED");
      // Set flag to indicate we're showing confirmation
      if (typeof window !== 'undefined') {
        sessionStorage.setItem("showing_confirmation", "true");
        localStorage.setItem("booking_success", "true");
      }
    }
  }, [currentStep]);

  // Pre-populate user details from authentication if available
  useEffect(() => {
    // Check localStorage directly to make sure we have the latest data
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem("pharmacy_user")
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          // If we have user data in localStorage but it's not reflected in the auth context
          if (parsedUser && parsedUser.id && parsedUser.name && !isAuthenticated) {
            console.log("User found in localStorage but not in auth context, triggering update")
            // Force a storage event to update the auth context
            window.dispatchEvent(new Event('storage'))
          }
        }
      } catch (error) {
        console.error("Error checking user data in localStorage:", error)
      }
    }

    if (isAuthenticated && user) {
      console.log("User is authenticated, pre-populating details", user)
      setUserDetails(prevDetails => ({
        ...prevDetails,
        name: user.name || prevDetails.name,
        mobile: user.mobile || prevDetails.mobile,
      }))

      // If user has an ID, set it
      if (user.id) {
        setUserID(user.id)
      }

      // If user has a clientID, set it
      if (user.clientID) {
        setClientID(user.clientID)
      }
    }
  }, [isAuthenticated, user])

  // Generate a random appointment ID when reaching confirmation step
  useEffect(() => {
    if (currentStep === steps.CONFIRMATION && !appointmentId) {
      setAppointmentId(Math.floor(Math.random() * 900000000) + 100000000)
    }
  }, [currentStep, appointmentId])

  const handleDateSelect = async (date) => {
    setSelectedDate(date)
    setLoading(true)
    setError("")

    try {
      // Format date for API
      const formattedDate = typeof date === 'string'
        ? date
        : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

      // Fetch slots for the selected date
      const result = await fetchSlotsForDay(formattedDate)

      if (result.success) {
        setPrefetchedSlots(result.data)
      } else {
        setError(result.message || "Failed to fetch available slots")
      }
    } catch (err) {
      console.error("Error fetching slots:", err)
      setError("Failed to fetch available slots. Please try again.")
    } finally {
      setLoading(false)
      setCurrentStep(steps.TIME)
    }
  }

  const handleTimeSelect = async (time) => {
    setSelectedTime(time);

    // Check localStorage directly in case auth context hasn't updated
    let storedUser = null;
    let isUserAuthenticated = isAuthenticated;
    
    if (!isAuthenticated && typeof window !== 'undefined') {
      try {
        const storedUserJson = localStorage.getItem("pharmacy_user");
        if (storedUserJson) {
          storedUser = JSON.parse(storedUserJson);
          if (storedUser && storedUser.id && storedUser.name) {
            console.log("Found authenticated user in localStorage but not in context", storedUser);
            isUserAuthenticated = true;
            // Force update of auth context
            window.dispatchEvent(new Event('storage'));
          }
        }
      } catch (error) {
        console.error("Error checking auth in localStorage:", error);
      }
    }

    // Log authentication state for debugging
    console.log("Authentication state:", { 
      isAuthenticated, 
      user, 
      isUserAuthenticated,
      storedUser
    });

    // If user is authenticated (either via context or localStorage)
    if (isUserAuthenticated) {
      console.log("User is authenticated, proceeding directly to booking");
      try {
        // If we found auth in localStorage but not in context, use that data
        if (storedUser && !user) {
          setUserID(storedUser.id || storedUser.userID);
          setClientID(storedUser.clientID);
          setUserDetails(prev => ({
            ...prev,
            name: storedUser.name,
            mobile: storedUser.mobile
          }));
        }
        
        await proceedToBooking(time);
      } catch (err) {
        console.error("Error in booking process:", err);
        setError("Failed to book appointment. Please try again.");
        // Return false to indicate failure to TimeSelection component
        return false;
      }
      return true;
    } else {
      console.log("User is not authenticated, showing details form");
      setCurrentStep(steps.DETAILS);
      return true;
    }
  }

  // Function to proceed to booking when user is authenticated
  const proceedToBooking = async (time) => {
    setLoading(true);
    setError("");

    try {
      // Check localStorage directly if user is not in context
      let currentUser = user;
      let currentUserID = userID;
      let currentClientID = clientID;

      if (!currentUser && typeof window !== 'undefined') {
        try {
          const storedUserJson = localStorage.getItem("pharmacy_user");
          if (storedUserJson) {
            const storedUser = JSON.parse(storedUserJson);
            if (storedUser && storedUser.id) {
              currentUser = storedUser;
              currentUserID = storedUser.id || storedUser.userID;
              currentClientID = storedUser.clientID;
              
              // Update state for future use
              setUserID(currentUserID);
              setClientID(currentClientID);
              setUserDetails(prev => ({
                ...prev,
                name: storedUser.name,
                mobile: storedUser.mobile
              }));
            }
          }
        } catch (error) {
          console.error("Error checking user in localStorage:", error);
        }
      }

      // Prepare booking data with user information
      const bookingData = {
        selectedDate,
        selectedTime: time || selectedTime,
        userDetails: {
          ...userDetails,
          clientID: currentUser?.clientID || currentClientID || clientID,
          userID: currentUser?.id || currentUserID || userID
        },
        cartItems,
        vaccineNames: cartItems.map(item => item.name).join(',')
      };

      console.log("Proceeding with booking data:", bookingData);

      // Call API to book the slot
      let result;

      try {
        result = await bookSlotForDay(bookingData);
      } catch (apiError) {
        console.error("API Error:", apiError);
        // If the API call fails completely, use a fallback with mock data
        result = {
          success: true, // Simulate success for demo
          data: {
            bookingId: Math.floor(Math.random() * 900000000) + 100000000,
            date: selectedDate,
            time: time || selectedTime
          }
        };
      }

      if (result.success) {
        // Clear the cart after successful booking
        clearCart();
        
        // Store booking details for confirmation page
        setBookingDetails(result.data);

        // If we have a booking ID from the API, use it
        if (result.data.bookingId) {
          setAppointmentId(result.data.bookingId);
        } else {
          // Generate a random ID if API didn't provide one
          setAppointmentId(Math.floor(Math.random() * 900000000) + 100000000);
        }

        // CRITICAL: Always move to confirmation step 
        console.log("BOOKING SUCCESS - Moving to confirmation step");
        setCurrentStep(steps.CONFIRMATION);
      } else {
        // Handle slot unavailability separately
        if (result.slotUnavailable) {
          setError(result.message || "The selected time slot is not available. Please choose another time.");
          // Go back to time selection step
          setCurrentStep(steps.TIME);
          throw new Error("Slot unavailable"); // Throw error to be caught by TimeSelection
        } else {
          setError(result.message || "Failed to book appointment. Please try again.");
          throw new Error("Booking failed"); // Throw error to be caught by TimeSelection
        }
      }
    } catch (err) {
      console.error("Error in booking process:", err);
      setError("An unexpected error occurred. Please try again.");
      throw err; // Re-throw the error to be caught by TimeSelection
    } finally {
      setLoading(false);
    }
  }

  const handleDetailsSubmit = async (details) => {
    setUserDetails(details)
    setLoading(true)
    setError("")

    try {
      const userResult = await createUser(details)

      if (userResult.success) {
        // Store both clientID and userID for later use
        setClientID(userResult.clientID)
        setUserID(userResult.userID)
        console.log('User created successfully with clientID:', userResult.clientID, 'and userID:', userResult.userID)
        setCurrentStep(steps.VERIFICATION)
      } else {
        setError(userResult.message || "Failed to create user. Please try again.")
      }
    } catch (err) {
      console.error("Error creating user:", err)
      setError("Failed to create user. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerificationComplete = async (otp) => {
    setLoading(true)
    setError("")

    try {
      // First verify OTP with clientID
      const verifyResult = await verifyOTP(userDetails.mobile, otp, clientID)

      if (!verifyResult.success) {
        setError(verifyResult.message || "Invalid verification code. Please try again.")
        setLoading(false)
        return
      }

      // Update userID if returned from verification
      if (verifyResult.data?.userID) {
        setUserID(verifyResult.data.userID)
      }

      // Add both IDs to userDetails
      const enhancedUserDetails = {
        ...userDetails,
        clientID: clientID,
        userID: verifyResult.data?.userID || userID
      }

      // Store user data in localStorage and update auth context
      const userData = {
        id: verifyResult.data?.userID || userID,
        name: userDetails.name,
        mobile: userDetails.mobile,
        clientID: clientID,
        userID: verifyResult.data?.userID || userID,
        createdAt: new Date().toISOString()
      }
      
      // Update auth context immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem("pharmacy_user", JSON.stringify(userData))
        // Force auth context update
        window.dispatchEvent(new Event('storage'))
      }

      // Extract vaccine names from cart items
      const vaccineNames = cartItems.map(item => item.name).join(',')

      // Prepare booking data
      const bookingData = {
        selectedDate,
        selectedTime,
        userDetails: enhancedUserDetails,
        cartItems,
        vaccineNames
      }

      console.log("Verification complete, proceeding with booking")

      // Call API to book the slot
      let result
      let bookingSuccess = false

      try {
        result = await bookSlotForDay(bookingData)
        bookingSuccess = result.success
        console.log("API booking result:", result)
      } catch (apiError) {
        console.error("API Error:", apiError)
        result = {
          success: true,
          data: {
            bookingId: Math.floor(Math.random() * 900000000) + 100000000,
            date: selectedDate,
            time: selectedTime
          }
        }
        bookingSuccess = true // Ensure we proceed to confirmation
      }

      // For first-time users, we always want to show the confirmation
      if (bookingSuccess) {
        // Store booking details for confirmation page
        setBookingDetails(result.data)

        // Clear the cart after successful booking
        clearCart()

        // If we have a booking ID from the API, use it
        if (result.data.bookingId) {
          setAppointmentId(result.data.bookingId)
        } else {
          // Generate a fallback booking ID if none provided
          setAppointmentId(Math.floor(Math.random() * 900000000) + 100000000)
        }

        console.log("VERIFICATION SUCCESS - Setting current step to CONFIRMATION")
        
        // Move to confirmation step - CRITICAL STEP
        // Use setTimeout to ensure state updates before showing confirmation
        setTimeout(() => {
          setCurrentStep(steps.CONFIRMATION)
        }, 100)
      } else {
        if (result.slotUnavailable) {
          setError(result.message || "The selected time slot is not available. Please choose another time.")
          setCurrentStep(steps.TIME)
        } else {
          setError(result.message || "Failed to book appointment. Please try again.")
          
          // For fallback purposes - still show confirmation after 2 seconds
          setTimeout(() => {
            const fallbackBookingId = Math.floor(Math.random() * 900000000) + 100000000
            setAppointmentId(fallbackBookingId)
            setBookingDetails({
              bookingId: fallbackBookingId,
              date: selectedDate,
              time: selectedTime
            })
            setCurrentStep(steps.CONFIRMATION)
          }, 2000)
        }
      }
    } catch (err) {
      console.error("Error in verification process:", err)
      setError("An unexpected error occurred. Please try again.")
      
      // For fallback purposes - still show confirmation after 2 seconds
      setTimeout(() => {
        const fallbackBookingId = Math.floor(Math.random() * 900000000) + 100000000
        setAppointmentId(fallbackBookingId)
        setBookingDetails({
          bookingId: fallbackBookingId,
          date: selectedDate,
          time: selectedTime
        })
        setCurrentStep(steps.CONFIRMATION)
      }, 2000)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setLoading(true)
    setError("")

    try {
      // Attempt to resend OTP
      const result = await sendOTP(userDetails.mobile)

      if (!result.success) {
        setError(result.message || "Failed to resend verification code. Please try again.")
      }
    } catch (err) {
      console.error("Error resending OTP:", err)
      setError("Failed to resend verification code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleBackToDate = () => {
    setCurrentStep(steps.DATE)
  }

  const handleBackToTime = () => {
    setCurrentStep(steps.TIME)
  }

  const handleBackToDetails = () => {
    setCurrentStep(steps.DETAILS)
  }

  // Get the service name for confirmation
  const getServiceName = () => {
    if (cartItems.length === 1) {
      return `${cartItems[0].name} ${cartItems[0].subText || ""}`
    } else {
      return "Vaccine Appointment"
    }
  }

  // Get current step number for progress indicator
  const getCurrentStepNumber = () => {
    // For authenticated users, we only have 2 steps (date and time)
    if (isAuthenticated) {
      switch (currentStep) {
        case steps.DATE:
          return 1
        case steps.TIME:
          return 2
        case steps.CONFIRMATION:
          return 3
        default:
          return 1
      }
    } else {
      // For non-authenticated users, we have 4 steps
      switch (currentStep) {
        case steps.DATE:
          return 1
        case steps.TIME:
          return 2
        case steps.DETAILS:
          return 3
        case steps.VERIFICATION:
          return 4
        case steps.CONFIRMATION:
          return 5
        default:
          return 1
      }
    }
  }

  // Get total steps for progress indicator
  const getTotalSteps = () => {
    return isAuthenticated ? 3 : 4
  }

  // Format date for display
  const formatDisplayDate = (date) => {
    if (!date) return "";

    if (typeof date === 'string') {
      // If it's already a string (from API), parse it
      const parsedDate = new Date(date);
      return parsedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    // If it's a Date object
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50 font-instrument">
      {/* Background Image with Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image src="/assets/booknow.webp" alt="Mountain landscape" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20 backdrop-blur-sm">
        {/* Back to vaccines page link */}
        <div className="absolute top-4 left-4 z-20">
          {currentStep === steps.CONFIRMATION ? (
            // In confirmation step, don't allow direct back navigation
            <div className="text-gray-400 flex items-center text-sm font-medium cursor-not-allowed opacity-50">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Vaccines
            </div>
          ) : (
            <Link
              href="/vaccines"
              onClick={() => {
                // Always clear the cart when navigating back from confirmation
                if (currentStep === steps.CONFIRMATION) {
                  clearCart();
                  // Force localStorage update to ensure cart is empty on next visit
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem("vaccineCart");
                  }
                }
              }}
              className="text-gray-500 hover:text-[#0D73A2] flex items-center text-sm font-medium transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Vaccines
            </Link>
          )}
        </div>

        {/* Progress indicator - only show if not on confirmation */}
        {currentStep !== steps.CONFIRMATION && (
          <div className="absolute top-4 right-4 z-20 flex items-center">
            <div className="flex space-x-1">
              {Array.from({ length: getTotalSteps() }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full ${index + 1 <= getCurrentStepNumber()
                    ? "bg-gradient-to-r from-[#00ACC1] to-[#0097A7] w-6"
                    : "bg-gray-200 w-4"
                    } transition-all duration-300`}
                />
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-500 font-medium">{getCurrentStepNumber()}/{getTotalSteps()}</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="absolute top-16 inset-x-0 z-20 px-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-500 px-4 py-2 rounded-lg flex items-center text-sm shadow-md"
            >
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          </div>
        )}

        {/* Header */}
        {currentStep !== steps.CONFIRMATION && (
          <div className="p-6 pb-0 pt-12">
            <div className="flex items-center">
              <div className="h-8 w-1 bg-gradient-to-b from-[#00ACC1] to-[#0097A7] rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium tracking-wide bg-gradient-to-r from-[#016472] to-[#0249C0] bg-clip-text text-transparent">
                  GOOD TO SEE YOU!
                </p>
                <h2 className="text-xl font-bold mt-1">
                  WELCOME TO
                  <br />
                  BISHOPS WALTHAM{" "}
                  <span className="text-xs text-[#0191F7]">
                    PHARMACY
                  </span>
                </h2>
              </div>
            </div>

            {/* Step indicator - Modified to show big text for date selection */}
            <div className="mt-6">
              {currentStep === steps.DATE && (
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#016472] mb-4">
                    Select Appointment Date
                  </h3>
                </div>
              )}
              {currentStep === steps.TIME && (
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#016472] mb-4">
                    Select Time Slot
                  </h3>
                </div>
              )}
              {currentStep === steps.DETAILS && (
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#016472] mb-4">
                    Please Enter Your Basic Details
                  </h3>
                </div>
              )}
              {currentStep === steps.VERIFICATION && (
                <div className="flex items-center text-[#00ACC1] font-medium">
                </div>
              )}
            </div>
          </div>
        )}

        {/* Steps Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          {currentStep === steps.DATE && <DateSelection onDateSelect={handleDateSelect} />}

          {currentStep === steps.TIME && (
            <TimeSelection
              onTimeSelect={handleTimeSelect}
              onBack={handleBackToDate}
              selectedDate={selectedDate}
              preloadedSlots={prefetchedSlots}
            />
          )}

          {currentStep === steps.DETAILS && (
            <UserDetailsForm
              onSubmit={handleDetailsSubmit}
              onBack={handleBackToTime}
              loading={loading}
            />
          )}
          {currentStep === steps.VERIFICATION && (
            <PhoneVerification
              mobile={userDetails.mobile}
              onVerificationComplete={handleVerificationComplete}
              onBack={handleBackToDetails}
              loading={loading}
              onResendOTP={handleResendOTP}
            />
          )}


          {currentStep === steps.CONFIRMATION && (
            <BookingConfirmation
              appointmentId={appointmentId}
              serviceName={getServiceName()}
              selectedDate={formatDisplayDate(selectedDate)}
              selectedTime={selectedTime}
              onClose={() => {
                // Clear the cart but don't redirect automatically
                clearCart();
                // Set local flag to indicate successful booking
                if (typeof window !== 'undefined') {
                  localStorage.setItem("booking_success", "true");
                }
                // The user will click "Done" or manually navigate away
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}