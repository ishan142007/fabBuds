import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient">
      <nav className="flex justify-between items-center px-8 py-4 bg-black/40 backdrop-blur-md shadow-lg">

        <h1 className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold">
          FabBuds        </h1>

        <div className="space-x-6">
          <a href="#" className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold">Home</a>
          <a href="#" className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold">Explore</a>
          <a herf="#" className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold">Artist</a>
          <a href="#" className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold">Login</a>
        </div>

      </nav>


      <div className="flex flex-col justify-center items-center text-center h-[85vh] px-4">

        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-green-500">FabBuds</span>
        </h1>

        <h2 className="text-2xl md:text-3xl text-green-400 mb-6">
          Save Our Real Art
        </h2>

        <p className="max-w-xl text-gray-300 mb-8">
          Discover handmade creations from talented local artists.
          Support creativity, empower communities, and preserve real art.
        </p>

        <div className="space-x-4">

          <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold shadow-lg transition">
            Explore Art
          </button>

          <button className="border border-green-500 hover:bg-green-500 px-6 py-3 rounded-lg font-semibold transition">
            Become Artist
          </button>

        </div>

      </div>

    </div>
  );
};

export default Home;