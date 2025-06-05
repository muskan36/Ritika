"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Send, ArrowRight, Mail, MapPin, X } from "lucide-react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import dynamic from 'next/dynamic'

// Dynamically import Leaflet components to avoid SSR issues
const LeafletMapComponent = dynamic(() => import('./LeafletMapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center">
      <p>Loading map...</p>
    </div>
  )
})

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return { ref, controls, isInView }
}

export default function Footer() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [subject, setSubject] = useState("")
  const [howCanWeHelp, setHowCanWeHelp] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [showMapInfoCard, setShowMapInfoCard] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ name, email, phone, subject, howCanWeHelp })
    setIsFormSubmitted(true)

    setTimeout(() => {
      setName("")
      setEmail("")
      setPhone("")
      setSubject("")
      setHowCanWeHelp("")
      setIsFormSubmitted(false)
    }, 3000)
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setEmail("")
        setSubscribed(false)
      }, 3000)
    }
  }

  const toggleMap = () => {
    setShowMap(!showMap)
  }

  const toggleMapInfoCard = () => {
    setShowMapInfoCard(!showMapInfoCard)
  }

  const missionRef = useRef(null)
  const missionIsInView = useInView(missionRef, { once: true, amount: 0.5 })
  const missionControls = useAnimation()

  useEffect(() => {
    if (missionIsInView) {
      missionControls.start("visible")
    }
  }, [missionIsInView, missionControls])

  const bottomSectionRef = useRef(null)
  const bottomSectionIsInView = useInView(bottomSectionRef, { once: true, amount: 0.1 })
  const bottomSectionControls = useAnimation()

  useEffect(() => {
    if (bottomSectionIsInView) {
      bottomSectionControls.start("visible")
    }
  }, [bottomSectionIsInView, bottomSectionControls])

  const pharmacyLocation = {
    lat: 50.954602981609135,
    lng: -1.2122092309991204,
    name: "Bishop's Waltham Pharmacy",
    address: "Southampton, UK"
  }

  return (
    <footer className="w-full overflow-hidden">
      {/* Top blue section with contact form - animations removed */}
      <div className="bg-gradient-to-br from-[#81B6FF] to-[#5a9be6] relative bottom-25 overflow-hidden font-average">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          {/* Left side - Call to action */}
          <div className="text-white flex flex-col justify-center">
            <div className="mb-6">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white/90"
              >
                <path d="M32 8L8 20L32 32L56 20L32 8Z" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M8 20V44L32 56V32" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M56 20V44L32 56" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M20 14L44 26" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M20 38V14" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M44 50V26" stroke="white" strokeWidth="1.5" fill="none" />
              </svg>
            </div>

            <div className="mb-6">
              <p className="text-white/80 text-sm">Need immediate assistance?</p>
              <p className="text-white/80 text-sm">Let's make things happen—your goals, our expertise.</p>
            </div>

            <h2 className="text-4xl md:text-5xl mb-6 tracking-tight">
              <span className="inline-block">COME ON,</span>
              <br />
              <span className="inline-block">GIVE US A</span>
              <br />
              <span className="inline-block">SHOUT!</span>
            </h2>

            <p className="text-white/90 text-sm max-w-md leading-relaxed">
              Could you specify which services you need before we get in touch? Use the Bishop Contact form to make your
              other questions related to your project. Let me know, and I'll provide the exact content you need!
            </p>
          </div>

          {/* Right side - Contact form */}
          <div className="relative flex items-center justify-center">
            {/* Glass card effect */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 relative z-10 w-full max-w-5xl mx-auto border border-white/20 hover:shadow-xl transition-shadow duration-300">
              {isFormSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    Your message has been sent successfully. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-gray-800 font-semibold text-xl mb-2">Contact Form</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Fill out the form below, and our team will get back to you promptly. Let's connect and create
                    solutions together.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3" ref={formRef}>
                    <div>
                      <label htmlFor="name" className="block text-xs text-gray-600 mb-1">
                        Full name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498db] text-sm bg-white/90 transition-all duration-200 hover:border-[#3498db]/50"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs text-gray-600 mb-1">
                        Business email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498db] text-sm bg-white/90 transition-all duration-200 hover:border-[#3498db]/50"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs text-gray-600 mb-1">
                        Phone
                      </label>
                      <div className="flex">
                        <div className="relative">
                          <select className="appearance-none px-3 py-2.5 border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#3498db] text-sm bg-white/90 pr-8 transition-all duration-200 hover:border-[#3498db]/50">
                            <option>+91</option>
                            <option>+1</option>
                            <option>+44</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="Enter your contact number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="flex-1 px-4 py-2.5 border border-gray-200 border-l-0 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#3498db] text-sm bg-white/90 transition-all duration-200 hover:border-[#3498db]/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs text-gray-600 mb-1">
                        What service do you need? <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="appearance-none w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498db] text-sm bg-white/90 pr-10 transition-all duration-200 hover:border-[#3498db]/50"
                          required
                        >
                          <option value="">Select</option>
                          <option value="prescription">Prescription Services</option>
                          <option value="vaccination">Vaccination</option>
                          <option value="consultation">Health Consultation</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="howCanWeHelp" className="block text-xs text-gray-600 mb-1">
                        How can we help you?
                      </label>
                      <textarea
                        id="howCanWeHelp"
                        value={howCanWeHelp}
                        onChange={(e) => setHowCanWeHelp(e.target.value)}
                        placeholder="Enter your message here"
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498db] text-sm bg-white/90 transition-all duration-200 hover:border-[#3498db]/50"
                      ></textarea>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#3498db] text-white py-2.5 px-12 rounded-full hover:bg-[#2980b9] transition-colors font-medium text-sm group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center">
                          Submit
                          <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="absolute inset-0 bg-[#2980b9] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Decoration elements */}
        <div className="absolute top-8/10 left-6/10 transform -translate-y-1/2 -translate-x-1/2 flex items-center gap-8  pointer-events-none">
          <div className="w-72 h-72 bg-gradient-to-r from-[#F7E192] to-[#FFC700] rounded-full" />
          <svg
            width="244"
            height="244"
            viewBox="0 0 244 244"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-60"
          >
            <path
              opacity="0.6"
              d="M26.7005 141.513C19.7478 140.248 14.2193 136.89 10.1211 132.291C14.2817 127.613 19.9128 124.222 26.9999 123.016L163.609 99.7678C169.865 98.7031 176.259 99.9259 181.881 103.271L225.877 129.446C228.654 131.099 231.054 133.065 233.094 135.268C227.965 141.093 220.81 144.868 212.021 144.868H47.5033C45.9243 144.868 44.3475 144.725 42.7877 144.441L26.7005 141.513ZM26.8057 121.875C19.4734 123.123 13.66 126.61 9.35962 131.402C3.97441 124.867 1.29334 116.088 1.33222 107.278C1.37001 98.7164 3.97599 90.2143 9.11761 83.802C13.4206 88.9566 19.3774 92.756 27.0043 94.144L43.0916 97.0719C44.7195 97.3681 46.3656 97.517 48.0144 97.517H212.532C221.802 97.517 229.292 93.4945 234.616 87.3594C241.601 96.1046 243.523 107.912 241.24 118.59C239.985 124.457 237.47 129.948 233.85 134.377C231.759 132.141 229.304 130.139 226.468 128.452L182.472 102.276C176.622 98.7954 169.95 97.5148 163.415 98.627L26.8057 121.875ZM241.751 70.082C240.526 75.8095 238.1 81.1783 234.617 85.5514C232.367 82.9696 229.659 80.6738 226.468 78.7753L182.472 52.5995C176.622 49.1186 169.95 47.8381 163.415 48.9503L26.8057 72.1982C19.3479 73.4673 13.4615 77.053 9.14019 81.9724C4.24306 75.5465 1.80618 67.1726 1.84327 58.7702C1.91223 43.1459 10.5341 27.7201 27.5109 24.8311L164.12 1.58319C170.376 0.518552 176.77 1.74136 182.392 5.08614L226.388 31.2619C240.356 39.5727 244.798 55.8335 241.751 70.082ZM225.877 79.7697C229.013 81.6358 231.669 83.9026 233.868 86.4575C228.722 92.4542 221.472 96.3599 212.532 96.3599H48.0144C46.4353 96.3599 44.8586 96.2173 43.2988 95.9334L27.2115 93.0056C19.8197 91.6603 14.0377 87.9495 9.87271 82.8966C14.0566 78.0726 19.7708 74.5691 26.9999 73.3389L163.609 50.091C169.865 49.0264 176.259 50.2492 181.881 53.594L225.877 79.7697ZM212.021 146.025C221.155 146.025 228.561 142.119 233.869 136.136C241.463 144.959 243.603 157.218 241.24 168.267C240.015 173.994 237.589 179.363 234.106 183.736C231.856 181.154 229.148 178.858 225.957 176.96L181.961 150.784C176.111 147.303 169.439 146.023 162.903 147.135L26.2947 170.383C18.8369 171.652 12.9505 175.238 8.62915 180.157C3.73202 173.731 1.29514 165.357 1.33222 156.955C1.3706 148.259 4.05799 139.626 9.3603 133.18C13.5956 137.891 19.3021 141.343 26.4933 142.652L42.5805 145.58C44.2085 145.876 45.8545 146.025 47.5033 146.025H212.021ZM225.366 177.954C228.502 179.82 231.158 182.087 233.357 184.642C228.211 190.639 220.961 194.544 212.021 194.544H47.5033C45.9243 194.544 44.3475 194.402 42.7877 194.118L26.7005 191.19C19.3087 189.845 13.5266 186.134 9.36167 181.081C13.5456 176.257 19.2597 172.754 26.4888 171.523L163.098 148.276C169.354 147.211 175.748 148.434 181.37 151.779L225.366 177.954ZM8.60656 181.987C12.9095 187.141 18.8664 190.941 26.4933 192.329L42.5805 195.256C44.2085 195.553 45.8545 195.702 47.5033 195.702H212.021C221.291 195.702 228.781 191.679 234.105 185.544C241.09 194.289 243.012 206.097 240.729 216.774C237.682 231.023 227.2 243.052 211.51 243.052H46.9923C45.4132 243.052 43.8365 242.91 42.2767 242.626L26.1894 239.698C9.23772 236.613 0.752215 221.087 0.821174 205.463C0.858961 196.901 3.46495 188.399 8.60656 181.987Z"
              stroke="white"
              strokeWidth="1.15714"
            />
          </svg>
        </div>

        {/* White wave shape at the bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{
            borderTopLeftRadius: "50% 100%",
            borderTopRightRadius: "50% 100%",
          }}
        ></div>
      </div>

      {/* Middle section - Mission statement with Map */}
      <div className="bg-white py-8 -mt-26 font-average relative"></div>
        <div className="max-w-5xl mx-auto text-center px-4">
          <motion.div
            ref={missionRef}
            initial="hidden"
            animate={missionControls}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
          >
            <motion.p
              className="text-[#353E5C] text-lg font-medium leading-relaxed"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.8 },
                },
              }}
            >
              Our commitment is to prioritize your health with expert guidance,
              <br />
              seamless medication management, and personalized care for
              <br />
              better well-being.
            </motion.p>
          </motion.div>
        </div>

        {/* Map Section with Leaflet */}
        {/* Map Section with Leaflet */}
