import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import axios from "axios";

const ProductContext = createContext();

export function ProductProvider({ children }) {
	const URL = "http://localhost:3003";
	const Category = useRef("");
	const [AddSub, setAddSub] = useState(false);
	const SubCategory = useRef("");
	const mainCategory = useRef("");
	const [isLoading2, setIsLoading2] =
		useState(false);
	const [isLoading1, setIsLoading1] =
		useState(false);
	const [Message, setMessage] = useState({
		type: "",
		text: "",
	});
	const [category, setCategory] = useState("");
	const [
		mainCategoryProduct,
		setMainCategoryProduct,
	] = useState([]);

	useEffect(() => {
		function addCategory(category) {
			if (category === null || category === "")
				return null;
			setIsLoading1(true);
			axios
				.post(`${URL}/category`, {
					category: category,
				})
				.then((res) => {
					setIsLoading1(false);
					setMessage({
						type: "success",
						text:
							res.data.message ||
							"Category added successfully!",
					});
				})
				.catch((error) => {
					setIsLoading1(false);
					setMessage({
						type: "error",
						text: error.response?.data?.message,
					});
				});
		}
		if (category !== "") addCategory(category);
		return () => {
			setTimeout(
				() => setMessage({ type: "", text: "" }),
				3500,
			);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category]);
	useEffect(() => {
		function getCategory() {
			axios
				.get(`${URL}/category`)
				.then((res) => {
					setIsLoading2(false);
					setMainCategoryProduct(res.data);
				})
				.catch(() => {
					setIsLoading2(false);
				});
		}
		getCategory();
	}, [
		setMessage,
		Message,
		setMainCategoryProduct,
	]);
	useEffect(() => {
		function addSubCategory() {
			axios
				.post(`${URL}/category/subcategory`, {
					categoryId: Category.current.value,
					name: SubCategory.current.value,
				})
				.then((res) => {
					setIsLoading2(false);
					setMessage({
						type: "success",
						text:
							res.data.message ||
							"SubCategory added successfully!",
					});
					setAddSub(false);
				})
				.catch((error) => {
					setIsLoading2(false);
					setMessage({
						type: "error",
						text:
							error.response?.data?.message ||
							error.message,
					});
					setAddSub(false);
				});
		}
		if (AddSub === false) return;
		if (AddSub === true) addSubCategory();
		return () => {
			setTimeout(
				() => setMessage({ type: "", text: "" }),
				3500,
			);
		};
	}, [AddSub, setAddSub, setMessage]);
	const Values = {
		category,
		setCategory,
		mainCategoryProduct,
		setMainCategoryProduct,
		isLoading2,
		isLoading1,
		setIsLoading1,
		setIsLoading2,
		Message,
		setMessage,
		mainCategory,
		AddSub,
		setAddSub,
		SubCategory,
	};
	return (
		<ProductContext.Provider value={Values}>
			{children}
		</ProductContext.Provider>
	);
}
// eslint-disable-next-line react-refresh/only-export-components
export function useProduct() {
	const context = useContext(ProductContext);
	if (context === undefined) {
		throw new Error(
			"useProduct must be used within a ProductProvider",
		);
	}
	return context;
}
