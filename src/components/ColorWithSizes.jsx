import { useState } from "react";

export function ColorWithSizes({
	styleProduct,
	colorInputs,
}) {
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
		<div className={styleProduct.level2_2}>
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
					<div className={styleProduct.level4}>
						<label
							htmlFor={`size-${variantIndex}`}
							className={styleProduct.label_1}
						>
							Size
						</label>
						<input
							type="text"
							id={`size-${variantIndex}`}
							placeholder="Enter size"
							className={styleProduct.input_1}
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
					<div className={styleProduct.level4}>
						<label
							htmlFor={`price-${variantIndex}`}
							className={styleProduct.label_1}
						>
							Price
						</label>
						<input
							type="number"
							id={`price-${variantIndex}`}
							min="0"
							step="0.01"
							placeholder="0.00"
							className={styleProduct.input_price}
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
						<label
							className={styleProduct.label_1}
						>
							Colors & Quantities
						</label>
						{variant.colorQuantities.map(
							(item, colorIndex) => (
								<div
									key={colorIndex}
									className="flex gap-2 mb-2"
								>
									<select
										className={
											styleProduct.select
										}
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
										className={
											styleProduct.input_1
										}
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
							className={`${styleProduct.button} mt-2 hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out  px-4 py-2 rounded-lg cursor-pointer`}
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
					className={styleProduct.button}
					onClick={addVariant}
				>
					Add Variant (Size)
				</button>
			</div>
		</div>
	);
}
