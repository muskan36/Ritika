"use client"

import { useState, useEffect } from "react"
import BookingPage from "@/components/booking/booking-page"
import BookingLoading from "@/app/booking/loading"
import { useRouter } from "next/navigation"

export default function Booking() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [redirect, setRedirect] = useState(false)

  // Get cart items from localStorage on page load
  useEffect(() => {
    // Small delay to ensure the component is fully mounted
    const timer = setTimeout(() => {
      try {
        const savedCart = localStorage.getItem("vaccineCart")
        if (savedCart) {
          setCartItems(JSON.parse(savedCart))
        }
        setLoading(false)
      } catch (error) {
        console.error("Error parsing cart data:", error)
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading && (!cartItems || cartItems.length === 0)) {
      setRedirect(true)
      router.push("/vaccines")
    }
  }, [cartItems, loading, router])

  // Show loading state while retrieving data
  if (loading) {
    return <BookingLoading />
  }

  // If no cart items, redirect to vaccines page
  if (redirect) {
    return <BookingLoading />
  }

  return <BookingPage cartItems={cartItems} />
}
