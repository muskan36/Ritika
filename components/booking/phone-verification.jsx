"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Shield } from "lucide-react"
import Image from "next/image"
import { sendOTP, verifyOTP } from "../../lib/utils"

export default function PhoneVerification({ mobile, onVerificationComplete, onBack, loading: externalLoading }) {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef([])

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus()
    }
  }

  // Handle key down for backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  // Check if component is in loading state (either internal or external)
  const isLoading = loading || externalLoading;

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("")

    if (enteredOtp.length !== 4) {
      setError("Please enter a valid OTP")
      return
    }

    setLoading(true)
    setError("")

    const result = await verifyOTP(mobile, enteredOtp)

    if (result.success) {
      onVerificationComplete()
    } else {
      setError(result.message)
      setLoading(false) // Only clear loading if error - success will be handled by parent
    }
  }

  // Handle send OTP
  const handleSendOtp = async () => {
    if (!mobile || mobile.length < 10) {
      setError("Please enter a valid mobile number")
      return
    }

    setLoading(true)
    setError("")

    const result = await sendOTP(mobile)

    if (result.success) {
      setIsOtpSent(true)
      setCountdown(30)
      
      // Focus first input after OTP is sent
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus()
        }
      }, 100)
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  // Countdown timer
  useEffect(() => {
    let timer
    if (isOtpSent && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isOtpSent, countdown])

  return (
    <div className="p-6 pt-2">
      <div className="bg-gradient-to-r from-[#E8F5F7] to-[#F0F9FA] p-6 rounded-xl">
        <div className="flex items-center mb-4">
          <Shield size={18} className="text-[#00ACC1] mr-2" />
          <h3 className="text-base font-medium bg-gradient-to-r from-[#00ACC1] to-[#0097A7] bg-clip-text text-transparent">
            {!isOtpSent ? "Verify Your Mobile" : "Enter OTP"}
          </h3>
        </div>

        {!isOtpSent ? (
          <>
            <div className="mb-6">
              <div className="relative">
                <input
                  type="tel"
                  value={mobile}
                  readOnly
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-lg focus:outline-none shadow-sm"
                  placeholder="Enter Mobile Number"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">We'll send a verification code to this number</p>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-sm text-red-500 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSendOtp}
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#00ACC1] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00ACC1] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 mb-6 relative"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send OTP"
              )}
            </motion.button>

            <div className="relative h-40 w-full mt-4 overflow-hidden rounded-lg shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ACC1]/10 to-[#0097A7]/20" />
              <Image src="/assets/vaccination.webp" alt="Vaccination" fill className="object-cover" />
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-6 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 text-[#00ACC1]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              We've sent a 4-digit OTP to {mobile}
            </p>

            <div className="flex justify-between mb-6 gap-2">
              {otp.map((digit, index) => (
                <motion.div key={index} whileHover={{ y: -2 }} className="flex-1">
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-full h-14 text-center text-xl font-bold bg-white border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ACC1]/30 shadow-sm"
                    disabled={isLoading}
                  />
                </motion.div>
              ))}
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-sm text-red-500 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#00ACC1] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00ACC1] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 mb-4 relative"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {externalLoading ? "Booking..." : "Verifying..."}
                </span>
              ) : (
                "Verify OTP"
              )}
            </motion.button>

            <div className="flex justify-center items-center mb-6">
              {countdown > 0 ? (
                <p className="text-sm text-center text-gray-600 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Resend OTP in <span className="font-medium text-[#00ACC1] ml-1">{countdown}s</span>
                </p>
              ) : (
                <button
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="text-sm text-[#00ACC1] hover:text-[#0097A7] hover:underline transition-colors flex items-center"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-[#00ACC1]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Resend OTP
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="mt-6 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 py-3 border border-[#00ACC1] text-[#00ACC1] rounded-xl font-medium flex items-center justify-center hover:bg-[#E8F5F7] transition-colors duration-300 disabled:opacity-50"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </motion.button>

        {isOtpSent && (
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleVerifyOtp}
            disabled={isLoading}
            className="flex-1 py-3 bg-gradient-to-r from-[#00ACC1] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00ACC1] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Verify"} {!isLoading && <ChevronRight size={16} className="ml-1 inline-block" />}
          </motion.button>
        )}
      </div>
    </div>
  )
}
