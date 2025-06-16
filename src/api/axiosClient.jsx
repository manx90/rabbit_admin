import axios from "axios";

const axiosClient = axios.create({
	baseURL: import.meta.env
		.VITE_RABBIT_PI_BASE_URL,
	headers: {
		Authorization: `Bearer ${localStorage.getItem(
			"token",
		)}`,
		referrerPolicy: "unsafe-url",
	},
});

export default axiosClient;
