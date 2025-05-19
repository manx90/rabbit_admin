export function InfoProduct({
	styleProduct,
	setProductInfo,
}) {
	const handleInfoChange = (name, value) => {
		setProductInfo((prevInfo) => {
			// Check if the name already exists in the array
			const existingIndex = prevInfo.findIndex(
				(item) => item.name === name,
			);
			if (existingIndex !== -1) {
				// If it exists, update the value
				const updatedInfo = [...prevInfo];
				updatedInfo[existingIndex] = {
					name,
					value,
				};
				return updatedInfo;
			} else {
				// If it doesn't exist, add it
				const newInfo = [
					...prevInfo,
					{ name, value },
				];
				return newInfo;
			}
		});
	};

	return (
		<div className={styleProduct.level2_1}>
			<div className={styleProduct.level3_1}>
				<div className={styleProduct.level4}>
					<label
						htmlFor="productName"
						className={styleProduct.label}
					>
						Name
					</label>
					<input
						type="text"
						id="productName"
						name="name"
						className={styleProduct.input_1}
						placeholder="Enter product name"
						onChange={(e) =>
							handleInfoChange(
								e.target.name,
								e.target.value,
							)
						}
						required
					/>
				</div>
				<div className={styleProduct.level4}>
					<label
						htmlFor="category"
						className={styleProduct.label}
					>
						Category
					</label>
					<select
						id="category"
						className={styleProduct.select}
						name="category"
						onChange={(e) =>
							handleInfoChange(
								e.target.name,
								e.target.value,
							)
						}
						required
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
				<div className={styleProduct.level4}>
					<label
						htmlFor="subCategory"
						className="text-sm font-medium text-gray-700"
					>
						Sub Category
					</label>
					<select
						required
						onChange={(e) => {
							handleInfoChange(
								e.target.name,
								e.target.value,
							);
						}}
						id="subCategory"
						className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-700"
						name="subCategory"
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
			<div className={styleProduct.Description}>
				<label
					htmlFor="description"
					className="text-sm font-medium text-gray-700"
				>
					Description
				</label>
				<textarea
					required
					id="description"
					name="description"
					rows="8"
					className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none focus:outline-none"
					placeholder="Enter product description"
					onChange={(e) =>
						handleInfoChange(
							e.target.name,
							e.target.value,
						)
					}
				/>
			</div>
		</div>
	);
}
