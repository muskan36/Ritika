"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import { Plus, Minus } from "lucide-react"

const faqItems = [
  {
    id: 1,
    question: "What services does Bishops Waltham Pharmacy offer?",
    answer:
      "We offer a wide range of services to meet your health needs, including prescription dispensing, flu and COVID-19 vaccinations, weight loss clinic, ear microsuction, and expert advice on over-the-counter products. We’re always here to help with any questions or concerns about your health.",
  },
  {
    id: 2,
    question: "How can I order my prescriptions?",
    answer:
      "You can order your prescriptions in several ways! Simply bring your prescription to the pharmacy, use our online ordering service, or give us a call.",
  },
  {
    id: 3,
    question: "Do you offer home delivery for prescriptions?",
    answer:
      "Yes, we do and it’s free! We offer a convenient home delivery service for our customers who can’t make it into the pharmacy. Please speak to a member of our team for more details or to arrange a delivery.",
  },
  {
    id: 4,
    question: "Can I get my flu vaccination at Bishops Waltham Pharmacy?",
    answer:
      "Yes, we offer flu vaccinations during flu season. It's quick, easy, and available without an appointment. Just pop in to get yours!",
  },
  {
    id: 5,
    question: "How can I manage my repeat prescriptions?",
    answer:
      "We offer a repeat prescription service to make it easier for you to manage your medication. You can order your repeats online, by phone, or at the pharmacy.",
  },
  {
    id: 6,
    question: "Can you help me understand my medication?",
    answer:
      "We’re always happy to help! If you have any questions about your medication, how to take it, or potential side effects, our team is here to provide clear, helpful advice. We want you to feel confident in your treatment plan.",
  },
  {
    id: 7,
    question: "Do you offer advice on managing long-term conditions?",
    answer:
      "Yes, we offer support for those managing long-term conditions such as diabetes, asthma, and high blood pressure. Our pharmacists can work with you and your GP to help you manage your condition and answer any questions you may have.",
  },
  {
    id: 8,
    question: "Can I speak to a pharmacist confidentially?",
    answer:
      "Absolutely! Our team is here to provide advice in a confidential setting. If you prefer to speak privately, just ask, and we’ll arrange a space where you can chat with a pharmacist in peace.",
  },
  {
    id: 9,
    question: "How do I find out if a product is in stock?",
    answer:
      "You can check our stock by calling the pharmacy or visiting us in person. If we don’t have what you need, we can often order it for you, and it’ll be ready for pick-up same day if not the next!",
  },
  {
    id: 10,
    question: "Do I need an appointment for advice or consultations?",
    answer:
      "No appointment is necessary for general advice or consultations! Just come on down or give us a call — we will be more than happy to assist you.",
  },
]

export default function FAQComponent() {
  const [openItem, setOpenItem] = useState(0)
  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id)
  }

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView, controls])

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
      id="faq"
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full py-10 px-4 md:px-8 lg:px-0 relative overflow-hidden font-average"
    >
      <div className="max-w-full w-[85%] mx-auto relative z-10">
        <motion.div variants={headerVariants} className="text-center mb-12">
          <div className="inline-block border border-[#F2F2F2] rounded-full px-6 py-2 mb-4 bg-white shadow-sm">
            <p className="text-xs tracking-wide uppercase font-medium bg-gradient-to-r from-[#4A9CEE] via-[#3498db] to-[#004488] text-transparent bg-clip-text">
              Frequently Asked Questions
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div variants={imageVariants} className="lg:col-span-5 flex flex-col">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#3498db] mb-3">Got Questions?</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl text-[#004488] mb-6">We've Got Answers!</h3>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-full h-[300px] md:h-[400px] lg:h-[350px] overflow-hidden rounded-2xl"
            >
              <Image
                src="/assets/faqimg.webp"
                alt="Pharmacist consulting with patients"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7 space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                variants={faqItemVariants}
                className="rounded-3xl overflow-hidden max-w-[900px]"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-full flex items-center justify-between py-3 px-5 text-left ${
                    openItem === item.id ? "bg-[#F1F4FE] text-[#004488]" : "bg-[#F1F4FE] text-gray-700"
                  } rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100`}
                >
                  <span className="font-medium text-sm md:text-base leading-tight">{item.question}</span>
                  <div
                    className={`flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full ${
                      openItem === item.id ? "bg-[#81B6FF] rotate-180" : "bg-[#81B6FF]"
                    } transition-all duration-300`}
                  >
                    {openItem === item.id ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
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
                        className="px-6 py-5 text-sm text-gray-700 leading-relaxed bg-white border border-gray-100 rounded-2xl mt-2 shadow-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-1 bg-blue-100 rounded-full"></div>
                          <div>{item.answer}</div>
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
    </motion.div>
  )
}
