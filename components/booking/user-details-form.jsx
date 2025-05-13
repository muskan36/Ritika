"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, User, Phone, CreditCard } from "lucide-react"

export default function UserDetailsForm({ onSubmit, onBack, loading = false }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    payment: "",
  })
  const [errors, setErrors] = useState({})
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Patient name is required"
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required"
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number"
    }

    if (!formData.payment.trim()) {
      newErrors.payment = "Payment information is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleFocus = (field) => {
    setFocused(field)
  }

  const handleBlur = () => {
    setFocused(null)
  }

  return (
    <div className="p-6 pt-2">
      <div className=" p-6 rounded-xl">
       
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Name */}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <User size={14} className="mr-1 text-gray-500" />
              Patient Name*
            </label>
            <motion.div
              animate={{
                boxShadow: focused === 'name' ? '0 0 0 2px rgba(0, 172, 193, 0.2)' : 'none',
              }}
              className={`relative rounded-lg overflow-hidden ${errors.name ? 'border-red-500' : 'border-transparent'}`}
            >
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                placeholder="Enter Your Patient Name"
                className={`w-full px-4 py-3 bg-white border ${
                  errors.name ? "border-red-500" : "border-gray-100"
                } rounded-lg focus:outline-none shadow-sm`}
                disabled={loading}
              />
            </motion.div>
            {errors.name && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-red-500 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="space-y-1">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Phone size={14} className="mr-1 text-gray-500" />
              Mobile Number*
            </label>
            <motion.div
              animate={{
                boxShadow: focused === 'mobile' ? '0 0 0 2px rgba(0, 172, 193, 0.2)' : 'none',
              }}
              className={`relative rounded-lg overflow-hidden ${errors.mobile ? 'border-red-500' : 'border-transparent'}`}
            >
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onFocus={() => handleFocus('mobile')}
                onBlur={handleBlur}
                placeholder="Enter Mobile Number"
                className={`w-full px-4 py-3 bg-white border ${
                  errors.mobile ? "border-red-500" : "border-gray-100"
                } rounded-lg focus:outline-none shadow-sm`}
                disabled={loading}
              />
            </motion.div>
            {errors.mobile && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-red-500 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errors.mobile}
              </motion.p>
            )}
          </div>

          {/* Due Payment */}
          <div className="space-y-1">
            <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <CreditCard size={14} className="mr-1 text-gray-500" />
              Due Payment*
            </label>
            <motion.div
              animate={{
                boxShadow: focused === 'payment' ? '0 0 0 2px rgba(0, 172, 193, 0.2)' : 'none',
              }}
              className={`relative rounded-lg overflow-hidden ${errors.payment ? 'border-red-500' : 'border-transparent'}`}
            >
              <input
                type="text"
                id="payment"
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                onFocus={() => handleFocus('payment')}
                onBlur={handleBlur}
                placeholder="Card, UPI, Cash"
                className={`w-full px-4 py-3 bg-white border ${
                  errors.payment ? "border-red-500" : "border-gray-100"
                } rounded-lg focus:outline-none shadow-sm`}
                disabled={loading}
              />
            </motion.div>
            {errors.payment && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-red-500 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errors.payment}
              </motion.p>
            )}
          </div>
        </form>
      </div>

      {/* Navigation buttons */}
      <div className="mt-6 flex gap-4">
        <motion.button
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
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-3 bg-gradient-to-r from-[#00ACC1] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00ACC1] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>Continue <ChevronRight size={16} className="ml-1 inline-block" /></>
          )}
        </motion.button>
      </div>
    </div>
  )
}