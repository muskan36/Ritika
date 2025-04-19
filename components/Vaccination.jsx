"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const vaccineData = [
  {
    id: "explore",
    type: "Injection",
    name: "Explore All",
    subText: "Vaccine",
    image: "/assets/bv1.png",
    price: null,
    featured: true,
  },
  {
    id: "rabies",
    type: "Injection",
    name: "Rabies –",
    subText: "vaccination",
    image: "/assets/bv2.png",
    price: 200,
  },
  {
    id: "hepatitisA",
    type: "Injection",
    name: "Hepatitis A –",
    subText: "vaccination",
    image: "/assets/bv3.png",
    price: 200,
  },
  {
    id: "japanese",
    type: "Injection",
    name: "Japanese –",
    subText: "Encephalitis",
    image: "/assets/bv5.png",
    price: 200,
  },
  {
    id: "dtp1",
    type: "Injection",
    name: "DTP –",
    subText: "vaccination",
    image: "/assets/bv3.png",
    price: 200,
  },
  {
    id: "hepatitisA2",
    type: "Injection",
    name: "Hepatitis A –",
    subText: "vaccination",
    image: "/assets/bv6.png",
    price: 200,
  },
  {
    id: "dtp2",
    type: "Injection",
    name: "DTP –",
    subText: "vaccination",
    image: "/assets/bv4.png",
    price: 200,
  },
]

