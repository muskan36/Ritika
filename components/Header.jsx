'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Phone,
  Mail,
  Search,
  Menu,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../public/assets/logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header className="w-full bg-white shadow-sm px-6 py-5 flex justify-between items-center rounded-bl-3xl rounded-br-3xl z-50 relative font-instrument" >

        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-16 pl-8">

          <Image
            src={Logo}
            alt="Pharmacy Logo"
            width={90}
            height={30}
            className="object-contain"
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-10 text-sm font-medium text-black font-instrument">
            <a href="#" className="hover:text-[#0B5C64]">Home</a>
            <a href="#" className="hover:text-[#0B5C64]">Services</a>
            <a href="#" className="hover:text-[#0B5C64]">Book Vaccination</a>
            <a href="#" className="hover:text-[#0B5C64]">Locations</a>
            <a href="#" className="hover:text-[#0B5C64]">About</a>
            <a href="#" className="hover:text-[#0B5C64]">Help</a>
          </nav>
        </div>

        {/* Right: Contact + Icons */}
        <div className="flex items-center gap-6 pr-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="bg-[#037F91] p-2 rounded-full text-white">
              <Phone size={18} />
            </div>
            <div className="text-xs leading-4 text-black">
              <p className="font-bold">Phone Number</p>
              <p className='font-medium text-[#4C4C4C]'>(650) 121-2132</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="bg-[#037F91] p-2 rounded-full text-white">
              <Mail size={18}  />
            </div>
            <div className="text-xs leading-4 text-black">
              <p className="font-bold">Email Us Here</p>
              <p className='font-medium text-[#4C4C4C]'>example@gmail.com</p>
            </div>
          </div>

          <div className="text-2xl text-black cursor-pointer">
            <Search />
          </div>

          <div
            className="text-2xl text-[#0B5C64] cursor-pointer lg:hidden"
            onClick={toggleMenu}
          >
            {menuOpen ? <X /> : <Menu />}
          </div>
        </div>
      </header>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[80%] bg-white shadow-lg z-40 flex flex-col gap-6 px-6 py-10 text-gray-800"
          >
            <a href="#" onClick={toggleMenu}>Home</a>
            <a href="#" onClick={toggleMenu}>Services</a>
            <a href="#" onClick={toggleMenu}>Book Vaccination</a>
            <a href="#" onClick={toggleMenu}>Locations</a>
            <a href="#" onClick={toggleMenu}>About</a>
            <a href="#" onClick={toggleMenu}>Help</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;  
