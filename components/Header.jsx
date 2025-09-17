import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- import

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate(); // <-- hook for navigation

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#29292c]/95 backdrop-blur-md shadow-lg"
          : "bg-[#29292c]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="text-2xl font-extrabold tracking-tight transform transition-transform duration-300 hover:scale-105">
          <span className="align-middle text-white">ExamNest</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-gray-300">
          <a
            href="#home"
            className="relative hover:text-white transition-all duration-300 group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3E8562] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#about"
            className="relative hover:text-white transition-all duration-300 group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3E8562] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#courses"
            className="relative hover:text-white transition-all duration-300 group"
          >
            Courses
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3E8562] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#instructors"
            className="relative hover:text-white transition-all duration-300 group"
          >
            Instructors
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3E8562] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>
        <button
          onClick={() => navigate("/exam")} // <-- navigate to exam route
          className="ml-4 bg-[#3E8562] hover:bg-[#2d6147] hover:scale-105 transform transition-all duration-300 px-5 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl cursor-pointer" // <-- cursor-pointer makes hand icon
        >
          Start Learning
        </button>
      </div>
    </header>
  );
};

export default Header;