export default function VaccinationComponent() {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div className="max-w-full w-[85%] mx-auto px-4 py-10 bg-white mt-10 ">
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
          <Link href="/" className="block h-full">
            <motion.div
              className="rounded-xl overflow-hidden relative h-[280px] font-instrument cursor-pointer w-full h-full"
              style={{
                background: "linear-gradient(180deg, rgba(242, 231, 227, 0.54) 0%, rgba(242, 231, 227, 1) 100%)",
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              onHoverStart={() => setHoveredCard("explore")}
              onHoverEnd={() => setHoveredCard(null)}
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

        {/* Rabies card - spans 3 columns */}
        <div className="md:col-span-3">
          <Link href="/vaccines" className="block h-full">
            <motion.div
              className="bg-[#e8f0fa] rounded-xl overflow-hidden relative h-[280px] font-instrument cursor-pointer w-full h-full"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              onHoverStart={() => setHoveredCard("rabies")}
              onHoverEnd={() => setHoveredCard(null)}
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
                      y: hoveredCard === "rabies" ? -10 : 0,
                      scale: hoveredCard === "rabies" ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={vaccineData[1].image || "/placeholder.svg"}
                      alt="Rabies Vaccine"
                      width={180}
                      height={200}
                      className="object-contain"
                    />
                  </motion.div>
                </div>

                <div className="flex justify-center absolute bottom-0 w-full text-center mb-2">
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-1 w-32 inline-flex items-center justify-center shadow-sm"
                    initial={{ scale: 1 }}
                    animate={{
                      scale: hoveredCard === "rabies" ? [1, 1.1, 1] : 1,
                      transition: { repeat: hoveredCard === "rabies" ? Number.POSITIVE_INFINITY : 0, duration: 1 },
                    }}
                  >
                    <span className="text-[#0D73A2] font-medium">${vaccineData[1].price}</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Hepatitis A card - spans 3 columns */}
        <div className="md:col-span-3">
          <Link href="/vaccines" className="block h-full">
            <motion.div
              className="bg-[#e8f0fa] rounded-xl overflow-hidden relative h-[280px] font-instrument cursor-pointer w-full h-full"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              onHoverStart={() => setHoveredCard("hepatitisA")}
              onHoverEnd={() => setHoveredCard(null)}
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
                      y: hoveredCard === "hepatitisA" ? -10 : 0,
                      scale: hoveredCard === "hepatitisA" ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={vaccineData[2].image || "/placeholder.svg"}
                      alt="Hepatitis A Vaccine"
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </motion.div>
                </div>

                <div className="flex justify-center absolute bottom-0 w-full text-center mb-2">
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-1 w-32 inline-flex items-center justify-center shadow-sm"
                    initial={{ scale: 1 }}
                    animate={{
                      scale: hoveredCard === "hepatitisA" ? [1, 1.1, 1] : 1,
                      transition: { repeat: hoveredCard === "hepatitisA" ? Number.POSITIVE_INFINITY : 0, duration: 1 },
                    }}
                  >
                    <span className="text-[#0D73A2] font-medium">${vaccineData[2].price}</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Second row - 4 equal cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Japanese Encephalitis card */}
        <Link href="/vaccines">
          <motion.div
            className="bg-[#f5f5f7] rounded-xl overflow-hidden relative h-[260px] cursor-pointer"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            onHoverStart={() => setHoveredCard("japanese")}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="p-6 flex flex-col h-full font-instrument">
              <div>
                <p className="text-sm font-semibold text-[#0D73A2]">{vaccineData[3].type}</p>
                <h3  className="text-2xl font-bold text-[#7B8488] mt-1">{vaccineData[3].name}</h3>
                <p className="text-2xl font-bold text-[#7B8488]">{vaccineData[3].subText}</p>
              </div>

              <div className="flex-grow flex items-center justify-center">
                <motion.div
                  initial={{ y: 0, scale: 1, rotate: 0 }}
                  animate={{
                    y: hoveredCard === "japanese" ? -8 : 0,
                    scale: hoveredCard === "japanese" ? 1.15 : 1,
                    rotate: hoveredCard === "japanese" ? 5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={vaccineData[3].image || "/placeholder.svg"}
                    alt="Japanese Encephalitis Vaccine"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </motion.div>
              </div>

              <div className="flex justify-center absolute bottom-0 w-full text-center mb-2">
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-1 w-32 inline-flex items-center justify-center shadow-sm"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: hoveredCard === "japanese" ? [1, 1.1, 1] : 1,
                    transition: { repeat: hoveredCard === "japanese" ? Number.POSITIVE_INFINITY : 0, duration: 1 },
                  }}
                >
                  <span className="text-[#0D73A2] font-medium">${vaccineData[3].price}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* DTP card 1 */}
        <Link href="/vaccines">
          <motion.div
            className="bg-[#f5f5f7] rounded-xl overflow-hidden relative h-[260px] cursor-pointer"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            onHoverStart={() => setHoveredCard("dtp1")}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="p-6 flex flex-col h-full font-instrument">
              <div>
                <p className="text-sm font-semibold text-[#0D73A2]">{vaccineData[4].type}</p>
                <h3  className="text-2xl font-bold text-[#7B8488] mt-1">{vaccineData[4].name}</h3>
                <p className="text-2xl font-bold text-[#7B8488]">{vaccineData[4].subText}</p>
              </div>

              <div className="flex-grow flex items-center justify-center">
                <motion.div
                  initial={{ y: 0, scale: 1, rotate: 0 }}
                  animate={{
                    y: hoveredCard === "dtp1" ? -8 : 0,
                    scale: hoveredCard === "dtp1" ? 1.15 : 1,
                    rotate: hoveredCard === "dtp1" ? -5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={vaccineData[4].image || "/placeholder.svg"}
                    alt="DTP Vaccine"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </motion.div>
              </div>

              <div className="flex justify-center absolute bottom-0 w-full text-center mb-2">
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-1 w-32 inline-flex items-center justify-center shadow-sm"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: hoveredCard === "dtp1" ? [1, 1.1, 1] : 1,
                    transition: { repeat: hoveredCard === "dtp1" ? Number.POSITIVE_INFINITY : 0, duration: 1 },
                  }}
                >
                  <span className="text-[#0D73A2] font-medium">${vaccineData[4].price}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Hepatitis A card 2 */}
        <Link href="/vaccines">
          <motion.div
            className="bg-[#f5f5f7] rounded-xl overflow-hidden relative h-[260px] cursor-pointer"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            onHoverStart={() => setHoveredCard("hepatitisA2")}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="p-6 flex flex-col h-full font-instrument">
              <div>
                <p className="text-sm font-semibold text-[#0D73A2]">{vaccineData[5].type}</p>
                <h3  className="text-2xl font-bold text-[#7B8488] mt-1">{vaccineData[5].name}</h3>
                <p className="text-2xl font-bold text-[#7B8488]">{vaccineData[5].subText}</p>
              </div>

              <div className="flex-grow flex items-center justify-center">
                <motion.div
                  initial={{ y: 0, scale: 1, z: 0 }}
                  animate={{
                    y: hoveredCard === "hepatitisA2" ? -8 : 0,
                    scale: hoveredCard === "hepatitisA2" ? 1.15 : 1,
                    z: hoveredCard === "hepatitisA2" ? 20 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Image
                    src={vaccineData[5].image || "/placeholder.svg"}
                    alt="Hepatitis A Vaccine"
                    width={75}
                    height={75}
                    className="object-contain"
                  />
                </motion.div>
              </div>

              <div className="flex justify-center absolute bottom-0 w-full text-center mb-2">
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-1 w-32 inline-flex items-center justify-center shadow-sm"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: hoveredCard === "hepatitisA2" ? [1, 1.1, 1] : 1,
                    transition: { repeat: hoveredCard === "hepatitisA2" ? Number.POSITIVE_INFINITY : 0, duration: 1 },
                  }}
                >
                  <span className="text-[#0D73A2] font-medium">${vaccineData[5].price}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* DTP card 2 */}
        <Link href="/vaccines">
          <motion.div
            className="bg-[#f5f5f7] rounded-xl overflow-hidden relative h-[260px] cursor-pointer"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            onHoverStart={() => setHoveredCard("dtp2")}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div className="p-6 flex flex-col h-full">
              <div>
                <p className="text-sm font-semibold text-[#0D73A2]">{vaccineData[6].type}</p>
                <h3  className="text-2xl font-bold text-[#7B8488] mt-1">{vaccineData[6].name}</h3>
                <p className="text-2xl font-bold text-[#7B8488]">{vaccineData[6].subText}</p>
              </div>

              <div className="flex-grow flex items-center justify-center">
                <motion.div
                  initial={{ y: 0, scale: 1 }}
                  animate={{
                    y: hoveredCard === "dtp2" ? -8 : 0,
                    scale: hoveredCard === "dtp2" ? 1.15 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    scale: { duration: 0.2 },
                  }}
                >
                  <Image
                    src={vaccineData[6].image || "/placeholder.svg"}
                    alt="DTP Vaccine"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </motion.div>
              </div>

              <div className="flex justify-center absolute bottom-0 w-full text-center mb-2">
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-1 w-32 inline-flex items-center justify-center shadow-sm"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: hoveredCard === "dtp2" ? [1, 1.1, 1] : 1,
                    transition: { repeat: hoveredCard === "dtp2" ? Number.POSITIVE_INFINITY : 0, duration: 1 },
                  }}
                >
                  <span className="text-[#0D73A2] font-medium">${vaccineData[6].price}</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}