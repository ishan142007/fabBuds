import { useState } from "react"

export default function Products(){
    const [ptype,setptype]=useState("");
    const [pname,setpname]=useState("");
    const [pprice,setpprice]=useState("");
    const [pdesc,setpdesc]=useState("");

    return(
        <>

        <div className=" ">
    <div className="  justify-center items-center grid text-center m-2">

       Product Type 
       <input type="text" onChange={(e)=>setptype(e.target.value)} className="border"/>
       Product Name
       <input type="text" onChange={(e)=>setpname(e.target.value)} className="border"/>
       Product Price
       <input type="text" onChange={(e)=>setpprice(e.target.value)}className="border"/>
       Product Descrition 
       <input type="text" onChange={(e)=>setpdesc(e.target.value)}className="border"/>
    </div>
       
        </div>
        </>
    )
}