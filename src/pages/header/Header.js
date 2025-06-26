import React, { useState } from "react";

import { Link } from "react-router-dom";

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const closeNavbar = () => setExpanded(false);

  return (
    <div className="relative">
      <nav className="bg-white/10 backdrop-blur-sm shadow-lg text-black w-full fixed top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="font-bold text-xl">
                Excel Analytics Platform
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-black hover:bg-gray-800/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 px-3 py-2 rounded-lg" onClick={closeNavbar}>
                Login
              </Link>
              <Link to="/register" className="text-black hover:bg-gray-800/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 px-3 py-2 rounded-lg" onClick={closeNavbar}>
                Register
              </Link>
            </div>
            <div className="md:hidden">
              <button
                className="border border-white/50 px-2 py-1"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? '×' : '☰'}
              </button>
            </div>
          </div>
          {expanded && (
            <div className="md:hidden mt-4">
              <div className="flex flex-col space-y-2 px-2">
                <Link to="/login" className="text-black hover:bg-gray-800/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 px-3 py-2 rounded-lg" onClick={closeNavbar}>
                  Login
                </Link>
                <Link to="/register" className="text-black hover:bg-gray-800/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 px-3 py-2 rounded-lg" onClick={closeNavbar}>
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
