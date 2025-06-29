import { Button } from "./ui/button";

export function ColorWithSizes({
	styleProduct,
	dispatchProductInfo,
	productInfo,
}) {
	return (
		<div className={styleProduct.level2_2}>
			{productInfo.sizeDetails.map(
				(variant, variantIndex) => (
					<div
						key={variantIndex}
						className="relative grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 p-4 rounded mb-4"
					>
						<button
							onClick={() => {
								dispatchProductInfo({
									type: "REMOVE_SIZE_QUANTITY_PRICE",
									payload: {
										index: variantIndex,
									},
								});
							}}
							className="absolute top-2 right-2 px-2 cursor-pointer bg-red-500 rounded-lg text-white hover:bg-red-600 transition duration-200 ease-in-out"
						>
							remove
						</button>
						{/* Size input */}
						<div className="grid col-span-1 md:grid-cols-2 w-full gap-2">
							<div
								className={styleProduct.level4}
							>
								<label
									htmlFor={`size-${variantIndex}`}
									className={styleProduct.label_1}
								>
									Size
								</label>
								<input
									type="text"
									id={`size-${variantIndex}`}
									placeholder="Size"
									className={styleProduct.input_1}
									value={variant.sizeName || ""}
									onChange={(e) => {
										dispatchProductInfo({
											type: "ADD_SIZE_PRICE",
											payload: {
												index: variantIndex,
												sizeName: e.target.value,
											},
										});
									}}
								/>
							</div>
							<div
								className={styleProduct.level4}
							>
								<label
									htmlFor={`price-${variantIndex}`}
									className={styleProduct.label_1}
								>
									Price
								</label>
								<input
									type="number"
									id={`price-${variantIndex}`}
									value={variant.price}
									min="0"
									step="0.01"
									placeholder="0.00"
									className={`${styleProduct.input_price} w-full sm:w-auto`}
									onChange={(e) => {
										dispatchProductInfo({
											type: "ADD_SIZE_PRICE",
											payload: {
												index: variantIndex,
												price: e.target.value,
											},
										});
									}}
								/>
							</div>
						</div>

						{/* Colors and quantities */}
						<div className={styleProduct.level4}>
							<label
								className={styleProduct.label_1}
							>
								Colors & Quantities
							</label>
							{variant?.quantities?.map(
								(item, colorIndex) => (
									<div
										key={colorIndex}
										className="flex gap-2 mb-2"
									>
										<select
											className={`${styleProduct.select} py-0`}
											name="colorName"
											value={item.colorName}
											onChange={(e) => {
												dispatchProductInfo({
													type: "ADD_COLOR_QUANTITY_VALUE",
													payload: {
														index: variantIndex,
														colorIndex:
															colorIndex,
														colorName:
															e.target.value,
													},
												});
											}}
										>
											<option value="">
												Select Color
											</option>
											{productInfo.colors.map(
												(input) => (
													<option
														key={input.name}
														value={input.name}
													>
														{input.name}
													</option>
												),
											)}
										</select>
										<input
											type="number"
											min="0"
											placeholder="Quantity"
											className={
												styleProduct.input_1
											}
											value={item.quantity}
											onChange={(e) => {
												dispatchProductInfo({
													type: "ADD_COLOR_QUANTITY_VALUE",
													payload: {
														index: variantIndex,
														colorIndex:
															colorIndex,
														value: e.target.value,
													},
												});
												console.log(productInfo);
											}}
										/>
										{variant.quantities.length >
											1 && (
											<button
												type="button"
												className="text-red-600 cursor-pointer hover:text-red-700  transition-all duration-500 ease-in-out bg-red-100 px-2 rounded hover:bg-red-200 "
												onClick={() => {
													dispatchProductInfo({
														type: "REMOVE_COLOR_QUANTITY",
														payload: {
															variantIndex:
																variantIndex,
															colorIndex:
																colorIndex,
														},
													});
												}}
											>
												Remove
											</button>
										)}
									</div>
								),
							)}
							{/* <button
              type="button"
              onClick={() => {
                dispatchProductInfo({
                  type: "ADD_ANOTHER_COLOR_QUANTITY",
                  payload: {
                    variantIndex: variantIndex,
                    colorIndex: variant.quantities.length,
                  },
                });
              }}
              className={`${styleProduct.button} mt-2 hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out  px-4 py-2 rounded-lg cursor-pointer`}
            >
              Add Color & Quantity
            </button> */}
						</div>
					</div>
				),
			)}

			{/* Add new size variant */}
			<div className="flex justify-start">
				<Button
					onClick={() => {
						dispatchProductInfo({
							type: "ADD_SIZE_VARIANT",
						});
					}}
				>
					Add Variant (Size)
				</Button>
			</div>
		</div>
	);
}
