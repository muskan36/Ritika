"use client";

import { motion } from "framer-motion";
import Head from 'next/head';
import Image from "next/image";

const bgStyle = {
    backgroundImage: `url(/assets/hero.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    width:'100%',
}

/*export default function BlogResources() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Why IDYLLL is the Best Cafe in Indiranagar for Brunch</title>
        <meta name="description" content="Discover why IDYLLL stands out as the best brunch spot in Indiranagar" />
      </Head>

      {/* Hero Section 
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-96 w-full"
      >
      <div>
        <Image 
          src="/hospital.jpg"
          alt="Bishops Waltham Hospital"
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-75"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        </div>
      { /* <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            Bishops Waltham 
          </h1>
        </div>
      </motion.div>

      {/* Content Section *
      <main className="max-w-4xl mx-auto px-4 py-12">    
        <article className="prose prose-lg max-w-none">
         <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4 py-12">
            Bishops Waltham 
          </h1>
        </div>
          <div className="text-lg text-gray-700 leading-relaxed space-y-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}*/

export default function BlogPost() {
  return (
    <div>
   <div className='container my-16 max-w-7xl mx-auto bg-gray-100 shadow-xl'>
        <div className=' max-w-7xl mx-auto px-8 py-8 grid grid-row-1 '>
    {/*<div className="max-w-7xl mx-auto px-8 py-8  bg-gray-100">*/}
    
   {/*   <Head>
        <title>Why IDYLLL is the Best Cafe in Indiranagar for Brunch</title>
        <meta name="description" content="Discover why IDYLLL stands out as the best brunch spot in Indiranagar with its vibrant atmosphere and unique offerings." />
      </Head>*/}

      <article className="prose lg:prose-xl">
      
        
        {/* Featured Image */}
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src="/hospital.jpg" // Replace with your actual image path
            alt="IDYLLL Cafe in Indiranagar - Brunch Spot"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
        </div>
        <h1 className="text-5xl font-bold mb-6 justify-center">Blog Page of Bishops waltham</h1>
        <p className="text-lg leading-relaxed mb-6">
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h1 className="text-3xl font-bold mb-3 justify-center">Blog Page of Bishops waltham</h1>
        <p className="text-lg leading-relaxed mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h1 className="text-3xl font-bold mb-3 justify-center">Blog Page of Bishops waltham</h1>
        <p className="text-lg leading-relaxed mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h1 className="text-3xl font-bold mb-3 justify-center">Blog Page of Bishops waltham</h1>
        <p className="text-lg leading-relaxed mb-6">
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h1 className="text-3xl font-bold mb-3 justify-center">Blog Page of Bishops waltham</h1>
        <p className="text-lg leading-relaxed mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h1 className="text-3xl font-bold mb-3 justify-center">Blog Page of Bishops waltham</h1>
        <p className="text-lg leading-relaxed mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </article>
      </div>
      
      
    </div>
    <div style={bgStyle}>
        
    </div>
    </div>
  );
}