"use client"

import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const prescriptions = [
  {
    title: "Smart Medication Insights",
    desc: "AI adjusts dosage & timing based on personal data",
    image: "/assets/sp1.png",
    backgroundIcon: "/assets/magnify.png",
    style: "items-center justify-center",
    gradient: "bg-[linear-gradient(180deg,_#D8E6F9_0%,_#F3F5FF_100%)]",
    contentBottom: false,
  },
  {
    title: "Drug Interaction Alerts",
    desc: "AI detects harmful combinations",
    image: "/assets/sp2.png",
    style: "items-center justify-center",
    gradient: "bg-[linear-gradient(180deg,_#D8E6F9_0%,_#F3F5FF_100%)]",
    contentBottom: false,
  },
  {
    title: "Seamless Pharmacy Integration From Doctors",
    desc: "Users connect directly with healthcare providers and pharmacies",
    image: "/assets/sp3.png",
    backgroundIcon: "/assets/sp3label.png",
    style: "items-center justify-center",
    gradient: "bg-[linear-gradient(180deg,_#D8E6F9_0%,_#F3F5FF_100%)]",
    contentBottom: true,
    imagePosition: "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[240px] h-[240px]",
    imagePadding: "pt-8",
  },
  {
    title: "Personalized Reminder",
    desc: "Context-aware notifications instead of rigid alarms",
    image: "/assets/sp4.png",
    style: "items-center justify-center",
    gradient: "bg-[linear-gradient(180deg,rgba(232,240,250,0.8)_0%,rgba(243,245,255,1)_100%)]",
    contentBottom: true,
    imagePosition: "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[240px] h-[240px]",
    imagePadding: "pt-8",
  },
]

const SmartPrescriptionSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "-100px 0px",
  })
  const controls = useAnimation()
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Header animation variants
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // Slower stagger timing
      },
    },
  }

  const titleBadgeVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
        duration: 1, // Slower duration
      },
    },
  }

  const headingVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3, // Added delay
      },
    },
  }

  // Container variants with staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Slower stagger timing
        delayChildren: 0.5, // Delay children entry
      },
    },
  }

  // All cards come from bottom with slight variation
  const getCardEntryPosition = () => {
    return {
      y: 300,
      opacity: 0,
      scale: 0.9
    }
  }

  // Card variants with upward motion
  const cardVariants = {
    hidden: getCardEntryPosition(),
    visible: (idx) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
        delay: idx * 0.3, // Slower delay
        duration: 1.2, // Slower duration
      },
    }),
    hover: {
      y: -15,
      scale: 1.05,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
        duration: 0.4, // Slower hover duration
      },
    },
  }

  // Image variants - also from bottom
  const imageVariants = {
    hidden: {
      y: 200,
      opacity: 0,
      scale: 0.85
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
        delay: 0.7, // Added delay for smoother transition
        duration: 1.2, // Slower duration
      },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        duration: 0.4, // Slower hover effect
      },
    },
  }

  // Text animation variants
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1, // Slower transition
        delay: 0.9 + delay * 0.1, // Increased delay
        ease: "easeOut",
      },
    }),
  }

  // Background icon variants
  const backgroundIconVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 0.8,
      scale: 1,
      transition: {
        duration: 1.2, // Slower duration
        delay: 1, // Increased delay
        ease: "easeOut",
      },
    },
    floating: {
      y: [0, -10, 0],
      transition: {
        duration: 8, // Slower floating
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-16 px-6 md:px-20 overflow-hidden font-average relative">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={headerVariants}
      >
        <motion.div
          variants={titleBadgeVariants}
          className="inline-block border border-[#F2F2F2] rounded-full px-6 py-2 mb-4 relative overflow-hidden bg-white shadow-sm"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 4px 20px -5px rgba(74, 156, 238, 0.3)"
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0  rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? {
              scale: 1.2,
              opacity: 0.4,
              transition: {
                duration: 1.2,
                delay: 0.6,
                ease: "easeOut"
              }
            } : {}}
          />

          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent rounded-full"
            animate={isInView ? {
              borderColor: "rgba(74, 156, 238, 0.3)",
              scale: 1.1,
              opacity: 0,
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1.5
              }
            } : {}}
          />

          {/* Main text with gradient */}
          <p className="text-xs tracking-wide uppercase font-medium relative z-10 bg-gradient-to-r from-[#4A9CEE] via-[#3498db] to-[#2980B9] text-transparent bg-clip-text">
            Smart Prescriptions
          </p>

          {/* Optional: Animated dots for high-tech feel */}
          <motion.div
            className="absolute -right-1 -top-1 w-2 h-2 bg-[#4A9CEE] rounded-full"
            animate={isInView ? {
              y: [0, -3, 0],
              opacity: [0.8, 1, 0.8],
              transition: {
                duration: 1.5,
                repeat: Infinity
              }
            } : {}}
          />
        </motion.div>

        <motion.h2 variants={headingVariants} className="text-3xl md:text-5xl font-medium font-average mb-6">
          <span className="text-[#004488]">Smartest Way To</span>
          <br />
          <span className="text-black">Manage Your Prescriptions</span>
        </motion.h2>
      </motion.div>

      {/* Main grid with animated cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10"
      >
        {prescriptions.map((card, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            className={`rounded-2xl p-6 shadow-sm relative overflow-hidden min-h-[320px] flex flex-col ${card.gradient}`}
          >
            {/* Shimmer effect on hover */}
            {hovered === idx && (
              <motion.div
                initial={{ x: "-100%", opacity: 0.3 }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
                style={{ mixBlendMode: "overlay" }}
              />
            )}

            {/* Text Content */}
            <div className={`relative z-10 flex flex-col gap-2 ${card.contentBottom ? "mt-auto mb-4" : ""}`}>
              <motion.h3
                custom={idx}
                variants={textVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="font-bold text-xl md:text-2xl text-[#00373F] mb-1"
              >
                {card.title}
              </motion.h3>
              <motion.p
                custom={idx + 0.2}
                variants={textVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-sm md:text-base font-medium text-[#6B6B6B] max-w-sm"
              >
                {card.desc}
              </motion.p>
            </div>

            {/* Background Icon */}
            {(idx === 0 || idx === 2) && card.backgroundIcon && (
              <motion.div
                variants={backgroundIconVariants}
                initial="hidden"
                animate={isInView ? ["visible", "floating"] : "hidden"}
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <Image
                  src={card.backgroundIcon}
                  alt="background icon"
                  width={400}
                  height={400}
                  className="opacity-40"
                />
              </motion.div>
            )}

            {/* Image section */}
            {idx >= 2 ? (
              <motion.div
                variants={imageVariants}
                initial="hidden"
                animate={isInView ? ["visible", "hover"] : "hidden"}
                whileHover="hover"
                className={`relative top-8 flex-grow ${card.imagePadding || ""}`}
              >
                <div className={`${card.imagePosition} overflow-hidden`}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={240}
                    height={240}
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={imageVariants}
                initial="hidden"
                animate={isInView ? ["visible", "hover"] : "hidden"}
                whileHover="hover"
                className={`relative top-3 z-10 flex ${card.style} mt-auto`}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  width={idx === 1 ? 220 : 300}
                  height={220}
                  className="object-contain max-h-[200px] mx-auto drop-shadow-xl"
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default SmartPrescriptionSection
