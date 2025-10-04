import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Controller,
	useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Category } from "../../../api/cateogryApi";
import {
	ButtonOne,
	Column,
	Form,
	InputOne,
	Label,
	Row,
} from "../constant/tw-styled-components";
const EditCategory = ({ categories }) => {
	const queryClient = useQueryClient();
	const categoriesData = categories?.data || [];
	const {
		register,
		setValue,
		watch,
		control: controlEditCategory,
		handleSubmit: handleSubmitEditCategory,
		reset: resetEditCategory,
	} = useForm();
	const [selectedCategory, setSelectedCategory] =
		useState(false);
	const onSubmit = async (data) => {
		try {
			const formData = new FormData();
			formData.append("name", data.name);
			formData.append("iconCat", data.iconCat[0]);
			console.log(formData);
			const id = data.id;

			await Category.updateCategory(id, formData);
			toast.success(
				"Category updated successfully!",
			);
			await queryClient.invalidateQueries([
				"categories",
			]);
			setSelectedCategory(false);
			resetEditCategory();
		} catch (err) {
			console.error(
				"Error updating category:",
				err,
			);

			let errorMessage =
				"Failed to update category";
			if (err?.response?.data?.message) {
				errorMessage = err.response.data.message;
			} else if (err?.response?.data?.error) {
				errorMessage = err.response.data.error;
			} else if (err?.message) {
				errorMessage = err.message;
			}

			toast.error(errorMessage);
		}
	};

	return (
		<Form
			border
			onSubmit={handleSubmitEditCategory(
				onSubmit,
			)}
			className="w-full flex flex-col gap-2"
		>
			<Row className="w-full">
				<Column className="w-full">
					<Label htmlFor="EditCategory">
						Edit Category
					</Label>
					<Controller
						control={controlEditCategory}
						name="id"
						className="w-full"
						render={({ field }) => (
							<Select
								id="EditCategory"
								className="w-full"
								value={field.value || ""}
								onValueChange={(value) => {
									if (value === "cancel") {
										field.onChange("");
										setSelectedCategory(false);
									} else {
										field.onChange(value);
										setSelectedCategory(!!value);
									}
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
									/>
								</SelectTrigger>
								<SelectContent className="dark:bg-gray-700 dark:border-gray-600">
									<SelectItem value="cancel">
										-- Cancel Selection --
									</SelectItem>
									{categoriesData?.map(
										(category) => (
											<SelectItem
												key={category.id}
												value={String(
													category.id,
												)}
											>
												{category.name}
											</SelectItem>
										),
									)}
								</SelectContent>
							</Select>
						)}
					/>
				</Column>
			</Row>
			{selectedCategory && (
				<>
					<Row className="w-full items-center">
						<InputOne
							type="text"
							placeholder="Edit Category Name"
							className="w-full"
							{...register("name")}
						/>
						<InputOne
							type="file"
							placeholder="Edit Category Image"
							className="w-full"
							{...register("iconCat")}
						/>
					</Row>
					<div className="flex gap-2 w-full overflow-hidden">
						<ButtonOne
							type="button"
							variant="cancel"
							onClick={() => {
								setSelectedCategory(false);
								resetEditCategory();
							}}
						>
							Cancel
						</ButtonOne>
						<ButtonOne
							type="submit"
							variant="edit"
						>
							Save
						</ButtonOne>
					</div>
				</>
			)}
		</Form>
	);
};
export default EditCategory;
