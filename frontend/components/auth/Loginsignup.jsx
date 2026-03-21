import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginSignup({ setlogin }) {

 function LoginSignup({setlogin}) {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role,setRole]=useState(""); 
  const navigate = useNavigate();

  const [user, setUser] = useState({

    fullname: "",
    email: "",
    password: "",
    photo: "",

  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, email, password, photo } = user;

    // ================= SIGNUP =================
    if (activeTab === "signup") {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/signup",
          { fullname, email, password, photo }
        );

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          setlogin(true);
          setIsLoggedIn(true);
          navigate("/");
        }
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }

    // ================= LOGIN =================
    else {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/login",
          { email, password }
        );

        if (res.data.user.token) {
          localStorage.setItem("token", res.data.token);
          setlogin(true);
          setIsLoggedIn(true);
          navigate("/");
        }
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setlogin(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1c3f] to-[#1e3a8a] text-white">
      {/* Header */}
     

      {/* If Not Logged In → Show Login/Signup */}
      {!isLoggedIn ? (
        <div className="flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-md bg-[#0c1633] rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-2">
              Welcome to the <span className="text-teal-400">Fabbuds</span>
            </h2>
            
            {/* Toggle */}
            <div className="flex bg-[#1b2a52] rounded-full p-1 my-6">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-2 rounded-full transition-all duration-300 ${activeTab === "login"
                    ? "bg-gradient-to-r from-teal-400 to-green-500 text-black"
                    : "text-gray-300"
                  }`}
              >

              Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-2 rounded-full transition-all duration-300 ${activeTab === "signup"
                    ? "bg-gradient-to-r from-teal-400 to-green-500 text-black"
                    : "text-gray-300"
                  }`}
              >
                Sign Up
              </button>
            </div>


            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === "signup" && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={user.fullname}
                  onChange={(e) =>
                    setUser({ ...user, fullname: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-[#1b2a52]"
                  required
                />
                
                
              )}

              <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-[#1b2a52]"
                required
              />
              
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-[#1b2a52] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                onChange={(e)=>setUser({...user,password:e.target.value})}
                required
              />

              <select value={role}
              onChange={(e)=>
                setRole(e.target.value)
              } className="w-full px-4 py-3 rounded-lg bg-[#1b2a52]">
                <option value="">Choose Role</option>
                <option value="User">User</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>

              </select>
             
              

              {activeTab === "signup" && (
                <input
                  type="text"
                  placeholder="Photo URL"
                  value={user.photo}
                  onChange={(e) =>
                    setUser({ ...user, photo: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-[#1b2a52]"
                />
              )}
              

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-400 to-green-500 text-black font-semibold"
              >
                {activeTab === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        // Profile Page
        <div className="flex items-center justify-center py-20 px-4">
          <div className="w-full max-w-md bg-[#0c1633] rounded-2xl shadow-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-teal-400 mb-6">
              Customer Profile
            </h2>

            <img
              src={user.photo || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-teal-400 object-cover"
            />

            <h3 className="text-xl font-semibold">
              {user.fullname || "User"}
            </h3>
            <p className="text-gray-400 mt-2">{user.email}</p>

            <button
              onClick={handleLogout}
              className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-teal-400 to-green-500 text-black font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
}
export default LoginSignup;