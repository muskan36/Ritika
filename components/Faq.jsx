"use client"

import { useState, useRef,useEffect } from "react"
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react"

const faqItems = [
  {
    id: 1,
    question: "What is Bishops Waltham Pharmacy",
    answer:
      "Bishops Waltham Pharmacy is a local community pharmacy in Hampshire offering NHS and private prescriptions, health checks, vaccinations, and expert advice. They provide friendly, reliable service including prescription delivery, travel health, and more.",
  },
  {
    id: 2,
    question: "How do I order a prescription?",
    answer:
      "You can order a prescription by visiting our pharmacy in person, calling us, or using our online prescription ordering service. If you have a repeat prescription, you can set up a regular order for convenience.",
  },
  {
    id: 3,
    question: "What services do you offer?",
    answer:
      "We offer a range of services including NHS and private prescriptions, health checks, vaccinations, travel health advice, and more. Please check our website or contact us for a full list of services.",
  },
  {
    id: 4,
    question: "Do you offer delivery services?",
    answer:
      "Yes, we offer free delivery services for prescriptions within the local area. Please contact us for more details.",
  },
  {
    id: 5,
    question: "What travel vaccinations do you provide?",
    answer:
      "We provide a comprehensive range of travel vaccinations including Hepatitis A & B, Typhoid, Yellow Fever, Japanese Encephalitis, Rabies, and more. Book a consultation with our travel health specialist to discuss your specific needs.",
  },
]

export default function FAQComponent() {
  const [openItem, setOpenItem] = useState(1)
  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id)
  }

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "-100px 0px",
  })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.8,
      },
    },
  }

  const faqItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  return (
    <motion.div 
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full py-10 px-4 md:px-8 lg:px-0 relative overflow-hidden font-average"
    >
      <div className="max-w-full w-[85%] mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          variants={headerVariants}
          className="text-center mb-12"
        >
          <div className="inline-block border border-[#F2F2F2] rounded-full px-6 py-2 mb-4 bg-white shadow-sm">
            <p className="text-xs tracking-wide uppercase font-medium bg-gradient-to-r from-[#4A9CEE] via-[#3498db] to-[#004488] text-transparent bg-clip-text">
              Frequently Asked Questions
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column - Image and Title */}
          <motion.div 
            variants={imageVariants}
            className="lg:col-span-5 flex flex-col"
          >
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#3498db] mb-3">Got Questions?</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl text-[#004488] mb-6">We've Got Answers!</h3>
            </div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-full h-[300px] md:h-[400px] lg:h-[350px] overflow-hidden rounded-2xl"
            >
              <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
              <Image
                src="/assets/faqimg.png"
                alt="Pharmacist consulting with patients"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Right Column - FAQ Items */}
          <div className="lg:col-span-7 space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                variants={faqItemVariants}
                className="rounded-3xl overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-full flex items-center justify-between p-6 text-left ${
                    openItem === item.id ? "bg-[#e8f0fa] text-[#004488]" : "bg-white text-gray-700"
                  } rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-base">{item.question}</span>
                  </div>
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      openItem === item.id ? "bg-[#004488] rotate-180" : "bg-[#e8f0fa]"
                    } transition-all duration-300`}
                  >
                    {openItem === item.id ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#004488]" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        className="px-8 py-6 text-gray-700 leading-relaxed bg-white border border-gray-100 rounded-2xl mt-2 shadow-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-1 bg-blue-100 rounded-full"></div>
                          <div>
                            {item.answer}
                            <div className="mt-4 flex justify-end">
                              <motion.button
                                className="text-[#004488] text-sm font-medium flex items-center gap-1 hover:underline"
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Learn more <ArrowRight className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative animated elements */}
      {isInView && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-blue-100 blur-3xl -z-10"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-indigo-100 blur-3xl -z-10"
          />
        </>
      )}
    </motion.div>
  )
}