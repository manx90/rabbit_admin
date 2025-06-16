import axios from "axios";
import {
	createContext,
	useContext,
	useState,
	useEffect,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] =
		useState(false);
	const [loading, setLoading] = useState(true);

	const checkToken = async (token) => {
		try {
			const res = await axios.get(
				"http://api.rabbit.ps/auth/isLoggedIn",
				{
					headers: {
						Authorization: `Bearer ${token}`,
						referrerPolicy: "unsafe-url",
					},
				},
			);
			return res.data;
		} catch {
			return false;
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setIsAuthenticated(false);
			setLoading(false);
			return;
		}
		checkToken(token).then((valid) => {
			if (!valid) {
				setIsAuthenticated(false);
			} else {
				setIsAuthenticated(true);
			}
			setLoading(false);
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				loading,
				checkToken,
				setIsAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
