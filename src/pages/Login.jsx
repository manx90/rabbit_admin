import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/Auth.context";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://api.rabbit.ps/auth/login", {
        username,
        password,
      });
      setSuccess(res.data.message);
      setLoading(false);
      localStorage.setItem("token", res.data.data.access_token);
      setIsAuthenticated(true);
      navigate("/product");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center md:flex-row min-h-screen bg-gray-50">
      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex mx-auto items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          {/* Logo for mobile view */}
          <div className="md:flex flex justify-center mb-6">
            <img src="/logo-black.png" alt="Rabbit Admin" className="" />
          </div>

          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
              Sign in to Rabbit Admin Panel
            </h2>
            <p className="text-gray-600">Welcome back!</p>
          </div>
          {error && !success && (
            <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg border border-red-200">
              <p className="font-semibold">{error}</p>
            </div>
          )}
          {success && !error && (
            <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg border border-green-200">
              <p className="font-semibold">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                username
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-[#0095FF] focus:border-[#0095FF] transition-all duration-200"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <input
                id="text"
                type="text"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-[#0095FF] focus:border-[#0095FF] transition-all duration-200"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0095FF] text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium text-base"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
