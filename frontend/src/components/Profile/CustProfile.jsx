import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function profile(){
  const token=localStorage.getItem("token")

  
  // let profile = {
  //   fullname: "Ishan Singh Patel",
  //   _id: "#12345",
  //   email: "ishan4578@gmail.com",
  //   phone: "+91 9785461636",
  //   address: ",Alwar Rajasthan",
  //   joined: "12 Jan 2024",
  //   orders: 25,
  //   spent: "₹15,000",
  //   status: "Active",
  //   image: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
  // };
  const [profile, setProfile] = useState({
    fullname:"",
    id:"",
    email:"",
    role:"",
    address:"",
    joined:"",
  })
  useEffect(() => {
    const handleProfile=async()=>{
      try {
        const user=await axios.get("http://localhost:3000/api/auth/profile",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        // console.log(user.data.ans);
        const identity=user.data.ans
        setProfile({...identity,joined:identity.createdAt})
        
        
      } catch (error) {
        console.log(error)
      }
      }
    handleProfile()
  
    
  }, [])
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">  <div className=" items-center gap-6 border-b pb-6">
          <img
            src={profile.image}
            alt="Profile"
            className=" h-20 rounded-full border-4 "
          />
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-6">

        {/* Header */}
      

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {profile.fullname}
            </h2>
            <p className="text-gray-500">
              profile ID: {profile._id}
            </p>

            {/* <span
              className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                profile.status === "Active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {profile.status}
            </span> */}
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {/* Left */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="text-gray-800 font-medium">
                {profile.email}
              </p>
            </div>

            {/* <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p className="text-gray-800 font-medium">
                {profile.phone}
              </p>
            </div> */}

            <div>
              <p className="text-gray-500 text-sm">Address</p>
              <p className="text-gray-800 font-medium">
                {profile.address}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Joined Date</p>
              <p className="text-gray-800 font-medium">
                {profile.joined}
              </p>
            </div>

            {/* <div>
              <p className="text-gray-500 text-sm">Orders</p>
              <p className="text-gray-800 font-medium">
                {profile.orders} Orders
              </p>
            </div> */}

            {/* <div>
              <p className="text-gray-500 text-sm">Total Spent</p>
              <p className="text-gray-800 font-medium">
                {profile.spent}
              </p>
            </div> */}
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
            Message
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg">
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  );
};

export default profile;