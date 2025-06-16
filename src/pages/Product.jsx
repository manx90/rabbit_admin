import Table from "../components/Table";
import { HeaderProduct } from "../components/HeaderProduct";
import { SubCategory } from "../components/SubCategory";
import { MainCategory } from "../components/MainCategory";
import { Products } from "../components/ProductPart";
import {
	ProductProvider,
	useProduct,
} from "../Contexts/Product.Context";
import UploadImages from "../components/ui/uplaodImage";

export default function Product() {
	const { isUpdate, productInfo } = useProduct();
	return (
		<ProductProvider>
			<div className="ContentPage">
				{/* Main Content */}
				<Message />
				<div className="flex-1 overflow-auto">
					<div className="relative md:p-6 p-2 space-y-6 overflow-x-hidden">
						<div className="animate-fadeIn">
							<HeaderProduct
								title={"Categories"}
								AddNew={false}
							/>
						</div>
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 animate-slideUp">
							<MainCategory />
							<SubCategory />
						</div>
						<div className="animate-fadeIn">
							<HeaderProduct title={"Products"} />
						</div>
						<div className="animate-slideUp">
							<Products />
						</div>
						<div className="animate-fadeIn flex flex-wrap flex-col md:flex-row gap-6">
							<UploadImages
								name="imgCover"
								multiple={false}
								borderColor="border-red-500"
								type="SET_IMG_COVER"
								productInfo={productInfo}
							/>
							<UploadImages
								name="imgs"
								multiple={true}
								borderColor="border-blue-500"
								type="SET_IMGS"
								productInfo={productInfo}
							/>
							<UploadImages
								name="imgMeasurement"
								multiple={false}
								borderColor="border-green-500"
								type="SET_IMG_MEASUREMENT"
								productInfo={productInfo}
							/>
							<UploadImages
								name="imgSize"
								multiple={false}
								borderColor="border-yellow-500"
								type="SET_IMG_CHART"
								productInfo={productInfo}
							/>
						</div>
						<div className="animate-slideUp">
							{isUpdate ? (
								<UpdateCancel />
							) : (
								<SaveCancel />
							)}
						</div>
						<div className="animate-fadeIn">
							<HeaderProduct
								title={"Products List"}
							/>
						</div>
						<div className="animate-slideUp">
							<Table />
						</div>
					</div>
				</div>
			</div>
		</ProductProvider>
	);
}

function Message() {
	const { Message } = useProduct();
	return (
		<>
			{Message && Message.text !== "" && (
				<div
					className={`p-4 rounded-lg ${
						Message.type === "success"
							? "absolute top-5 right-15  z-10 bg-green-100 text-green-700 border border-green-200 transition duration-300 ease-in-out"
							: "absolute top-5 right-15  z-10 bg-red-100 text-red-700 border border-red-200 transition duration-300 ease-in-out"
					}`}
				>
					<div className="flex items-center gap-2">
						{Message.type === "success" ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
						)}
						<span>{Message.text}</span>
					</div>
				</div>
			)}
		</>
	);
}

function SaveCancel() {
	const {
		productInfo,
		dispatchProductInfo,
		mainCategoryProduct,
		setMessage,
	} = useProduct();

	const handleSave = async () => {
		try {
			const formData = new FormData();

			// Append product information
			formData.append(
				"name",
				productInfo.ProductName,
			);
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
			if (
				productInfo.imgs &&
				productInfo.imgs.length > 0
			) {
				productInfo.imgs.forEach((img) => {
					formData.append("images", img);
				});
			}
			// Add color images
			if (
				productInfo.colors &&
				productInfo.colors.length > 0
			) {
				productInfo.colors.map((color) => {
					formData.append(
						"imgColors",
						color.image,
					);
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
			// Add color images with their names and sizes
			// Add colors and images
			if (
				productInfo.colors &&
				productInfo.colors.length > 0
			) {
				productInfo.colors.map(
					(color, colorIndex) => {
						formData.append(
							`colors[${colorIndex}][name]`,
							color.name,
						);
					},
				);
			}
			// Add sizes and their quantities
			if (
				productInfo.sizes &&
				productInfo.sizes.length > 0
			) {
				productInfo.sizes.map(
					(size, sizeIndex) => {
						formData.append(
							`sizes[${sizeIndex}][sizeName]`,
							size.sizeName,
						);
						formData.append(
							`sizes[${sizeIndex}][price]`,
							size.price,
						);

						if (
							size.quantities &&
							size.quantities.length > 0
						) {
							size.quantities.map(
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
			for (var pair of formData.entries()) {
				console.log(pair[0] + ": " + pair[1]);
			}
			// Send the form data to your API
			const response = await fetch(
				"http://api.rabbit.ps/product",
				{
					method: "POST",
					body: formData,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token",
						)}`,
						referrerPolicy: "unsafe-url",
					},
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				console.log(errorData);
				setMessage({
					type: "error",
					text:
						errorData.message ||
						"Failed to save product",
				});
				return;
			}

			setMessage({
				type: "success",
				text: "Product saved successfully!",
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
					error.response?.data?.message ||
					error.message,
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

function UpdateCancel() {
	const {
		updateId,
		productInfo,
		dispatchProductInfo,
		mainCategoryProduct,
		setMessage,
	} = useProduct();
	const FormUpdate = new FormData();
	const handleUpdate = async () => {
		try {
			const formData = new FormData();

			// Append product information
			formData.append(
				"name",
				productInfo.ProductName,
			);
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
			if (
				productInfo.imgs &&
				productInfo.imgs.length > 0
			) {
				productInfo.imgs.forEach((img) => {
					formData.append("images", img);
				});
			}
			// Add color images
			if (
				productInfo.colors &&
				productInfo.colors.length > 0
			) {
				productInfo.colors.map((color) => {
					formData.append(
						"imgColors",
						color.image,
					);
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
			// Add color images with their names and sizes
			// Add colors and images
			if (
				productInfo.colors &&
				productInfo.colors.length > 0
			) {
				productInfo.colors.map(
					(color, colorIndex) => {
						formData.append(
							`colors[${colorIndex}][name]`,
							color.name,
						);
					},
				);
			}
			// Add sizes and their quantities
			if (
				productInfo.sizes &&
				productInfo.sizes.length > 0
			) {
				productInfo.sizes.map(
					(size, sizeIndex) => {
						formData.append(
							`sizes[${sizeIndex}][sizeName]`,
							size.sizeName,
						);
						formData.append(
							`sizes[${sizeIndex}][price]`,
							size.price,
						);

						if (
							size.quantities &&
							size.quantities.length > 0
						) {
							size.quantities.map(
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
			for (var pair of formData.entries()) {
				console.log(pair[0] + ": " + pair[1]);
			}
			// Send the form data to your API
			const response = await fetch(
				"http://api.rabbit.ps/product/" +
					updateId,
				{
					method: "PUT",
					body: formData,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token",
						)}`,
						referrerPolicy: "unsafe-url",
					},
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				console.log(errorData);
				setMessage({
					type: "error",
					text:
						errorData.message ||
						"Failed to save product",
				});
				return;
			}

			setMessage({
				type: "success",
				text: "Product saved successfully!",
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
					error.response?.data?.message ||
					error.message,
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
				onClick={handleUpdate}
			>
				Update
			</button>
		</div>
	);
}
