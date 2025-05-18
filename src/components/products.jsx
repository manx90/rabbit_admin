import { useState } from "react";

export function Products() {
	const style = {
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
		// select:
		// 	"w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200",
		button:
			"w-full text-white bg-[#0095FF] hover:bg-blue-600 px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2",
		label_productImage:
			"inline-flex items-center gap-2 px-4 py-4 text-white bg-[#0095FF] hover:bg-blue-600 rounded-lg transition-colors duration-200 cursor-pointer",
		input_price:
			"w-full pl-8 pr-4 focus:outline-none py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200",
	};
	const [colorInputs, setColorInputs] = useState([
		{ id: Date.now(), image: null, color: "" },
	]);
	return (
		<div>
			<div className={style.level1}>
				<InfoProduct style={style} />
				<UploadImageColors
					colorInputs={colorInputs}
					setColorInputs={setColorInputs}
					style={style}
				/>
				<ColorWithSizes
					colorInputs={colorInputs}
					style={style}
				/>
			</div>
		</div>
	);
}

function InfoProduct({ style }) {
	return (
		<div className={style.level2_1}>
			<div className={style.level3_1}>
				<div className={style.level4}>
					<label
						htmlFor="productName"
						className={style.label}
					>
						Name
					</label>
					<input
						type="text"
						id="productName"
						className={style.input_1}
						placeholder="Enter product name"
					/>
				</div>
				<div className={style.level4}>
					<label
						htmlFor="category"
						className={style.label}
					>
						Category
					</label>
					<select
						id="category"
						className={style.select}
					>
						<option value="">
							Select Category
						</option>
						<option value="Men">Men</option>
						<option value="Women">Women</option>
						<option value="Kids">Kids</option>
						<option value="Accessories">
							Accessories
						</option>
					</select>
				</div>
				<div className={style.level4}>
					<label
						htmlFor="subCategory"
						className="text-sm font-medium text-gray-700"
					>
						Sub Category
					</label>
					<select
						id="subCategory"
						className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-700"
					>
						<option value="">
							Select Sub Category
						</option>
						<option value="Shirt">Shirt</option>
						<option value="Pants">Pants</option>
						<option value="Dress">Dress</option>
						<option value="Skirt">Skirt</option>
						<option value="Jacket">Jacket</option>
					</select>
				</div>
			</div>
			<div className={style.Description}>
				<label
					htmlFor="description"
					className="text-sm font-medium text-gray-700"
				>
					Description
				</label>
				<textarea
					id="description"
					rows="8"
					className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
					placeholder="Enter product description"
				/>
			</div>
		</div>
	);
}

function ColorWithSizes({ style, colorInputs }) {
	const [variants, setVariants] = useState([
		{
			size: "",
			price: "",
			colorQuantities: [
				{ colorId: "", quantity: "" },
			],
		},
	]);

	// Handle change for size or price
	const handleVariantChange = (
		index,
		field,
		value,
	) => {
		const updated = [...variants];
		updated[index][field] = value;
		setVariants(updated);
	};

	// Handle change for color or quantity in a specific size
	const handleColorChange = (
		variantIndex,
		colorIndex,
		field,
		value,
	) => {
		const updated = [...variants];
		updated[variantIndex].colorQuantities[
			colorIndex
		][field] = value;
		setVariants(updated);
	};

	const addColorQuantity = (variantIndex) => {
		const updated = [...variants];
		updated[variantIndex].colorQuantities.push({
			colorId: "",
			quantity: "",
		});
		setVariants(updated);
	};

	const removeColorQuantity = (
		variantIndex,
		colorIndex,
	) => {
		const updated = [...variants];
		updated[variantIndex].colorQuantities.splice(
			colorIndex,
			1,
		);
		setVariants(updated);
	};

	const addVariant = () => {
		setVariants([
			...variants,
			{
				size: "",
				price: "",
				colorQuantities: [
					{ colorId: "", quantity: "" },
				],
			},
		]);
	};
	const removeVariant = (index) => {
		const updated = [...variants];
		updated.splice(index, 1);
		setVariants(updated);
	};
	return (
		<div className={style.level2_2}>
			{variants.map((variant, variantIndex) => (
				<div
					key={variantIndex}
					className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border border-gray-200 p-4 rounded mb-4"
				>
					<button
						onClick={() =>
							removeVariant(variantIndex)
						}
						className="absolute top-2 right-2 px-2 cursor-pointer bg-amber-50 rounded-lg text-red-500 hover:text-red-600 transition duration-200 ease-in-out"
					>
						remove
					</button>
					{/* Size input */}
					<div className={style.level4}>
						<label
							htmlFor={`size-${variantIndex}`}
							className={style.label_1}
						>
							Size
						</label>
						<input
							type="text"
							id={`size-${variantIndex}`}
							placeholder="Enter size"
							className={style.input_1}
							value={variant.size}
							onChange={(e) =>
								handleVariantChange(
									variantIndex,
									"size",
									e.target.value,
								)
							}
						/>
					</div>

					{/* Price input */}
					<div className={style.level4}>
						<label
							htmlFor={`price-${variantIndex}`}
							className={style.label_1}
						>
							Price
						</label>
						<input
							type="number"
							id={`price-${variantIndex}`}
							min="0"
							step="0.01"
							placeholder="0.00"
							className={style.input_price}
							value={variant.price}
							onChange={(e) =>
								handleVariantChange(
									variantIndex,
									"price",
									e.target.value,
								)
							}
						/>
					</div>

					{/* Colors and quantities */}
					<div className="col-span-2">
						<label className={style.label_1}>
							Colors & Quantities
						</label>
						{variant.colorQuantities.map(
							(item, colorIndex) => (
								<div
									key={colorIndex}
									className="flex gap-2 mb-2"
								>
									<select
										className={style.select}
										value={item.colorId}
										onChange={(e) =>
											handleColorChange(
												variantIndex,
												colorIndex,
												"colorId",
												e.target.value,
											)
										}
									>
										<option value="">
											Select Color
										</option>
										{colorInputs.map((input) => (
											<option
												key={input.id}
												value={input.id}
											>
												{input.color}
											</option>
										))}
									</select>
									<input
										type="number"
										min="0"
										placeholder="Quantity"
										className={style.input_1}
										value={item.quantity}
										onChange={(e) =>
											handleColorChange(
												variantIndex,
												colorIndex,
												"quantity",
												e.target.value,
											)
										}
									/>
									{variant.colorQuantities
										.length > 1 && (
										<button
											type="button"
											className="text-red-600 cursor-pointer hover:text-red-700  transition-all duration-500 ease-in-out bg-red-100 px-2 rounded hover:bg-red-200 "
											onClick={() =>
												removeColorQuantity(
													variantIndex,
													colorIndex,
												)
											}
										>
											Remove
										</button>
									)}
								</div>
							),
						)}
						<button
							type="button"
							onClick={() =>
								addColorQuantity(variantIndex)
							}
							className={`${style.button} mt-2 hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out  px-4 py-2 rounded-lg cursor-pointer`}
						>
							Add Color & Quantity
						</button>
					</div>
				</div>
			))}

			{/* Add new size variant */}
			<div className="flex justify-start">
				<button
					type="button"
					className={style.button}
					onClick={addVariant}
				>
					Add Variant (Size)
				</button>
			</div>
		</div>
	);
}

