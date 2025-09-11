import axios from "axios";
const axiosClient = axios.create({
	baseURL: import.meta.env
		.VITE_RABBIT_PI_BASE_URL,
	headers: {
		referrerPolicy: "unsafe-url",
	},
});

// Request interceptor
axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor
axiosClient.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			const status = error.response.status;
			const data = error.response.data;

			// Handle specific error cases
			if (status === 429) {
				console.error(
					"Rate limit exceeded. Please try again later.",
				);
				return Promise.reject(
					new Error(
						"Too many requests. Please try again later.",
					),
				);
			} else if (status === 500) {
				console.error("Server error:", data);
				return Promise.reject(
					new Error(
						"Server error. Please try again later.",
					),
				);
			} else if (status === 401) {
				console.error(
					"Unauthorized. Please login again.",
				);
				// Optionally redirect to login
				return Promise.reject(
					new Error(
						"Unauthorized. Please login again.",
					),
				);
			}

			console.error("Response Error:", data);
			return Promise.reject(data);
		} else if (error.request) {
			// The request was made but no response was received
			console.error(
				"Request Error:",
				error.request,
			);
			return Promise.reject(
				new Error(
					"No response received from server",
				),
			);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.error("Error:", error.message);
			return Promise.reject(error);
		}
	},
);

export default axiosClient;
