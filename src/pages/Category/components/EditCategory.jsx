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
import {
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
const EditCategory = ({ categories }) => {
	const queryClient = useQueryClient();
	const categoriesData = categories?.data || [];
	const {
		register,
		control: controlEditCategory,
		handleSubmit: handleSubmitEditCategory,
		reset: resetEditCategory,
	} = useForm();
	const [selectedCategory, setSelectedCategory] =
		useState(false);
	const onSubmit = async (data) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("iconCat", data.iconCat[0]);
		console.log(formData);
		const id = data.id;
		try {
			await Category.updateCategory(id, formData);
			await queryClient.invalidateQueries([
				"categories",
			]);
			setSelectedCategory(false);
			resetEditCategory();
		} catch (err) {
			toast.error(err.response?.data?.message);
			console.log("err", err);
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
				<Row className="w-full">
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
					<div className="flex gap-2">
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
				</Row>
			)}
		</Form>
	);
};
export default EditCategory;