function UploadImageColors({
	style,
	colorInputs,
	setColorInputs,
}) {
	const handleAddColor = () => {
		setColorInputs((prev) => [
			...prev,
			{ id: Date.now(), image: null, color: "" },
		]);
	};

	const handleDeleteColor = (idToDelete) => {
		setColorInputs((prev) =>
			prev.filter(
				(input) => input.id !== idToDelete,
			),
		);
	};

	const handleImageChange = (id, event) => {
		if (
			event.target.files &&
			event.target.files[0]
		) {
			const imageUrl = URL.createObjectURL(
				event.target.files[0],
			);
			setColorInputs((prev) =>
				prev.map((input) =>
					input.id === id
						? { ...input, image: imageUrl }
						: input,
				),
			);
		}
	};

	const hendleDeleteImage = (id) => {
		setColorInputs((prev) =>
			prev.map((input) =>
				input.id === id
					? { ...input, image: null }
					: input,
			),
		);
	};

	const handleColorChange = (id, value) => {
		setColorInputs((prev) =>
			prev.map((input) =>
				input.id === id
					? { ...input, color: value }
					: input,
			),
		);
	};

	return (
		<div className={style.level2_2}>
			{colorInputs.map((input, index) => (
				<div
					key={input.id}
					className="flex gap-3 items-center"
					id="productImage"
				>
					<div className="flex flex-col items-center">
						{input.image ? (
							<div className="relative my-auto">
								<img
									src={input.image}
									alt={`Color ${index + 1}`}
									className="h-14 w-24 object-cover rounded-lg my-auto"
								/>
								<button
									type="button"
									onClick={() =>
										hendleDeleteImage(input.id)
									}
									className="cursor-pointer absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							</div>
						) : (
							<label
								htmlFor={`productImage_${input.id}`}
								className={`${style.label_productImage} cursor-pointer flex flex-col items-center justify-center w-28 h-14 border-2  border-gray-300 rounded-lg`}
							>
								<span className="text-sm text-gray-500 text-center">
									Upload Image
								</span>
							</label>
						)}
						<input
							type="file"
							id={`productImage_${input.id}`}
							className="hidden"
							accept="image/*"
							onChange={(e) =>
								handleImageChange(input.id, e)
							}
						/>
					</div>

					<input
						type="text"
						className="border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 rounded-lg"
						placeholder={`Enter color ${
							index + 1
						}`}
						value={input.color}
						onChange={(e) =>
							handleColorChange(
								input.id,
								e.target.value,
							)
						}
					/>

					<button
						type="button"
						onClick={() =>
							handleDeleteColor(input.id)
						}
						className="cursor-pointer text-red-600 hover:text-red-800 font-semibold transition-colors duration-200 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-3 shadow-sm"
					>
						remove
					</button>
				</div>
			))}

			<button
				onClick={handleAddColor}
				type="button"
				className="mt-3 bg-[#0095FF] text-white py-2 px-4 rounded max-w-28 hover:bg-[#007ace] cursor-pointer transition-colors duration-200"
			>
				Add Color
			</button>
		</div>
	);
}
