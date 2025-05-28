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
import Header from "./components/Header";
import { useEffect, useState } from "react";
// Protected route wrapper component
const ProtectedRoute = ({ children }) => {
  // This would typically check a token in localStorage or a context
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize to detect mobile/desktop view
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Set initial value
    checkIsMobile();

    // Add event listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Handle scroll prevention when sidebar is open
  useEffect(() => {
    const handleScroll = (e) => {
      // Only prevent scrolling when sidebar is open and the event target is not within the sidebar
      if (sidebarOpen && isMobile && !e.target.closest("#sidebar")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (sidebarOpen && isMobile) {
      // Only block scrolling on mobile
      document.body.style.overflow = "hidden";

      // Add event listeners to prevent scrolling outside sidebar
      window.addEventListener("wheel", handleScroll, { passive: false });
      window.addEventListener("touchmove", handleScroll, { passive: false });
    } else {
      // Restore normal scrolling
      document.body.style.overflow = "auto";

      // Remove scroll prevention event listeners
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [sidebarOpen, isMobile]);
  useEffect(() => {
    // Close sidebar when clicking outside of it
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
        {/* Overlay when sidebar is open - only visible on mobile/tablet */}
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

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product"
              element={
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
