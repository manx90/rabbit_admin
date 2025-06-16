import { useCategory } from "../Contexts/Category.Context";
import { useUtiles } from "../Contexts/utils.context";
import SelectButton from "./ui/selecting";
import InputSimple from "./ui/inputSimple";
export function SubCategory() {
	const { isLoading2 } = useUtiles();
	const {
		setAddSub,
		setSubCategory,
		setMainCategory,
		mainCategoryProduct,
	} = useCategory();
	if (isLoading2) {
		return (
			<div className="flex items-center justify-center  bg-gray-50">
				<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
			</div>
		);
	}
	return (
		<div className="bg-white rounded-2xl p-[12px] border shadow-sm hover:shadow-md transition-shadow duration-200">
			<div className="flex flex-col gap-6">
				<div className="flex flex-col lg:flex-row justify-between gap-6">
					<div className="flex flex-col lg:flex-row gap-4 w-full">
						<div className="flex flex-col gap-2 w-full">
							<SelectButton
								className="w-full h-12 text-[16px] font-medium"
								cnOption="text-[16px] font-medium"
								cnLabel="text-[16px] font-medium"
								label="Main Category"
								// value={productInfo?.categoryId}
								options={mainCategoryProduct}
								onChange={(e) => {
									setMainCategory(e.target.value);
									console.log(e.target.value);
								}}
								placeholder="Select Main Category"
								required
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<InputSimple
								className="w-full h-12 text-[16px] font-medium"
								cnLabel="text-[16px] font-medium"
								placeholder="Enter Sub Category"
								type="text"
								onChange={(e) => {
									setSubCategory(e.target.value);
								}}
								setvalue={setSubCategory}
								label="Sub Category"
								required
							/>
						</div>
					</div>
					<button
						// type="submit"
						className={`cursor-pointer text-white bg-[#0095FF] hover:bg-blue-600 px-6 py-2.5 rounded-lg self-end transition-colors duration-200 flex items-center justify-center gap-2 md:w-[200px] w-full`}
						onClick={() => {
							setAddSub(true);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
								clipRule="evenodd"
							/>
						</svg>
						Add Sub
					</button>
				</div>
			</div>
		</div>
	);
}
