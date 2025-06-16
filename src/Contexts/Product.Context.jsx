import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import axios from "axios";
import { useUtiles } from "./utils.context";

const ProductContext = createContext();
const initialState = {
	name: "",
	categoryId: null,
	subcategoryId: null,
	description: "",
	colors: [
		{
			name: "",
			image: null,
		},
	],
	sizeDetails: [
		{
			sizeName: "",
			price: null,
			quantities: [
				{
					colorName: "",
					quantity: null,
				},
			],
		},
	],
	imgs: [],
	imgCover: null,
	imgMeasurement: null, // Fixed typo: imgMeasurment -> imgMeasurement
	imgChart: null,
	isActive: true,
};

const url = import.meta.env
	.VITE_RABBIT_PI_BASE_URL;
export function ProductProvider({ children }) {
	const { setIsLoading1, styleProduct } =
		useUtiles();

	const [productInfo, dispatchProductInfo] =
		useReducer(
			// Reducer function

			(state, action) => {
				switch (action.type) {
					case "SET_PRODUCT_NAME":
						return {
							...state,
							name: action.payload,
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
								colors: [
									...state.colors,
									{
										name: "",
										image: null,
									},
								],
							};
						}
						return {
							...state,
							colors: state.colors.map(
								(item, index) =>
									index === action.payload.index
										? {
												...item,
												name:
													action.payload.name ??
													item.name,
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
							colors: state.colors.filter(
								(_, index) =>
									index !== action.payload.index,
							),
						};
					case "ADD_SIZE_PRICE":
						return {
							...state,
							sizes: state.sizes.map(
								(item, index) =>
									index === action.payload.index
										? {
												...item,
												sizeName:
													action.payload
														.sizeName ??
													item.sizeName,
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
							sizes: state.sizes.map(
								(item, itemIndex) =>
									itemIndex ===
									action.payload.index
										? {
												...item,
												quantities:
													item.quantities.map(
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
							sizes: state.sizes.map(
								(item, index) =>
									index ===
									action.payload.variantIndex
										? {
												...item,
												sizeName:
													action.payload
														.sizeName ??
													item.sizeName,
												price:
													action.payload.price ??
													item.price,
												quantities: [
													...item.quantities,
													{
														colorName: "",
														quantity: null,
													},
												],
										  }
										: item,
							),
						};
					case "REMOVE_SIZE_QUANTITY_PRICE":
						return {
							...state,
							sizes: state.sizes.filter(
								(_, index) =>
									index !== action.payload.index,
							),
						};
					case "SET_IMGS":
						return {
							...state,
							imgs: action.payload,
						};
					case "SET_IMG_COVER":
						return {
							...state,
							imgCover: action.payload,
						};
					case "SET_IMG_MEASUREMENT":
						return {
							...state,
							imgMeasurement: action.payload, // Fixed typo in property name
						};
					case "SET_IMG_CHART":
						return {
							...state,
							imgChart: action.payload,
						};
					case "RESET_FORM":
						return {
							...initialState,
						};
					case "REMOVE_COLOR_QUANTITY":
						return {
							...state,
							sizes: state.sizes.map(
								(item, itemIndex) =>
									itemIndex ===
									action.payload.variantIndex
										? {
												...item,
												quantities:
													item.quantities.filter(
														(_, colorIndex) =>
															colorIndex !==
															action.payload
																.colorIndex,
													),
										  }
										: item,
							),
						};
					case "ADD_SIZE_VARIANT":
						return {
							...state,
							sizes: [
								...state.sizes,
								{
									sizeName: "",
									price: null,
									quantities: [
										{
											colorName: "",
											quantity: null,
										},
									],
								},
							],
						};
					case "SET_IMG_COLORS":
						return {
							...state,
							imgColors: action.payload,
						};
					case "SET_ACTIVE":
						return {
							...state,
							isActive: action.payload,
						};

					case "SET_PRODUCT_INFO":
						return {
							...state,
							...action.payload,
						};
					default:
						return state;
				}
			},
			initialState,
		); // Pass initialState as second argument

	const [isUpdate, setUpdate] = useState(false);
	const [updateId, setUpdateId] = useState("");
	// update id
	useEffect(() => {
		if (updateId === "") return;

		const fetchProduct = async () => {
			setIsLoading1(true);
			try {
				const response = await axios.get(
					`${url}/product/${updateId}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token",
							)}`,
							referrerPolicy: "unsafe-url",
						},
					},
				);
				const data = response.data;
				dispatchProductInfo({
					type: "SET_PRODUCT_INFO",
					payload: data,
				});
				dispatchProductInfo({
					type: "SET_CATEGORY_ID",
					payload: data.category.id,
				});
				dispatchProductInfo({
					type: "SET_SUBCATEGORY_ID",
					payload: data.subCategory.id,
				});
			} catch (error) {
				console.error(
					"Error fetching product data:",
					error,
				);
			} finally {
				setIsLoading1(false);
				console.log(productInfo);
			}
		};
		fetchProduct();
	}, [
		updateId,
		dispatchProductInfo,
		setIsLoading1,
	]);

	const Values = {
		dispatchProductInfo,
		productInfo,
		styleProduct,
		isUpdate,
		setUpdate,
		updateId,
		setUpdateId,
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
