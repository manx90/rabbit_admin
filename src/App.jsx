import "./index.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Product from "./pages/Product";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AccountsManager from "./pages/AccountsManager";
import Header from "./components/Header";
import { useEffect, useState } from "react";

// Simulate backend user data in localStorage for demo purposes
// Example: localStorage.setItem("isAuthenticated", "true");
// Example: localStorage.setItem("userRole", "Admin"); // Roles: Admin, User, Salesman, etc.

// Protected route wrapper component with role-based access control
const ProtectedRoute = ({ allowedRoles, children }) => {
  // Check if user is authenticated from localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // Get user role from localStorage
  const userRole = localStorage.getItem("userRole");

  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Redirect to unauthorized page or somewhere else if user role is not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and role allowed, render the protected component
  return children;
};

// Unauthorized page component (add this for role unauthorized access)
const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-red-600">
          Unauthorized Access
        </h1>
        <p className="text-gray-700">
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      if (sidebarOpen && isMobile && !e.target.closest("#sidebar")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (sidebarOpen && isMobile) {
      document.body.style.overflow = "hidden";
      window.addEventListener("wheel", handleScroll, { passive: false });
      window.addEventListener("touchmove", handleScroll, { passive: false });
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [sidebarOpen, isMobile]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarOpen &&
        isMobile &&
        !(e.target.closest("#sidebar") || e.target.closest(".sidebar-toggle"))
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [sidebarOpen, isMobile, setSidebarOpen]);

  return (
    <BrowserRouter>
      <div className="flex flex-col relative">
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-15 z-[50] transition-opacity duration-500 ease-in-out"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <Header open={sidebarOpen} setOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected routes with role-based access control */}
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["Admin", "User", "Salesman"]}>
                  <Product />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Admin", "User"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Salesman"]}>
                  <Product />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accounts"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <AccountsManager />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
