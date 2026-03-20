import React from "react";

const EcommerceHome = () => {

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
    {
      id: 4,
      name: "Block Print Bedsheet",
      price: 999,
      vendor: "Bagru Prints",
      location: "Bagru, Rajasthan",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500",
      rating: 4.4,
    },
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
    <div className="min-h-screen bg-gray-100 text-gray-800">

      
      <h2 className="text-3xl font-bold text-center pt-6 text-blue-600">
        Welcome To FabBuds
      </h2>

      
      <div className="grid md:grid-cols-3 gap-6 p-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-102 transition"
          >

          
            <img
              src={product.image}
              alt={product.name}
              className=" w-full h-48 object-cover"
            />
 
            
            <div className="p-4">

              <h3 className="text-lg font-bold text-gray-900">
                {product.name}
              </h3>

              <p className="text-gray-500 text-sm">
                Vendor: {product.vendor}
              </p>

              <p className="text-gray-500 text-sm">
                Location: {product.location}
              </p>

              <p className="text-yellow-500 text-sm">
                ⭐ {product.rating}
              </p>

              <p className="text-blue-600 font-bold mt-1">
                ₹{product.price}
              </p>

              <button className="w-full mt-3 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">
                Add to Cart
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default EcommerceHome;