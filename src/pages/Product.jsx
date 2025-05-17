import React, { useState } from "react";
import Table from "../components/Table";
import { HeaderProduct } from "../components/HeaderProduct";
import { SubCategory } from "../components/SubCategory";
import { MainCategory } from "../components/MainCategory";

export default function Product() {
	const [Message, setMessage] = useState({
		type: "",
		text: "",
	});
	const URL = "http://localhost:3003";
	const [category, setCategory] = useState("");
	const [
		mainCategoryProduct,
		setMainCategoryProduct,
	] = useState([]);

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Main Content */}
			<div className="flex-1 overflow-auto">
				<div className="p-6 space-y-6">
					{Message && Message.text !== "" && (
						<div
							className={`p-4 rounded-lg ${
								Message.type === "success"
									? "bg-green-100 text-green-700 border border-green-200"
									: "bg-red-100 text-red-700 border border-red-200"
							}`}
						>
							<div className="flex items-center gap-2">
								{Message.type === "success" ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
											clipRule="evenodd"
										/>
									</svg>
								)}
								<span>{Message.text}</span>
							</div>
						</div>
					)}
					<div className="animate-fadeIn">
						<HeaderProduct
							title={"Categories"}
							AddNew={false}
						/>
					</div>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 animate-slideUp">
						<MainCategory
							setCategory={setCategory}
							setMessage={setMessage}
							category={category}
							URL={URL}
						/>
						<SubCategory
							mainCategoryProduct={
								mainCategoryProduct
							}
							setMainCategoryProduct={
								setMainCategoryProduct
							}
							setMessage={setMessage}
							Message={Message}
						/>
					</div>
					<div className="animate-fadeIn">
						<HeaderProduct title={"Products"} />
					</div>
					<div className="animate-slideUp">
						<Products />
					</div>
					<div className="animate-fadeIn">
						<UploadImage />
					</div>
					<div className="animate-slideUp">
						<SaveCancel />
					</div>
					<div className="animate-fadeIn">
						<HeaderProduct
							title={"Products List"}
						/>
					</div>
					<div className="animate-slideUp">
						<Table />
					</div>
				</div>
			</div>
		</div>
	);
}

function Products() {
	return (
		<form>
			<div className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200">
				<div className="flex flex-col lg:flex-row gap-6">
					<div className="flex flex-col gap-4 w-full">
						<div className="flex flex-col gap-2">
							<label
								htmlFor="productName"
								className="text-sm font-medium text-gray-700"
							>
								Name
							</label>
							<input
								type="text"
								id="productName"
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
								placeholder="Enter product name"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="category"
								className="text-sm font-medium text-gray-700"
							>
								Category
							</label>
							<select
								id="category"
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-700"
							>
								<option value="">
									Select Category
								</option>
								<option value="Men">Men</option>
								<option value="Women">
									Women
								</option>
								<option value="Kids">Kids</option>
								<option value="Accessories">
									Accessories
								</option>
							</select>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="subCategory"
								className="text-sm font-medium text-gray-700"
							>
								Sub Category
							</label>
							<select
								id="subCategory"
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-700"
							>
								<option value="">
									Select Sub Category
								</option>
								<option value="Shirt">
									Shirt
								</option>
								<option value="Pants">
									Pants
								</option>
								<option value="Dress">
									Dress
								</option>
								<option value="Skirt">
									Skirt
								</option>
								<option value="Jacket">
									Jacket
								</option>
							</select>
						</div>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<label
							htmlFor="description"
							className="text-sm font-medium text-gray-700"
						>
							Description
						</label>
						<textarea
							id="description"
							rows="4"
							className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
							placeholder="Enter product description"
						/>
					</div>
				</div>

				<div className="mt-6">
					<h3 className="text-lg font-medium text-gray-700 mb-4">
						Product Variants
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<div className="flex flex-col gap-2">
							<label
								htmlFor="size"
								className="text-sm font-medium text-gray-700"
							>
								Size
							</label>
							<input
								type="text"
								id="size"
								placeholder="Enter size"
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="quantity"
								className="text-sm font-medium text-gray-700"
							>
								Quantity
							</label>
							<input
								type="number"
								id="quantity"
								min="0"
								placeholder="Enter quantity"
								className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="price"
								className="text-sm font-medium text-gray-700"
							>
								Price
							</label>
							<div className="relative">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
									$
								</span>
								<input
									type="number"
									id="price"
									min="0"
									step="0.01"
									placeholder="0.00"
									className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
								/>
							</div>
						</div>
						<div className="flex items-end">
							<button
								type="button"
								className="w-full text-white bg-[#0095FF] hover:bg-blue-600 px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
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
								Add Variant
							</button>
						</div>
					</div>
				</div>

				<div className="mt-6">
					<label
						htmlFor="productImages"
						className="inline-flex items-center gap-2 px-4 py-2.5 text-white bg-[#0095FF] hover:bg-blue-600 rounded-lg transition-colors duration-200 cursor-pointer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
								clipRule="evenodd"
							/>
						</svg>
						Upload Product Images
					</label>
					<input
						type="file"
						id="productImages"
						className="hidden"
						multiple
						accept="image/*"
					/>
				</div>
			</div>
		</form>
	);
}

