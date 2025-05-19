import { useState } from "react";
import { InfoProduct } from "../components/InfoProduct";
import { ColorWithSizes } from "../components/ColorWithSizes";
import { UploadImageColors } from "./UploadImageColor";
export function Products() {
	const styleProduct = {
		level1:
			"bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200",
		level2_1: "flex flex-col lg:flex-row gap-6",
		level2_2: "flex flex-col gap-4 mt-6",
		level3_1: "flex flex-col gap-4 w-full",
		Description: "flex flex-col gap-3 w-full",
		level4: "flex flex-col gap-2",
		select:
			"w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-700",
		label_1: "text-sm font-medium text-gray-700",
		input_1:
			"w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200",
		// select:
		// 	"w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200",
		button:
			"w-full text-white bg-[#0095FF] hover:bg-blue-600 px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2",
		label_productImage:
			"inline-flex items-center gap-2 px-4 py-4 text-white bg-[#0095FF] hover:bg-blue-600 rounded-lg transition-colors duration-200 cursor-pointer",
		input_price:
			"w-full pl-8 pr-4 focus:outline-none py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200",
	};
	const [ProductInfo] = useState([]);
	const [colorInputs, setColorInputs] = useState([
		{ id: Date.now(), image: null, color: "" },
	]);
	return (
		<div>
			<div className={styleProduct.level1}>
				<InfoProduct
					styleProduct={styleProduct}
				/>
				<UploadImageColors
					colorInputs={colorInputs}
					setColorInputs={setColorInputs}
					styleProduct={styleProduct}
				/>
				<ColorWithSizes
					colorInputs={colorInputs}
					styleProduct={styleProduct}
				/>
			</div>
		</div>
	);
}
