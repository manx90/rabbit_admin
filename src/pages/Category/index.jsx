import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TableOne } from "./components/TableOne";
import {
	useForm,
	Controller,
	FormProvider,
} from "react-hook-form";
import {
	Container,
	Section,
	Label,
	Form,
	InputOne,
	ButtonOne,
	Row,
	Column,
	Title,
} from "./constant/tw-styled-components";
import AddCategory from "./components/AddCategory";
import AddSubCategory from "./components/AddSubCategory";
import EditCategory from "./components/EditCategory";
import EditSubCategory from "./components/EditSubCategory";
import DeleteCategory from "./components/DeleteCategory";
import DeleteSubCategory from "./components/DeleteSubCategory";
import { useQuery } from "@tanstack/react-query";
import { Category as CategoryApi } from "../../api/cateogryApi";
import { useState } from "react";
const Category = ({ categories }) => {
	return (
		<Container className="flex flex-col gap-4">
			<Row className="grid lg:grid-cols-2 gap-4 sm:grid-cols-1">
				<Section className="self-stretch min-w-96 w-full">
					<Title>Category and Sub Category</Title>
					<AddCategory categories={categories} />
					<AddSubCategory
						categories={categories}
					/>
					<EditCategory categories={categories} />
					<EditSubCategory
						categories={categories}
					/>
					<DeleteCategory
						categories={categories}
					/>
					<DeleteSubCategory
						categories={categories}
					/>
				</Section>
				<Section className="min-w-96 h-full self-start">
					<Title>Collection</Title>
					<Collection categories={categories} />
				</Section>
			</Row>
			<Section>
				<Column className="justify-between items-center lg:flex-row gap-4">
					<TableOne checkbox={false} />
					<TableOne checkbox={false} />
				</Column>
			</Section>
		</Container>
	);
};

const Collection = ({ categories }) => {
	const categoriesData = categories?.data || [];
	const initialValues = {
		selectedProducts: [],
	};
	const methods = useForm({
		defaultValues: initialValues,
		mode: "all",
	});
	const {
		register: registerCollection,
		control: controlCollection,
		handleSubmit: handleSubmitCollection,
		reset: resetCollection,
	} = methods;
	const [numCategory, setNumCategory] =
		useState(0);
	const [numSubCategory, setNumSubCategory] =
		useState(0);
	const onSubmit = (data) => {
		console.log("data", data);
		resetCollection();
	};
	return (
		<FormProvider {...methods}>
			<Form
				border
				onSubmit={methods.handleSubmit(onSubmit)}
				className="w-full"
			>
				<Column>
					<Row className="w-full">
						<Column className="gap-1">
							<Label htmlFor="name">
								Collection Name
							</Label>
							<InputOne
								id="name"
								type="text"
								placeholder="Add a collection name..."
								className="w-full"
								{...registerCollection("name")}
							/>
						</Column>
						<InputOne
							type="file"
							placeholder="Add a collection image..."
							className="w-full"
							{...registerCollection(
								"iconCollection",
							)}
						/>
					</Row>

					<Row className="w-full">
						<Column className="gap-1 w-full">
							<Controller
								control={controlCollection}
								name="categoryIds"
								render={({ field }) => (
									<Select
										id="AddCategory"
										className="w-full"
										value={field.value || ""}
										onValueChange={(value) => {
											field.onChange(value);
											setNumCategory(value);
										}}
									>
										<SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600">
											<SelectValue
												placeholder="Select a category"
												className="text-gray-500 dark:text-gray-400 h-20 truncate"
											/>
										</SelectTrigger>
										<SelectContent className="dark:bg-gray-700 dark:border-gray-600">
											{categoriesData?.map(
												(category) => (
													<SelectItem
														key={category.id}
														value={String(
															category.id,
														)}
														className="dark:text-gray-300 dark:hover:bg-gray-600"
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
						<Column className="gap-1 w-full">
							<Controller
								control={controlCollection}
								name="subCategoryIds"
								render={({ field }) => (
									<Select
										id="subCategoryName"
										disabled={!numCategory}
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
												className="dark:text-gray-400"
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
																	key={
																		subCategory.id
																	}
																	value={String(
																		subCategory.id,
																	)}
																>
																	{
																		subCategory.name
																	}
																</SelectItem>
															);
														},
													)}
										</SelectContent>
									</Select>
								)}
							/>
						</Column>
					</Row>
				</Column>
				<Column className="w-full">
					<TableOne
						checkbox={true}
						collectionShow={false}
						categoryId={numCategory}
						subcategoryId={numSubCategory}
					/>
					<Row className="gap-2 justify-between">
						<ButtonOne
							variant="cancel"
							onClick={() => {
								resetCollection();
							}}
						>
							Cancel
						</ButtonOne>
						<ButtonOne type="submit">
							Add
						</ButtonOne>
					</Row>
				</Column>
			</Form>
		</FormProvider>
	);
};

export default Category;