function UploadImage() {
	return (
		<div className="flex flex-col w-full gap-5">
			<div className="flex flex-row  gap-2 w-full">
				<label htmlFor="ImageCover">
					<img src="ImageCover.svg" alt="" />
				</label>
				<input
					type="file"
					className="hidden"
					id="ImageCover"
					name="ImageCover"
				/>
				<label htmlFor="AllImages">
					<img src="AllImages.svg" alt="" />
				</label>
				<input
					type="file"
					className="hidden"
					id="AllImages"
					name="AllImages"
					multiple
				/>
			</div>
			{/* <div className="flex flex-row  gap-2 w-full">
				<label htmlFor="" for="Image Cover">
					<img
						src="ImageMeasurements.svg"
						alt=""
					/>
				</label>
				<input
					type="file"
					className="hidden"
					id="ImageMeasurements"
					name="ImageMeasurements"
				/>
				<label htmlFor="" for="All Images">
					<img
						src="ChartMeasurement.svg"
						alt=""
					/>
				</label>
				<input
					type="file"
					className="hidden"
					id="ChartMeasurement"
					name="ChartMeasurement"
				/>
			</div> */}
		</div>
	);
}

function SaveCancel() {
	return (
		<div className="flex self-end gap-5">
			<button className="text-white hover:scale-105  bg-red-600 px-5 rounded-lg max-w-[8em] h-full py-3.5  self-end">
				Cancel
			</button>
			<button className="text-white  bg-[#0095FF] px-5 rounded-lg max-w-[8em] h-full py-3.5  self-end hover:scale-105">
				Save
			</button>
		</div>
	);
}

// function ProductList() {
// 	return (
// 		<div className="flex flex-col gap-2 w-full">
// 			<div className="flex flex-row justify-between">
// 				<button className="btn_Publish">
// 					Published Products
// 				</button>
// 				<button className="btn_Publish">
// 					Scheduled Products
// 				</button>
// 			</div>
// 			<div className="flex flex-col">
// 				<div className="flex flex-row">
// 					<button>Name </button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

function EditProd() {
	return (
		<div>
			<form>
				<div className="flex flex-col  bg-white rounded-2xl p-[12px] border">
					<div className="flex flex-row gap-5">
						<div className="flex flex-col  gap-3 w-full bg-white">
							<div className="flex flex-col gap-2">
								<label
									htmlFor=""
									className="text-sm"
								>
									Name
								</label>
								<input
									type="text"
									className="Inputs"
									placeholder="Name"
									id="Name"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label
									htmlFor=""
									className="text-sm"
								>
									Cateogry
								</label>
								<select
									className="Inputs text-gray-500"
									placeholder="Name"
								>
									<option value="Men">Men</option>
									<option value="Women">
										Women
									</option>
									<option value="Kids">
										Kids
									</option>
									<option value="Accessories">
										Accessories
									</option>
								</select>
							</div>
							<div className="flex flex-col gap-2">
								<label
									htmlFor=""
									className="text-sm"
								>
									SubCategory
								</label>
								<select
									className="Inputs text-gray-500"
									placeholder="Name"
								>
									<option value="Shirt">
										Shirt
									</option>
									<option value="Pants">
										Pants
									</option>
									<option value="Dress">
										Dress
									</option>
									<option value="Skirt">
										Skirt
									</option>
									<option value="Jacket">
										Jacket
									</option>
								</select>
							</div>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label
								htmlFor=""
								className="text-sm"
							>
								Add Description
							</label>
							<input
								type="text"
								placeholder="Add Description"
								className="text-left Inputs h-full"
							/>
						</div>
					</div>
					<div
						id="size"
						className="flex flex-row gap-2 w-full mt-3"
					>
						<div className="flex flex-col gap-2 w-full">
							<label
								htmlFor=""
								className="text-sm"
							>
								Size
							</label>
							<input
								type="text"
								placeholder="Add Size"
								className="text-left Inputs h-full"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label
								htmlFor=""
								className="text-sm"
							>
								Quantity
							</label>
							<input
								type="text"
								placeholder="Add Quantity"
								className="text-left Inputs h-full"
							/>
						</div>

						<div className="flex flex-col gap-2 w-full">
							<label
								htmlFor=""
								className="text-sm"
							>
								Price
							</label>
							<input
								type="text"
								placeholder="Add Price"
								className="text-left Inputs h-full"
							/>
						</div>
						<button className="text-white bg-[#0095FF] rounded-lg w-full h-full py-3.5  self-end">
							Add Another Size
						</button>
					</div>
					<label
						htmlFor="Color"
						className="flex mt-5 px-4  py-3 text-white rounded bg-blue-500 self-start max-w-[18em]"
					>
						<box-icon
							name="upload"
							className="fill-white mr-2 my-auto"
						></box-icon>
						Add Image Colors
					</label>
					<input
						type="file"
						className="hidden"
						id="Color"
						name="Color"
						multiple
					/>
				</div>
			</form>
		</div>
	);
}

