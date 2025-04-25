"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

export default function TravelClinic() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -20])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -30])

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        when: "beforeChildren",
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const leftImageVariants = {
    hidden: { opacity: 0, x: -40, rotate: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: -3,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.6 },
      },
    },
  }

  const centerCardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.6 },
      },
    },
  }

  const rightImageVariants = {
    hidden: { opacity: 0, x: 40, rotate: 5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 3,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.6 },
      },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10,
      },
    },
  }

  // Decorative background elements
  const decorElements = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.5,
      transition: {
        delay: 0.8,
        duration: 1.2,
      },
    },
  }

  return (
    <div
      ref={sectionRef}
      className="max-w-full w-[90%] sm:w-[85%] mx-auto bg-white flex flex-col items-center justify-center py-12 sm:py-12 px-4 sm:px-6 md:px-20 overflow-hidden relative font-average"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-10 sm:top-20 left-4 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-blue-50 blur-xl sm:blur-3xl opacity-0"
        variants={decorElements}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
      <motion.div
        className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-24 sm:w-40 h-24 sm:h-40 rounded-full bg-blue-50 blur-xl sm:blur-3xl opacity-0"
        variants={decorElements}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />

      <motion.div
        className="text-center w-full max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h3
          variants={textVariants}
          className="inline-block border border-[#F2F2F2] rounded-full px-6 py-2 mb-4 bg-white shadow-sm"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <p className="text-xs tracking-wide uppercase font-medium bg-gradient-to-r from-[#4A9CEE] via-[#5CB85C] to-[#8E44AD] text-transparent bg-clip-text">
            Travel Clinic
          </p>
        </motion.h3>

        <motion.h1 variants={textVariants} className="text-2xl sm:text-3xl md:text-4xl  mb-1 sm:mb-2">
          Stay Safe with Pre-Travel <span className="text-[#004488]">Health</span>
        </motion.h1>

        <motion.h2 variants={textVariants} className="text-2xl sm:text-3xl md:text-4xl  text-[#004488] mb-3 sm:mb-4">
          Vaccinations
        </motion.h2>

        <motion.p variants={textVariants} className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
          Planning a trip? Protect your health this pre-travel season with vaccinations, expert advice, and safety
          recommendations. Travel confidently—book your consultation today.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
          {/* Left Image Card - Hidden on mobile, shown from md */}
          <motion.div
            style={{ y: y1 }}
            variants={leftImageVariants}
            className="hidden md:block rounded-2xl sm:rounded-3xl overflow-hidden h-60 sm:h-72 md:h-80 relative md:top-8 lg:top-10 flex-shrink-0"
            whileHover={{
              rotate: -4,
              scale: 1.03,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <Image
              src="/assets/travelclinic.webp"
              alt="Traveler looking at mountain view"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </motion.div>

          {/* Center Text Card */}
          <motion.div
            style={{ y: y2 }}
            variants={centerCardVariants}
            className="rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl z-10 flex flex-col justify-between border border-gray-100 bg-white p-4 sm:p-6 h-60 sm:h-72 md:h-80"
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px -8px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <div className="text-left space-y-1 text-lg sm:text-xl">
              <p className="text-[#818183] font-semibold">approach</p>
              <p className="text-[#818183] font-semibold">to expanding</p>
              <p className="text-[#818183] font-semibold">travel</p>
              <p className="text-black font-semibold text-sm sm:text-md">healthcare</p>
            </div>

            <div className="space-y-2 sm:space-y-3 mt-auto">
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="w-full py-2 sm:py-2.5 bg-[#81B6FF] text-white text-xs sm:text-sm font-medium shadow-md shadow-blue-200/50 hover:bg-blue-500 transition-colors duration-300 rounded-tl-[1rem] sm:rounded-tl-[1.5rem] rounded-br-[1rem] sm:rounded-br-[1.5rem]"
              >
                Book Vaccination →
              </motion.button>

              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="w-full py-2 sm:py-2.5 bg-[#81B6FF] text-white text-xs sm:text-sm font-medium shadow-md shadow-blue-200/50 hover:bg-blue-500 transition-colors duration-300 rounded-tl-[1rem] sm:rounded-tl-[1.5rem] rounded-br-[1rem] sm:rounded-br-[1.5rem]"
              >
                Get Appointment →
              </motion.button>
            </div>
          </motion.div>

          {/* Right Image Card - Hidden on mobile, shown from md */}
          <motion.div
            style={{ y: y3 }}
            variants={rightImageVariants}
            className="hidden md:block rounded-2xl sm:rounded-3xl overflow-hidden h-60 sm:h-72 md:h-80 relative md:top-8 lg:top-10 flex-shrink-0"
            whileHover={{
              rotate: 4,
              scale: 1.03,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <Image
              src="/assets/travelclinic2.webp"
              alt="Traveler taking photos in mountains"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </motion.div>
        </div>

        {/* Mobile-only image row below the card */}
        <div className="md:hidden grid grid-cols-2 gap-4 mt-6">
          <motion.div
            style={{ y: y1 }}
            variants={leftImageVariants}
            className="rounded-2xl overflow-hidden h-40 relative flex-shrink-0"
          >
            <Image
              src="/assets/travelclinic.webp"
              alt="Traveler looking at mountain view"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <motion.div
            style={{ y: y3 }}
            variants={rightImageVariants}
            className="rounded-2xl overflow-hidden h-40 relative flex-shrink-0"
          >
            <Image
              src="/assets/travelclinic2.webp"
              alt="Traveler taking photos in mountains"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}