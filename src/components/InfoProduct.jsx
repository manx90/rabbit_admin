import { useState } from "react";

export function InfoProduct({
	styleProduct,
	MainCategoryProduct,
	dispatchProductInfo,
	ProductInfo,
}) {
	const [Mainindex, setMainIndex] =
		useState(Number);
	const handleMainIndex = (index) => {
		setMainIndex(index);
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
						name="ProductName"
						className={styleProduct.input_1}
						placeholder="Enter product name"
						onChange={(e) => {
							dispatchProductInfo({
								type: "SET_PRODUCT_NAME",
								payload: e.target.value,
							});
							console.log(ProductInfo);
						}}
						required
					/>
				</div>
				{MainCategoryProduct && (
					<>
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
								name="categoryId"
								onChange={(e) => {
									dispatchProductInfo({
										type: "SET_CATEGORY_ID",
										payload: e.target.value,
									});
									handleMainIndex(
										e.target.selectedIndex,
									);
								}}
								required
							>
								{MainCategoryProduct.map(
									(category, index) => (
										<option
											key={index}
											value={category.id}
										>
											{category.category}
										</option>
									),
								)}
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
									dispatchProductInfo({
										type: "SET_SUBCATEGORY_ID",
										payload: e.target.value,
									});
								}}
								id="subCategory"
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-700"
								name="subcategoryId"
							>
								{MainCategoryProduct &&
									MainCategoryProduct[
										Mainindex
									] &&
									MainCategoryProduct[Mainindex]
										.subCategories &&
									MainCategoryProduct[
										Mainindex
									].subCategories.map(
										(subCategory) => (
											<option
												key={subCategory.id}
												value={subCategory.id}
											>
												{subCategory.name}
											</option>
										),
									)}
							</select>
						</div>
					</>
				)}
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
						dispatchProductInfo({
							type: "SET_DESCRIPTION",
							payload: e.target.value,
						})
					}
				/>
			</div>
		</div>
	);
}
