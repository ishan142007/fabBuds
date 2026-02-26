import React, { useState } from "react";
import FabbudsAdminPanel from "../Admin.jsx/Admin";

const LoginSignup = () => {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <div>
              <header className="flex justify-between items-center px-8 py-4 bg-[#0c1633]/80 backdrop-blur-md shadow-lg">
        <h1 className="text-2xl font-bold tracking-wide">FABBUDS</h1>
        <nav className="space-x-6">
          <button className="hover:text-teal-400 transition">Home</button>
          <button
            onClick={() => setActiveTab("login")}
            className="hover:text-teal-400 transition"
          >
            Login
          </button>
          <button className="hover:text-teal-400 transition">About</button>
        </nav>
      </header>

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">

            <div className="bg-slate-900/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[350px]">

            
                <h1 className="text-white text-3xl font-bold text-center">
                    FABBUDS
                </h1>

                <p className="text-center text-gray-300 mt-2">
                    Welcome to the <span className="text-cyan-400 font-semibold">Future</span>
                </p>


                
                <div className="flex bg-slate-800 rounded-full mt-6 p-1">

                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 rounded-full transition ${isLogin
                            ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold"
                            : "text-white"

                        }`}
                        >
                        Login
                    </button>

                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 rounded-full transition ${!isLogin
                            ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold"
                            : "text-white"
                        }`}
                        >
                        Sign Up
                    </button>

                </div>


            
                <form className="mt-6 space-y-4">

                    {!isLogin && (
                        <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                        )}

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-cyan-400"
                        />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-cyan-400"
                        />

                    {!isLogin && (
                        <input
                        type="password"
                            placeholder="Confirm Password"
                            className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                            )}


                    <button
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold hover:scale-105 transition"
                        >
                        {isLogin ? "Sign In" : "Sign Up"}
                    </button>

                </form>

            </div>

        </div>
                        </div>
    );
};

export default LoginSignup;