import { useState } from "react"

export default function Products({products}){
 

    return(
        <> <div className="grid grid-cols-3 gap-4">
        {products &&
          products.map((p) => (
            <div key={p._id} className="border p-3 rounded">
              <img
                src={p.imageUrl}
                alt=""
                className="h-40 w-full object-cover"
              />
              <h2 className="font-bold">{p.name}</h2>
              <p>{p.description}</p>
              <p>₹ {p.price}</p>
              <p>Stock: {p.stock}</p>
              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-500 text-white p-1 mt-2"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
        </>
    )
}