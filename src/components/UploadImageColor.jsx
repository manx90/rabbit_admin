export function UploadImageColors({
	styleProduct,
	ProductInfo,
	dispatchProductInfo,
}) {
	const handleFileChange = (e, index) => {
		const file = e.target.files?.[0];
		if (file) {
			dispatchProductInfo({
				type: "ADD_COLOR_WITH_IMAGE",
				payload: {
					index,
					image: file,
				},
			});
		}
	};

	const handleColorNameChange = (e, index) => {
		dispatchProductInfo({
			type: "ADD_COLOR_WITH_IMAGE",
			payload: {
				index,
				name: e.target.value,
			},
		});
	};

	return (
		<div className={styleProduct.level2_2}>
			{ProductInfo.colors.map((color, index) => (
				<div
					key={index}
					className="flex gap-3 items-center"
					id="productImage"
				>
					<div className="flex flex-col items-center">
						{color.imgColor ? (
							<div className="relative my-auto">
								<img
									src={
										"https://api.rabbit.ps/uploads/" +
										color.imgColor
									}
									alt={`Color ${index + 1}`}
									className="h-14 w-24 object-cover rounded-lg my-auto"
								/>
								<button
									type="button"
									onClick={() =>
										dispatchProductInfo({
											type: "REMOVE_COLOR_WITH_IMAGE",
											payload: { index },
										})
									}
									className="cursor-pointer absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							</div>
						) : (
							<label
								htmlFor={`productImage_${index}`}
								className={`${styleProduct.label_productImage} cursor-pointer flex flex-col items-center justify-center w-28 h-14 border-2 border-gray-300 rounded-lg`}
							>
								<span className="text-sm text-gray-500 text-center">
									Upload Image
								</span>
							</label>
						)}
						<input
							type="file"
							id={`productImage_${index}`}
							className="hidden"
							accept="image/*"
							onChange={(e) =>
								handleFileChange(e, index)
							}
						/>
					</div>

					<input
						type="text"
						className="border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 rounded-lg"
						name="name"
						placeholder={`Enter color name ${
							index + 1
						}`}
						onChange={(e) => {
							handleColorNameChange(e, index);
						}}
						value={ProductInfo.colors[index].name}
					/>
					<button
						type="button"
						onClick={() =>
							dispatchProductInfo({
								type: "REMOVE_COLOR_WITH_IMAGE",
								payload: { index },
							})
						}
						className="cursor-pointer text-red-600 hover:text-red-800 font-semibold transition-colors duration-200 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-3 shadow-sm"
					>
						remove
					</button>
				</div>
			))}

			<button
				onClick={() =>
					dispatchProductInfo({
						type: "ADD_COLOR_WITH_IMAGE",
					})
				}
				type="button"
				className="mt-3 bg-[#0095FF] text-white py-2 px-4 rounded max-w-28 hover:bg-[#007ace] cursor-pointer transition-colors duration-200"
			>
				Add Color
			</button>
		</div>
	);
}
