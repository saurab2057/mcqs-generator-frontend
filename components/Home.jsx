import React from "react";

// Inline SVG Icons for the tiles and badges
const IconSeal = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
    <path d="M31.9 6.5c1 .1 2 .7 2.6 1.6l2.4 3.8c.6.9 1.7 1.4 2.7 1.2l4.5-.9c1-.2 2 .1 2.8.8l3.4 3.1c.8.7 1.1 1.8.9 2.8l-1 4.4c-.2 1 .2 2.1 1 2.7l3.6 2.8c.9.7 1.3 1.7 1.3 2.8s-.4 2.1-1.3 2.8l-3.6 2.8c-.8.6-1.2 1.7-1 2.7l1 4.4c.2 1-.1 2.1-.9 2.8l-3.4 3.1c-.8.7-1.8 1-2.8.8l-4.5-.9c-1-.2-2.1.3-2.7 1.2l-2.4 3.8c-.6.9-1.6 1.5-2.6 1.6-1 0-2-.5-2.6-1.4l-2.6-3.9c-.6-.9-1.7-1.3-2.7-1.1l-4.5 1c-1 .2-2-.1-2.8-.8l-3.4-3.1a3 3 0 0 1-.9-2.8l1-4.5c.2-1-.2-2-1-2.6l-3.6-2.8c-.9-.7-1.3-1.7-1.3-2.8s.4-2.1 1.3-2.8l3.6-2.8c.8-.6 1.2-1.6 1-2.6l-1-4.5c-.2-1 .1-2.1.9-2.8l3.4-3.1c.8-.7 1.8-1 2.8-.8l4.5.9c1 .2 2.1-.3 2.7-1.2l2.6-3.9c.6-.9 1.6-1.4 2.6-1.4z"/>
  </svg>
);

const IconSimLab = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
    <rect x="30" y="12" width="24" height="18" rx="2" ry="2"/>
    <rect x="30" y="32" width="24" height="2"/>
    <circle cx="18" cy="24" r="5" />
    <path d="M9 40c0-5.5 4.5-10 10-10s10 4.5 10 10v5H9v-5z" />
    <path d="M38 18l6 7-3 1-1 3-6-7 4-4z"/>
  </svg>
);

const IconTeamProjects = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
    <rect x="10" y="12" width="18" height="40" rx="2"/>
    <circle cx="14" cy="18" r="2" fill="#000"/>
    <circle cx="14" cy="26" r="2" fill="#000"/>
    <circle cx="14" cy="34" r="2" fill="#000"/>
    <circle cx="14" cy="42" r="2" fill="#000"/>
    <rect x="24" y="18" width="30" height="26" rx="4"/>
    <circle cx="50" cy="24" r="3" fill="#000"/>
    <path d="M28 40l8-8 6 6 6-8 6 10H28z" fill="#000"/>
  </svg>
);

const IconUsers = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4z"/>
    <path d="M3 20a7 7 0 0 1 14 0z"/>
    <circle cx="18.5" cy="8" r="2.5"/>
    <path d="M16 20a6 6 0 0 1 6 0z"/>
  </svg>
);

const IconRing = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const Home = () => {
  return (
    <div className="bg-[#000000] text-white">
      {/* Add padding-top equal to header height so content is not hidden */}
      <main className="pt-[80px]">
        {/* Hero Section */}
        <section
          id="home"
          className="scroll-mt-20 max-w-7xl mx-auto px-6 md:px-10 pt-14 pb-4 md:pb-10 flex flex-col md:flex-row items-center gap-12"
        >
          {/* Left text */}
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.15em] text-gray-400 animate-pulse">
              Smarter, Easier, Learning
            </p>
            <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-[1.05]">
              Unlock Your
              <br />
              Potential with
              <br />
              LucidLearning
              <br />
              Today!
            </h1>
            <p className="mt-6 text-gray-300 text-lg">
              Dive into a world where learning meets innovation. Experience
              personalized education that adapts to your unique needs and goals.
            </p>
            <button className="mt-8 bg-[#3E8562] hover:opacity-90 px-6 py-3 rounded-xl font-semibold cursor-pointer">
              Get Started
            </button>
          </div>

          {/* Right visual with badges */}
          <div className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop"
              alt="Learning UI"
              className="w-[640px] h-[640px] object-cover rounded-full"
            />

            {/* Example badge */}
            <div className="absolute -top-4 left-8 bg-[#151614] rounded-xl px-4 py-3 flex items-center gap-3 shadow-md">
              <div className="p-2 rounded-lg bg-black/30">
                <IconUsers className="w-6 h-6 text-[#F2E5AC]" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold">300+ </div>
                <div className="text-xs text-gray-300">Tutors</div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Tiles Section */}
        <section
          id="courses"
          className="scroll-mt-20 max-w-7xl mx-auto px-6 md:px-10 py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#151614] rounded-2xl p-10 text-center">
              <div className="flex justify-center mb-6 text-[#3E8562]">
                <IconSeal className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-bold">Adaptive Tests</h3>
              <p className="mt-4 text-gray-300">
                Adaptive assessments tailor the learning experience,
                maximizing knowledge retention effectively.
              </p>
            </div>

            <div className="bg-[#151614] rounded-2xl p-10 text-center">
              <div className="flex justify-center mb-6 text-[#3E8562]">
                <IconSimLab className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-bold">Simulated Labs</h3>
              <p className="mt-4 text-gray-300">
                Interactive simulations offer hands-on experience, bridging
                theory and practical application effectively.
              </p>
            </div>

            <div className="bg-[#151614] rounded-2xl p-10 text-center">
              <div className="flex justify-center mb-6 text-[#3E8562]">
                <IconTeamProjects className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-bold">Team Projects</h3>
              <p className="mt-4 text-gray-300">
                Real-time collaboration tools enhance teamwork, fostering
                communication and shared understanding.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
