import "./index.css";
import {
	BrowserRouter,
	Route,
	Routes,
	Navigate,
	useLocation,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
// import Sidebar from "./components/sidebar";
import Product from "./pages/Product";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// Protected route wrapper component
const ProtectedRoute = ({ children }) => {
	// This would typically check a token in localStorage or a context
	const isAuthenticated =
		localStorage.getItem("isAuthenticated") ===
		"true";
	const location = useLocation();

	if (!isAuthenticated) {
		// Redirect to login if not authenticated
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);
	}

	return children;
};

export default function App() {
	return (
		<BrowserRouter>
			<div className="flex">
				<div className="flex-1">
					<Routes>
						{/* Public routes */}
						<Route
							path="/login"
							element={<Login />}
						/>
						<Route
							path="/signup"
							element={<SignUp />}
						/>

						{/* Protected routes */}
						<Route
							path="/"
							element={
								<ProtectedRoute>
									<Dashboard />
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
