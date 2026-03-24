import React from "react";
import { useState } from "react";
import React from "react";

function CartLogic({ cart, setCart }) {

    return (

        <div>

            <h2>Cart Page</h2>

            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (

                cart.map((item, index) => (

                    <div key={index}>
                        {item.name} - ₹{item.price}
                    </div>

                ))

            )}

        </div>

    );

}

export default CartLogic;