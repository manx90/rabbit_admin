import { useProduct } from "../Contexts/Product.Context";
import { useCategory } from "../Contexts/Category.Context";
import { Product } from "../api/productAPI";
export default function SaveCancel() {
	const {
		productInfo,
		dispatchProductInfo,
		setMessage,
	} = useProduct();
	const { mainCategoryProduct } = useCategory();

	const validateFormData = () => {
		console.log(
			"Validating product info:",
			productInfo,
		);

		if (!productInfo.name?.trim()) {
			setMessage({
				type: "error",
				text: "Product name is required",
			});
			return false;
		}
		if (!productInfo.categoryId) {
			setMessage({
				type: "error",
				text: "Category is required",
			});
			return false;
		}
		if (!productInfo.subcategoryId) {
			setMessage({
				type: "error",
				text: "Subcategory is required",
			});
			return false;
		}
		return true;
	};

	const handleSave = async () => {
		try {
			if (!validateFormData()) return;
			const formData = new FormData();
			// Append product information
			formData.append("name", productInfo.name);
			formData.append(
				"description",
				productInfo.description,
			);
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

			// Add cover image
			if (productInfo.imgCover) {
				formData.append(
					"imgCover",
					productInfo.imgCover,
				);
			}

			// Add additional images
			if (productInfo.imgs?.length > 0) {
				productInfo.imgs.forEach((img) => {
					formData.append("images", img);
				});
			}

			// Add color images
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
			// Add measurement image
			if (productInfo.imgMeasurement) {
				formData.append(
					"imgMeasure",
					productInfo.imgMeasurement,
				);
			}
			// Add chart image
			if (productInfo.imgChart) {
				formData.append(
					"imgSizeChart",
					productInfo.imgChart,
				);
			}
			// Add colors and their names
			if (productInfo.colors?.length > 0) {
				productInfo.colors.forEach(
					(color, colorIndex) => {
						formData.append(
							`colors[${colorIndex}][name]`,
							color.name,
						);
					},
				);
			}

			// Add sizes and their quantities
			if (productInfo.sizeDetails?.length > 0) {
				productInfo.sizeDetails.forEach(
					(size, sizeIndex) => {
						formData.append(
							`sizes[${sizeIndex}][sizeName]`,
							size.sizeName,
						);
						formData.append(
							`sizes[${sizeIndex}][price]`,
							size.price,
						);

						if (size.quantities?.length > 0) {
							size.quantities.forEach(
								(quantity, qIndex) => {
									formData.append(
										`sizes[${sizeIndex}][quantities][${qIndex}][colorName]`,
										quantity.colorName,
									);
									formData.append(
										`sizes[${sizeIndex}][quantities][${qIndex}][quantity]`,
										quantity.quantity,
									);
								},
							);
						}
					},
				);
			}

			// Log the form data before sending
			for (let pair of formData.entries()) {
				console.log(pair[0] + ": " + pair[1]);
			}

			// Send the form data to your API
			const response = await Product.create(
				formData,
			);
			if (!response) {
				throw new Error("Failed to save product");
			}
			// Show success message
			setMessage({
				type: "success",
				text:
					response.message ||
					"Product saved successfully!",
			});
			// Reset the form after successful submission
			dispatchProductInfo({ type: "RESET_FORM" });
		} catch (error) {
			console.error(
				"Error saving product:",
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
		<div className="flex self-end gap-5">
			<button
				className="text-white hover:scale-105 bg-red-600 px-5 rounded-lg max-w-[8em] h-full py-3.5 self-end"
				onClick={() => {
					dispatchProductInfo({
						type: "RESET_FORM",
					});
					setMessage({
						type: "success",
						text: "Form reset successfully",
					});
				}}
			>
				Cancel
			</button>
			<button
				className="text-white bg-[#0095FF] px-5 rounded-lg max-w-[8em] h-full py-3.5 self-end hover:scale-105"
				onClick={handleSave}
			>
				Save
			</button>
		</div>
	);
}
