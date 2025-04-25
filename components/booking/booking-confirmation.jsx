"use client"

import { motion } from "framer-motion"
import { X, Check, Calendar, Clock } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect } from "react"

export default function BookingConfirmation({ appointmentId, serviceName, selectedDate, selectedTime, onClose }) {
  // Trigger confetti effect when component mounts
  useEffect(() => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0, 0.2) },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0, 0.2) },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  // Default date display if none provided
  const displayDate = selectedDate || "19 Apr, 2025";
  
  // Default time display if none provided (convert 24h to 12h format if needed)
  let displayTime = selectedTime || "10:15";
  if (selectedTime) {
    // Convert 24h to 12h format with AM/PM
    const timeParts = selectedTime.split(':');
    const hour = parseInt(timeParts[0], 10);
    const minute = timeParts[1];
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12; // Convert 0 to 12
    displayTime = `${hour12}:${minute} ${period}`;
  } else {
    displayTime = "10:15 AM";
  }

  return (
    <div className="p-6 text-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
      >
        <X size={18} />
      </button>

      {/* Success animation */}
      <div className="relative w-24 h-24 mx-auto mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="absolute inset-0 bg-gradient-to-r from-[#00ACC1] to-[#0097A7] rounded-full flex items-center justify-center shadow-lg"
        >
          <Check className="h-12 w-12 text-white" />
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute"
          style={{
            width: "150px",
            height: "150px",
            top: "-38px",
            left: "-38px",
          }}
        >
          {/* Yellow triangle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute top-0 left-1/2 w-4 h-4"
          >
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-b-[16px] border-b-yellow-400 border-r-[8px] border-r-transparent" />
          </motion.div>

          {/* Red circle */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute top-1/2 left-0 w-3 h-3 bg-red-500 rounded-full"
          />

          {/* Blue circle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute bottom-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full"
          />

          {/* Orange square */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute top-1/2 right-0 w-3 h-3 bg-orange-500 rounded-sm rotate-45"
          />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h3 className="text-[#E18180] font-medium text-lg mb-2">Booking Confirmed!</h3>

        <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {serviceName}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-[#E8F5F7] to-[#F0F9FA] p-4 rounded-xl mb-6"
      >
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2 text-[#00ACC1]" />
            <span className="text-sm">Appointment Date</span>
          </div>
          <span className="text-sm font-medium">{displayDate}</span>
        </div>

        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2 text-[#00ACC1]" />
            <span className="text-sm">Appointment Time</span>
          </div>
          <span className="text-sm font-medium">{displayTime}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-[#00ACC1]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
            <span className="text-sm">Appointment ID</span>
          </div>
          <span className="text-sm font-medium">{appointmentId}</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center">
        <p className="text-xs text-gray-500 mb-6">
          A confirmation has been sent to your mobile number. Please arrive 10 minutes before your appointment time.
        </p>

        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-[#00ACC1] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00ACC1] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
        >
          Done
        </motion.button>
      </motion.div>
    </div>
  )
}
