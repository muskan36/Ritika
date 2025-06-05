/*"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ArrowRight, Search, ChevronRight } from "lucide-react"
import Image from "next/image"


  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 0.8, 1])

  // Track if animation has played once
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  // Handle view all articles click
  const handleViewAllClick = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.15,
      },
    }),
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const notificationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const blogPosts = [
    {
      id: 1,
      category: "Weight Loss",
      title: "Top 5 Weight Loss Tips",
      description: "Here are top 5 weight loss tips for all age group persons.",
      tagline: "In Today's World an healthy posture and life is important! Read More...",
      author: "Olivia Rhye",
      date: "20 Jan 2022",
      image: "/assets/blog1.webp",
      authorImage: "/assets/Avatar.webp",
      readTime: "5 min read",
    },
    {
      id: 2,
      category: "Ear Microsuction",
      title: "Ear Microsuction",
      description:
        "Learn about our safe and effective ear wax removal service, what to expect, and how to get started.",
      tagline: "Professional ear cleaning by certified specialists",
      author: "Phoenix Baker",
      date: "19 Jan 2022",
      image: "/assets/blog2.webp",
      authorImage: "/assets/Avatar.webp",
      readTime: "8 min read",
    },
    {
      id: 3,
      category: "Travel Clinic",
      title: "Best Vaccines Before Travel",
      description:
        "The list of ESSENTIAL PRE has been created to be a trusted source for traveling, booking, and managing travel.",
      tagline: "Protect yourself before your next adventure",
      author: "Lana Steiner",
      date: "18 Jan 2022",
      image: "/assets/blog3.webp",
      authorImage: "/assets/Avatar.webp",
      readTime: "6 min read",
    },
  ]

  return (
    <motion.div
      ref={sectionRef}
      className="w-full py-10 px-4 bg-gradient-to-b overflow-hidden font-plusjakarta relative"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Notification */
    /*  {showNotification && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#037F91] text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={notificationVariants}
          transition={{ duration: 0.3 }}
        >
          <span>Currently showing all available articles</span>
          <button 
            onClick={() => setShowNotification(false)}
            className="ml-2 p-1 rounded-full hover:bg-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </motion.div>
      )}

      {/* Decorative elements */
     /*<div className="absolute left-0 top-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
      <motion.div
        className="absolute -left-20 top-40 w-40 h-40 rounded-full bg-[#037F91]/5 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
      ></motion.div>
      <motion.div
        className="absolute right-10 top-60 w-60 h-60 rounded-full bg-[#037F91]/5 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [100, -50]) }}
      ></motion.div>

      <motion.div
        className="max-w-full w-[75%] mx-auto relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate={isInView || hasAnimated ? "visible" : "hidden"}
      >
        {/* Header with staggered animation */
      /*  <motion.div
          variants={headerVariants}
          className="text-center mb-6 "
        >
          <motion.div
            className="inline-block rounded-full px-6 py-2 mb-0 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={isInView || hasAnimated ? {
              scale: 1,
              opacity: 1,
              y: 0
            } : {
              scale: 0.8,
              opacity: 0,
              y: 10
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 15px -3px rgba(74, 156, 238, 0.3)"
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              duration: 0.6,
              delay: 0.1
            }}
          >
            {/* Animated background elements */
          /*  <motion.div
              className="absolute inset-0  to-transparent opacity-0"
              animate={isInView || hasAnimated ? {
                opacity: 0.3,
                x: ["-100%", "100%"],
                transition: {
                  x: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  opacity: {
                    duration: 0.5
                  }
                }
              } : {}}
            />

            {/* Main text with gradient */
          /*  <p className="text-xs tracking-wide uppercase font-semibold bg-gradient-to-r from-[#4A9CEE] via-[#34B3E4] to-[#2ECC71] text-transparent bg-clip-text relative z-10">
              OUR HEALTH BLOG
            </p>

            {/* Optional: Animated dots for visual interest */
           /* <motion.div
              className="absolute -right-1 -top-1 w-2 h-2 bg-[#4A9CEE] rounded-full"
              animate={isInView || hasAnimated ? {
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
                transition: {
                  duration: 1.5,
                  repeat: Infinity
                }
              } : {}}
            />
          </motion.div>
        </motion.div>

        <motion.h2
          variants={headerVariants}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-[#037F91] mb-3 font-plusjakarta"
        >
          Resources and insights
        </motion.h2>

        <motion.p variants={headerVariants} className="text-center text-[#037F91]/80 mb-12 max-w-xl mx-auto text-lg">
          The latest industry news, interviews, technologies, and resources to help you make informed health decisions.
        </motion.p>

        {/* Blog Cards with staggered animation */
      /* <div className="grid md:grid-cols-3 gap-8 font-plusjakarta">
          {blogPosts.map((post, index) => (
            <motion.a
              key={post.id}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group block"
              href={
                post.id === 1
                  ? "https://www.medicalnewstoday.com/articles/303409"
                  : post.id === 2
                    ? "https://www.healthline.com/health/microsuction"
                    : post.id === 3
                      ? "https://www.msdmanuals.com/home/multimedia/table/vaccines-for-international-travel"
                      : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative h-52 overflow-hidden">
                <motion.div className="absolute inset-0 bg-gradient-to-t from-[#037F91]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/90 backdrop-blur-sm text-[#037F91] text-xs font-semibold px-3 py-1.5 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card Content */
           /*  <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#037F91] transition-colors">
                    {post.title}
                  </h3>
                  <motion.div whileHover={{ x: 3 }} className="bg-[#E6F4F6] p-2 rounded-full text-[#037F91]">
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>
                <p className="text-[#037F91] text-sm font-medium mb-6">{post.tagline}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border border-gray-200">
                      <Image
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All Button */
      /*  <motion.div variants={itemVariants} className="flex justify-center mt-12">
          <motion.button
            className="bg-[#E6F4F6] text-[#037F91] px-6 py-3 rounded-xl flex items-center gap-2 font-medium hover:bg-[#d0ebef] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewAllClick}
          >
            View all articles
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )*/

    "use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ArrowRight, Search, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function BlogSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 0.8, 1])

  // Track if animation has played once
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  // Handle view all articles click
 /* const handleViewAllClick = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }*/

    const handleViewAllClick = () => {
    window.location.href = "/blog"; // Change this to your actual blog page URL
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.15,
      },
    }),
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const notificationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const blogPosts = [
    {
      id: 1,
      category: "Weight Loss",
      title: "Top 5 Weight Loss Tips",
      description: "Here are top 5 weight loss tips for all age group persons.",
      tagline: "In Today's World an healthy posture and life is important! Read More...",
      author: "Olivia Rhye",
      date: "20 Jan 2022",
      image: "/assets/blog1.webp",
      authorImage: "/assets/Avatar.webp",
      readTime: "5 min read",
    },
    {
      id: 2,
      category: "Ear Microsuction",
      title: "Ear Microsuction",
      description:
        "Learn about our safe and effective ear wax removal service, what to expect, and how to get started.",
      tagline: "Professional ear cleaning by certified specialists",
      author: "Phoenix Baker",
      date: "19 Jan 2022",
      image: "/assets/blog2.webp",
      authorImage: "/assets/Avatar.webp",
      readTime: "8 min read",
    },
    {
      id: 3,
      category: "Travel Clinic",
      title: "Best Vaccines Before Travel",
      description:
        "The list of ESSENTIAL PRE has been created to be a trusted source for traveling, booking, and managing travel.",
      tagline: "Protect yourself before your next adventure",
      author: "Lana Steiner",
      date: "18 Jan 2022",
      image: "/assets/blog3.webp",
      authorImage: "/assets/Avatar.webp",
      readTime: "6 min read",
    },
  ]

  return (
    <motion.div
      ref={sectionRef}
      className="w-full py-10 px-4 bg-gradient-to-b overflow-hidden font-plusjakarta relative"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Notification */}
      {showNotification && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#037F91] text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={notificationVariants}
          transition={{ duration: 0.3 }}
        >
          <span>Currently showing all available articles</span>
          <button 
            onClick={() => setShowNotification(false)}
            className="ml-2 p-1 rounded-full hover:bg-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </motion.div>
      )}

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
      <motion.div
        className="absolute -left-20 top-40 w-40 h-40 rounded-full bg-[#037F91]/5 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
      ></motion.div>
      <motion.div
        className="absolute right-10 top-60 w-60 h-60 rounded-full bg-[#037F91]/5 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [100, -50]) }}
      ></motion.div>

      <motion.div
        className="max-w-full w-[75%] mx-auto relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate={isInView || hasAnimated ? "visible" : "hidden"}
      >
        {/* Header with staggered animation */}
        <motion.div
          variants={headerVariants}
          className="text-center mb-6 "
        >
          <motion.div
            className="inline-block rounded-full px-6 py-2 mb-0 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={isInView || hasAnimated ? {
              scale: 1,
              opacity: 1,
              y: 0
            } : {
              scale: 0.8,
              opacity: 0,
              y: 10
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 15px -3px rgba(74, 156, 238, 0.3)"
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              duration: 0.6,
              delay: 0.1
            }}
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute inset-0  to-transparent opacity-0"
              animate={isInView || hasAnimated ? {
                opacity: 0.3,
                x: ["-100%", "100%"],
                transition: {
                  x: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  opacity: {
                    duration: 0.5
                  }
                }
              } : {}}
            />

            {/* Main text with gradient */}
            <p className="text-xs tracking-wide uppercase font-semibold bg-gradient-to-r from-[#4A9CEE] via-[#34B3E4] to-[#2ECC71] text-transparent bg-clip-text relative z-10">
              OUR HEALTH BLOG
            </p>

            {/* Optional: Animated dots for visual interest */}
            <motion.div
              className="absolute -right-1 -top-1 w-2 h-2 bg-[#4A9CEE] rounded-full"
              animate={isInView || hasAnimated ? {
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
                transition: {
                  duration: 1.5,
                  repeat: Infinity
                }
              } : {}}
            />
          </motion.div>
        </motion.div>

        <motion.h2
          variants={headerVariants}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-[#037F91] mb-3 font-plusjakarta"
        >
          Resources and insights
        </motion.h2>

        <motion.p variants={headerVariants} className="text-center text-[#037F91]/80 mb-12 max-w-xl mx-auto text-lg">
          The latest industry news, interviews, technologies, and resources to help you make informed health decisions.
        </motion.p>

        {/* Blog Cards with staggered animation */}
        <div className="grid md:grid-cols-3 gap-8 font-plusjakarta">
          {blogPosts.map((post, index) => (
            <motion.a
              key={post.id}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group block"
              href={
                post.id === 1
                  ? "https://www.medicalnewstoday.com/articles/303409"
                  : post.id === 2
                    ? "https://www.healthline.com/health/microsuction"
                    : post.id === 3
                      ? "https://www.msdmanuals.com/home/multimedia/table/vaccines-for-international-travel"
                      : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative h-52 overflow-hidden">
                <motion.div className="absolute inset-0 bg-gradient-to-t from-[#037F91]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/90 backdrop-blur-sm text-[#037F91] text-xs font-semibold px-3 py-1.5 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#037F91] transition-colors">
                    {post.title}
                  </h3>
                  <motion.div whileHover={{ x: 3 }} className="bg-[#E6F4F6] p-2 rounded-full text-[#037F91]">
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>
                <p className="text-[#037F91] text-sm font-medium mb-6">{post.tagline}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border border-gray-200">
                      <Image
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All Button */}
        <motion.div variants={itemVariants} className="flex justify-center mt-12">
          <motion.button
            className="bg-[#E6F4F6] text-[#037F91] px-6 py-3 rounded-xl flex items-center gap-2 font-medium hover:bg-[#d0ebef] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewAllClick}
          >
            View all articles
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

