import { useContext, createContext } from "react";
import { useProduct } from "./Product.Context";
import { useCategory } from "./Category.Context";
import { Product } from "../api/productAPI";

const UpdateContext = createContext();
export function UpdateProvider({ children }) {
	const {
		productInfo,
		dispatchProductInfo,
		updateId,
	} = useProduct();
	const { setMessage } = useProduct();
	const { mainCategoryProduct } = useCategory();

	const handleUpdate = async () => {
		try {
			const formData = new FormData();
			// Append product information
			if (productInfo.name) {
				formData.append("name", productInfo.name);
			}

			if (productInfo.description) {
				formData.append(
					"description",
					productInfo.description,
				);
			}

			// Find category and subcategory names from IDs
			const selectedCategory =
				mainCategoryProduct.find(
					(cat) =>
						cat.id === productInfo.categoryId,
				);
			const selectedSubCategory =
				selectedCategory?.subCategories?.find(
					(sub) =>
						sub.id === productInfo.subcategoryId,
				);

			if (selectedCategory) {
				formData.append(
					"categoryId",
					selectedCategory.id,
				);
			}
			if (selectedSubCategory) {
				formData.append(
					"subCategoryId",
					selectedSubCategory.id,
				);
			}

			// Add cover image if it exists
			if (productInfo.imgCover) {
				formData.append(
					"imgCover",
					productInfo.imgCover,
				);
			}

			// Add additional images if they exist
			if (productInfo.imgs?.length > 0) {
				productInfo.imgs.forEach((img) => {
					formData.append("images", img);
				});
			}

			// Add color images if they exist
			if (productInfo.colors?.length > 0) {
				productInfo.colors.forEach((color) => {
					if (color.imgColor) {
						formData.append(
							"imgColors",
							color.imgColor,
						);
					}
				});
			}

			// Add measurement image if it exists
			if (productInfo.imgMeasurement) {
				formData.append(
					"imgMeasure",
					productInfo.imgMeasurement,
				);
			}

			// Add chart image if it exists
			if (productInfo.imgChart) {
				formData.append(
					"imgSizeChart",
					productInfo.imgChart,
				);
			}

			// Add colors and their names if they exist
			if (productInfo.colors?.length > 0) {
				productInfo.colors.forEach(
					(color, colorIndex) => {
						if (color.name) {
							formData.append(
								`colors[${colorIndex}][name]`,
								color.name,
							);
						}
					},
				);
			}

			// Add sizes and their quantities if they exist
			if (productInfo.sizeDetails?.length > 0) {
				productInfo.sizeDetails.forEach(
					(size, sizeIndex) => {
						if (size.sizeName) {
							formData.append(
								`sizes[${sizeIndex}][sizeName]`,
								size.sizeName,
							);
						}
						if (size.price) {
							formData.append(
								`sizes[${sizeIndex}][price]`,
								size.price,
							);
						}

						if (size.quantities?.length > 0) {
							size.quantities.forEach(
								(quantity, qIndex) => {
									if (quantity.colorName) {
										formData.append(
											`sizes[${sizeIndex}][quantities][${qIndex}][colorName]`,
											quantity.colorName,
										);
									}
									if (quantity.quantity) {
										formData.append(
											`sizes[${sizeIndex}][quantities][${qIndex}][quantity]`,
											quantity.quantity,
										);
									}
								},
							);
						}
					},
				);
			}

			// Send the form data to your API

			const response = await Product.update(
				updateId,
				formData,
			);

			// Show success message
			setMessage({
				type: "success",
				text:
					response.message ||
					"Product updated successfully!",
			});

			// Reset the form after successful submission
			dispatchProductInfo({ type: "RESET_FORM" });
		} catch (error) {
			console.error(
				"Error updating product:",
				error,
			);
			setMessage({
				type: "error",
				text:
					error.message ||
					"An unexpected error occurred",
			});
		}
	};
	return (
		<UpdateContext.Provider
			value={{ handleUpdate }}
		>
			{children}
		</UpdateContext.Provider>
	);
}

export function useUpdate() {
	const context = useContext(UpdateContext);

	if (!context) {
		throw new Error(
			"useUpdate must be used within a UpdateProvider",
		);
	}

	return context;
}
