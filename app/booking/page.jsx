"use client"

import { useState, useEffect } from "react"
import BookingPage from "@/components/booking/booking-page"
import BookingLoading from "@/app/booking/loading"
import { useRouter } from "next/navigation"
import { useCart } from "@/src/contexts/index"

export default function Booking() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [redirect, setRedirect] = useState(false)
  const { cart, loading: cartLoading } = useCart()

  useEffect(() => {
    // Small delay to ensure the component is fully mounted
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Check if we're in the booking confirmation process
    const inBookingProcess = typeof window !== 'undefined' && 
      (sessionStorage.getItem("in_booking_process") === "true" || 
       localStorage.getItem("booking_success") === "true");

    // Only redirect if cart is empty AND we're not in booking confirmation
    if (!loading && !cartLoading && cart.length === 0 && !inBookingProcess) {
      console.log("No items in cart and not in booking process. Redirecting to vaccines page.");
      setRedirect(true);
      router.push("/vaccines");
    }
  }, [cart, loading, cartLoading, router]);

  // Show loading state while retrieving data
  if (loading || cartLoading) {
    return <BookingLoading />
  }

  // If no cart items and not in confirmation, redirect to vaccines page
  if (redirect) {
    return <BookingLoading />
  }

  // Set flag that we're in booking process
  if (typeof window !== 'undefined') {
    sessionStorage.setItem("in_booking_process", "true");
  }

  return <BookingPage cartItems={cart} />
}
