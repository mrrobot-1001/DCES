// src/pages/HomePage.js
import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 items-center justify-center px-4">

      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins text-white mb-4 text-center drop-shadow-lg">
        Welcome to the DCES
      </h2>
      <p className="text-lg sm:text-xl md:text-2xl text-white text-center max-w-2xl mb-8 font-roboto">
        Your gateway to an efficient and organized entry system for Disha College. Scan QR codes and manage student data with ease!
      </p>
    </div>
  );
};

export default HomePage;
