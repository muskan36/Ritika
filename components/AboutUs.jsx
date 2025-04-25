"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

export default function AboutUs() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
        ease: "easeInOut",
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, rotate: 2, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: { duration: 0.9, ease: "easeInOut" },
    },
  }

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.3 },
    },
  }

  return (
    <div ref={sectionRef} className="max-w-full w-[85%] mx-auto px-2 sm:px-4 py-2 font-average">
      <motion.div
        className="text-center mb-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          variants={titleVariants}
          className="inline-block border border-[#F2F2F2] rounded-full px-6 py-2 mb-4 bg-white shadow-sm"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >
          <p className="text-xs tracking-wide uppercase font-medium bg-gradient-to-r from-[#4A9CEE] via-[#E74C3C] to-[#F39C12] text-transparent bg-clip-text">
            About Us
          </p>
        </motion.div>
        <motion.h1 variants={titleVariants} className="text-3xl md:text-4xl font-medium mb-6">
          <span className="text-sky-400">Who Is </span>
          <span className="text-blue-800">Bishop Pharmacy?</span>
        </motion.h1>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-6 mt-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col justify-center">
          <motion.h2
            variants={titleVariants}
            className="text-xl md:text-2xl font-semibold text-black mb-4"
          >
            About Our Pharmacy
          </motion.h2>

          <motion.p variants={textVariants} className="text-black text-md leading-relaxed mb-6">

            At Bishops Waltham Pharmacy, we’re proud to be more than just a place to pick up prescriptions.
            We’re a cornerstone of the local community, committed to providing not only expert pharmaceutical
            services but also a genuine, personal connection with every customer who walks through our doors.
          </motion.p>

          <motion.p variants={textVariants} className="text-black text-md leading-relaxed mb-8">
            Our team understands that good health is about more than just medicine—it’s about building relationships.
            As a locally owned pharmacy, we believe in supporting you with the same care and attention we’d offer to family.
            Whether you need advice, support, or your health essentials, we’re here to help you live your best, healthiest life.
          </motion.p>


          <motion.p variants={textVariants} className="text-black text-sm leading-relaxed mb-8">
            Trust us for a personalized and reliable healthcare experience.
          </motion.p>

          <motion.div variants={buttonVariants} className="flex space-x-4">
            <Link
              href="#read-more"
              className="flex items-center justify-center bg-blue-100 text-blue-800 px-6 py-2 rounded-full text-sm font-medium"
            >
              Read More
              <span className="ml-2 bg-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            <Link
              href="#services"
              className="border border-gray-300 text-[#81B6FF] px-6 py-2 rounded-full text-sm font-medium"
            >
              Our Services
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <motion.div variants={imageVariants} className="rounded-lg overflow-hidden h-[390px] w-full relative">
            <Image
              src="/assets/aboutus2.webp"
              alt="Pharmacy shelves"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover"
            />
          </motion.div>

          <div className="flex flex-col gap-2">
            <motion.div variants={imageVariants} className="rounded-lg overflow-hidden h-[300px] w-full relative">
              <Image
                src="/assets/aboutus1.webp"
                alt="Pharmacist"
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              variants={statsVariants}
              className="bg-[#004488] text-white rounded-lg h-[80px] flex flex-col items-center justify-center"
            >
              <p className="text-2xl font-bold">250+</p>
              <p className="text-sm">Happy Patients Till Date</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
