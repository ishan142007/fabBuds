import React from "react";

function Customer(){
  const customer = {
    name: "John Doe",
    id: "#12345",
    email: "john@example.com",
    phone: "+91 9876543210",
    address: "Jaipur, Rajasthan",
    joined: "12 Jan 2024",
    orders: 25,
    spent: "₹15,000",
    status: "Active",
    image: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">  <div className=" items-center gap-6 border-b pb-6">
          <img
            src={customer.image}
            alt="Profile"
            className="w-10 h-20 rounded-full border-4 "
          />
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-6">

        {/* Header */}
      

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {customer.name}
            </h2>
            <p className="text-gray-500">
              Customer ID: {customer.id}
            </p>

            <span
              className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                customer.status === "Active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {customer.status}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {/* Left */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="text-gray-800 font-medium">
                {customer.email}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p className="text-gray-800 font-medium">
                {customer.phone}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Address</p>
              <p className="text-gray-800 font-medium">
                {customer.address}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Joined Date</p>
              <p className="text-gray-800 font-medium">
                {customer.joined}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Orders</p>
              <p className="text-gray-800 font-medium">
                {customer.orders} Orders
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Total Spent</p>
              <p className="text-gray-800 font-medium">
                {customer.spent}
              </p>
            </div>
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

export default Customer;