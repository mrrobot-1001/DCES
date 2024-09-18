// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          Student QR System
        </h1>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink 
            to="/scan" 
            className="text-white hover:text-gray-200 transition-colors duration-200"
            activeClassName="font-semibold border-b-2 border-white"
          >
            Scan
          </NavLink>
          <NavLink 
            to="/database" 
            className="text-white hover:text-gray-200 transition-colors duration-200"
            activeClassName="font-semibold border-b-2 border-white"
          >
            Database
          </NavLink>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 p-4 space-y-4">
          <NavLink 
            to="/scan" 
            className="block text-white hover:text-gray-200 transition-colors duration-200"
            activeClassName="font-semibold border-b-2 border-white"
            onClick={toggleMenu} // Close menu on click
          >
            Scan
          </NavLink>
          <NavLink 
            to="/database" 
            className="block text-white hover:text-gray-200 transition-colors duration-200"
            activeClassName="font-semibold border-b-2 border-white"
            onClick={toggleMenu} // Close menu on click
          >
            Database
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

