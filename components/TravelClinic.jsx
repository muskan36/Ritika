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

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -70])

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
    hidden: { opacity: 0, y: 30 },
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
    hidden: { opacity: 0, x: -80, rotate: -10 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: -6,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.8 },
      },
    },
  }

  const centerCardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.7 },
      },
    },
  }

  const rightImageVariants = {
    hidden: { opacity: 0, x: 80, rotate: 10 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 6,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.8 },
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
      opacity: 0.7,
      transition: {
        delay: 0.8,
        duration: 1.2,
      },
    },
  }

  return (
    <div
      ref={sectionRef}
      className="max-w-full w-[85%] mx-auto bg-white flex flex-col items-center justify-center py-12 px-6 md:px-20 overflow-hidden relative font-averge"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-50 blur-3xl opacity-0 "
        variants={decorElements}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-50 blur-3xl opacity-0"
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
        <motion.h3 variants={textVariants} className="inline-block border border-[#F2F2F2] rounded-full px-6 py-2 mb-4">
          <p className="text-xs text-[#5D5D5D] tracking-wide uppercase font-medium">Travel Clinic</p>
        </motion.h3>

        <motion.h1 variants={textVariants} className="text-3xl md:text-4xl font-semibold mb-2">
          Stay Safe with Pre-Travel <span className="text-[#004488]">Health</span>
        </motion.h1>

        <motion.h2 variants={textVariants} className="text-3xl md:text-4xl font-semibold text-[#004488] mb-4">
          Vaccinations
        </motion.h2>

        <motion.p variants={textVariants} className="text-sm text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          Planning a trip? Protect your health this pre-travel season with vaccinations, expert advice, and safety
          recommendations. Travel confidently—book your consultation today.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full">
          {/* Left Image Card */}
          <motion.div
            style={{ y: y1 }}
            variants={leftImageVariants}
            className="rounded-3xl overflow-hidden h-72 sm:h-80 relative md:top-10 flex-shrink-0"
            whileHover={{
              rotate: -4,
              scale: 1.03,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <Image
              src="/assets/travelclinic.png"
              alt="Traveler looking at mountain view"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          {/* Center Text Card */}
          <motion.div
            style={{ y: y2 }}
            variants={centerCardVariants}
            className="rounded-3xl shadow-xl z-10 flex flex-col justify-between border border-gray-100 bg-white p-6 h-72 sm:h-80"
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <div className="text-left space-y-1 text-xl">
              <p className="text-[#818183] font-semibold">approach</p>
              <p className="text-[#818183] font-semibold">to expanding</p>
              <p className="text-[#818183] font-semibold">travel</p>
              <p className="text-black font-semibold text-md">healthcare</p>
            </div>

            <div className="space-y-3 mt-auto">
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="w-full py-2.5 bg-[#81B6FF] text-white text-sm font-medium shadow-md shadow-blue-200/50 hover:bg-blue-500 transition-colors duration-300 rounded-tl-[1.5rem] rounded-br-[1.5rem]"
              >
                Book Vaccination →
              </motion.button>

              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="w-full py-2.5 bg-[#81B6FF] text-white text-sm font-medium shadow-md shadow-blue-200/50 hover:bg-blue-500 transition-colors duration-300 rounded-tl-[1.5rem] rounded-br-[1.5rem]"
              >
                Get Appointment →
              </motion.button>
            </div>
          </motion.div>

          {/* Right Image Card */}
          <motion.div
            style={{ y: y3 }}
            variants={rightImageVariants}
            className="rounded-3xl overflow-hidden h-72 sm:h-80 relative md:top-10 flex-shrink-0"
            whileHover={{
              rotate: 4,
              scale: 1.03,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <Image
              src="/assets/travelclinic2.png"
              alt="Traveler taking photos in mountains"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}