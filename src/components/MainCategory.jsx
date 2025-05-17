import {
	useEffect,
	useRef,
	useState,
} from "react";
import axios from "axios";

export function MainCategory({
	setCategory,
	setMessage,
	category,
	URL,
}) {
	const [isLoading, setIsLoading] =
		useState(false);
	useEffect(() => {
		function addCategory(category) {
			if (category === null || category === "")
				return null;
			setIsLoading(true);
			axios
				.post(`${URL}/category`, {
					category: category,
				})
				.then((res) => {
					setIsLoading(false);
					setMessage({
						type: "success",
						text:
							res.data.message ||
							"Category added successfully!",
					});
				})
				.catch((error) => {
					setIsLoading(false);
					setMessage({
						type: "error",
						text:
							error.response?.data?.message ||
							error.message,
					});
				});
		}
		if (category !== "") addCategory(category);
		return () => {
			setMessage("");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category]);
	const mainCategory = useRef("");
	if (isLoading) {
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
