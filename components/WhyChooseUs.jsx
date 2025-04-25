"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

const whyChooseContent = [
  {
    title: "Locally Owned & Community-Focused",
    desc: "We're more than just a place to pick up your prescriptions—we're a locally owned, community-focused pharmacy that truly cares about our neighbors.",
    features: [
      "Family-owned business serving the community",
      "Personal relationships with our customers",
      "Deeply rooted in Bishops Waltham"
    ],
    image: "/assets/whychoseus1.webp", 
  },
  {
    title: "Personalized Healthcare Service",
    desc: "We pride ourselves on offering friendly, personalized service where your health and wellbeing always come first.",
    features: [
      "Tailored health advice for your needs",
      "One-on-one consultations",
      "Follow-up care and support"
    ],
    image: "/assets/whychoseus2.webp", // Update with your consultation image
  },
  {
    title: "Expert Care You Can Trust",
    desc: "Our team is dedicated to providing professional healthcare with a personal touch—because you're not just a customer, you're our neighbour.",
    features: [
      "Qualified, experienced pharmacists",
      "Support managing long-term conditions",
      "Trusted health partner for your family"
    ],
    image: "/assets/whychoseus3.webp", // Update with your team image
  },
]

export default function WhyChooseUs() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const smoothProgress = useSpring(scrollYProgress, springConfig)

  const titleY = useTransform(smoothProgress, [0, 0.3], [100, 0])
  const titleOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1])
  const imageScale = useTransform(smoothProgress, [0.1, 0.4], [0.8, 1])
  const imageRotate = useTransform(smoothProgress, [0.1, 0.4], [5, 0])
  const contentX = useTransform(smoothProgress, [0.2, 0.5], [100, 0])
  const contentOpacity = useTransform(smoothProgress, [0.2, 0.5], [0, 1])

  // Slide transition variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { type: "spring", stiffness: 200, damping: 25 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    }),
  }

  // Feature item variants
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  // Button variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.7,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true)
        setDirection(1)

        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % whyChooseContent.length)
          setIsAnimating(false)
        }, 700)
      }
    }, 7000)

    return () => clearInterval(interval)
  }, [currentSlide, isAnimating])

  const handleDotClick = (index) => {
    if (currentSlide !== index && !isAnimating) {
      setDirection(index > currentSlide ? 1 : -1)
      setIsAnimating(true)

      setCurrentSlide(index)
      setTimeout(() => {
        setIsAnimating(false)
      }, 700)
    }
  }

  // Progress indicator animation
  const progressVariants = {
    initial: { width: "0%" },
    animate: {
      width: "100%",
      transition: {
        duration: 7,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
  }

  return (
    <div
      className="w-full flex justify-center items-center py-16 md:py-24 bg-white font-average overflow-hidden"
      ref={containerRef}
    >
      <div className="relative max-w-full w-[90%] rounded-3xl">
        <div className="px-6 sm:px-8 lg:px-12 py-10">
          <motion.div className="text-center mb-12 lg:mb-16" style={{ y: titleY, opacity: titleOpacity }}>
            <motion.div
              className="inline-block border border-[#F2F2F2] rounded-full px-6 py-2 mb-4 bg-white shadow-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-xs tracking-wide uppercase font-medium font-average bg-gradient-to-r from-[#3498db] via-[#9B59B6] to-[#E74C3C] text-transparent bg-clip-text">
                Why Choose Us
              </p>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="text-[#5BB9EC]">Why Choose </span>
              <span className="text-[#004488]">Bishop Pharmacy?</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Image section */}
            <motion.div
              className="flex flex-col order-1 md:order-none"
              style={{ scale: imageScale, rotate: imageRotate }}
            >
              <div className="relative overflow-hidden rounded-2xl w-full h-[350px] sm:h-[450px] md:h-[500px] mx-auto shadow-xl">
                <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-purple-50">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={`image-${currentSlide}`}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 w-full h-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 to-purple-100/30 rounded-2xl" />
                      <Image
                        src={whyChooseContent[currentSlide].image || "/placeholder.svg"}
                        alt={whyChooseContent[currentSlide].title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain object-center p-4"
                        priority
                      />

                      {/* Floating particles */}
                      <motion.div
                        className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-blue-200/40"
                        animate={{
                          y: [0, -15, 0],
                          x: [0, 10, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                      <motion.div
                        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-purple-200/40"
                        animate={{
                          y: [0, 20, 0],
                          x: [0, -15, 0],
                          scale: [1, 0.8, 1],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                      <motion.div
                        className="absolute top-1/2 right-1/3 w-4 h-4 rounded-full bg-cyan-200/40"
                        animate={{
                          y: [0, -10, 0],
                          x: [0, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-3">
                  {whyChooseContent.map((_, index) => (
                    <div key={index} className="flex items-center">
                      {index > 0 && (
                        <div
                          className={`h-[1px] w-[64px] transition-colors duration-500 ${
                            currentSlide >= index ? "bg-cyan-500" : "bg-gray-300"
                          }`}
                        ></div>
                      )}
                      <button
                        onClick={() => handleDotClick(index)}
                        className={`relative flex items-center justify-center h-6 w-6 rounded-full transition-all duration-500 ${
                          currentSlide === index
                            ? "bg-cyan-500 shadow-md shadow-cyan-200"
                            : currentSlide > index
                              ? "bg-cyan-500"
                              : "bg-gray-300"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      >
                        <span className="h-2 w-2 bg-white rounded-full"></span>
                        {currentSlide === index && (
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            variants={progressVariants}
                            initial="initial"
                            animate="animate"
                            key={`progress-${currentSlide}`}
                          >
                            <div className="h-full bg-cyan-300/30 rounded-full overflow-hidden" />
                          </motion.div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Text content section */}
            <motion.div
              className="flex flex-col justify-center relative"
              style={{ x: contentX, opacity: contentOpacity }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`content-${currentSlide}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6 md:space-y-8"
                >
                  <motion.h3
                    className="text-2xl md:text-3xl font-semibold text-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {whyChooseContent[currentSlide].title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 text-base md:text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {whyChooseContent[currentSlide].desc}
                  </motion.p>

                  <motion.ul className="space-y-3 md:space-y-4 mt-4">
                    {whyChooseContent[currentSlide].features.map((feature, index) => (
                      <motion.li
                        key={index}
                        custom={index}
                        variants={featureVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center gap-3"
                      >
                        <motion.span
                          className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.3,
                          }}
                        />
                        <span className="text-gray-700 text-base md:text-lg">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.button
                    className="inline-flex items-center mt-6 text-sm md:text-base font-medium text-black border-2 border-black-300 rounded-full px-6 py-2.5 transition-all hover:bg-gray-50 relative overflow-hidden group"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <motion.span className="absolute inset-0 bg-gradient-to-r from-blue-100/40 to-purple-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="pr-3 relative z-10">See How it Works</span>
                    <motion.span
                      className="bg-[#8DBBFF] p-1.5 rounded-full flex items-center justify-center relative z-10"
                      whileHover={{
                        backgroundColor: "#5BB9EC",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          ease: "easeInOut",
                        }}
                      >
                        <ChevronRight size={14} className="text-white" />
                      </motion.div>
                    </motion.span>
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
