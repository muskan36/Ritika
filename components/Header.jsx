/*'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation"
import { useState } from 'react';
import { Phone, Mail, Search, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../public/assets/logo.webp';
import { useAuth } from "@/src/contexts/AuthContext"; // Import useAuth

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { user, isAuthenticated, logout } = useAuth(); 
  const router = useRouter();
  // Get auth context

  return (
    <>
      <header className="w-full bg-white shadow-sm px-6 py-5 flex justify-between items-center rounded-bl-3xl rounded-br-3xl z-50 relative font-instrument">
        {/* Left: Logo + Nav */
       /* <div className="flex items-center gap-16 pl-8">
          <Link href="/">
            <Image src={Logo} alt="Pharmacy Logo" width={90} height={30} className="object-contain" />
          </Link>

          <nav className="hidden lg:flex gap-10 text-sm font-medium text-black font-instrument">
            <a href="#home" className="hover:text-[#0B5C64]">Home</a>
            <a href="#services" className="hover:text-[#0B5C64]">Services</a>
            <a href="#vaccination" className="hover:text-[#0B5C64]">Book Vaccination</a>
            <Link href="/blog" className="hover:text-[#0B5C64]">Blogs</Link>
           {/* <button onClick={() => router.push('/blog')}> Contact Us</button>
            <a href="#locations" className="hover:text-[#0B5C64]">Locations</a>
            <a href="#about" className="hover:text-[#0B5C64]">About</a>
            <a href="#faq" className="hover:text-[#0B5C64]">Help</a>
          </nav>
        </div>

        {/* Right: Contact + Icons */
       /* <div className="flex items-center gap-6 pr-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="bg-[#037F91] p-2 rounded-full text-white">
              <Phone size={18} />
            </div>
            <div className="text-xs leading-4 text-black">
              <p className="font-bold">Phone Number</p>
              <p className="font-medium text-[#4C4C4C]">(650) 121-2132</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="bg-[#037F91] p-2 rounded-full text-white">
              <Mail size={18} />
            </div>
            <div className="text-xs leading-4 text-black">
              <p className="font-bold">Email Us Here</p>
              <p className="font-medium text-[#4C4C4C]">example@gmail.com</p>
            </div>
          </div>

          <div className="text-2xl text-black cursor-pointer">
            <Search />
          </div>

          {/* Logout button - only shown when authenticated and hidden on mobile */
        /*  {isAuthenticated && (
            <div 
              className="hidden md:flex text-2xl text-[#0B5C64] cursor-pointer hover:text-red-500 transition-colors"
              onClick={() => {
                logout();
                // Optional: Redirect to home page after logout
                window.location.href = "/";
              }}
              title="Logout"
            >
              <LogOut size={20} />
            </div>
          )}

          <div
            className="text-2xl text-[#0B5C64] cursor-pointer lg:hidden"
            onClick={toggleMenu}
          >
            {menuOpen ? <X /> : <Menu />}
          </div>
        </div>
      </header>

      {/* Mobile Slide Menu */
     /* <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[80%] bg-white shadow-lg z-40 flex flex-col gap-6 px-6 py-10 text-gray-800"
          >
            <Link href="/" onClick={toggleMenu}>Home</Link>
            <Link href="/services" onClick={toggleMenu}>Services</Link>
            <Link href="/book-vaccination" onClick={toggleMenu}>Book Vaccination</Link>
            <Link href="/blog" onClick={toggleMenu}>Blogs</Link>
            <Link href="/locations" onClick={toggleMenu}>Locations</Link>
            <Link href="/about" onClick={toggleMenu}>About</Link>
            <Link href="/help" onClick={toggleMenu}>Help</Link>
            
            {isAuthenticated && (
              <button 
                onClick={() => {
                  logout();
                  toggleMenu();
                  window.location.href = "/";
                }}
                className="text-red-500 flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;*/

