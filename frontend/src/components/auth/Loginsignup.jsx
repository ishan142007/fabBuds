import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginSignup({ setlogin }) {

  const [activeTab, setActiveTab] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
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

    if (activeTab === "signup") {
      //signup ke liye
      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/signup",
          { fullname, email, password, photo, role }
        );

        // console.log("hi",res.data.user.token)
        if (res.data.user.token) {
          localStorage.setItem("token", res.data.user.token);
          setlogin(true);
          setIsLoggedIn(true);
          navigate("/");
        }
      } catch (error) {
        console.log("hellow")
        console.log(error.response?.data || error.message);
      }
    } else {
      //login ke liye
      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/login",
          { email, password,role }
        );
        // console.log(res.data.user.token)
        if (res.data.user.token) {
          localStorage.setItem("token", res.data.user.token);
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
    <div className="min-h-screen bg-gray-100 text-gray-800">

      {!isLoggedIn ? (
        <div className="flex items-center justify-center py-16 px-4">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold text-center mb-2 text-blue-600">
              Welcome to FABBUDS
            </h2>

            {/* Toggle */}
            <div className="flex bg-gray-200 rounded-full p-1 my-6">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-2 rounded-full transition ${
                  activeTab === "login"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-2 rounded-full transition ${
                  activeTab === "signup"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600"
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
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Choose Role</option>
                <option value="user">User</option>
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
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
              >
                {activeTab === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

          </div>
        </div>
      ) : (

        // Profile Page
        <div className="flex items-center justify-center py-20 px-4">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">

            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Customer Profile
            </h2>

            <img
              src={user.photo || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-400 object-cover"
            />

            <h3 className="text-xl font-semibold">
              {user.fullname || "User"}
            </h3>

            <p className="text-gray-500 mt-2">
              {user.email}
            </p>

            <button
              onClick={handleLogout}
              className="mt-6 px-6 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default LoginSignup;