import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { useUtiles } from "./utils.context";
import { Product } from "./../api/productAPI";

const ProductContext = createContext();
const initialState = {
	name: "",
	description: "",
	categoryId: "",
	subcategoryId: "",
	colors: [
		{
			name: "",
			imgColor: null,
		},
	],
	sizeDetails: [
		{
			sizeName: "",
			price: "",
			quantities: [
				{
					colorName: "",
					quantity: "",
				},
			],
		},
	],
	imgs: [],
	imgCover: null,
	imgMeasurement: null,
	imgChart: null,
	isActive: true,
};

export function ProductProvider({ children }) {
	const {
		setIsLoading1,
		styleProduct,
		setMessage,
		Message,
	} = useUtiles();

	const [productInfo, dispatchProductInfo] =
		useReducer(
			// Reducer function

			(state, action) => {
				let newState;
				switch (action.type) {
					case "SET_PRODUCT_NAME":
						newState = {
							...state,
							name: action.payload,
						};
						break;

					case "SET_CATEGORY_ID":
						newState = {
							...state,
							categoryId: action.payload,
						};
						break;
					case "SET_SUBCATEGORY_ID":
						newState = {
							...state,
							subcategoryId: action.payload,
						};
						break;
					case "SET_DESCRIPTION":
						newState = {
							...state,
							description: action.payload,
						};
						break;
					case "ADD_COLOR_WITH_IMAGE":
						if (!action.payload) {
							return {
								...state,
								colors: [
									...state.colors,
									{
										name: "",
										imgColor: null,
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
												imgColor:
													action.payload
														.imgColor ??
													item.imgColor,
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
							sizeDetails: state.sizeDetails.map(
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
							sizeDetails: state.sizeDetails.map(
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
							sizeDetails: state.sizeDetails.map(
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
							sizeDetails:
								state.sizeDetails.filter(
									(_, index) =>
										index !==
										action.payload.index,
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
						return initialState;
					case "REMOVE_COLOR_QUANTITY":
						return {
							...state,
							sizeDetails: state.sizeDetails.map(
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
							sizeDetails: [
								...state.sizeDetails,
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
						newState = state;
				}
				return newState;
			},
			initialState,
		); // Pass initialState as second argument

	const [isUpdate, setIsUpdate] = useState(false);
	const [updateId, setUpdateId] = useState("");

	// update id
	useEffect(() => {
		if (updateId === "" || isUpdate === false) return;
		const getProduct = async () => {
			setIsLoading1(true);
			try {
				const response = await Product.getOne(
					updateId,
				);
				const data = response;
				dispatchProductInfo({
					type: "SET_PRODUCT_INFO",
					payload: {
						...data,
						imgs: [],
						imgCover: null,
						imgMeasurement: null,
						imgChart: null,
						colors:
							data.colors?.map((color) => ({
								...color,
								imgColor: null,
							})) || [],
					},
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
			}
		};
		getProduct();
	}, [
		updateId,
		dispatchProductInfo,
		setIsLoading1,
		isUpdate,
	]);
	const Values = {
		dispatchProductInfo,
		productInfo,
		styleProduct,
		isUpdate,
		setIsUpdate,
		updateId,
		setUpdateId,
		setMessage,
		Message,
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
