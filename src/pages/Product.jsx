import React from "react";

export default function Product() {
	return (
		<div className="ContentPage">
			<HeaderProduct
				title={"Catogories"}
				AddNew={true}
			/>

			<MainCategory />
			<SubCategory />
			<HeaderProduct title={"Products"} />
			<Products />
			<UploadImage />
			<SaveCancel />
			<HeaderProduct title={"Products List"} />
		</div>
	);
}

function HeaderProduct({ title, AddNew }) {
	return (
		<div className="flex justify-between">
			<span className="text-[32px] text-[#535353] font-medium">
				{title}
			</span>
			{AddNew ? (
				<>
					<button className="flex items-center gap-2 text-white bg-[#0095FF] px-4 py-2 rounded-lg">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<mask
								id="mask0_2224_16009"
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
									fill="rgba(217,217,217,1)"
								/>
							</mask>
							<g mask="url(#mask0_2224_16009)">
								<path
									d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
									fill="white"
								/>
							</g>
						</svg>
						<span>Add New</span>{" "}
					</button>
				</>
			) : null}
		</div>
	);
}

function MainCategory() {
	return (
		<div className=" w-full bg-white rounded-2xl p-[12px] border">
			<form className="flex flex-row  justify-between gap-10 w-full">
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
					/>
				</div>
				<button
					type="submit"
					className="text-white w-64 bg-[#0095FF] px-4 py-[12px] rounded-lg self-end"
				>
					Add Main Category
				</button>
			</form>
		</div>
	);
}

function SubCategory() {
	return (
		<div className=" bg-white rounded-2xl p-[12px] border">
			<form className="flex flex-col gap-6">
				<div className="flex flex-row justify-between gap-5">
					<div className="flex flex-row gap-2 w-full">
						<div className="flex flex-col gap-2 w-full">
							<label
								htmlFor="SubCategory"
								className="text-sm"
							>
								MainCategory
							</label>
							<input
								type="Select"
								id="MainSelect"
								name="MainSelect"
								className="Inputs"
								placeholder="MainCategory"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label
								htmlFor="SubCategory"
								className="text-sm"
							>
								SubCategory
							</label>
							<input
								type="text"
								id="SubCategory"
								name="SubCategory"
								className="Inputs"
								placeholder="SubCategory"
							/>
						</div>
					</div>
					<button
						type="submit"
						className="text-white bg-[#0095FF] w-64 px-4 py-[12px] rounded-lg self-end"
					>
						Add Sub Category
					</button>
				</div>
				<button
					type="submit"
					className="px-4 py-3 text-white font-normal bg-[#0095FF] self-end rounded-2xl"
				>
					Save All
				</button>
			</form>
		</div>
	);
}

function Products() {
	return (
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
								<option value="Kids">Kids</option>
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
						<label htmlFor="" className="text-sm">
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
						<label htmlFor="" className="text-sm">
							Size
						</label>
						<input
							type="text"
							placeholder="Add Size"
							className="text-left Inputs h-full"
						/>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<label htmlFor="" className="text-sm">
							Quantity
						</label>
						<input
							type="text"
							placeholder="Add Quantity"
							className="text-left Inputs h-full"
						/>
					</div>

					<div className="flex flex-col gap-2 w-full">
						<label htmlFor="" className="text-sm">
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
					htmlFor=""
					for="Color"
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
	);
}

function UploadImage() {
	return (
		<div className="flex flex-col w-full gap-5">
			<div className="flex flex-row  gap-2 w-full">
				<label htmlFor="" for="ImageCover">
					<img src="ImageCover.svg" alt="" />
				</label>
				<input
					type="file"
					className="hidden"
					id="ImageCover"
					name="ImageCover"
				/>
				<label htmlFor="" for="AllImages">
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
			<div className="flex flex-row  gap-2 w-full">
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
			</div>
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


function ProductList(){
	return(
		<div className="flex flex-col gap-2 w-full">
			<div className="flex flex-row justify-between">
				<button></button>
			</div>
		</div>
	)
}