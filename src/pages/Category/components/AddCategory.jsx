import { Category } from "@/api/cateogryApi";
import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
	ButtonOne,
	Column,
	Form,
	InputOne,
	Label,
} from "../constant/tw-styled-components";

const AddCategory = () => {
	const queryClient = useQueryClient();
	const {
		register: registerCategory,
		handleSubmit: handleSubmitCategory,
		reset: resetCategory,
	} = useForm();
	const { mutate: createCategory, isPending } =
		useMutation({
			mutationFn: (formData) =>
				Category.createCategory(formData),
			onSuccess: () => {
				toast.success(
					"Category created successfully!",
				);
				resetCategory();
				queryClient.invalidateQueries([
					"categories",
				]);
			},
			onError: (error) => {
				console.error(
					"Error creating category:",
					error,
				);
				let errorMessage =
					"Category creation failed";

				if (error?.response?.data?.message) {
					errorMessage =
						error.response.data.message;
				} else if (error?.response?.data?.error) {
					errorMessage =
						error.response.data.error;
				} else if (error?.message) {
					errorMessage = error.message;
				}

				toast.error(errorMessage);
			},
		});
	const onSubmit = async (data) => {
		console.log("data", data);
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("iconCat", data.iconCat[0]);
		createCategory(formData);
	};
	return (
		<Form
			border
			onSubmit={handleSubmitCategory(onSubmit)}
		>
			<Column className="w-full gap-1 md:flex-row">
				<Column className="w-full">
					<Label htmlFor="categoryName">
						Add Category
					</Label>
					<InputOne
						type="text"
						id="categoryName"
						placeholder="Add new category..."
						className="w-full"
						{...registerCategory("name")}
					/>
				</Column>
				<Column className="self-end">
					<InputOne
						type="file"
						id="categoryIcon"
						placeholder="Add category icon"
						className="w-full "
						{...registerCategory("iconCat")}
					/>
				</Column>

				<ButtonOne
					type="submit"
					disabled={isPending}
					className="self-end w-full md:w-auto"
				>
					{isPending ? "Creating..." : "Create"}
				</ButtonOne>
			</Column>
		</Form>
	);
};

export default AddCategory;
