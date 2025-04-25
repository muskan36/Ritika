"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Clock } from "lucide-react"

// Time slot data
const timeSlots = {
  morning: [
    { id: 1, time: "09:00" },
    { id: 2, time: "09:20" },
    { id: 3, time: "09:45" },
    { id: 4, time: "10:00" },
    { id: 5, time: "10:15" },
  ],
  afternoon: [
    { id: 6, time: "12:00" },
    { id: 7, time: "12:30" },
    { id: 8, time: "13:15" },
    { id: 9, time: "14:00" },
    { id: 10, time: "14:45" },
  ],
  evening: [
    { id: 11, time: "16:00" },
    { id: 12, time: "16:30" },
    { id: 13, time: "17:00" },
    { id: 14, time: "17:30" },
    { id: 15, time: "18:00" },
  ],
}

export default function TimeSelection({ onTimeSelect, onBack }) {
  const [expandedSection, setExpandedSection] = useState("morning")
  const [selectedTime, setSelectedTime] = useState(null)

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleTimeClick = (time) => {
    setSelectedTime(time)
  }

  const handleContinue = () => {
    if (selectedTime) {
      onTimeSelect(selectedTime)
    }
  }

  return (
    <div className="p-6 pt-2">
      <div className="border  p-6 rounded-xl">

        {/* Morning section */}
        <div className="mb-4">
          <motion.button
            onClick={() => toggleSection("morning")}
            className="w-full flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
          >
            <span className="font-medium text-gray-700">Morning</span>
            <div className="flex items-center">
              <span className="text-xs text-gray-400 mr-2">09:00 - 11:00</span>
              {expandedSection === "morning" ? (
                <ChevronUp size={18} className="text-[#00ACC1]" />
              ) : (
                <ChevronDown size={18} className="text-gray-400" />
              )}
            </div>
          </motion.button>

          {expandedSection === "morning" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 grid grid-cols-5 gap-2"
            >
              {timeSlots.morning.map((slot) => (
                <motion.button
                  key={slot.id}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTimeClick(slot.time)}
                  className={`py-2 px-2 text-xs rounded-lg border ${
                    selectedTime === slot.time
                      ? "bg-gradient-to-r from-[#00ACC1] to-[#0097A7] text-white border-transparent shadow-md"
                      : "bg-white text-gray-700 border-gray-100 hover:border-[#00ACC1]/30 shadow-sm"
                  } transition-all duration-200`}
                >
                  {slot.time}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Afternoon section */}
        <div className="mb-4">
          <motion.button
            onClick={() => toggleSection("afternoon")}
            className="w-full flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
          >
            <span className="font-medium text-gray-700">Afternoon</span>
            <div className="flex items-center">
              <span className="text-xs text-gray-400 mr-2">12:00 - 15:00</span>
              {expandedSection === "afternoon" ? (
                <ChevronUp size={18} className="text-[#00ACC1]" />
              ) : (
                <ChevronDown size={18} className="text-gray-400" />
              )}
            </div>
          </motion.button>

          {expandedSection === "afternoon" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 grid grid-cols-5 gap-2"
            >
              {timeSlots.afternoon.map((slot) => (
                <motion.button
                  key={slot.id}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTimeClick(slot.time)}
                  className={`py-2 px-2 text-xs rounded-lg border ${
                    selectedTime === slot.time
                      ? "bg-gradient-to-r from-[#00ACC1] to-[#0097A7] text-white border-transparent shadow-md"
                      : "bg-white text-gray-700 border-gray-100 hover:border-[#00ACC1]/30 shadow-sm"
                  } transition-all duration-200`}
                >
                  {slot.time}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Evening section */}
        <div className="mb-4">
          <motion.button
            onClick={() => toggleSection("evening")}
            className="w-full flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
          >
            <span className="font-medium text-gray-700">Evening</span>
            <div className="flex items-center">
              <span className="text-xs text-gray-400 mr-2">16:00 - 18:00</span>
              {expandedSection === "evening" ? (
                <ChevronUp size={18} className="text-[#00ACC1]" />
              ) : (
                <ChevronDown size={18} className="text-gray-400" />
              )}
            </div>
          </motion.button>

          {expandedSection === "evening" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 grid grid-cols-5 gap-2"
            >
              {timeSlots.evening.map((slot) => (
                <motion.button
                  key={slot.id}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTimeClick(slot.time)}
                  className={`py-2 px-2 text-xs rounded-lg border ${
                    selectedTime === slot.time
                      ? "bg-gradient-to-r from-[#00ACC1] to-[#0097A7] text-white border-transparent shadow-md"
                      : "bg-white text-gray-700 border-gray-100 hover:border-[#00ACC1]/30 shadow-sm"
                  } transition-all duration-200`}
                >
                  {slot.time}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Selected time indicator */}
      {selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-white border border-[#00ACC1]/20 rounded-lg flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center">
            <Clock size={16} className="text-[#00ACC1] mr-2" />
            <span className="text-sm font-medium">Selected Time:</span>
          </div>
          <span className="text-sm font-bold text-[#00ACC1]">{selectedTime}</span>
        </motion.div>
      )}

      {/* Navigation buttons */}
      <div className="mt-6 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex-1 py-3 border border-[#00ACC1] text-[#00ACC1] rounded-xl font-medium flex items-center justify-center hover:bg-[#E8F5F7] transition-colors duration-300"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          disabled={!selectedTime}
          className={`flex-1 py-3 rounded-xl font-medium shadow-md transition-all duration-300 ${
            selectedTime
              ? "bg-gradient-to-r from-[#00ACC1] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00ACC1] text-white hover:shadow-lg"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue <ChevronRight size={16} className="ml-1 inline-block" />
        </motion.button>
      </div>
    </div>
  )
}