/*'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from 'react';
import { Phone, Mail, Search, Menu, X, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../public/assets/logo.webp';
import { useAuth } from "@/src/contexts/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="w-full bg-white shadow-sm px-6 py-5 flex justify-between items-center rounded-bl-3xl rounded-br-3xl z-50 relative font-instrument">
        {/* Left: Logo + Nav 
        <div className="flex items-center gap-16 pl-8">
          <Link href="/">
            <Image src={Logo} alt="Pharmacy Logo" width={90} height={30} className="object-contain" />
          </Link>

          <nav className="hidden lg:flex gap-10 text-sm font-medium text-black font-instrument">
            <a href="#home" className="hover:text-[#0B5C64]">Home</a>
            <a href="#services" className="hover:text-[#0B5C64]">Services</a>
            <a href="#vaccination" className="hover:text-[#0B5C64]">Book Vaccination</a>
            <Link href="/blog" className="hover:text-[#0B5C64]">Blogs</Link>
            <a href="#locations" className="hover:text-[#0B5C64]">Locations</a>
            <a href="#about" className="hover:text-[#0B5C64]">About</a>
            <a href="#faq" className="hover:text-[#0B5C64]">Help</a>
          </nav>
        </div>

        {/* Right: Contact + Icons 
        <div className="flex items-center gap-6 pr-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="bg-[#037F91] p-2 rounded-full text-white">
              <Phone size={18} />
            </div>
            <div className="text-xs leading-4 text-black">
              <p className="font-bold">Phone Number</p>
              <p className="font-medium text-[#4C4C4C]">(650) 121-2132</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="bg-[#037F91] p-2 rounded-full text-white">
              <Mail size={18} />
            </div>
            <div className="text-xs leading-4 text-black">
              <p className="font-bold">Email Us Here</p>
              <p className="font-medium text-[#4C4C4C]">example@gmail.com</p>
            </div>
          </div>

          <div className="text-2xl text-black cursor-pointer">
            <Search />
          </div>

          {/* User dropdown - only shown when authenticated 
          {isAuthenticated && (
            <div className="hidden md:flex relative" ref={dropdownRef}>
              <button 
                className="flex items-center gap-2 text-[#0B5C64] hover:text-[#037F91] transition-colors"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <div className="bg-[#0B5C64] p-2 rounded-full text-white">
                  <User size={18} />
                </div>
                <span className="text-sm font-medium">
                  {user?.name || 'User'}
                </span>
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                  >
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      Signed in as <br/>
                      <span className="font-semibold">{user?.email || user?.name || 'User'}</span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        window.location.href = "/";
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div
            className="text-2xl text-[#0B5C64] cursor-pointer lg:hidden"
            onClick={toggleMenu}
          >
            {menuOpen ? <X /> : <Menu />}
          </div>
        </div>
      </header>

      {/* Mobile Slide Menu 
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[80%] bg-white shadow-lg z-40 flex flex-col gap-6 px-6 py-10 text-gray-800"
          >
            <Link href="/" onClick={toggleMenu}>Home</Link>
            <Link href="/services" onClick={toggleMenu}>Services</Link>
            <Link href="/book-vaccination" onClick={toggleMenu}>Book Vaccination</Link>
            <Link href="/blog" onClick={toggleMenu}>Blogs</Link>
            <Link href="/locations" onClick={toggleMenu}>Locations</Link>
            <Link href="/about" onClick={toggleMenu}>About</Link>
            <Link href="/help" onClick={toggleMenu}>Help</Link>
            
            {isAuthenticated && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">
                  Signed in as {user?.email || user?.name || 'User'}
                </div>
                <button 
                  onClick={() => {
                    logout();
                    toggleMenu();
                    window.location.href = "/";
                  }}
                  className="text-red-500 flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;*/

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from 'react';
import { Phone, Mail, Search, Menu, X, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../public/assets/logo.webp';
import { useAuth } from "@/src/contexts/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="w-full bg-white shadow-sm px-6 py-5 flex justify-between items-center rounded-bl-3xl rounded-br-3xl z-50 relative font-instrument">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-16 pl-8">
          <Link href="/">
            <Image src={Logo} alt="Pharmacy Logo" width={90} height={30} className="object-contain" />
          </Link>

          <nav className="hidden lg:flex gap-10 text-sm font-medium text-black font-instrument">
            <a href="#home" className="hover:text-[#0B5C64]">Home</a>
            <a href="#services" className="hover:text-[#0B5C64]">Services</a>
            <a href="#vaccination" className="hover:text-[#0B5C64]">Book Vaccination</a>
            <Link href="#blog" className="hover:text-[#0B5C64]">Blogs</Link>
            <a href="#locations" className="hover:text-[#0B5C64]">Locations</a>
            <a href="#about" className="hover:text-[#0B5C64]">About</a>
            <a href="#faq" className="hover:text-[#0B5C64]">Help</a>
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
              <p className="font-medium text-[#4C4C4C]">(650) 121-2132</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="bg-[#037F91] p-2 rounded-full text-white">
              <Mail size={18} />
            </div>
            <div className="text-xs leading-4 text-black">
              <p className="font-bold">Email Us Here</p>
              <p className="font-medium text-[#4C4C4C]">example@gmail.com</p>
            </div>
          </div>

          <div className="text-2xl text-black cursor-pointer">
            <Search />
          </div>

          {/* User dropdown - only shown when authenticated */}
          {isAuthenticated && (
            <div className="hidden md:flex relative" ref={dropdownRef}>
              <button 
                className="text-[#0B5C64] hover:text-[#037F91] transition-colors"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <div className="bg-[#0B5C64] p-2 rounded-full text-white">
                  <User size={18} />
                </div>
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                  >
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      Signed in as <br/>
                      <span className="font-semibold">{user?.email || user?.name || 'User'}</span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        window.location.href = "/";
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

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
            <Link href="/" onClick={toggleMenu}>Home</Link>
            <Link href="/services" onClick={toggleMenu}>Services</Link>
            <Link href="/book-vaccination" onClick={toggleMenu}>Book Vaccination</Link>
            <Link href="/blog" onClick={toggleMenu}>Blogs</Link>
            <Link href="/locations" onClick={toggleMenu}>Locations</Link>
            <Link href="/about" onClick={toggleMenu}>About</Link>
            <Link href="/help" onClick={toggleMenu}>Help</Link>
            
            {isAuthenticated && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">
                  Signed in as {user?.email || user?.name || 'User'}
                </div>
                <button 
                  onClick={() => {
                    logout();
                    toggleMenu();
                    window.location.href = "/";
                  }}
                  className="text-red-500 flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;