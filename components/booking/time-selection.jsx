"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ChevronLeft, Clock, XCircle } from "lucide-react";
import { fetchSlotsForDay } from "@/lib/utils";

export default function TimeSelection({ onTimeSelect, onBack, selectedDate, preloadedSlots }) {
  const [expandedSection, setExpandedSection] = useState("morning");
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState({
    morning: [],
    afternoon: [],
    evening: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  // Use preloaded slots if available, otherwise fetch them
  useEffect(() => {
    if (preloadedSlots) {
      processSlots(preloadedSlots);
    } else {
      loadTimeSlots();
    }
  }, [preloadedSlots]);

  const processSlots = (slotData) => {
    if (!slotData || !slotData.slotList) {
      setError("Invalid slot data format");
      return;
    }

    const slotList = slotData.slotList || {};
    
    // Include all slots (both Available and Booked)
    const categorized = {
      morning: Object.entries(slotList.morning || {})
        .map(([time, status]) => {
          const [timePart, meridiem] = time.split(" ");
          return {
            slot: timePart,
            meridiem,
            displayTime: time,
            status: status
          };
        }),
      
      afternoon: Object.entries(slotList.afternoon || {})
        .map(([time, status]) => {
          const [timePart, meridiem] = time.split(" ");
          return {
            slot: timePart,
            meridiem,
            displayTime: time,
            status: status
          };
        }),
      
      evening: Object.entries(slotList.evening || {})
        .map(([time, status]) => {
          const [timePart, meridiem] = time.split(" ");
          return {
            slot: timePart,
            meridiem,
            displayTime: time,
            status: status
          };
        }),
    };
    
    setTimeSlots(categorized);
    setLoading(false);
  };

  const loadTimeSlots = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Use the selected date or today's date as fallback
      const date = selectedDate || new Date();
      const formattedDate = typeof date === 'string' 
        ? date 
        : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      
      console.log("Fetching slots for date:", formattedDate);
      const result = await fetchSlotsForDay(formattedDate);
      
      if (result.success && result.data) {
        console.log("Slots fetched successfully:", result.data);
        processSlots(result.data);
      } else {
        console.error("Failed to fetch slots:", result.message);
        setError(result.message || "Failed to fetch available time slots");
      }
    } catch (err) {
      console.error("Error loading time slots:", err);
      setError("An error occurred while loading available times. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleTimeClick = (time, meridiem, status) => {
    // Only allow selection if status is Available
    if (status === "Available") {
      const fullTime = meridiem ? `${time} ${meridiem}` : time;
      setSelectedTime(fullTime);
    }
  };

  const handleContinue = async () => {
    if (selectedTime) {
      setIsBooking(true); // Set loading state
      try {
        await onTimeSelect(selectedTime);
      } catch (err) {
        console.error("Error in time selection:", err);
        setError("Failed to proceed with booking. Please try again.");
      } finally {
        setIsBooking(false); // Reset loading state
      }
    }
  };

  return (
    <div className="p-6 pt-2">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
          <button 
            onClick={loadTimeSlots} 
            className="ml-2 underline text-xs font-medium"
          >
            Try Again
          </button>
        </div>
      )}
      
      <div className="border p-4 rounded-xl">
        {["morning", "afternoon", "evening"].map((period) => (
          <div className="mb-4" key={period}>
            <motion.button
              onClick={() => toggleSection(period)}
              className="w-full flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              <span className="font-medium text-gray-700 capitalize flex items-center">
                <Clock size={14} className="mr-2 text-[#00ACC1]" />
                {period}
              </span>
              <div className="flex items-center">
                {expandedSection === period ? (
                  <ChevronUp size={18} className="text-[#00ACC1]" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400" />
                )}
              </div>
            </motion.button>

            {expandedSection === period && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.2 }}
                className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2"
              >
                {loading ? (
                  <div className="text-center text-gray-400 text-sm col-span-full p-4">
                    <div className="animate-pulse flex justify-center">
                      <div className="h-4 w-4 bg-gray-200 rounded-full mr-1"></div>
                      <div className="h-4 w-4 bg-gray-300 rounded-full mr-1"></div>
                      <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                    </div>
                    <p className="mt-2">Loading available times...</p>
                  </div>
                ) : timeSlots[period].length > 0 ? (
                  timeSlots[period].map((slot, idx) => (
                    <motion.button
                      key={`${slot.slot}-${slot.meridiem}-${idx}`}
                      whileHover={slot.status === "Available" ? { scale: 1.05, y: -1 } : {}}
                      whileTap={slot.status === "Available" ? { scale: 0.95 } : {}}
                      onClick={() => handleTimeClick(slot.slot, slot.meridiem, slot.status)}
                      disabled={slot.status !== "Available"}
                      className={`py-2 px-2 text-xs rounded-lg border relative ${
                        selectedTime === slot.displayTime
                          ? "bg-gradient-to-r from-[#00ACC1] to-[#0097A7] text-white border-transparent shadow-md"
                          : slot.status === "Available"
                            ? "bg-white text-gray-700 border-gray-100 hover:border-[#00ACC1]/30 shadow-sm"
                            : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-70"
                      } transition-all duration-200`}
                    >
                      {slot.displayTime}
                      {slot.status !== "Available" && (
                        <XCircle className="absolute -top-1 -right-1 w-3 h-3 text-red-500 bg-white rounded-full" />
                      )}
                    </motion.button>
                  ))
                ) : (
                  <p className="text-center text-gray-400 text-sm col-span-full p-4">
                    No slots available for this time period
                  </p>
                )}
              </motion.div>
            )}
          </div>
        ))}
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
          disabled={isBooking}
          className="flex-1 py-3 border border-[#00ACC1] text-[#00ACC1] rounded-xl font-medium flex items-center justify-center hover:bg-[#E8F5F7] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          disabled={!selectedTime || isBooking}
          className="flex-1 py-3 bg-gradient-to-r from-[#00ACC1] to-[#0097A7] text-white rounded-xl font-medium flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBooking ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "Continue"
          )}
        </motion.button>
      </div>
    </div>
  );
}