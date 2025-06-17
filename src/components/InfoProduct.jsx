import { useEffect, useState } from "react";
import Description from "./textarea";
import InputSimple from "./ui/inputSimple";
import SelectButton from "./ui/selecting";
import GroupRadio from "./ui/GroupRadio";
export function InfoProduct({
	styleProduct,
	MainCategoryProduct,
	dispatchProductInfo,
	ProductInfo,
	updateId,
}) {
	const [Mainindex, setMainIndex] = useState();
	useEffect(() => {
		function mainIndex() {
			MainCategoryProduct.forEach(
				(element, index) => {
					if (
						element.id === ProductInfo.categoryId
					) {
						setMainIndex(index);
					}
				},
			);
		}
		mainIndex();
		return () => {
			setMainIndex(undefined);
		};
	}, [
		MainCategoryProduct,
		ProductInfo.categoryId,
		updateId,
	]);
	const handleMainIndex = (index) => {
		setMainIndex(index);
	};
	return (
		<div className={styleProduct.level2_1}>
			<div className={styleProduct.level3_1}>
				<div className={styleProduct.level4}>
					<InputSimple
						label="Product Name"
						name="Enter product name"
						type="text"
						className={`${styleProduct.input_1} h-[48px]`}
						cnLabel={styleProduct.label}
						placeholder="Enter product name"
						onChange={(e) => {
							dispatchProductInfo({
								type: "SET_PRODUCT_NAME",
								payload: e.target.value,
							});
						}}
						value={ProductInfo.name}
						required
					/>
				</div>
				{MainCategoryProduct &&
					MainCategoryProduct.length > 0 && (
						<>
							<div
								className={styleProduct.level4}
							>
								<SelectButton
									className="w-full h-[48px] text-[16px] font-medium"
									cnOption="text-[16px] font-medium"
									label="Category"
									placeholder="Select Category"
									options={MainCategoryProduct}
									value={ProductInfo.categoryId}
									productInfo={ProductInfo}
									onChange={(e) => {
										const selectedValue = e.target
											.value
											? Number(e.target.value)
											: null;
										// Find the actual category index in MainCategoryProduct
										const categoryIndex =
											MainCategoryProduct.findIndex(
												(category) =>
													category.id ===
													selectedValue,
											);
										// Update category
										dispatchProductInfo({
											type: "SET_CATEGORY_ID",
											payload: selectedValue,
										});
										// Reset subcategory when category changes
										dispatchProductInfo({
											type: "SET_SUBCATEGORY_ID",
											payload: null,
										});
										// Update main index for subcategory options
										handleMainIndex(
											categoryIndex,
										);
									}}
									required
								/>
								<SelectButton
									className="w-full h-[48px] text-[16px] font-medium"
									cnOption="text-[16px] font-medium"
									label="Sub Category"
									placeholder="Select Sub Category"
									options={
										MainCategoryProduct[Mainindex]
											?.subCategories
									}
									value={
										ProductInfo.subcategoryId
									}
									onChange={(e) => {
										dispatchProductInfo({
											type: "SET_SUBCATEGORY_ID",
											payload: Number(
												e.target.value,
											),
										});
									}}
									required
								/>
							</div>
						</>
					)}
			</div>
			<div className={styleProduct.Description}>
				<Description
					onChange={(e) => {
						dispatchProductInfo({
							type: "SET_DESCRIPTION",
							payload: e.target.value,
						});
					}}
					value={ProductInfo?.description || ""}
				/>
				<GroupRadio
					className="w-full h-[48px] text-[16px] font-medium flex-row cursor-pointer"
					label="Product Status"
					options={[
						{ label: "Active", value: true },
						{ label: "Inactive", value: false },
					]}
					cnRadio="w-6 h-6 border-2 border-gray-300 checked:bg-[#0095FF] checked:border-[#0095FF]"
					cnLabel="text-[16px] font-medium"
					onChange={(value) => {
						dispatchProductInfo({
							type: "SET_ACTIVE",
							payload: value,
						});
					}}
					value={ProductInfo?.active || ""}
				/>
			</div>
		</div>
	);
}
