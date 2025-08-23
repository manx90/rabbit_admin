import { useForm } from "react-hook-form";
import {
	Form,
	Column,
	Label,
	InputOne,
	ButtonOne,
} from "../constant/tw-styled-components";
import { Category } from "@/api/cateogryApi";
import { toast } from "react-toastify";
import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

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
					"Category created successfully",
				);
				resetCategory();
				queryClient.invalidateQueries([
					"categories",
				]);
			},
			onError: () => {
				toast.error("Category creation failed", {
					position: "top-right",
				});
			},
		});
	const onSubmit = (data) => {
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
