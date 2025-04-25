"use client"

import Image from "next/image"

export default function BookingLoading() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/assets/booknow.webp" 
          alt="Mountain landscape" 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Loading UI */}
      <div className="relative z-10 bg-white p-12 rounded-lg shadow-xl flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00ACC1] mb-6"></div>
        <h2 className="text-xl font-bold text-[#0D73A2]">Loading your booking</h2>
        <p className="text-gray-600 mt-2">Please wait...</p>
      </div>
    </div>
  )
}