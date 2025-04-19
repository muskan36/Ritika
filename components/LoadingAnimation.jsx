"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function LoadingAnimation({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress((prev) => Math.min(prev + 2, 100))
      } else {
        setTimeout(() => {
          onComplete()
        }, 500)
      }
    }, 20)

    return () => clearTimeout(timer)
  }, [progress, onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-full max-w-md px-4 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#3498db]"
          >
            <motion.path
              d="M32 8L8 20L32 32L56 20L32 8Z"
              stroke="#3498db"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            <motion.path
              d="M8 20V44L32 56V32"
              stroke="#3498db"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.path
              d="M56 20V44L32 56"
              stroke="#3498db"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
            <motion.path
              d="M20 14L44 26"
              stroke="#3498db"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            />
            <motion.path
              d="M20 38V14"
              stroke="#3498db"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            />
            <motion.path
              d="M44 50V26"
              stroke="#3498db"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.7 }}
            />
          </svg>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-[#3498db] mb-6 font-average"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Bishop Pharmacy
        </motion.h1>

        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-[#3498db] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <motion.p
          className="text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {progress < 100 ? "Loading your health journey..." : "Welcome!"}
        </motion.p>
      </div>
    </motion.div>
  )
}
