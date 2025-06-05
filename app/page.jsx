"use client"

import { useState, useEffect, useCallback } from "react"
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
import  BlogSection from "@/components/Blogs";
import { useAuth, useCart, useApp } from "@/src/contexts/index"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { cart } = useCart()
  const { addNotification } = useApp()

  // Handle first visit check
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited")
    if (hasVisited) {
      setLoading(false)
    } else {
      sessionStorage.setItem("hasVisited", "true")
    }
  }, []) // Empty dependency array since this should only run once

  // Handle welcome notification separately
  useEffect(() => {
    if (user && !sessionStorage.getItem("welcomeNotificationShown")) {
      addNotification({
        title: "Welcome back!",
        message: `Good to see you again, ${user.name || "valued customer"}!`,
        type: "success"
      })
      sessionStorage.setItem("welcomeNotificationShown", "true")
    }
  }, [user, addNotification])

  const handleLoadingComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <LoadingAnimation onComplete={handleLoadingComplete} />}

      <AnimatePresence>
        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <section id="home"><Hero /></section>
            <section id="services"><SmartPrescriptionSection /></section>
            <WhyChooseUs />
            <section id="about"><AboutUs /></section>
            <section id="locations"><TravelClinic /></section>
            <DoctorTestimonial />
            <section id="vaccination"><VaccinationComponent /></section>
            <section id="faq"><FAQComponent /></section>
             <section id="blogs"><BlogSection /></section>
            {/*<section id="blogs"><BlogResources /></section>*/}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
