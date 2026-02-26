import React from "react";

const Home = () => {

  const products = [
    {
      id: 1,
      name: "Blue Pottery Vase",
      price: 799,
      vendor: "Jaipur Blue Art",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Rajasthani Kathputli",
      price: 499,
      vendor: "Raj Puppet House",
      location: "Udaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=500",
      rating: 4.3,
    },
    {
      id: 3,
      name: "Miniature Painting",
      price: 1499,
      vendor: "Meena Arts",
      location: "Jodhpur, Rajasthan",
      image: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=500",
      rating: 4.7,
    },

    // Bedsheet (correct image)
    {
      id: 4,
      name: "Block Print Bedsheet",
      price: 999,
      vendor: "Bagru Prints",
      location: "Bagru, Rajasthan",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500",
      rating: 4.4,
    },

    // Handmade chappal / mojari
    {
      id: 5,
      name: "Handmade Mojari Chappal",
      price: 699,
      vendor: "Mojari Crafts",
      location: "Jaisalmer, Rajasthan",
      image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500",
      rating: 4.6,
    },

    {
      id: 6,
      name: "Meenakari Necklace",
      price: 1899,
      vendor: "Jaipur Jewelry",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500",
      rating: 4.8,
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center p-4 bg-slate-900/50 backdrop-blur-xl border-b border-cyan-400/20">

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

        <div className="space-x-6">
          <button className="hover:text-cyan-400">Home</button>
          <button className="hover:text-cyan-400">Cart</button>
          <button className="hover:text-cyan-400">Profile</button>

        </div>

      </div>



      <footer className="text-center mt-20 py-6 text-gray-400">
        © 2026 FABBUDS. All rights reserved.
      </footer>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mt-6 text-cyan-400">
        Rajasthan Handicrafts
      </h2>


      {/* Product Grid */}
      <div className="grid md:grid-cols-3 gap-6 p-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-slate-900/50 backdrop-blur-xl border border-cyan-400/20 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:border-cyan-400 transition"
          >

            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />

            {/* Info */}
            <div className="p-4">

              <h3 className="text-lg font-bold">
                {product.name}
              </h3>

              <p className="text-gray-400 text-sm">
                Vendor: {product.vendor}
              </p>

              <p className="text-gray-400 text-sm">
                Location: {product.location}
              </p>

              <p className="text-yellow-400 text-sm">
                ⭐ {product.rating}
              </p>

              <p className="text-cyan-400 font-bold mt-1">
                ₹{product.price}
              </p>

              <button className="w-full mt-3 py-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 text-black font-semibold hover:scale-105 transition">
                Add to Cart
              </button>

            </div>

          </div>

        ))}

      </div>


    </div>
    </div>
    </div>
  );
};

export default Home;