<motion.div
  className="max-w-6xl mx-auto mt-8 mb-4 px-4 relative"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-200">
    <div className="relative h-[400px] w-full">
      {/* Leaflet Map Component */}
      <LeafletMapComponent
        location={pharmacyLocation}
        onMarkerClick={toggleMapInfoCard}
      />

      {/* Map Info Card - shows when marker is clicked */}
      <AnimatePresence>
        {showMapInfoCard && (
          <motion.div
            className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg overflow-hidden w-[350px] sm:w-[400px] z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-[150px] w-full bg-[#E1F5E9]">
              <Image 
                src="/assets/map.webp" 
                alt="Bishop's Waltham" 
                fill 
                className="object-cover" 
              />
              <button
                onClick={toggleMapInfoCard}
                className="absolute top-2 right-2 bg-white/70 p-1 rounded-full hover:bg-white transition-colors"
              >
                <X className="h-4 w-4 text-gray-700" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 text-lg">{pharmacyLocation.name}</h3>
              <p className="text-sm text-gray-600 mb-2">10-12 High St, Bishop's Waltham, Southampton SO32 1AA, UK</p>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <svg
                  className="h-4 w-4 mr-2 text-[#3498db]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span>01489 892381</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="h-4 w-4 mr-2 text-[#3498db]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Mon-Fri: 9:00 AM - 6:30 PM</span>
              </div>
            </div>
            <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100 bg-gray-50">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacyLocation.lat},${pharmacyLocation.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3498db] text-sm font-medium hover:underline flex items-center"
              >
                Get directions
                <ArrowRight className="h-3 w-3 ml-1" />
              </a>
              <div className="w-8 h-8 bg-[#3498db]/10 rounded-full flex items-center justify-center">
                <MapPin className="h-4 w-4 text-[#3498db]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
</motion.div>

      {/* Bottom section - Links and info */}
      <div className="bg-[#FAFAFF] py-16 relative overflow-hidden font-average">
        {/* Background decoration */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#f0f4ff] rounded-full blur-3xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 15,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-[#f0f4ff] rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 18,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </motion.div>


        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Logo and newsletter subscription - 4 columns */}
            {(() => {
              return (
                <motion.div
                  className="md:col-span-3"
                  ref={bottomSectionRef}
                  initial="hidden"
                  animate={bottomSectionControls}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: "easeOut" },
                    },
                  }}
                >
                  <motion.div
                    className="mb-6"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: 0.1 },
                      },
                    }}
                  >
                    <img
                      src="/assets/logo.webp"
                      alt="Bishops Waltham Pharmacy"
                      className="h-10"
                    />
                  </motion.div>
                  <motion.p
                    className="text-gray-600 text-sm mb-4"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { duration: 0.5, delay: 0.2 },
                      },
                    }}
                  >
                    Join our newsletter to stay up to date on features and new services.
                  </motion.p>

                  {/* Email subscription */}
                  {subscribed ? (
                    <div className="bg-green-50 text-green-700 px-4 py-3 rounded-md flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Thank you for subscribing!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex">
                      <div className="relative flex-grow">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="email"
                          placeholder="Enter Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-grow pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#7ab3e4] transition-all duration-200 w-full"
                          required
                        />
                      </div>
                      <button className="bg-gradient-to-r from-[#7ab3e4] to-[#5a9be6] text-white px-4 py-2 text-sm font-medium rounded-r-md flex items-center group hover:from-[#5a9be6] hover:to-[#4a8bd6] transition-all duration-300">
                        Subscribe
                        <div className="ml-2 w-5 h-5 rounded-full bg-white flex items-center justify-center group-hover:bg-opacity-90 transition-all duration-300">
                          <ChevronRight className="h-3 w-3 text-[#7ab3e4] group-hover:translate-x-0.5 transition-transform duration-300" />
                        </div>
                      </button>
                    </form>
                  )}
                </motion.div>
              )
            })()}

            {/* Empty space - 2 columns */}
            <div className="hidden md:block md:col-span-1"></div>

            {/* Footer links section - mobile layout in 2 rows with 2 columns each */}
            <div className="md:col-span-8 col-span-1">
              {/* First row: Products and Solutions */}
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
                {/* Products column */}
                <div className="animate-slideIn" style={{ animationDelay: "0.1s" }}>
                  <h3 className="text-gray-800 font-medium mb-5 text-base">Products</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            For Microsuction
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            Weight Loss
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            Travel Care
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Solutions column */}
                <div className="animate-slideIn" style={{ animationDelay: "0.2s" }}>
                  <h3 className="text-gray-800 font-medium mb-5 text-base">Solutions</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            Guides
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            Vaccines
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            Documentation
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Resources column */}
                <div className="animate-slideIn" style={{ animationDelay: "0.3s" }}>
                  <h3 className="text-gray-800 font-medium mb-5 text-base">Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            Blog
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            Guides
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            Webinars
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            Documentation
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Company column */}
                <div className="animate-slideIn" style={{ animationDelay: "0.4s" }}>
                  <h3 className="text-gray-800 font-medium mb-5 text-base">Company</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            About Us
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            Partners
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            Privacy Policy
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-gray-500 hover:text-[#3498db] text-sm group flex items-center">
                        <span className="relative overflow-hidden pr-1">
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
                            Terms of Service
                          </span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3498db] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
