"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, ChevronLeft, Plus, Check, Minus } from "lucide-react"
import { useRouter } from "next/navigation"
import { fetchVaccines, fetchSlotsForDay } from "@/lib/utils"  // Import fetchSlotsForDay
import { useCart } from "@/src/contexts/index"

export default function VaccinesPage() {
    const [vaccines, setVaccines] = useState([])
    const [loading, setLoading] = useState(true)
    const [hoveredCard, setHoveredCard] = useState(null)
    const [bookingLoading, setBookingLoading] = useState(false)  // New state for booking button loading
    const router = useRouter()
    
    // Use the cart context instead of local state
    const { 
        cart, 
        addToCart, 
        removeFromCart, 
        increaseQuantity, 
        decreaseQuantity,
        subtotal,
        tax,
        grandTotal
    } = useCart()

    useEffect(() => {
        window.scrollTo(0, 0) 

        async function loadVaccines() {
            try {
                const vaccineData = await fetchVaccines()
                setVaccines(vaccineData)
               
        //const result = await callApi('some-endpoint', { param: 'value' });
            } catch (error) {
                console.error("Failed to load vaccines:", error)
            } finally {
                setLoading(false)
            }
        }

        loadVaccines()
    
    }, [])


    const handleBooking = async () => {
        if (cart.length > 0) {
            setBookingLoading(true)
            try {
                // Prefetch slots for today's date
                const today = new Date()
                const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
                
                const slotsResult = await fetchSlotsForDay(formattedDate)
                
                // Store the prefetched slots in localStorage for the booking page to use
                if (slotsResult.success && slotsResult.data) {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('prefetchedSlots', JSON.stringify({
                            date: formattedDate,
                            slotsData: slotsResult.data,
                            timestamp: new Date().getTime()
                        }))
                    }
                }
                
                // Navigate to booking page
                router.push('/booking')
            } catch (error) {
                console.error("Failed to prefetch slots:", error)
                // Still navigate to booking page even if prefetch fails
                router.push('/booking')
            } finally {
                setBookingLoading(false)
            }
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0D73A2]"></div>
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white font-average">
            <div className="flex-1 p-6 md:p-10">
                <div className="max-w-full mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div className="w-full">
                            <Link href="/" className="text-gray-500 hover:text-[#0D73A2] flex items-center mb-4">
                                <ChevronLeft className="w-4 h-4 mr-1" />
                                Back to Home
                            </Link>
                            <div className="text-center">
                                <div className="inline-block py-2 mb-2">
                                    <p className="text-xs tracking-wide uppercase font-medium bg-gradient-to-r from-[#4A9CEE] via-[#E18180] to-[#EE872A] text-transparent bg-clip-text">
                                        Best VACCINES FOR YOU
                                    </p>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-[#0D73A2]">Select Vaccine</h1>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vaccines.map((vaccine, index) => (
                            <motion.div
                                key={index}
                                className={`${vaccine.status === "Available" ? "bg-[#f0f4f9]" : "bg-gray-100"} rounded-xl overflow-hidden relative h-[240px] shadow-sm border border-gray-100`}
                                whileHover={{
                                    scale: vaccine.status === "Available" ? 1.02 : 1,
                                    boxShadow: vaccine.status === "Available" ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" : "none",
                                    transition: { duration: 0.2 },
                                }}
                                onHoverStart={() => setHoveredCard(vaccine.name)}
                                onHoverEnd={() => setHoveredCard(null)}
                            >
                                <div className="p-6 flex flex-col h-full">
                                    <div>
                                        <p className="text-sm font-semibold text-[#0D73A2]">Injection</p>
                                        <h3 className="text-xl font-bold text-[#7B8488] mt-1">{vaccine.name}</h3>
                                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{vaccine.compositions} - {vaccine.description}</p>
                                    </div>
                                    <div className="flex-grow flex items-center justify-center">
                                        <motion.div
                                            initial={{ y: 0, scale: 1 }}
                                            animate={{
                                                y: hoveredCard === vaccine.name && vaccine.status === "Available" ? -8 : 0,
                                                scale: hoveredCard === vaccine.name && vaccine.status === "Available" ? 1.1 : 1,
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <Image
                                                src={vaccine.pictureUrl || "/assets/bv3.webp"}
                                                alt={vaccine.name}
                                                width={80}
                                                height={80}
                                                className="object-contain"
                                                onError={(e) => {
                                                    e.target.src = "/assets/bv3.webp"
                                                }}
                                            />
                                        </motion.div>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${vaccine.status === "Available"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}>
                                            {vaccine.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center absolute bottom-0 left-0 right-0 px-6 py-3">
                                        <span className="text-[#0D73A2] font-medium">€{vaccine.price}</span>
                                        {vaccine.status === "Available" ? (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${cart.some((item) => item.name === vaccine.name)
                                                        ? "bg-green-500 text-white"
                                                        : "bg-[#0D73A2] text-white"
                                                    }`}
                                                onClick={() => addToCart(vaccine)}
                                            >
                                                {cart.some((item) => item.name === vaccine.name) ? (
                                                    <>
                                                        <Check className="w-3 h-3" /> Added
                                                    </>
                                                ) : (
                                                    <>
                                                        <Plus className="w-3 h-3" /> Add to Cart
                                                    </>
                                                )}
                                            </motion.button>
                                        ) : (
                                            <span className="text-xs text-gray-500 font-medium">Currently Unavailable</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full md:w-80 lg:w-96 bg-gray-50 p-6 border-l border-gray-200">
                <div className="sticky top-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center">
                            <ShoppingCart className="w-5 h-5 mr-2 text-[#0D73A2]" />
                            Vaccine Cart
                        </h2>
                        {cart.length > 0 && (
                            <span className="bg-[#0D73A2] text-white text-xs font-medium px-2 py-1 rounded-full">
                                {cart.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        )}
                    </div>

                    {cart.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                                <ShoppingCart className="w-full h-full" />
                            </div>
                            <p className="text-gray-500">Your cart is empty</p>
                            <p className="text-gray-400 text-sm mt-1">Add vaccines to proceed</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                                {cart.map((item, index) => (
                                    <div key={index} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                                        <div className="w-12 h-12 relative mr-3 flex-shrink-0 bg-[#f0f4f9] rounded-md p-1">
                                            <Image
                                                src={item.pictureUrl || "/assets/bv3.webp"}
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                                onError={(e) => {
                                                    e.target.src = "/assets/bv3.webp"
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <p className="text-xs text-[#0D73A2] font-medium">{item.compositions}</p>
                                                    <p className="text-sm font-medium">{item.name}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                                                    <button
                                                        onClick={() => removeFromCart(item.name)}
                                                        className="text-xs text-red-500 hover:text-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border border-gray-200 rounded-md">
                                                    <button
                                                        onClick={() => decreaseQuantity(item.name)}
                                                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => increaseQuantity(item.name)}
                                                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-gray-500">€{item.price} each</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} items):</span>
                                        <span className="font-medium">€{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax (5%):</span>
                                        <span className="font-medium">€{tax.toFixed(2)}</span>
                                    </div>
                                    <div className="h-px bg-gray-200 my-2"></div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Total:</span>
                                        <span className="font-bold text-[#0D73A2]">€{grandTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-[#0D73A2] text-white font-medium py-3 rounded-lg mt-6 flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    disabled={cart.length === 0 || bookingLoading}
                                    onClick={handleBooking}
                                    
                                >
                                    {bookingLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Preparing Booking...
                                        </>
                                    ) : (
                                        "Proceed to Booking"
                                    )}
                                </motion.button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}