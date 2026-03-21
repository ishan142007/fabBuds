import React, { useState } from "react";

function Cart(product) {

const [cart,setCart]=useState({

  productId:"",
  price:"",
  quantity:""
  
}
)
  const addToCart = (product) => {
    const existing=cart.find(item=>item.id===product.id);
    if(existing){
      increasequantity(product.id)
    }
    else{
      
      setCart([...cart, {product,quantity:1}]);
    }

  };
  const increasequantity=(id)=>{
    const increase=cart.map(item=>item.id===id?{...item,quantity:item.quantity+1}:item)
    setCart(increase)
  };
  const decreasequantity=(id)=>{
    const decrease=cart.map(item=>item.id===id?{...item,quantity:item.quantity-1}:item)
    setCart(decrease)
  }
  

  return (

    <div>

      <h2>Home Page</h2>

      {products.map((product) => (

        <div key={product.id}>

          <h3>{product.name}</h3>

         
          <button onClick={()=>decreasequantity}>-</button>
            {product.quantity}
          <button onClick={()=>increasequantity}>+</button>

        </div>

      ))}
   
      

    
    </div>
  );

}

export default  Cart;