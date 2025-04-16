'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const whyChooseContent = [
  {
    title: "Safer Medications",
    desc: "By leveraging AI-driven insights and real-time data, this feature ensures users take the right medication safely and efficiently.",
    features: ["Drug Interaction Alerts", "Dosage Safety Checks", "Advanced Filtering"],
    image: "/assets/whychoseus1.png",
  },
  {
    title: "Global Accessibility",
    desc: "Access your prescriptions and medical advice from anywhere in the world with our international service network.",
    features: ["24/7 Online Consultations", "International Prescription Transfer", "Travel Medication Kits"],
    image: "/assets/whychoseus2.png",
  },
  {
    title: "Health & Wellness",
    desc: "Supporting your active lifestyle with specialized supplements and personalized wellness plans.",
    features: ["Fitness Supplement Guidance", "Nutrition Consultation", "Wellness Program Integration"],
    image: "/assets/whychoseus3.png",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const featureItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "backOut"
    }
  }
};

export default function WhyChooseUs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ghostContent, setGhostContent] = useState(null);
  const [showGhost, setShowGhost] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setGhostContent(whyChooseContent[currentSlide]);
        setShowGhost(true);
        setIsAnimating(true);
        setDirection(1);

        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % whyChooseContent.length);
          setTimeout(() => {
            setShowGhost(false);
            setIsAnimating(false);
          }, 600);
        }, 600);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  const handleDotClick = (index) => {
    if (currentSlide !== index && !isAnimating) {
      setDirection(index > currentSlide ? 1 : -1);
      setGhostContent(whyChooseContent[currentSlide]);
      setShowGhost(true);
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentSlide(index);
        setTimeout(() => {
          setShowGhost(false);
          setIsAnimating(false);
        }, 600);
      }, 300);
    }
  };

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      rotate: direction > 0 ? 2 : -2
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.9,
      rotate: direction > 0 ? -2 : 2
    })
  };

  const contentVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    })
  };

  const transition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    duration: 0.6
  };

  return (
    <div className="w-full flex justify-center items-center py-10 bg-white overflow-hidden font-average">
      <div className="relative max-w-full w-[90%] rounded-3xl overflow-hidden">
        <div className="px-6 sm:px-8 lg:px-12 py-10">
          <div className="text-center mb-8 lg:mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="inline-block border-1 border-[#F2F2F2] rounded-full px-6 py-2 mb-4"
            >
              <p className="text-xs text-[#5D5D5D] tracking-wide uppercase font-medium font-average">
                Why Choose Us
              </p>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl sm:text-4xl font-semibold"
            >
              <span className="text-[#5BB9EC]">Why Choose </span>
              <span className="text-[#004488]">Bishop Pharmacy?</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image section */}
            <div className="flex flex-col order-1 md:order-none">
              <div className="relative overflow-hidden rounded-lg w-full h-[300px] sm:h-[375px] mx-auto">
                <div className="relative w-full h-full">
                  <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                      key={`image-${currentSlide}`}
                      custom={direction}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={transition}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={whyChooseContent[currentSlide].image || "/placeholder.svg"}
                        alt={whyChooseContent[currentSlide].title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain object-center"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex justify-center mt-6"
              >
                <div className="flex items-center space-x-3">
                  {whyChooseContent.map((_, index) => (
                    <div key={index} className="flex items-center">
                      {index > 0 && (
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "64px" }}
                          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                          className={`h-[1px] ${currentSlide >= index ? "bg-cyan-500" : "bg-gray-300"}`}
                        ></motion.div>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDotClick(index)}
                        className={`relative flex items-center justify-center h-6 w-6 rounded-full transition-colors ${currentSlide === index ? "bg-cyan-500" : currentSlide > index ? "bg-cyan-500" : "bg-gray-300"}`}
                        aria-label={`Go to slide ${index + 1}`}
                      >
                        <span className="h-2 w-2 bg-white rounded-full"></span>
                      </motion.button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Text content section */}
            <div className="flex flex-col justify-center relative overflow-hidden">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={`content-${currentSlide}`}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transition}
                  className="space-y-4"
                >
                  <motion.h3 
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="text-2xl font-semibold text-gray-800"
                  >
                    {whyChooseContent[currentSlide].title}
                  </motion.h3>
                  
                  <motion.p 
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="text-gray-600"
                  >
                    {whyChooseContent[currentSlide].desc}
                  </motion.p>

                  <motion.ul 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-2 mt-4"
                  >
                    {whyChooseContent[currentSlide].features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        variants={featureItem}
                        className="flex items-center gap-2"
                      >
                        <motion.span 
                          whileHover={{ scale: 1.2 }}
                          className="h-2 w-2 rounded-full bg-purple-400"
                        ></motion.span>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  
                  <motion.button 
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "#f3f4f6",
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center mt-6 text-sm font-medium text-black border-2 border-black-300 rounded-full px-6 py-2 transition-colors"
                  >
                    <span className="pr-3">See How it Works</span>
                    <motion.span 
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        x: [0, 5, 0]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1.5
                      }}
                      className="bg-[#8DBBFF] p-1.5 rounded-full flex items-center justify-center"
                    >
                      <ChevronRight size={14} className="text-white" />
                    </motion.span>
                  </motion.button>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>
                {showGhost && ghostContent && (
                  <motion.div
                    initial={{ x: 0, opacity: 0.8, scale: 1 }}
                    animate={{ 
                      x: direction > 0 ? -100 : 100, 
                      opacity: 0, 
                      scale: 0.95,
                      filter: "blur(4px)"
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.4, 0, 0.2, 1],
                      scale: { duration: 0.4 }
                    }}
                    className="absolute inset-0 space-y-4 pointer-events-none z-10"
                  >
                    <h3 className="text-2xl font-medium text-[#232838]">{ghostContent.title}</h3>
                    <p className="text-gray-600">{ghostContent.desc}</p>
                    <ul className="space-y-2 mt-4">
                      {ghostContent.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="inline-flex items-center mt-6 text-sm font-medium text-black border-2 border-black-300 rounded-full px-6 py-2">
                      <span className="pr-3">See How it Works</span>
                      <span className="bg-[#8DBBFF] p-1.5 rounded-full flex items-center justify-center">
                        <ChevronRight size={14} className="text-white" />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}