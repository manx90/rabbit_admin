import React, { useState } from "react";
import { Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../api/productAPI";

const MultiSelect = ({
	setproductIds,
	productIds,
	categoryId,
	subcategoryId,
}) => {
	const [query, setQuery] = useState("");

	// API call مع q param
	const { data, isLoading } = useQuery({
		queryKey: [
			"products",
			categoryId,
			subcategoryId,
			query,
		],
		queryFn: () =>
			Product.getAll({
				category: categoryId || "",
				subcategory: subcategoryId || "",
				q: query || "",
				limit: 20,
			}),
		// enabled: !!categoryId, // يشتغل فقط لو اخترت كاتيجوري
		keepPreviousData: true,
	});
	console.log(data);
	const options =
		data?.data?.map((item) => ({
			value: String(item.id),
			label: item.name,
		})) || [];

	return (
		<div className="w-full">
			<Select
				mode="multiple"
				showSearch
				allowClear
				loading={isLoading}
				style={{ width: "100%" }}
				placeholder="Select products..."
				value={productIds}
				options={options}
				onChange={(values) =>
					setproductIds(values)
				}
				onSearch={(val) => setQuery(val)} // البحث يتم هنا
				filterOption={false} // يمنع الفلترة المحلية ويخليها سيرفر سايد
				className="[&_.ant-select-selector]:!bg-white [&_.ant-select-selector]:!border-gray-300 dark:[&_.ant-select-selector]:!bg-gray-700 dark:[&_.ant-select-selector]:!border-gray-600 dark:[&_.ant-select-selector]:!text-gray-100 [&_.ant-select-selection-placeholder]:!text-gray-500 dark:[&_.ant-select-selection-placeholder]:!text-gray-400 [&_.ant-select-selection-item]:!bg-blue-100 dark:[&_.ant-select-selection-item]:!bg-blue-900 [&_.ant-select-selection-item]:!text-blue-800 dark:[&_.ant-select-selection-item]:!text-blue-200"
				popupClassName="!bg-white dark:!bg-gray-700 [&_.ant-select-item]:!text-gray-900 dark:[&_.ant-select-item]:!text-gray-100 [&_.ant-select-item-option-selected]:!bg-blue-100 dark:[&_.ant-select-item-option-selected]:!bg-blue-900 [&_.ant-select-item-option-active]:!bg-gray-100 dark:[&_.ant-select-item-option-active]:!bg-gray-600 [&_.ant-select-item-option]:!text-gray-900 dark:[&_.ant-select-item-option]:!text-gray-100 [&_.ant-select-item-option]:hover:!bg-gray-100 dark:[&_.ant-select-item-option]:hover:!bg-gray-600"
				dropdownStyle={{
					backgroundColor:
						document.documentElement.classList.contains(
							"dark",
						)
							? "#374151"
							: "#ffffff",
					borderColor:
						document.documentElement.classList.contains(
							"dark",
						)
							? "#4B5563"
							: "#d1d5db",
				}}
			/>
		</div>
	);
};

export default MultiSelect;
