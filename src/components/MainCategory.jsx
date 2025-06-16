// import { useProduct } from "../Contexts/Product.Context";
import { useUtiles } from "../Contexts/utils.context";
import { useCategory } from "../Contexts/Category.Context";
import InputWithButton from "./ui/InputWithButton";
export function MainCategory() {
	const { isLoading1 } = useUtiles();
	const {
		MainCategory,
		setMainCategory,
		setAddCategory,
	} = useCategory();
	if (isLoading1) {
		return (
			<div className="flex items-center justify-center p-[12px] rounded-2xl bg-gray-50">
				<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
			</div>
		);
	}

	return (
		<div className="w-full bg-white rounded-2xl p-[12px] border">
			<div className="flex flex-row  justify-between gap-10 w-full">
				<div className="flex flex-col gap-2 w-full">
					<InputWithButton
						type="text"
						id="MainCategory"
						className="w-full bg-gray-100 h-12 text-[16px] font-medium"
						placeholder="MainCategory"
						onChange={(e) =>
							setMainCategory(e.target.value)
						}
						cnLabel="text-[16px] font-medium"
						onClick={() => {
							setAddCategory(MainCategory);
						}}
						cnButton="md:w-64 w-full h-12  text-[16px] self-end md:font-medium font-medium bg-[#0095FF] text-white cursor-pointer animate-slideUp "
						required
						// value={mainCategory}
						button="Add Main Category"
						label="MainCategory"
					/>
				</div>
			</div>
		</div>
	);
}
