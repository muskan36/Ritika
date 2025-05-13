"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Phone, RefreshCw } from "lucide-react"

export default function PhoneVerification({ mobile, onVerificationComplete, onBack, loading, onResendOTP }) {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(30)
  const [resending, setResending] = useState(false)
  const inputRefs = useRef([])

  // Focus on first input field on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  // Handle countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Handle OTP input change
  const handleChange = (e, index) => {
    const { value } = e.target

    // Only allow digits
    if (value && !/^\d+$/.test(value)) {
      return
    }

    // Update OTP state
    const newOtp = [...otp]

    // Take just the last character if multiple are pasted
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Clear error when user types
    if (error) {
      setError("")
    }

    // Auto focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus()
    }
  }

  // Handle keydown for backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace if current input is empty
      inputRefs.current[index - 1].focus()
    }
  }

  // Handle paste event for OTP
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a 4-digit number
    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setOtp(digits)
      inputRefs.current[3].focus()
    }
  }

  // Handle resend OTP
  const handleResend = () => {
    if (countdown > 0 || resending) return

    setResending(true)
    setError("")

    // Call the parent component's resend handler
    if (onResendOTP) {
      onResendOTP().then(() => {
        // Reset countdown regardless of the result
        setResending(false)
        setCountdown(30) // Reset countdown
      }).catch(err => {
        console.error('Error in resend OTP:', err)
        setResending(false)
      })
    } else {
      // Fallback if no handler provided
      setTimeout(() => {
        setResending(false)
        setCountdown(30) // Reset countdown
      }, 1500)
    }
  }

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const otpValue = otp.join("")

    if (otpValue.length !== 4) {
      setError("Please enter a valid 4-digit code")
      return
    }

    // Pass the OTP to parent component for verification
    onVerificationComplete(otpValue)
  }

  return (
    <div className="p-6 pt-2">
      <div className="p-6 rounded-xl">
        <div className="flex items-center justify-center">
          <div className="bg-gray-100 rounded-full p-2 mb-4">
            <Phone size={24} className="text-[#00ACC1]" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Verification Code</h3>
          <p className="text-sm text-gray-500 mt-1">
            We've sent a verification code to <span className="font-medium">{mobile}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* OTP Input Group */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              // In the OTP input field, replace the current input with this:
              <motion.input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="tel" 
                inputMode="numeric" 
                pattern="[0-9]*" 
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : null}
                className={`w-12 h-12 text-center text-xl font-bold border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ACC1]/50
    ${error ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"}`}
                disabled={loading}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-500 text-sm mb-4"
            >
              {error}
            </motion.div>
          )}

          {/* Resend Option */}
          <div className="text-center mb-6">
            <button
              type="button"
              onClick={handleResend}
              disabled={countdown > 0 || resending || loading}
              className={`text-sm font-medium flex items-center justify-center mx-auto
                ${countdown > 0 || resending ? "text-gray-400 cursor-not-allowed" : "text-[#00ACC1] hover:underline"}`}
            >
              {resending ? (
                <>
                  <RefreshCw size={14} className="mr-1 animate-spin" />
                  Resending...
                </>
              ) : countdown > 0 ? (
                `Resend code in ${countdown}s`
              ) : (
                "Resend verification code"
              )}
            </button>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              disabled={loading}
              className="flex-1 py-3 border border-[#00ACC1] text-[#00ACC1] rounded-xl font-medium flex items-center justify-center hover:bg-[#E8F5F7] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} className="mr-1" /> Back
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              disabled={otp.join("").length !== 4 || loading}
              className="flex-1 py-3 bg-gradient-to-r from-[#00ACC1] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00ACC1] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>Verify <ChevronRight size={16} className="ml-1" /></>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  )
}
