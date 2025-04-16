"use client"

import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const prescriptions = [
  {
    title: 'Smart Medication Insights',
    desc: 'AI adjusts dosage & timing based on personal data',
    image: '/assets/sp1.png',
    backgroundIcon: '/assets/magnify.png',
    style: 'items-center justify-center',
    gradient: 'bg-[linear-gradient(180deg,_#D8E6F9_0%,_#F3F5FF_100%)]',
    contentBottom: false,
  },
  {
    title: 'Drug Interaction Alerts',
    desc: 'AI detects harmful combinations',
    image: '/assets/sp2.png',
    style: 'items-center justify-center',
    gradient: 'bg-[linear-gradient(180deg,_#D8E6F9_0%,_#F3F5FF_100%)]',
    contentBottom: false,
  },
  {
    title: 'Seamless Pharmacy Integration From Doctors',
    desc: 'Users connect directly with healthcare providers and pharmacies',
    image: '/assets/sp3.png',
    backgroundIcon: '/assets/sp3label.png',
    style: 'items-center justify-center',
    gradient: 'bg-[linear-gradient(180deg,_#D8E6F9_0%,_#F3F5FF_100%)]',
    contentBottom: true,
    imagePosition: 'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[240px] h-[240px]',
    imagePadding: 'pt-8',
  },
  {
    title: 'Personalized Reminder',
    desc: 'Context-aware notifications instead of rigid alarms',
    image: '/assets/sp4.png',
    style: 'items-center justify-center',
    gradient: 'bg-[linear-gradient(180deg,rgba(232,240,250,0.8)_0%,rgba(243,245,255,1)_100%)]',
    contentBottom: true,
    imagePosition: 'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[240px] h-[240px]',
    imagePadding: 'pt-8',
  },
]

const SmartPrescriptionSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const controls = useAnimation()
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  // Create a sequence effect for header elements
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      }
    }
  }

  const titleBadgeVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 12,
        duration: 0.5
      }
    }
  }

  const headingVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  }

  // 3D floating card effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.6
      }
    }
  }

  // More dramatic card entrance animation
  const cardVariants = {
    hidden: (i) => ({
      opacity: 0,
      y: 80 + i * 20,
      x: i % 2 === 0 ? -50 : 50,
      scale: 0.7,
      rotateY: i % 2 === 0 ? -10 : 10,
      rotateX: 5
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 90,
        mass: 0.8,
        duration: 0.9
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
        duration: 0.2
      }
    }
  }

  // Floating animation for background icons
  const backgroundIconVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      rotate: -5
    },
    visible: {
      opacity: 0.8,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 1
      }
    },
    floating: {
      y: [0, -10, 0],
      rotate: [0, 2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    }
  }

  // More playful image animations
  const imageVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.5,
      rotate: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        delay: 0.8,
        duration: 1
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      y: [0, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    }
  }

  // Text animation variants
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(4px)"
    },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    })
  }

  return (
    <section ref={sectionRef} className="py-12 px-6 md:px-20 overflow-hidden font-average">
      <motion.div
        className="text-center mb-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={headerVariants}
      >
        <motion.div
          variants={titleBadgeVariants}
          className="inline-block border-1 border-[#F2F2F2] rounded-full px-6 py-2 mb-2 relative"
        >
          <motion.div
            className="absolute inset-0 bg-blue-50 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.5 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          <p className="text-xs text-[#5D5D5D] tracking-wide uppercase font-medium relative z-10">
            Smart Prescriptions
          </p>
        </motion.div>

        <motion.h2
          variants={headingVariants}
          className="text-3xl md:text-4xl font-medium font-average"
        >
          <motion.span
            className="text-[#004488] inline-block"
            initial={{ opacity: 1 }}
            animate={isInView ? {
              opacity: [1, 1, 1],
              transition: { duration: 1.5, delay: 0.6 }
            } : {}}
          >
            <motion.span
              className="inline-block"
              initial={{ backgroundSize: "0% 3px" }}
              animate={isInView ? { backgroundSize: "100% 3px" } : {}}
              transition={{ duration: 1.5, delay: 0.6 }}
              style={{

                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 100%"
              }}
            >
              Smartest Way To
            </motion.span>
          </motion.span>
          <br />
          {/* Fixed second span */}
          <motion.span
            className="text-black inline-block"
            initial={{ opacity: 1 }}
            animate={isInView ? {
              opacity: [1, 1, 1],
              transition: { duration: 1.5, delay: 1 }
            } : {}}
          >
            <motion.span
              className="inline-block"
              initial={{ backgroundSize: "0% 3px" }}
              animate={isInView ? { backgroundSize: "100% 3px" } : {}}
              transition={{ duration: 1.5, delay: 1 }}
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 100%"
              }}
            >
              Manage Your Prescriptions
            </motion.span>
          </motion.span>
        </motion.h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {prescriptions.map((card, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            variants={cardVariants}
            whileHover="hover"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            className={`rounded-xl p-5 shadow-sm relative overflow-hidden min-h-[280px] flex flex-col ${card.gradient} transform perspective-1000`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Shimmer effect on hover */}
            {hovered === idx && (
              <motion.div
                initial={{ x: "-100%", opacity: 0.3 }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent"
                style={{ mixBlendMode: "overlay" }}
              />
            )}

            {/* Text Content with staggered animation */}
            <div className={`relative z-10 flex flex-col gap-1 ${card.contentBottom ? 'mt-auto mb-3' : ''}`}>
              <motion.h3
                custom={0.2 + idx * 0.1}
                variants={textVariants}
                className="font-bold text-lg text-[#00373F] mb-0"
              >
                {card.title}
              </motion.h3>
              <motion.p
                custom={0.4 + idx * 0.1}
                variants={textVariants}
                className="text-sm font-semibold text-[#6B6B6B] max-w-sm"
              >
                {card.desc}
              </motion.p>
            </div>

            {/* Background Icon with floating animation */}
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
                />
              </motion.div>
            )}

            {/* Image section with pulse animation */}
            {idx >= 2 ? (
              <motion.div
                variants={imageVariants}
                animate={isInView ? ["visible", "pulse"] : "hidden"}
                className={`relative top-8 flex-grow ${card.imagePadding || ''}`}
              >
                <div className={`${card.imagePosition} overflow-hidden`}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={imageVariants}
                animate={isInView ? ["visible", "pulse"] : "hidden"}
                className={`relative top-3 z-10 flex ${card.style} mt-auto`}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  width={idx === 1 ? 200 : 280}
                  height={200}
                  className="object-contain max-h-[180px] mx-auto drop-shadow-lg"
                />
              </motion.div>
            )}

            {/* Interactive element on hover */}
            {hovered === idx && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-3 right-3 z-20 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
                whileHover={{ scale: 1.1, backgroundColor: "#0052cc" }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Floating pills background decoration */}
      <div className="relative w-full h-0">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * -50 - 100,
              rotate: Math.random() * 180 - 90
            }}
            animate={isInView ? {
              opacity: [0, 0.3, 0],
              x: [null, Math.random() * 200 - 100],
              y: [null, Math.random() * 200],
              rotate: [null, Math.random() * 360 - 180],
            } : {}}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
            className={`absolute w-8 h-3 rounded-full bg-gradient-to-r ${i % 2 === 0 ? 'from-blue-300 to-cyan-200' : 'from-indigo-300 to-purple-200'
              }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 100 + 50}px`
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default SmartPrescriptionSection