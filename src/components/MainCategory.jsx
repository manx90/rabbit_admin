import { useProduct } from "../Contexts/Category";

export function MainCategory() {
	const {
		isLoading1,
		mainCategory,
		setCategory,
	} = useProduct();
	if (isLoading1) {
		return (
			<div className="flex items-center justify-center  bg-gray-50">
				<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
			</div>
		);
	}

	return (
		<div className="w-full bg-white rounded-2xl p-[12px] border">
			<div className="flex flex-row  justify-between gap-10 w-full">
				<div className="flex flex-col gap-2 w-full">
					<label
						htmlFor="MainCategory"
						className="text-sm"
					>
						MainCategory
					</label>
					<input
						type="text"
						id="MainCategory"
						name="MainCategory"
						className="Inputs"
						placeholder="MainCategory"
						ref={mainCategory}
					/>
				</div>
				<button
					onClick={() => {
						setCategory(
							mainCategory.current.value,
						);
					}}
					className="text-white w-64 bg-[#0095FF] px-4 py-[12px] rounded-lg self-end cursor-pointer animate-slideUp"
				>
					Add Main Category
				</button>
			</div>
		</div>
	);
}
