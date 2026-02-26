import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-slate-900/50 backdrop-blur-md shadow-lg">

        <h1 className="text-2xl font-bold text-cyan-400">
          FABBUDS
        </h1>

        <div className="space-x-6 hidden md:flex">
          <button className="hover:text-cyan-400 transition">Home</button>
          <button className="hover:text-cyan-400 transition">Features</button>
          <button className="hover:text-cyan-400 transition">About</button>
          <button className="hover:text-cyan-400 transition">Contact</button>
        </div>

        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold">
          Login
        </button>

      </nav>


      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">

        <h2 className="text-4xl md:text-6xl font-bold">
          Welcome to the <span className="text-cyan-400">Future</span>
        </h2>

        <p className="mt-4 text-gray-300 max-w-xl">
          Connect with creative vendors and discover unique products from local communities.
        </p>

        <button className="mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold hover:scale-105 transition">
          Get Started
        </button>

      </div>


      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 px-8 mt-20">

        <div className="bg-slate-900/60 p-6 rounded-xl backdrop-blur-lg hover:scale-105 transition">
          <h3 className="text-xl font-semibold text-cyan-400">
            Fast
          </h3>
          <p className="text-gray-300 mt-2">
            Lightning fast performance with modern technology.
          </p>
        </div>

        <div className="bg-slate-900/60 p-6 rounded-xl backdrop-blur-lg hover:scale-105 transition">
          <h3 className="text-xl font-semibold text-cyan-400">
            Secure
          </h3>
          <p className="text-gray-300 mt-2">
            Your data is safe with our advanced security.
          </p>
        </div>

        <div className="bg-slate-900/60 p-6 rounded-xl backdrop-blur-lg hover:scale-105 transition">
          <h3 className="text-xl font-semibold text-cyan-400">
            Easy
          </h3>
          <p className="text-gray-300 mt-2">
            Simple and user-friendly interface.
          </p>
        </div>

      </div>


      {/* Footer */}
      <footer className="text-center mt-20 py-6 text-gray-400">
        © 2026 FABBUDS. All rights reserved.
      </footer>

    </div>
  );
};

export default HomePage;