"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { fetchVaccines } from "@/lib/utils"

// Keep initial placeholder data for loading state
const initialVaccineData = [
  {
    id: "explore",
    type: "Injection",
    name: "Explore All",
    subText: "Vaccine",
    image: "/assets/bv1.webp",
    price: null,
    featured: true,
  },
  {
    id: "rabies",
    type: "Injection",
    name: "Rabies –",
    subText: "vaccination",
    image: "/assets/bv2.webp",
    price: 200,
  },
  {
    id: "hepatitisA",
    type: "Injection",
    name: "Hepatitis A –",
    subText: "vaccination",
    image: "/assets/bv3.webp",
    price: 200,
  },
  
]

export default function VaccinationComponent() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [apiVaccines, setApiVaccines] = useState([])
  const [loading, setLoading] = useState(true)

  // Memoize the hover handlers
  const handleHoverStart = useCallback((id) => {
    setHoveredCard(id)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setHoveredCard(null)
  }, [])

  useEffect(() => {
    async function loadVaccines() {
      try {
        // Fetch only available vaccines directly from the API
        const vaccineList = await fetchVaccines("Available");
        // Take just 6 vaccines for display (or fewer if there aren't 6 available)
        setApiVaccines(vaccineList.slice(0, 6));
      } catch (error) {
        console.error("Failed to load vaccines:", error);
      } finally {
        setLoading(false);
      }
    }

    loadVaccines();
  }, []);

  // Transform API vaccines to the format expected by the UI
  const transformedVaccines = [
    initialVaccineData[0], // Keep the "Explore All" card
    ...apiVaccines.map((vaccine, index) => ({
      id: `api-${index}`,
      type: "Injection",
      name: vaccine.name,
      subText: vaccine.compositions,
      image: vaccine.pictureUrl || `/assets/bv${(index % 5) + 2}.webp`, // Fallback to local images
      price: vaccine.price,
      vaccineID: vaccine.vaccineID, // Include the vaccine ID
      _original: vaccine._original || vaccine // Preserve original API data
    }))
  ]

  // Use transformed API data if available, otherwise use initial data
  const vaccineData = apiVaccines.length > 0 ? transformedVaccines : initialVaccineData

  return (
    <div className="max-w-full w-[85%] mx-auto px-4 py-8 bg-white mt-10 ">
      <div className="text-center mb-8 font-average">
        <div className="inline-block border border-[#F2F2F2] rounded-full px-6 py-2 mb-4">
          <p className="text-xs tracking-wide uppercase font-medium bg-gradient-to-r from-[#4A9CEE] via-[#E18180] to-[#EE872A] text-transparent bg-clip-text">Best VACCINES FOR YOU</p>
        </div>
        <h1 className="text-4xl  text-black mt-2 ">Stay Safe with Pre-Vaccinations</h1>
        <h1 className="text-4xl  text-[#004488] mt-1">Health Vaccinations</h1>
        <p className="max-w-2xl mx-auto mt-4 text-[#575757] text-sm">
          Planning a trip? Protect your health! Our pre-travel services offer vaccinations, expert advice, and tailored
          recommendations. Travel confidently—book your consultation today!
        </p>
      </div>

      {/* First row - 3 cards (1 large, 2 regular) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5 font-instrument">
        {/* Featured card (Explore All) - spans 6 columns */}
        <div className="md:col-span-6">
          <Link href="/vaccines" className="block h-full">
            <motion.div
              className="rounded-xl overflow-hidden relative h-[280px] font-instrument cursor-pointer w-full h-full"
              style={{
                background: "linear-gradient(180deg, rgba(242, 231, 227, 0.54) 0%, rgba(242, 231, 227, 1) 100%)",
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              onHoverStart={() => handleHoverStart("explore")}
              onHoverEnd={handleHoverEnd}
            >
              <div className="p-10 flex flex-col h-full font-instrument">
                <div>
                  <p className="text-sm font-bold text-[#9A9897]">{vaccineData[0].type}</p>
                  <h3 className="text-3xl font-bold text-[#9A9897] mt-1">{vaccineData[0].name}</h3>
                  <h4 className="text-4xl font-bold text-[#9A9897] mt-1">{vaccineData[0].subText}</h4>
                </div>

                <div className="mt-6">
                  <button className="bg-[#676564] text-white text-sm font-medium py-2 px-6 rounded-full hover:bg-gray-800 transition-colors">
                    Explore Now
                  </button>
                </div>

                {/* Image with fixed card height */}
                <div className="absolute bottom-0 right-0 w-[250px] h-[250px] overflow-hidden">
                  <motion.div
                    initial={{ y: 12 }}
                    animate={{ y: hoveredCard === "explore" ? -5 : 12 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={vaccineData[0].image || "/placeholder.svg"}
                      alt="Vaccine"
                      width={250}
                      height={250}
                      className="object-contain w-full h-full relative top-22"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* First regular card - spans 3 columns */}
        {vaccineData.length > 1 && (
          <div className="md:col-span-3">
            <Link href="/vaccines" className="block h-full">
              <motion.div
                className="bg-[#e8f0fa] rounded-xl overflow-hidden relative h-[280px] font-instrument cursor-pointer w-full h-full"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                onHoverStart={() => handleHoverStart(vaccineData[1].id)}
                onHoverEnd={handleHoverEnd}
              >
                <div className="p-6 flex flex-col h-full font-instrument">
                  <div>
                    <p className="text-sm font-semibold text-[#0D73A2]">{vaccineData[1].type}</p>
                    <h3  className="text-2xl font-bold text-[#7B8488] mt-1">{vaccineData[1].name}</h3>
                    <h3 className="text-2xl font-bold text-[#7B8488]">{vaccineData[1].subText}</h3>
                  </div>

                  <div className="flex-grow flex items-center justify-center mt-10">
                    <motion.div
                      initial={{ y: 0, scale: 1 }}
                      animate={{
                        y: hoveredCard === vaccineData[1].id ? -10 : 0,
                        scale: hoveredCard === vaccineData[1].id ? 1.1 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Image
                        src={vaccineData[1].image || "/assets/bv2.webp"}
                        alt={vaccineData[1].name}
                        width={180}
                        height={200}
                        className="object-contain"
                        onError={(e) => {
                          e.target.src = "/assets/bv2.webp"; // Fallback image
                        }}
                      />
                    </motion.div>
                  </div>

                  <div className="flex justify-center absolute bottom-0 w-full text-center mb-2">
                    <motion.div
                      className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-1 w-32 inline-flex items-center justify-center shadow-sm"
                      initial={{ scale: 1 }}
                      animate={{
                        scale: hoveredCard === vaccineData[1].id ? [1, 1.1, 1] : 1,
                        transition: { repeat: hoveredCard === vaccineData[1].id ? Number.POSITIVE_INFINITY : 0, duration: 1 },
                      }}
                    >
                      <span className="text-[#0D73A2] font-medium">${vaccineData[1].price}</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        )}

        {/* Second regular card - spans 3 columns */}
        {vaccineData.length > 2 && (
          <div className="md:col-span-3">
            <Link href="/vaccines" className="block h-full">
              <motion.div
                className="bg-[#e8f0fa] rounded-xl overflow-hidden relative h-[280px] font-instrument cursor-pointer w-full h-full"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                onHoverStart={() => handleHoverStart(vaccineData[2].id)}
                onHoverEnd={handleHoverEnd}
              >
                <div className="p-6 flex flex-col h-full font-instrument">
                  <div>
                    <p className="text-sm font-semibold text-[#0D73A2]">{vaccineData[2].type}</p>
                    <h3  className="text-2xl font-bold text-[#7B8488] mt-1">{vaccineData[2].name}</h3>
                    <h3 className="text-2xl font-bold text-[#7B8488]">{vaccineData[2].subText}</h3>
                  </div>

                  <div className="flex-grow flex items-center justify-center ">
                    <motion.div
                      initial={{ y: 0, scale: 1 }}
                      animate={{
                        y: hoveredCard === vaccineData[2].id ? -10 : 0,
                        scale: hoveredCard === vaccineData[2].id ? 1.1 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Image
                        src={vaccineData[2].image || "/assets/bv3.webp"}
                        alt={vaccineData[2].name}
                        width={120}
                        height={120}
                        className="object-contain"
                        onError={(e) => {
                          e.target.src = "/assets/bv3.webp"; // Fallback image
                        }}
                      />
                    </motion.div>
                  </div>

                  <div className="flex justify-center absolute bottom-0 w-full text-center mb-2">
                    <motion.div
                      className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-1 w-32 inline-flex items-center justify-center shadow-sm"
                      initial={{ scale: 1 }}
                      animate={{
                        scale: hoveredCard === vaccineData[2].id ? [1, 1.1, 1] : 1,
                        transition: { repeat: hoveredCard === vaccineData[2].id ? Number.POSITIVE_INFINITY : 0, duration: 1 },
                      }}
                    >
                      <span className="text-[#0D73A2] font-medium">${vaccineData[2].price}</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        )}
      </div>

      {/* Second row - 4 equal cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Render cards for indices 3-6 if they exist */}
        {vaccineData.slice(3, 7).map((vaccine, idx) => (
          <Link key={vaccine.id || idx} href="/vaccines">
            <motion.div
              className={`${idx % 2 === 0 ? "bg-[#f5f5f7]" : "bg-[#e8f0fa]"} rounded-xl overflow-hidden relative h-[260px] shadow-sm`}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              onHoverStart={() => handleHoverStart(vaccine.id)}
              onHoverEnd={handleHoverEnd}
            >
              <div className="p-6 flex flex-col h-full">
                <div>
                  <p className="text-sm font-semibold text-[#0D73A2]">{vaccine.type}</p>
                  <h3 className="text-xl font-bold text-[#7B8488] mt-1">{vaccine.name}</h3>
                  <p className="text-xl font-bold text-[#7B8488]">{vaccine.subText}</p>
                </div>

                <div className="flex-grow flex items-center justify-center">
                  <motion.div
                    initial={{ y: 0, scale: 1 }}
                    animate={{
                      y: hoveredCard === vaccine.id ? -10 : 0,
                      scale: hoveredCard === vaccine.id ? 1.1 : 1,
                      rotate: hoveredCard === vaccine.id && idx === 1 ? 5 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={vaccine.image || `/assets/bv${(idx % 4) + 2}.webp`}
                      alt={vaccine.name}
                      width={120}
                      height={120}
                      className="object-contain"
                      onError={(e) => {
                        e.target.src = `/assets/bv${(idx % 4) + 2}.webp`; // Fallback image
                      }}
                    />
                  </motion.div>
                </div>

                <div className="flex justify-center absolute bottom-0 w-full text-center mb-2">
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-1 w-32 inline-flex items-center justify-center shadow-sm"
                    initial={{ scale: 1 }}
                    animate={{
                      scale: hoveredCard === vaccine.id ? [1, 1.1, 1] : 1,
                      transition: { repeat: hoveredCard === vaccine.id ? Number.POSITIVE_INFINITY : 0, duration: 1 },
                    }}
                  >
                    <span className="text-[#0D73A2] font-medium">${vaccine.price}</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}