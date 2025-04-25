"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"
import Link from "next/link"

export default function DoctorTestimonial() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15, margin: "-10% 0px -10% 0px" })
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -20])
  const y2 = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.8])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
        when: "beforeChildren",
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.7,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  const contactVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 0.6,
      },
    },
  }

  return (
    <div className="w-full py-16 px-4 sm:px-6 md:px-8 lg:px-10 flex justify-center items-center font-average">
      <motion.div
        ref={sectionRef}
        className="max-w-full w-[80%] bg-[#2D4356] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg md:shadow-xl lg:shadow-2xl relative"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ opacity }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row gap-6 relative z-10">
          {/* Left content */}
          <motion.div className="w-full lg:w-1/2 flex flex-col justify-center p-4" style={{ y: y1 }}>
            <motion.p variants={textVariants} className="text-white/80 text-sm uppercase tracking-wide mb-1">
              Book An Consultation
            </motion.p>

            <motion.h2 variants={textVariants} className="text-white text-3xl sm:text-4xl md:text-5xl  mb-3">
              The Best Pharmacy
              <br />
              in Bishop's Waltham
            </motion.h2>

            <motion.p variants={textVariants} className="text-white/80 text-sm mb-4 leading-relaxed max-w-xl">
              I have been using Bishop's Waltham Pharmacy for years, and they have consistently provided exceptional
              care and support. Their professional team ensures my patients receive the highest level of service, for
              which I am always grateful.
            </motion.p>

            <motion.div variants={buttonVariants} whileHover="hover" className="mt-2">
              <Link href="/booking">
                <motion.button className="bg-white/20 hover:bg-white/30 text-white py-2.5 px-6 rounded-full text-sm transition-colors duration-300">
                  Book An Consultation Now
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right content - Doctor image */}
          <motion.div
            variants={imageVariants}
            style={{ y: y2 }}
            className="w-full lg:w-1/2 flex flex-col items-center justify-center relative"
          >
            <div className="text-white/20 text-center text-base sm:text-lg mb-2 lg:absolute lg:top-6 lg:right-6 lg:text-center lg:text-2xl">
              Doctor At
              <br />
              Bishops Waltham Pharmacy
            </div>
            <div className="relative md:top-28 h-[260px] sm:h-[300px] md:h-[330px] w-full lg:w-full">
              <Image
                src="/assets/doctestimonial1.webp"
                alt="Doctors at Bishop's Waltham Pharmacy"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Contact information footer */}
        <motion.div
          className="w-full lg:w-1/2 bg-white/10 text-white py-2.5 px-6 text-sm rounded-tr-lg backdrop-blur-sm"
          variants={contactVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex items-center">
              <p className="mr-2 text-white/70">Contact No.:</p>
              <p className="font-medium">01489 892459</p>
            </div>
            <div className="flex items-center">
              <p className="mr-2 text-white/70">Email Id:</p>
              <p className="font-medium">pharmacy.fmc1@nhs.net</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
