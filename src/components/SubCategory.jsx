import {
	useEffect,
	useRef,
	useState,
} from "react";
import axios from "axios";
``;
export function SubCategory({
	mainCategoryProduct,
	setMainCategoryProduct,
	setMessage,
	Message,
}) {
	const [isLoading, setIsLoading] =
		useState(false);
	const URL = "http://localhost:3003";
	const Category = useRef("");
	const [AddSub, setAddSub] = useState(false);
	const SubCategory = useRef("");
	useEffect(() => {
		function getCategory() {
			axios
				.get(`${URL}/category`)
				.then((res) => {
					setIsLoading(false);
					setMainCategoryProduct(res.data);
				})
				.catch(() => {
					setIsLoading(false);
				});
		}
		getCategory();
	}, [
		setMessage,
		Message,
		setMainCategoryProduct,
	]);
	useEffect(() => {
		function addSubCategory() {
			axios
				.post(`${URL}/category/subcategory`, {
					categoryId: Category.current.value,
					name: SubCategory.current.value,
				})
				.then((res) => {
					setIsLoading(false);
					setMessage({
						type: "success",
						text:
							res.data.message ||
							"SubCategory added successfully!",
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
		if (AddSub === false) return;
		if (AddSub === true) addSubCategory();
		return () => {
			setAddSub(false);
			console.log("hi");
		};
	}, [AddSub, setAddSub, setMessage]);
	if (isLoading) {
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
					<div className="flex flex-col md:flex-row gap-4 w-full">
						<div className="flex flex-col gap-2 w-full">
							<label
								htmlFor="MainSelect"
								className="text-sm font-medium text-gray-700"
							>
								Main Category
							</label>
							<select
								id="MainSelect"
								name="MainSelect"
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-700"
								placeholder="Select Main Category"
								ref={Category}
							>
								{mainCategoryProduct &&
									mainCategoryProduct.map(
										(item) => (
											<option
												value={item.id}
												key={item.id}
											>
												{item.category}
											</option>
										),
									)}
							</select>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label
								htmlFor="SubCategory"
								className="text-sm font-medium text-gray-700"
							>
								Sub Category
							</label>
							<input
								type="text"
								id="SubCategory"
								name="SubCategory"
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
								placeholder="Enter Sub Category"
								ref={SubCategory}
							/>
						</div>
					</div>
					<button
						// type="submit"
						className={`text-white bg-[#0095FF] hover:bg-blue-600 px-6 py-2.5 rounded-lg self-end transition-colors duration-200 flex items-center justify-center gap-2 min-w-[200px]`}
						onClick={() => setAddSub(true)}
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