function OrderPreview() {
	return (
		<div className="absolute flex flex-col py-[12px] px-[24px]  rounded-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3  bg-white border">
			<div className="flex flex-col gap-5">
				<p className="font-medium text-[24px] p-[24px] border-b border-[#535353] border-opacity-25">
					Order Number :{" "}
					<span className="font-light text-[#0095FF]">
						#2134559
					</span>
				</p>
				<div className="flex flex-col gap-5">
					<p className="flex gap-2 items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className="my-auto"
						>
							<mask
								id="mask0_2301_15536"
								style={{ maskType: "alpha" }}
								maskUnits={{
									maskUnits: "userSpaceOnUse",
								}}
								x="0"
								y="0"
								width="24"
								height="24"
							>
								<rect
									width="24"
									height="24"
									fill="#D9D9D9"
								/>
							</mask>
							<g mask="url(#mask0_2301_15536)">
								<path
									d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 20V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V20H4Z"
									fill="#0095FF"
								/>
							</g>
						</svg>
						<span className="my-auto text-[#535353] text-[18px]">
							Mohamed Ahmed
						</span>
					</p>
					<p className="flex gap-2 items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className="my-auto"
						>
							<mask
								id="mask0_2301_15541"
								style={{ maskType: "alpha" }}
								maskUnits="userSpaceOnUse"
								x="0"
								y="0"
								width="24"
								height="24"
							>
								<rect
									width="24"
									height="24"
									fill="#D9D9D9"
								/>
							</mask>
							<g mask="url(#mask0_2301_15541)">
								<path
									d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM12 13L20 8V6L12 11L4 6V8L12 13Z"
									fill="#0095FF"
								/>
							</g>
						</svg>
						<span className="my-auto text-[#535353] text-[18px]">
							Example123123123@gmail.com
						</span>
					</p>
					<p className="flex gap-2 items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className="my-auto"
						>
							<mask
								id="mask0_2301_15546"
								style={{ maskType: "alpha" }}
								maskUnits="userSpaceOnUse"
								x="0"
								y="0"
								width="24"
								height="24"
							>
								<rect
									width="24"
									height="24"
									fill="#D9D9D9"
								/>
							</mask>
							<g mask="url(#mask0_2301_15546)">
								<path
									d="M19.95 21C17.8667 21 15.8083 20.5458 13.775 19.6375C11.7417 18.7292 9.89167 17.4417 8.225 15.775C6.55833 14.1083 5.27083 12.2583 4.3625 10.225C3.45417 8.19167 3 6.13333 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07917 8.725 3.2375C8.90833 3.39583 9.01667 3.58333 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.70417 12.1125 8.1625 12.6875C8.62083 13.2625 9.125 13.8167 9.675 14.35C10.1917 14.8667 10.7333 15.3458 11.3 15.7875C11.8667 16.2292 12.4667 16.6333 13.1 17L15.45 14.65C15.6 14.5 15.7958 14.3875 16.0375 14.3125C16.2792 14.2375 16.5167 14.2167 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1375 20.775 15.3125C20.925 15.4875 21 15.6833 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21Z"
									fill="#0095FF"
								/>
							</g>
						</svg>
						<span className="my-auto text-[#535353] text-[18px]">
							+00972 597 011 186
						</span>
					</p>
				</div>
				<div className="flex flex-row gap-5 ">
					<span className="text-black text-2xl p-[10px]  border-[#0095FF] border-b-[2px]">
						Order Items
					</span>
					<span className="text-[#535353] text-2xl p-[10px] ">
						Delivery Location
					</span>
				</div>
				{/* <Table /> */}
				<DeliveryLocation />
			</div>
		</div>
	);
}

function DeliveryLocation() {
	return (
		<div className="flex flex-col gap-5">
			<p className="text-[#535353] text-[18px]">
				City :{" "}
				<span className="text-[#0095FF]">
					New York
				</span>
			</p>
			<p className="text-[#535353] text-[18px]">
				Village :{" "}
				<span className="text-[#0095FF]">
					New York
				</span>
			</p>
			<p className="text-[#535353] text-[18px]">
				Address :{" "}
				<span className="text-[#0095FF]">
					New York
				</span>
			</p>
			<p className="text-[#535353] text-[18px]">
				Detailed Address :
				<span className="text-[#0095FF]">
					New York
				</span>
			</p>
		</div>
	);
}

function OrderList() {
	return (
		<div className="flex flex-col gap-8 w-full">
			<HeaderProduct
				title={"Order List"}
				AddNew={false}
			/>
			<Table />
		</div>
	);
}
