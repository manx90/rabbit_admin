import {
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import axios from "axios";
import { useUtiles } from "./utils.context";
import { Category } from "../api/cateogryApi";

const url = import.meta.env
	.VITE_RABBIT_PI_BASE_URL;
const CategoryContext = createContext();
export function CategoryProvider({ children }) {
	const {
		Message,
		setMessage,
		setIsLoading1,
		setIsLoading2,
	} = useUtiles();
	const [AddSub, setAddSub] = useState(false);
	const [SubCategory, setSubCategory] =
		useState("");
	const [AddCategory, setAddCategory] =
		useState("");
	const [MainCategory, setMainCategory] =
		useState("");

	const [
		mainCategoryProduct,
		setMainCategoryProduct,
	] = useState([]);

	// for Main Category Adding
	useEffect(() => {
		function addCategory() {
			if (
				AddCategory === null ||
				AddCategory === ""
			)
				return null;
			setIsLoading1(true);
			axios
				.post(
					`${url}/category`,
					{
						name: AddCategory,
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token",
							)}`,
							referrerPolicy: "unsafe-url",
						},
					},
				)
				.then((res) => {
					setIsLoading1(false);
					setAddCategory("");
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
		if (AddCategory !== "") addCategory();
		return () => {
			setTimeout(
				() => setMessage({ type: "", text: "" }),
				3500,
			);
		};
	}, [AddCategory, setIsLoading1, setMessage]);

	// for Main Category Getting
	useEffect(() => {
		function getCategory() {
			axios
				.get(`${url}/category`)
				.then((res) => {
					setIsLoading2(false);
					setMainCategoryProduct(res.data);
					console.log(res.data);
				})
				.catch(() => {
					setIsLoading2(false);
				});
		}
		getCategory();
	}, [setMainCategoryProduct, setIsLoading2]);

	// for SubCategory Adding
	useEffect(() => {
		function addSubCategory() {
			const response = Category.createSubCategory(
				{
					name: SubCategory,
					categoryId: MainCategory,
				},
			);
			response
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
	}, [
		AddSub,
		SubCategory,
		MainCategory,
		setAddSub,
		setMessage,
		setIsLoading2,
	]);

	return (
		<CategoryContext.Provider
			value={{
				AddSub,
				setAddSub,
				SubCategory,
				setSubCategory,
				AddCategory,
				setAddCategory,
				MainCategory,
				setMainCategory,
				mainCategoryProduct,
				setMainCategoryProduct,
			}}
		>
			{children}
		</CategoryContext.Provider>
	);
}

export function useCategory() {
	const context = useContext(CategoryContext);
	if (context === undefined) {
		throw new Error(
			"useCategory must be used within a CategoryProvider",
		);
	}
	return context;
}
