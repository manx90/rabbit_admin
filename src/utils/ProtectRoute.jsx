import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/Auth.context";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, loading } = useAuth();
	if (loading) return <div>Loading...</div>;
	if (!isAuthenticated)
		return <Navigate to="/login" />;
	return children;
};

export default ProtectedRoute;
