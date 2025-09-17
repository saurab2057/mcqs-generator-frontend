import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col">
      {/* Footer Section (Upper Part with Features & Subscribe) */}
<div className="bg-gradient-to-r from-[#4F897D] to-[#2A6458] text-center py-20">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
    Discover Our Features
  </h2>
  <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
    <input
      type="email"
      placeholder="Enter your email"
      className="px-6 py-4 rounded-full border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 w-full sm:w-96 transition-all duration-300"
    />
<button className="px-8 py-4 rounded-full bg-[#151614] text-white font-semibold 
  hover:bg-[#2A2A2A] transform hover:scale-105 transition-transform duration-300">
  Subscribe Now
</button>

  </div>
</div>


      {/* Footer Bottom */}
      <footer className="bg-[#165246] text-white py-8 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Section 1: Performance & Insights */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold tracking-wide">Performance & Insights</h3>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Leaderboard</a>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Progress Tracker</a>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Mock Exam</a>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Certification</a>
            </div>

            {/* Section 2: Learning & Practice */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold tracking-wide">Learning & Practice</h3>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Instructors</a>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Practice Tests</a>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Subject-wise MCQs</a>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Past Year Papers</a>
            </div>

            {/* Section 3: Student Resources */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold tracking-wide">Student Resources</h3>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Study Materials</a>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Resources</a>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">FAQ</a>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Discussion Forum</a>
            </div>

            {/* Section 4: Legal & Support */}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold tracking-wide">Legal & Support</h3>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Terms & Conditions</a>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Contact Us</a>
              <a href="#" className="hover:text-gray-200 text-sm transition-colors duration-200">Blog</a>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-400/50 my-10" />

          {/* Bottom Section */}
          <div className="flex flex-col justify-between items-center gap-6">
            {/* Social Icons and Copyright */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-6 text-xl">
                <a href="#" className="hover:text-gray-200 transition-colors duration-200">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="hover:text-gray-200 transition-colors duration-200">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="hover:text-gray-200 transition-colors duration-200">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="#" className="hover:text-gray-200 transition-colors duration-200">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              <p className="text-sm text-gray-300">
                © 2025 saurabkhatiwoda. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;