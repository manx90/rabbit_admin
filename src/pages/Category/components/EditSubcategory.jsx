import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import {
	Form,
	Column,
	Label,
	ButtonOne,
	Row,
	InputOne,
} from "../constant/tw-styled-components";
import { Category } from "../../../api/cateogryApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
const EditSubCategory = ({ categories }) => {
	const {
		register,
		control: controlEditSubCategory,
		handleSubmit: handleSubmitEditSubCategory,
		reset: resetEditSubCategory,
	} = useForm();
	const categoriesData = categories?.data || [];
	const [numCategory, setNumCategory] =
		useState(null);
	const [numSubCategory, setNumSubCategory] =
		useState(null);
	const onSubmit = (data) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append(
			"iconSubCat",
			data.iconSubCat[0],
		);
		Category.updateSubCategory(
			data.subCategoryId,
			data.categoryId,
			formData,
		);
		console.log("data", data);
		resetEditSubCategory();
	};
	return (
		<Form
			border
			onSubmit={handleSubmitEditSubCategory(
				onSubmit,
			)}
			className="w-full flex flex-col gap-4"
		>
			<Column className="w-full md:flex-row items-end">
				<Column className="w-full">
					<Label htmlFor="EditSubCategory">
						Edit Sub Category
					</Label>
					<Controller
						control={controlEditSubCategory}
						name="categoryId"
						className="w-full"
						render={({ field }) => (
							<Select
								id="CategoryId"
								name="CategoryId"
								className="w-full"
								value={field.value || ""}
								onValueChange={(value) => {
									field.onChange(value);
									setNumCategory(value);
								}}
							>
								<SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600">
									<SelectValue
										placeholder="Select Category"
										className="text-gray-500 dark:text-gray-400 h-20 truncate"
										style={{
											maxWidth: "150px",
											overflow: "hidden",
											textOverflow: "ellipsis",
											whiteSpace: "nowrap",
										}}
										onValueChange={(value) => {
											field.onChange(value);
											setNumCategory(value);
										}}
									/>
								</SelectTrigger>
								<SelectContent>
									{categoriesData?.map((category) => (
										<SelectItem
											key={category.id}
											value={String(category.id)}
										>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>
				</Column>
				<Row className="w-full mb-0">
					<Controller
						control={controlEditSubCategory}
						name="subCategoryId"
						render={({ field }) => (
							<Select
								className="w-full"
								value={field.value || ""}
								onValueChange={(value) => {
									field.onChange(value);
									setNumSubCategory(value);
								}}
							>
								<SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600">
									<SelectValue
										placeholder="Select Sub Category"
										className="text-gray-500 dark:text-gray-400 h-20 truncate"
										style={{
											maxWidth: "150px",
											overflow: "hidden",
											textOverflow: "ellipsis",
											whiteSpace: "nowrap",
										}}
										value={field.value || ""}
										onValueChange={(value) => {
											field.onChange(value);
											setNumSubCategory(value);
										}}
									/>
								</SelectTrigger>
								<SelectContent className="dark:bg-gray-700 dark:border-gray-600">
									{numCategory &&
										categories
											?.find(
												(cat) =>
													String(cat.id) ===
													numCategory,
											)
											?.subCategories?.map(
												(subCategory) => {
													return (
														<SelectItem
															key={subCategory.id}
															value={String(
																subCategory.id,
															)}
														>
															{subCategory.name}
														</SelectItem>
													);
												},
											)}
								</SelectContent>
							</Select>
						)}
					/>
				</Row>
			</Column>
			{numCategory && numSubCategory && (
				<Row className="w-full gap-1">
					<InputOne
						type="text"
						placeholder="Name"
						className="w-full"
						control={controlEditSubCategory}
						{...register("name")}
					/>
					<InputOne
						type="file"
						className="w-full"
						control={controlEditSubCategory}
						{...register("iconSubCat")}
						placeholder="File"
					/>
					<ButtonOne
						type="button"
						variant="cancel"
						onClick={() => {
							resetEditSubCategory();
							setNumCategory(null);
							setNumSubCategory(null);
						}}
					>
						Cancel
					</ButtonOne>
					<ButtonOne type="submit" variant="edit">
						Save
					</ButtonOne>
				</Row>
			)}
		</Form>
	);
};

export default EditSubCategory;
