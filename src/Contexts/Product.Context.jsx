import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import axios from "axios";
import FormData from "form-data";

const ProductContext = createContext();

const initialState = {
	ProductName: "",
	categoryId: null,
	subcategoryId: null,
	description: "",
	ImgWithColor: [
		{
			colorName: "",
			img: null,
			image: null,
		},
	],
	SizeQuantityPrice: [
		{
			size: "",
			price: null,
			ColorQuantity: [
				{
					colorName: "",
					quantity: null,
				},
			],
		},
	],
	imgs: [],
	imgCover: null,
	imgMeasurment: null,
	imgChart: null,
};

export function ProductProvider({ children }) {
	const styleProduct = {
		level1:
			"bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200",
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
	const [productInfo, dispatchProductInfo] =
		useReducer((state, action) => {
			switch (action.type) {
				case "SET_PRODUCT_NAME":
					return {
						...state,
						ProductName: action.payload,
					};
				case "SET_CATEGORY_ID":
					return {
						...state,
						categoryId: action.payload,
					};
				case "SET_SUBCATEGORY_ID":
					return {
						...state,
						subcategoryId: action.payload,
					};
				case "SET_DESCRIPTION":
					return {
						...state,
						description: action.payload,
					};
				case "ADD_COLOR_WITH_IMAGE":
					if (!action.payload) {
						return {
							...state,
							ImgWithColor: [
								...state.ImgWithColor,
								{
									colorName: "",
									img: null,
									image: null,
								},
							],
						};
					}
					return {
						...state,
						ImgWithColor: state.ImgWithColor.map(
							(item, index) =>
								index === action.payload.index
									? {
											...item,
											colorName:
												action.payload
													.colorName ??
												item.colorName,
											img:
												action.payload.img ??
												item.img,
											image:
												action.payload.image ??
												item.image,
									  }
									: item,
						),
					};
				case "REMOVE_COLOR_WITH_IMAGE":
					return {
						...state,
						ImgWithColor:
							state.ImgWithColor.filter(
								(_, index) =>
									index !== action.payload.index,
							),
					};
				case "ADD_SIZE_PRICE":
					return {
						...state,
						SizeQuantityPrice:
							state.SizeQuantityPrice.map(
								(item, index) =>
									index === action.payload.index
										? {
												...item,
												size:
													action.payload.size ??
													item.size,
												price:
													action.payload.price ??
													item.price,
										  }
										: item,
							),
					};

				case "ADD_COLOR_QUANTITY_VALUE":
					return {
						...state,
						SizeQuantityPrice:
							state.SizeQuantityPrice.map(
								(item, itemIndex) =>
									itemIndex ===
									action.payload.index
										? {
												...item,
												ColorQuantity:
													item.ColorQuantity.map(
														(
															colorItem,
															colorIndex,
														) =>
															colorIndex ===
															action.payload
																.colorIndex
																? {
																		colorName:
																			action
																				.payload
																				.colorName ??
																			colorItem.colorName,
																		quantity:
																			action
																				.payload
																				.value ??
																			colorItem.quantity,
																  }
																: colorItem,
													),
										  }
										: item,
							),
					};
				case "ADD_ANOTHER_COLOR_QUANTITY":
					return {
						...state,
						SizeQuantityPrice:
							state.SizeQuantityPrice.map(
								(item) => ({
									...item,
									ColorQuantity: [
										...item.ColorQuantity,
										{
											colorName: "",
											quantity: null,
										},
									],
								}),
							),
					};
				case "REMOVE_SIZE_QUANTITY_PRICE":
					return {
						...state,
						SizeQuantityPrice:
							state.SizeQuantityPrice.filter(
								(_, index) =>
									index !== action.payload.index,
							),
					};
				case "SET_IMGS":
					return {
						...state,
						imgs: action.payload
					};
				case "SET_IMG_COVER":
					return {
						...state,
						imgCover: action.payload,
					};
				case "SET_IMG_MEASUREMENT":
					return {
						...state,
						imgMeasurment: action.payload,
					};
				case "SET_IMG_CHART":
					return {
						...state,
						imgChart: action.payload,
					};
				case "REMOVE_COLOR_QUANTITY":
					return {
						...state,
						SizeQuantityPrice: state.SizeQuantityPrice.map((item, itemIndex) =>
							itemIndex === action.payload.variantIndex
								? {
									...item,
									ColorQuantity: item.ColorQuantity.filter(
										(_, colorIndex) => colorIndex !== action.payload.colorIndex
									),
								}
								: item
						),
					};
				case "ADD_SIZE_VARIANT":
					return {
						...state,
						SizeQuantityPrice: [
							...state.SizeQuantityPrice,
							{
								size: "",
								price: null,
								ColorQuantity: [
									{
										colorName: "",
										quantity: null,
									},
								],
							},
						],
					};
				default:
					return state;
			}
		}, initialState);

	const url = "http://localhost:3003";
	const [Category, setcategory] = useState("");
	const [AddSub, setAddSub] = useState(false);
	const [SubCategory, setSubCategory] =
		useState("");
	const [mainCategory, setMainCategory] =
		useState();
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

	// handler

	// const handleInfoChange = (name, value) => {
	// 	setProductInfo((prevInfo) => {
	// 		return {
	// 			...prevInfo,
	// 			[name]: value,
	// 		};
	// 	});
	// };
	// const handleImgWithColorAdd = () => {
	// 	setProductInfo((prev) => ({
	// 		...prev,
	// 		ImgWithColor: [
	// 			...prev.ImgWithColor,
	// 			{
	// 				colorName: "",
	// 				img: null,
	// 			},
	// 		],
	// 	}));
	// };
	// // const handleImgWithColorChange = (
	// // 	index,
	// // 	field,
	// // 	value,
	// // ) => {
	// // 	let imagePreview = null;
	// // 	if (field === "img") {
	// // 		imagePreview = URL.createObjectURL(value);
	// // 	}
	// // 	setProductInfo((prev) => {
	// // 		const updatedColors = [
	// // 			...prev.ImgWithColor,
	// // 		];
	// // 		updatedColors[index] = {
	// // 			...updatedColors[index],
	// // 			[field]: value,
	// // 			...(field === "img"
	// // 				? { image: imagePreview }
	// // 				: {}),
	// // 		};

	// // 		return {
	// // 			...prev,
	// // 			ImgWithColor: updatedColors,
	// // 		};
	// // 	});

	// // 	if (imagePreview) {
	// // 		URL.revokeObjectURL(imagePreview); // optional cleanup
	// // 	}

	// // 	console.log(ProductInfo);
	// // };
	// const handleImgWithColorChange = (
	// 	index,
	// 	field,
	// 	value,
	// ) => {
	// 	// Early return for invalid inputs
	// 	if (
	// 		index < 0 ||
	// 		field === undefined ||
	// 		value === undefined
	// 	) {
	// 		console.error(
	// 			"Invalid inputs to handleImgWithColorChange",
	// 		);
	// 		return;
	// 	}

	// 	// Only create object URL for file objects
	// 	let imagePreview = null;
	// 	if (
	// 		field === "img" &&
	// 		value instanceof File
	// 	) {
	// 		imagePreview = URL.createObjectURL(value);
	// 	}

	// 	setProductInfo((prev) => {
	// 		// Make sure ImgWithColor exists and is an array
	// 		const currentColors = Array.isArray(
	// 			prev.ImgWithColor,
	// 		)
	// 			? prev.ImgWithColor
	// 			: [];

	// 		// Create a deep copy of the array
	// 		const updatedColors = [...currentColors];

	// 		// Update the specific item
	// 		updatedColors[index] = {
	// 			...updatedColors[index],
	// 			[field]: value,
	// 			...(imagePreview
	// 				? { image: imagePreview }
	// 				: {}),
	// 		};

	// 		const newState = {
	// 			...prev,
	// 			ImgWithColor: updatedColors,
	// 		};

	// 		// For debugging only - remove in production
	// 		console.log("Updated state:", newState);

	// 		return newState;
	// 	});

	// 	// Only revoke URL for image fields
	// 	if (field === "img" && imagePreview) {
	// 		// Move URL revocation outside of render cycle
	// 		setTimeout(() => {
	// 			URL.revokeObjectURL(imagePreview);
	// 		}, 100);
	// 	}
	// };
	// const handleImgWithColorRemoveImg = (index) => {
	// 	setProductInfo((prev) => ({
	// 		...prev,
	// 		ImgWithColor: prev.ImgWithColor.map(
	// 			(img, i) =>
	// 				i === index
	// 					? { ...img, img: null }
	// 					: img,
	// 		),
	// 	}));
	// };
	// const handleImgWithColorRemove = (index) => {
	// 	setProductInfo((prev) => ({
	// 		...prev,
	// 		ImgWithColor: prev.ImgWithColor.filter(
	// 			(img, i) => i !== index,
	// 		),
	// 	}));
	// };

	// Form data
	const Form = new FormData();

	// useEffect(() => {
	// 	async function createProduct() {
	// 		Form.append(
	// 			"name",
	// 			ProductInfo[0].ProductName,
	// 		);
	// 	}

	// 	createProduct();

	// 	// Clear message after 3.5 seconds
	// 	const timer = setTimeout(() => {
	// 		setMessage({ type: "", text: "" });
	// 	}, 3500);
	// 	console.log(productInfo);

	// 	return () => clearTimeout(timer);
	// }, []);

	// for Category Adding
	useEffect(() => {
		function addCategory(category) {
			if (category === null || category === "")
				return null;
			setIsLoading1(true);
			axios
				.post(`${url}/category`, {
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
	}, [category]);

	// for Main Category Getting
	useEffect(() => {
		function getCategory() {
			axios
				.get(`${url}/category`)
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
		setMainCategoryProduct,
		Message,
	]);

	// for SubCategory Adding
	useEffect(() => {
		function addSubCategory() {
			axios
				.post(`${url}/category/subcategory`, {
					categoryId: mainCategory,
					name: SubCategory,
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
	}, [
		AddSub,
		SubCategory,
		mainCategory,
		setAddSub,
		setMessage,
	]);

	const Values = {
		// handleInfoChange,
		// handleImgWithColorRemoveImg,
		// handleImgWithColorRemove,
		category,
		setCategory,
		mainCategoryProduct,
		setMainCategoryProduct,
		// handleImgWithColorAdd,
		isLoading2,
		isLoading1,
		setIsLoading1,
		// handleImgWithColorChange,
		setIsLoading2,
		Message,
		setMessage,
		mainCategory,
		AddSub,
		setAddSub,
		SubCategory,
		dispatchProductInfo,
		productInfo,
		// setVariants,
		// variants,
		// colorInputs,
		// setColorInputs,
		// ProductInfo,
		// setProductInfo,
		styleProduct,
		setcategory,
		setSubCategory,
		setMainCategory,
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
