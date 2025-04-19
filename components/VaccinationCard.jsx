"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function VaccinationCard({ vaccine, isHovered, onHoverStart, onHoverEnd }) {
  return (
    <Link href="/vaccines">
      <motion.div
        className={`bg-[${
          vaccine.featured
            ? "linear-gradient(180deg, rgba(242, 231, 227, 0.54) 0%, rgba(242, 231, 227, 1) 100%)"
            : vaccine.id.includes("japanese") || vaccine.id.includes("dtp") || vaccine.id.includes("hepatitisA2")
              ? "#f5f5f7"
              : "#e8f0fa"
        }] rounded-xl overflow-hidden relative h-[${vaccine.featured ? "280" : "260"}px] font-instrument`}
        style={
          vaccine.featured
            ? {
                background: "linear-gradient(180deg, rgba(242, 231, 227, 0.54) 0%, rgba(242, 231, 227, 1) 100%)",
              }
            : {}
        }
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        onHoverStart={() => onHoverStart(vaccine.id)}
        onHoverEnd={() => onHoverEnd()}
      >
        <div className={`p-${vaccine.featured ? "10" : "6"} flex flex-col h-full font-instrument`}>
          <div>
            <p
              className={`text-sm font-${vaccine.featured ? "bold" : "semibold"} text-[${vaccine.featured ? "#9A9897" : "#0D73A2"}]`}
            >
              {vaccine.type}
            </p>
            <h3
              className={`text-${vaccine.featured ? "3xl" : "2xl"} font-bold text-[${vaccine.featured ? "#9A9897" : "#7B8488"}] mt-1`}
            >
              {vaccine.name}
            </h3>
            <h4
              className={`text-${vaccine.featured ? "4xl" : "2xl"} font-bold text-[${vaccine.featured ? "#9A9897" : "#7B8488"}] ${!vaccine.featured && "mt-1"}`}
            >
              {vaccine.subText}
            </h4>
          </div>

          {vaccine.featured && (
            <div className="mt-6">
              <button className="bg-[#676564] text-white text-sm font-medium py-2 px-6 rounded-full hover:bg-gray-800 transition-colors">
                Explore Now
              </button>
            </div>
          )}

          <div
            className={`${vaccine.featured ? "absolute bottom-0 right-0 w-[250px] h-[250px]" : "flex-grow flex items-center justify-center"} ${!vaccine.featured && "mt-10"} overflow-hidden`}
          >
            <motion.div
              initial={{ y: vaccine.featured ? 12 : 0, scale: 1 }}
              animate={{
                y: isHovered ? (vaccine.featured ? -5 : -8) : vaccine.featured ? 12 : 0,
                scale: isHovered ? (vaccine.featured ? 1 : 1.15) : 1,
                rotate: isHovered && vaccine.id === "japanese" ? 5 : isHovered && vaccine.id === "dtp1" ? -5 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={vaccine.id === "hepatitisA2" ? { transformStyle: "preserve-3d" } : {}}
            >
              <Image
                src={vaccine.image || "/placeholder.svg"}
                alt={vaccine.name}
                width={vaccine.featured ? 250 : vaccine.id === "rabies" ? 180 : vaccine.id === "hepatitisA" ? 120 : 100}
                height={
                  vaccine.featured ? 250 : vaccine.id === "rabies" ? 200 : vaccine.id === "hepatitisA" ? 120 : 100
                }
                className={`object-contain ${vaccine.featured ? "w-full h-full relative top-22" : ""}`}
              />
            </motion.div>
          </div>

          {!vaccine.featured && (
            <div className="flex justify-center absolute bottom-0 w-full text-center mb-2">
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-1 w-32 inline-flex items-center justify-center shadow-sm"
                initial={{ scale: 1 }}
                animate={{
                  scale: isHovered ? [1, 1.1, 1] : 1,
                  transition: { repeat: isHovered ? Number.POSITIVE_INFINITY : 0, duration: 1 },
                }}
              >
                <span className="text-[#0D73A2] font-medium">${vaccine.price}</span>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  )
}
