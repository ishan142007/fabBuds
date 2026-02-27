import { useState } from "react";

 function LoginSignup({setlogin}) {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password:"",
    photo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setlogin(true)

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
                className={`flex-1 py-2 rounded-full transition-all duration-300 ${
                  activeTab === "login"
                    ? "bg-gradient-to-r from-teal-400 to-green-500 text-black"
                    : "text-gray-300"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-2 rounded-full transition-all duration-300 ${
                  activeTab === "signup"
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
                  value={user.name}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-[#1b2a52] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
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
                className="w-full px-4 py-3 rounded-lg bg-[#1b2a52] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-[#1b2a52] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                onChange={(e)=>setUser({...user,password:e.target.value})}
                required
              />

              {activeTab === "signup" && (
                <input
                  type="text"
                  placeholder="Photo URL"
                  value={user.photo}
                  onChange={(e) =>
                    setUser({ ...user, photo: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-[#1b2a52] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-400 to-green-500 text-black font-semibold hover:scale-105 transition-transform duration-300"
              >
                {activeTab === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Profile View Page */
        <div className="flex items-center justify-center py-20 px-4">
          <div className="w-full max-w-md bg-[#0c1633] rounded-2xl shadow-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-teal-400 mb-6">
              Customer Profile
            </h2>

            <img
              src={
                user.photo ||
                "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-teal-400 object-cover"
            />

            <h3 className="text-xl font-semibold">{user.name || "User"}</h3>
            <p className="text-gray-400 mt-2">{user.email}</p>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-teal-400 to-green-500 text-black font-semibold hover:scale-105 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default LoginSignup