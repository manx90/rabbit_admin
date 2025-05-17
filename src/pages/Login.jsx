import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    // Here you would typically handle authentication with your backend
    // For now, we'll just simulate a successful login
    console.log("Login attempt with:", { email, password, rememberMe });
    
    // Set authentication status in localStorage
    localStorage.setItem("isAuthenticated", "true");
    if (rememberMe) {
      localStorage.setItem("userEmail", email);
    }
    
    // Redirect to dashboard on successful login
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Brand/Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0095FF] flex-col justify-center items-center p-12 text-white">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Rabbit Admin</h1>
          <p className="text-xl mb-8">
            Welcome back! Log in to access your admin dashboard and manage your products and orders.
          </p>
          <div className="bg-white/10 p-6 rounded-2xl">
            <p className="italic text-lg mb-4">
              "The Rabbit Admin dashboard has streamlined our entire inventory management process."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full mr-4"></div>
              <div>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm">Product Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Please enter your credentials to sign in</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#0095FF] focus:border-[#0095FF]"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-[#0095FF] hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#0095FF] focus:border-[#0095FF]"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#0095FF] focus:ring-[#0095FF] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0095FF] text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#0095FF] hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
