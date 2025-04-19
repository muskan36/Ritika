"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AboutUs from "@/components/AboutUs"
import BlogResources from "@/components/Blogs"
import DoctorTestimonial from "@/components/DoctoTestimonial"
import FAQComponent from "@/components/Faq"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import SmartPrescriptionSection from "@/components/Prescriptions"
import TravelClinic from "@/components/TravelClinic"
import VaccinationComponent from "@/components/Vaccination"
import WhyChooseUs from "@/components/WhyChooseUs"
import LoadingAnimation from "@/components/LoadingAnimation"

export default function Home() {
  const [loading, setLoading] = useState(true)

  // Check if this is the first visit in this session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited")
    if (hasVisited) {
      setLoading(false)
    } else {
      // Set the flag for future navigation within the same session
      sessionStorage.setItem("hasVisited", "true")
    }
  }, [])

  const handleLoadingComplete = () => {
    setLoading(false)
  }

  return (
    <>
      {loading && <LoadingAnimation onComplete={handleLoadingComplete} />}

      <AnimatePresence>
        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Hero />
            <SmartPrescriptionSection />
            <WhyChooseUs />
            <AboutUs />
            <TravelClinic />
            <DoctorTestimonial />
            <VaccinationComponent />
            <FAQComponent />
            <BlogResources />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
