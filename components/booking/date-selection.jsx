"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

export default function DateSelection({ onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get current date for highlighting today
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Generate calendar data
  const generateCalendarData = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    // Get day of week for first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()

    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

    // Generate array of dates to display
    const calendarDays = []

    // Add days from previous month
    const prevMonth = new Date(year, month, 0)
    const prevMonthDays = prevMonth.getDate()

    for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
      calendarDays.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false,
        isToday: false,
      })
    }

    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      calendarDays.push({
        date,
        isCurrentMonth: true,
        isToday: date.getTime() === today.getTime(),
      })
    }

    // Add days from next month to complete the grid (6 rows x 7 days = 42 cells)
    const remainingDays = 42 - calendarDays.length
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false,
      })
    }

    return calendarDays
  }

  const calendarDays = generateCalendarData(currentMonth)

  // Format month and year for display
  const monthYearFormat = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" })

  // Navigate to previous month
  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Check if date is selectable (not in the past)
  const isSelectable = (date) => {
    return date >= today
  }

  // Handle date selection
  const handleDateClick = (date) => {
    if (isSelectable(date)) {
      onDateSelect(date)
    }
  }

  return (
    <div className="p-4 pt-2">
      {/* Calendar container with reduced width */}
      <div className="bg-white p-3 rounded-xl shadow-md border border-gray-100 max-w-[280px] mx-auto">
        {/* Calendar header */}
        <div className="flex justify-between items-center mb-3">
          <button 
            onClick={goToPrevMonth} 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>

          <h4 className="text-sm font-medium flex items-center text-gray-800">
            <Calendar size={14} className="mr-2 text-[#00ACC1]" />
            {monthYearFormat.format(currentMonth)}
          </h4>

          <button 
            onClick={goToNextMonth} 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 text-center text-[10px] font-medium text-gray-500 mb-1">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>

        {/* Calendar grid - reduced size */}
        <div className="grid grid-cols-7 gap-0.5">
          {calendarDays.map((day, index) => (
            <motion.button
              key={index}
              whileHover={isSelectable(day.date) ? { scale: 1.05 } : {}}
              whileTap={isSelectable(day.date) ? { scale: 0.95 } : {}}
              onClick={() => handleDateClick(day.date)}
              disabled={!isSelectable(day.date)}
              className={`
                relative h-6 w-6 rounded-full flex items-center justify-center text-[10px]
                ${!day.isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                ${!isSelectable(day.date) ? "cursor-not-allowed opacity-40" : "cursor-pointer"}
                ${day.isToday ? "border border-[#00ACC1] text-[#00ACC1] font-medium" : ""}
                ${
                  day.isCurrentMonth && isSelectable(day.date) && !day.isToday
                    ? "hover:bg-[#00ACC1] hover:text-white"
                    : ""
                }
                transition-all duration-150
              `}
            >
              {day.date.getDate()}

              {/* Selected indicator dot */}
              {day.date.getDate() === 19 && day.isCurrentMonth && (
                <motion.div
                  className="absolute -bottom-1 w-1 h-1 bg-[#00ACC1] rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Next button */}
      <div className="mt-4 max-w-[350px] mx-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleDateClick(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 19))}
          className="w-full bg-gradient-to-r from-[#00ACC1] to-[#0097A7] text-white py-2 rounded-lg font-medium flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 text-sm"
        >
          Select Time Slot <ChevronRight size={14} className="ml-1" />
        </motion.button>
      </div>
    </div>
  )
}