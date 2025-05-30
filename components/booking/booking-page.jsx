"use client"
import { useRouter } from 'next/navigation';
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
import AppointmentTypeSelector from "@/components/booking/appointment-select"
import { bookSlotForDay, sendOTP, verifyOTP, createUser, fetchSlotsForDay } from "@/lib/utils"
import { useAuth, useCart } from "@/src/contexts"
import { useSearchParams } from 'next/navigation';

const steps = {
  APPOINTMENT_TYPE: "appointment_type",
  DETAILS: "details",
  VERIFICATION: "verification",
  DATE: "date",
  TIME: "time",
  CONFIRMATION: "confirmation",
}

const consultancyTypes = [
  { value: 'travel_clinic', label: 'Travel Clinic' },
  { value: 'ear_microsection', label: 'Ear Microsection' },
  { value: 'weight_loss', label: 'Weight Loss' },
];

export default function BookingPage({ cartItems = []}) {
  const [currentStep, setCurrentStep] = useState(steps.APPOINTMENT_TYPE)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [appointmentType, setAppointmentType] = useState("consultation") // Set default to "consultation"
  const [consultancyType, setConsultancyType] = useState("travel_clinic") // Also set default consultancy
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

  const router = useRouter();
  const searchParams = useSearchParams();
  const [current, setCurrent] = useState(2);

  useEffect(() => {
    const st = searchParams.get('st');
    setCurrent(st ? parseInt(st) : 2);
  
    // If cart has items, skip to date selection
    if (cartItems && cartItems.length > 0) {
      setAppointmentType('vaccination');
      setCurrentStep(steps.DATE);
    }
  }, [searchParams, cartItems]);

  const { user, isAuthenticated } = useAuth()
  const { clearCart } = useCart()
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("in_booking_process", "true");
    }
    
    return () => {
      if (typeof window !== 'undefined' && currentStep !== steps.CONFIRMATION) {
        sessionStorage.removeItem("in_booking_process");
      }
    };
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === steps.CONFIRMATION) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem("showing_confirmation", "true");
        localStorage.setItem("booking_success", "true");
      }
    }
  }, [currentStep]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem("pharmacy_user")
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          if (parsedUser && parsedUser.id && parsedUser.name && !isAuthenticated) {
            window.dispatchEvent(new Event('storage'))
          }
        }
      } catch (error) {
        console.error("Error checking user data in localStorage:", error)
      }
    }

    if (isAuthenticated && user) {
      setUserDetails(prevDetails => ({
        ...prevDetails,
        name: user.name || prevDetails.name,
        mobile: user.mobile || prevDetails.mobile,
      }))

      if (user.id) {
        setUserID(user.id)
      }

      if (user.clientID) {
        setClientID(user.clientID)
      }
    }
  }, [isAuthenticated, user])

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
      const formattedDate = typeof date === 'string'
        ? date
        : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

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
    
    if (isAuthenticated) {
      await proceedToBooking(time);
    } else {
      setCurrentStep(steps.DETAILS);
    }
  };

  const handleAppointmentTypeSelected = (type, specificType = "") => {
    setAppointmentType(type);
    
    if (type === 'consultation') {
      setConsultancyType(specificType);
      if (!specificType) return; // Don't proceed if no consultancy type selected
      
      // For consultation, always go to date selection next
      setCurrentStep(steps.DATE);
      return;
    }
    
    if (type === 'vaccination') {
      if (!cartItems || cartItems.length === 0) {
        router.push('/vaccines');
        return;
      }
      // For vaccination with cart items, go to date selection
      setCurrentStep(steps.DATE);
    }
  };


  const proceedToBooking = async (time) => {
  setLoading(true);
  setError("");

  try {
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

    const bookingData = {
      selectedDate,
      selectedTime: time || selectedTime,
      appointmentType,
      consultancyType: appointmentType === 'consultation' ? consultancyType : null,
      userDetails: {
        ...userDetails,
        clientID: currentUser?.clientID || currentClientID || clientID,
        userID: currentUser?.id || currentUserID || userID
      },
      cartItems,
      vaccineNames: cartItems && cartItems.length > 0 ? cartItems.map(item => item.name).join(',') : ''
    };

    if (appointmentType === 'consultation') {
      const result = await bookSlotForDay(bookingData);
      
      if (result.success) {
        clearCart();
        setBookingDetails({
          ...result.data,
          consultancyType: consultancyType
        });
        setAppointmentId(result.data.bookingId || Math.floor(Math.random() * 900000000) + 100000000);
        setCurrentStep(steps.CONFIRMATION);
      } else {
        if (result.slotUnavailable) {
          setError(result.message || "The selected time slot is not available. Please choose another time.");
          setCurrentStep(steps.TIME);
        } else {
          setError(result.message || "Failed to book consultation. Please try again.");
        }
      }
      return;
    }

    if (appointmentType === 'vaccination') {
      if (cartItems && cartItems.length > 0) {
        const result = await bookSlotForDay(bookingData);
        
        if (result.success) {
          clearCart();
          setBookingDetails(result.data);
          setAppointmentId(result.data.bookingId || Math.floor(Math.random() * 900000000) + 100000000);
          setCurrentStep(steps.CONFIRMATION);
        } else {
          if (result.slotUnavailable) {
            setError(result.message || "The selected time slot is not available. Please choose another time.");
            setCurrentStep(steps.TIME);
          } else {
            setError(result.message || "Failed to book appointment. Please try again.");
          }
        }
      } else {
        // Only redirect to vaccines page if appointment type is vaccination and no vaccines selected
        router.push('/vaccines');
      }
      return;
    }
    
  } catch (err) {
    console.error("Error in booking process:", err);
    setError("An unexpected error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};
  const handleDetailsSubmit = async (details) => {
    setUserDetails(details);
    setLoading(true);
    setError("");

    try {
      const userResult = await createUser(details);

      if (userResult.success) {
        setClientID(userResult.clientID);
        setUserID(userResult.userID);
        setCurrentStep(steps.VERIFICATION);
      } else {
        setError(userResult.message || "Failed to create user. Please try again.");
      }
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationComplete = async (otp) => {
    setLoading(true);
    setError("");

    try {
      const verifyResult = await verifyOTP(userDetails.mobile, otp, clientID);

      if (!verifyResult.success) {
        setError(verifyResult.message || "Invalid verification code. Please try again.");
        setLoading(false);
        return;
      }

      if (verifyResult.data?.userID) {
        setUserID(verifyResult.data.userID);
      }

      const enhancedUserDetails = {
        ...userDetails,
        clientID: clientID,
        userID: verifyResult.data?.userID || userID
      };

      const userData = {
        id: verifyResult.data?.userID || userID,
        name: userDetails.name,
        mobile: userDetails.mobile,
        clientID: clientID,
        userID: verifyResult.data?.userID || userID,
        createdAt: new Date().toISOString()
      };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem("pharmacy_user", JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));
      }

      // After verification, proceed to booking confirmation
      await proceedToBooking(selectedTime);
    } catch (err) {
      console.error("Error in verification process:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true)
    setError("")

    try {
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

  const getServiceName = () => {
    if (appointmentType === 'consultancy') {
      return consultancyType === 'travel_clinic' ? 'Travel Clinic' : 
             consultancyType === 'ear_microsection' ? 'Ear Microsection' :
             consultancyType === 'weight_loss' ? 'Weight Loss' : 'Doctor Consultation';
    }
    
    if (cartItems && cartItems.length === 1) {
      return `${cartItems[0].name} ${cartItems[0].subText || ""}`;
    } else if (cartItems && cartItems.length > 1) {
      return "Vaccine Appointment";
    }
    return "Appointment";
  };

  const getCurrentStepNumber = () => {
    // Special flow for vaccination with cart items (skips appointment selection)
    if (cartItems && cartItems.length > 0) {
      switch (currentStep) {
        case steps.DATE: return 1;
        case steps.TIME: return 2;
        case steps.DETAILS: return 3;
        case steps.VERIFICATION: return 4;
        case steps.CONFIRMATION: return isAuthenticated ? 3 : 5;
        default: return 1;
      }
    }
    
    // Normal consultation flow
    switch (currentStep) {
      case steps.APPOINTMENT_TYPE: return 1;
      case steps.DATE: return 2;
      case steps.TIME: return 3;
      case steps.DETAILS: return 4;
      case steps.VERIFICATION: return 5;
      case steps.CONFIRMATION: return isAuthenticated ? 4 : 6;
      default: return 1;
    }
  };

  const getTotalSteps = () => {
    if (cartItems && cartItems.length > 0) {
      return isAuthenticated ? 3 : 5; // Vaccination with items: date, time, (details+verification or confirmation)
    }
    return isAuthenticated ? 4 : 6; // Consultation: type, date, time, (details+verification or confirmation)
  };

  const StepComponent = function(props = {}) {
    const { label, currentStep, steps } = props;
    return (
      <div className="mt-6">
        {currentStep === steps.DATE && (
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-[#016472] mb-4">
             Select {label || 'Appointment'} Date
            </h3>
          </div>
        )}
      </div>
    );
  };

  const getStepLabel = (st) => {
    switch (st) {
      case 1: return "Appointment";
      case 2: return "Vaccination Appointment";
      default: return `St ${st}`
    }
  };

  const formatDisplayDate = (date) => {
    if (!date) return "";

    if (typeof date === 'string') {
      const parsedDate = new Date(date);
      return parsedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50 font-instrument">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image src="/assets/booknow.webp" alt="Mountain landscape" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60" />
      </div>

      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-lg  max-h-xl soverflow-hidden border border-white/20 backdrop-blur-sm">
        <div className="absolute top-4 left-4 z-20">
          {currentStep === steps.CONFIRMATION ? (
            <div className="text-gray-400 flex items-center text-sm font-medium cursor-not-allowed opacity-50">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Home Page
            </div>
          ) : (
            <Link
              href="/"
              onClick={() => {
                if (currentStep === steps.CONFIRMATION) {
                  clearCart();
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem("vaccineCart");
                  }
                }
              }}
              className="text-gray-500 hover:text-[#0D73A2] flex items-center text-sm font-medium transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Home Page
            </Link>
          )}
        </div>

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

            <div className="mt-6">
              <div>
                <StepComponent
                  label={getStepLabel(current)}
                  currentStep={currentStep}
                  steps={steps}
                />
              </div>

              {currentStep === steps.TIME && (
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#016472] mb-4">
                    Select Time Slot
                  </h3>
                </div>
              )}
              {currentStep === steps.APPOINTMENT_TYPE && (
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-[#016472] mb-4">
                    Select Appointment Type
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

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          {currentStep === steps.APPOINTMENT_TYPE && !(cartItems && cartItems.length > 0) && (
            <div className="px-6 pb-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <AppointmentTypeSelector
                  value={appointmentType}
                  onChange={(type) => {
                    setAppointmentType(type);
                    if (type !== 'consultancy') {
                      setConsultancyType("");
                    }
                  }}
                  consultancyValue={consultancyType}
                  onConsultancyChange={(type) => setConsultancyType(type)}
                  onSelectionComplete={handleAppointmentTypeSelected}
                  consultancyTypes={consultancyTypes}
                  showConsultancy={appointmentType === 'consultation'}
                  hideVaccinationOption={cartItems && cartItems.length > 0}
                />
              </div>
            </div>
          )}

          {currentStep === steps.DATE && <DateSelection onDateSelect={handleDateSelect} />}

          {currentStep === steps.TIME && (
            <TimeSelection
              onTimeSelect={handleTimeSelect}
              onBack={handleBackToDate}
              selectedDate={selectedDate}
              preloadedSlots={prefetchedSlots}
                 //preloadedSlots={prefetchedSlots?.slotList || []} 
            />
          )}

          {currentStep === steps.DETAILS && (
            <UserDetailsForm
              onSubmit={handleDetailsSubmit}
              onBack={isAuthenticated ? null : handleBackToTime}
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
              bookingId={appointmentId}
              bookingDate={selectedDate}
              onClose={() => {
                clearCart();
                if (typeof window !== 'undefined') {
                  localStorage.setItem("booking_success", "true");
                }
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}