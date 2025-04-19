"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"

export default function DoctorTestimonial() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        when: "beforeChildren",
        duration: 0.8,
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3,
      },
    },
  }

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 0.1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  }

  const contactVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.8,
      },
    },
    hover: {
      y: 0,
      opacity: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="w-full py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12 flex justify-center items-center font-plusjakarta">
      <motion.div
        ref={sectionRef}
        className="max-w-full w-[85%]  bg-[#052544] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg md:shadow-xl lg:shadow-2xl relative"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          variants={quoteVariants}
          className="absolute top-4 sm:top-6 left-4 sm:left-6 text-white opacity-0 text-6xl sm:text-7xl lg:text-8xl font-serif"
        >
          "
        </motion.div>

        <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12 relative z-10">
          <motion.div className="flex-1" style={{ y: y1 }}>
            <motion.p variants={textVariants} className="text-blue-200 text-xs sm:text-sm uppercase tracking-wider mb-2">
              Doctor&apos;s Testimonial
            </motion.p>

            <motion.h2
              variants={textVariants}
              className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4"
            >
              The Best Pharmacy in Bishop&apos;s Waltham
            </motion.h2>

            <motion.p variants={textVariants} className="text-gray-300 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed max-w-2xl">
              I have been using Bishop&apos;s Waltham Pharmacy for years, and they have consistently provided
              exceptional care and support. Their professional team ensures my patients receive the highest level of
              service, for which I&apos;m always grateful.
            </motion.p>

            <motion.div variants={textVariants} className="mb-3 sm:mb-4">
              <p className="text-white font-medium text-sm sm:text-base">Dr. Madhu</p>
              <p className="text-blue-200 text-xs">Doctor at the Bishop Waltham Pharmacy</p>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={imageVariants} 
            style={{ y: y2 }} 
            className="w-full lg:w-2/5 xl:w-1/3 mt-4 sm:mt-0"
          >
            <div className="rounded-xl md:rounded-2xl p-2 sm:p-3 h-full">
              <div className="bg-gray-100 rounded-lg md:rounded-xl p-2 sm:p-3 h-full flex flex-col">
                <div className="mb-2">
                  <p className="text-gray-600 text-xs">Owner & Doctor</p>
                  <p className="text-gray-900 font-medium text-sm sm:text-base">Dr. Madhu</p>
                </div>

                <div className="relative flex-1 min-h-[180px] xs:min-h-[200px] sm:min-h-[220px] md:min-h-[240px] rounded-md sm:rounded-lg overflow-hidden">
                  <Image
                    src="/assets/docImage.png"
                    alt="Doctor Madhu"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="w-full bg-black/50 text-white py-2 sm:py-3 px-4 sm:px-6 md:px-8 text-xs sm:text-sm"
          variants={contactVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover="hover"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
            <div className="flex items-center flex-wrap">
              <p className="mr-2 text-gray-300 whitespace-nowrap">Contact No.:</p>
              <p className="font-medium">01489 892459</p>
            </div>
            <div className="flex items-center flex-wrap">
              <p className="mr-2 text-gray-300 whitespace-nowrap">Email:</p>
              <p className="font-medium break-all">pharmacy@mcl.nhs.net</p>
            </div>
            <div className="flex items-center flex-wrap">
              <p className="mr-2 text-gray-300 whitespace-nowrap">Location:</p>
              <p className="font-medium whitespace-nowrap">Bishop's Waltham, Hampshire</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}