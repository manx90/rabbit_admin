import React from "react";
import { Select } from "antd";
import {
	Controller,
	useFormContext,
} from "react-hook-form";

const SSAnted = ({
	disable = false,
	name,
	label = "select",
	data = [],
	KeyName = "name",
	KeyValue = "id",
	KeyID = "id",
	setSearchProd = null,
	isLoading = true,
	isFetching,
}) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<>
					<label>{label} </label>
					<Select
						showSearch
						disabled={disable}
						placeholder={label || "Select item"}
						optionFilterProp="label"
						loading={isLoading || isFetching}
						value={field.value}
						onChange={(value) => {
							field.onChange(value);
						}}
						onSearch={(value) => {
							if (setSearchProd)
								setSearchProd(value);
						}}
						options={
							data && Array.isArray(data)
								? data.map((item) => ({
										value: item[KeyValue],
										label: item[KeyName],
										key: item[KeyID],
								  }))
								: []
						}
						filterOption={(input, option) =>
							(option?.label ?? "")
								.toLowerCase()
								.includes(input.toLowerCase())
						}
						className="dark-select-custom"
						style={{
							width: "100%",
						}}
						popupClassName="dark-dropdown-custom"
					/>
				</>
			)}
		/>
	);
};
export default SSAnted;
