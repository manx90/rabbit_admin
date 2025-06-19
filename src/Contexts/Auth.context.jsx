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
				import.meta.env
					.VITE_RABBIT_PI_BASE_URL + "/auth/isLoggedin",
				{
					headers: {
						Authorization: `Bearer ${token}`,
						referrerPolicy: "unsafe-url",
					},
				},
			);
			return true
		} catch (error) {
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
			if (valid === false) {
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
