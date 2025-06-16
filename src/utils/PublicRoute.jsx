import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/Auth.context";

const PublicRoute = ({ children }) => {
	const { isAuthenticated, loading } = useAuth();
	if (loading) return <div>Loading...</div>;
	if (isAuthenticated)
		return <Navigate to="/product" />;
	return children;
};

export default PublicRoute;
