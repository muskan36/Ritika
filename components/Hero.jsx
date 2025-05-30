'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import StepComponent from "@/components/booking/booking-page";

const Hero = () => {

  const [index, setIndex] = useState(0);

  const bgImages = [
    '/assets/heroimage1.webp',
    '/assets/heroimage2.webp',
    '/assets/heroimage3.webp'
  ];

  const labels = ['Ear Microsuction', 'Travel Clinic', 'Weight Loss'];
  const [labelText, setlabelText] = useState('Appointment');

  const steps = {
    DATE: 1,
    TIME: 2,
    DETAILS: 3,
    VERIFICATION: 4,
  };

  const [currentStep, setCurrentStep] = useState(steps.DATE);


 
  const content = {
    0: {
      title: "Your Trusted Ear",
      subtitle: "Microsuction Clinic",
      description: "TravelSync provides professional ear care with microsuction, safely removing earwax with precision and care for optimal ear health."
    },
    1: {
      title: "Your Trusted Travel",
      subtitle: "Health Companion",
      description: "TravelSync helps you get the right vaccines, at the right time, for the right destination—personalized to your itinerary and health needs."
    },
    2: {
      title: "Your Trusted Weight",
      subtitle: "Loss Companion",
      description: "TravelSync supports your weight loss journey with personalized guidance, helping you reach your goals at the right pace, in the right way."
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-2 md:py-5 font-average">
      <div
        className="relative w-[95%] md:w-[97%] rounded-xl md:rounded-3xl overflow-hidden border border-gray-200 shadow-md bg-black"
        style={{ height: '90vh', minHeight: '700px', maxHeight: '1000px' }}
      >
        {/* Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={bgImages[index]}
              alt="Hero Background"
              fill
              className="object-cover object-[center_top]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/80 to-black/50 z-10" />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Content */}
        <div className="relative z-20 w-full h-full flex flex-col md:flex-row justify-center md:justify-between px-4 md:px-10 py-6 md:py-10 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex flex-col justify-end max-w-xl space-y-3 md:space-y-5 pb-4 md:pb-6"
            >
              <div className="flex justify-between items-center bg-white text-black rounded-lg w-[180px] md:w-[225px] p-1 shadow-md">
                <div className="px-3 md:px-4 py-1 md:py-2">
                  <p className="text-xs font-semibold text-[#434242] leading-tight">Patients Treated</p>
                  <p className="text-xs font-semibold text-[#434242] leading-tight">Till Date</p>
                </div>
                <div className="bg-[#F4A300] px-3 md:px-4 py-1 md:py-2 rounded-md flex flex-col justify-center items-center">
                  <span className="text-xl md:text-2xl font-bold leading-none">2</span>
                  <span className="text-xs font-semibold">Lakhs</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight font-average">
                {content[index].title}<br />
                {content[index].subtitle}
              </h1>

              <p className="text-sm md:text-base text-gray-100 font-light max-w-md font-average">
                {content[index].description}
              </p>
           <div>
             
                <Link href={{
               pathname: "/booking",
               query: { st: '1', service: 'Appointment' }, // dynamic label passed in URL
              }}
              as="/booking?st=1"
              className="bg-white text-black rounded-full px-3 py-2 flex items-center shadow hover:bg-gray-100 transition w-fit cursor-pointer"
              
            >
           <span className="pl-3 pr-4 text-sm font-semibold">Get An Appointment</span>
           <span className="bg-[#8DBBFF] p-1.5 rounded-full flex items-center justify-center">
           <ArrowRight size={14} className="text-white" />
        </span>
      </Link>
      </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Labels */}
          <div className="hidden md:flex flex-col justify-center gap-4 text-right">
            {labels.map((label, i) => {
              const isActive = i === index;
              return (
                <motion.div
                  key={label}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="flex items-center justify-end gap-3"
                >
                  <motion.span
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      opacity: isActive ? 1 : 0.6
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`text-lg ${isActive ? 'font-semibold text-white' : 'font-normal text-white/60'}`}
                  >
                    {label}
                  </motion.span>
                  <div className="h-0.5 bg-white w-16"></div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Indicators */}
          <div className="flex justify-center items-center md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex justify-center gap-2 mt-4">
              {labels.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/50'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
