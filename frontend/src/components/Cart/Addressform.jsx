import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Address() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address1: "",
    address2: "",
    pincode: "",
    state: "Rajasthan",
    country: "India"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    navigate("/summary", { state: form });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      
      <div className="w-full max-w-xl bg-white text-black rounded-2xl shadow-xl p-6">
        
        <h2 className="text-2xl font-semibold text-center border-b pb-3 mb-6">
          Shipping Address
        </h2>

        <div className="grid grid-cols-1 gap-4">
          
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"name="name" onChange={handleChange} placeholder="Enter Name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Mobile</label>
            <input
              type="text" name="mobile"onChange={handleChange}placeholder="Enter Mobile"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Address Line 1</label>
            <input
              type="text"name="address1"onChange={handleChange}placeholder="Enter Address 1"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Address Line 2</label>
            <input
              type="text"name="address2"onChange={handleChange}placeholder="Enter Address 2"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Pin Code</label>
              <input
                type="text" name="pincode" onChange={handleChange} placeholder="Enter Pin Code"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium">State</label>
              <input
                type="text" name="state" defaultValue="Rajasthan"onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Country</label>
            <input
              type="text"name="country" defaultValue="India" onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>

          <button 
            onClick={handleSave}
            className="mt-4 w-full bg-blue-300 text-white py-2 rounded-lg hover:bg-blue-500 transition"
          >
            Save Address
          </button>

        </div>
      </div>
    </div>
  );
}