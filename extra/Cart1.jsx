import React from "react";

function Cart1({ cart, setCart }) {

  const products = [
    {
      id: 1,
      name: "Blue Pottery Vase",
      price: 799, },
    {
      id: 2,
      name: "Rajasthani Kathputli",
      price: 499, },
    {
      id: 3,
      name: "Miniature Painting",
      price: 1499,
},
{
      id: 4,
      name: "Block Print Bedsheet",
      price: 999,
},
    {
      id: 5,
      name: "Handmade Mojari Chappal",
      price: 699,
},

  ];

  const addToCart = (product) => {

    setCart([...cart, product]);

  };

  return (

    <div>

      <h2>Home Page</h2>

      {products.map((product) => (

        <div key={product.id}>

          <h3>{product.name}</h3>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>

        </div>

      ))}

    </div>

  );

}

export default  Cart1;