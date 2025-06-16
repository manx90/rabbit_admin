import {
	createContext,
	useState,
	useContext,
	useEffect,
} from "react";

const UtilsContext = createContext();
export function UtilesProvider({ children }) {
	const [Message, setMessage] = useState({
		type: "",
		text: "",
	});
	const [isLoading1, setIsLoading1] =
		useState(false);
	const [isLoading2, setIsLoading2] =
		useState(false);

	const styleProduct = {
		level1:
			"bg-white rounded-2xl md:p-6 p-2 border shadow-sm hover:shadow-md transition-shadow duration-200",
		level2_1: "flex flex-col lg:flex-row gap-6",
		level2_2: "flex flex-col gap-4 mt-6",
		level3_1: "flex flex-col gap-4 w-full",
		Description: "flex flex-col gap-3 w-full",
		level4: "flex flex-col gap-2",
		select:
			"w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-700",
		label_1: "text-sm font-medium text-gray-700",
		input_1:
			"w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200",
		button:
			"w-full text-white bg-[#0095FF] hover:bg-blue-600 px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2",
		label_productImage:
			"inline-flex items-center gap-2 px-4 py-4 text-white bg-[#0095FF] hover:bg-blue-600 rounded-lg transition-colors duration-200 cursor-pointer",
		input_price:
			"w-full pl-8 pr-4 focus:outline-none py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200",
	};
	const values = {
		Message,
		setMessage,
		isLoading1,
		setIsLoading1,
		isLoading2,
		setIsLoading2,
		styleProduct,
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage({ type: "", text: "" });
		}, 5000);
		return () => clearTimeout(timer);
	}, [Message]);

	return (
		<UtilsContext.Provider value={values}>
			{children}
		</UtilsContext.Provider>
	);
}

export function useUtiles() {
	const context = useContext(UtilsContext);
	if (context === undefined) {
		throw new Error(
			"useUtiles must be used within a UtilesProvider",
		);
	}
	return context;
}
