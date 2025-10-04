import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React, {
	useEffect,
	useState,
} from "react";
import { RiDeleteBin6Line } from "@react-icons/all-files/ri/RiDeleteBin6Line";

import {
	Controller,
	FormProvider,
	useForm,
} from "react-hook-form";
import { Category as CategoryApi } from "../../api/cateogryApi";
import { Product as ProductApi } from "../../api/productAPI";
import { Collection as CollectionApi } from "../../api/collectionApi";
import AddCategory from "./components/AddCategory";
import AddSubCategory from "./components/AddSubCategory";
import DeleteCategory from "./components/DeleteCategory";
import DeleteSubCategory from "./components/DeleteSubCategory";
import EditCategory from "./components/EditCategory";
import EditSubCategory from "./components/EditSubCategory";
import DropDown from "@/components/dropDown";
import { TableOne } from "./components/TableOne";
import {
	ButtonOne,
	Column,
	Container,
	Form,
	InputOne,
	Label,
	Row,
	Section,
	Title,
} from "./constant/tw-styled-components";
import useCollections from "../../hooks/useCollection";
import { Collections } from "../../api/collectionsApi";
import { toast } from "react-toastify";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import MultiSelect from "./components/multiSelect";
const Category = ({ categories, refetch }) => {
	const handleCategoryUpdateState = async (
		id,
	) => {
		await CategoryApi.updateState(id);
		await refetch();
	};
	const handleSubCategoryUpdateState = async (
		id,
	) => {
		await CategoryApi.updateStateSub(id);
		await refetch();
	};

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
					<table className="flex flex-col min-w-full mt-4 border border-gray-300 rounded-lg">
						<thead className="w-full">
							<tr className="flex ">
								<th className="px-4 py-2 border-b w-full">
									Categry
								</th>
								<th className="px-4 py-2 border-b w-full">
									state
								</th>
							</tr>
						</thead>
						<tbody className="w-full">
							{categories?.data?.map(
								(category) => (
									<React.Fragment
										key={category.id}
									>
										<tr className="flex items-center last:border-b-0 border-b  group  transition">
											<td className="px-4 py-2  w-full  justify-center text-center flex items-center gap-2">
												<span>
													{category.name}
												</span>
											</td>
											<td className="px-4 py-2  w-full text-center">
												{category.isActive ===
												true ? (
													<span
														className="text-green-600 hover:bg-green-200 bg-green-100 rounded-sm  px-3 py-[0.5px] text-sm cursor-pointer"
														onClick={() =>
															handleCategoryUpdateState(
																category.id,
															)
														}
													>
														Active
													</span>
												) : (
													<span
														className="text-red-600  hover:text-red-600 bg-red-100 hover:bg-red-200  rounded-sm px-3 py-[0.5px] text-sm  cursor-pointer"
														onClick={() =>
															handleCategoryUpdateState(
																category.id,
															)
														}
													>
														Inactive
													</span>
												)}
											</td>
										</tr>
									</React.Fragment>
								),
							)}
						</tbody>
					</table>
					<table className="flex flex-col min-w-full mt-4 border border-gray-300 rounded-lg">
						<thead className="w-full">
							<tr className="flex ">
								<th className="px-4 py-2 border-b w-full">
									SubCategory
								</th>
								<th className="px-4 py-2 border-b w-full">
									state
								</th>
							</tr>
						</thead>
						<tbody className="w-full">
							{categories?.data?.map(
								(category) => (
									<React.Fragment
										key={category.id}
									>
										<tr className="flex mx-auto items-center justify-center border-b-2">
											<span className="text-center mx-auto">
												{category.name}
											</span>
										</tr>
										{category?.subCategories.map(
											(subCategories) => (
												<tr className="flex items-center last:border-b-0 border-b  group  transition">
													<td className="px-4 py-2  w-full  justify-center text-center flex items-center gap-2">
														<span>
															{subCategories.name}
														</span>
													</td>
													<td className="px-4 py-2  w-full text-center">
														{subCategories.isActive ===
														true ? (
															<span
																className="text-green-600 hover:bg-green-200 bg-green-100 rounded-sm  px-3 py-[0.5px] text-sm cursor-pointer"
																onClick={() =>
																	handleSubCategoryUpdateState(
																		subCategories.id,
																	)
																}
															>
																Active
															</span>
														) : (
															<span
																className="text-red-600  hover:text-red-600 bg-red-100 hover:bg-red-200  rounded-sm px-3 py-[0.5px] text-sm  cursor-pointer"
																onClick={() =>
																	handleSubCategoryUpdateState(
																		subCategories.id,
																	)
																}
															>
																Inactive
															</span>
														)}
													</td>
												</tr>
											),
										)}
									</React.Fragment>
								),
							)}
						</tbody>
					</table>
					<table className="flex flex-col min-w-full mt-4 border border-gray-300 rounded-lg">
						<thead className="w-full">
							<tr className="flex">
								<th className="px-4 py-2 border-b w-full">
									Season
								</th>
								<th className="px-4 py-2 border-b w-full">
									State
								</th>
							</tr>
						</thead>
						<tbody className="w-full">
							<tr className="flex p-2 mx-auto items-center justify-center border-b ">
								<td className="text-center mx-auto">
									Winter
								</td>
								<td className="text-center mx-auto">
									<DropDown
										option1={"Active"}
										option2={"inActive"}
										handle1={
											ProductApi.ShowSeasonWinter
										}
										handle2={
											ProductApi.HideSeasonWinter
										}
									/>
								</td>
							</tr>
							<tr className="flex p-2 mx-auto items-center justify-center border-b ">
								<td className="text-center mx-auto">
									Summer
								</td>
								<td className="text-center mx-auto">
									{" "}
									<DropDown
										option1={"Active"}
										option2={"inActive"}
										handle1={
											ProductApi.ShowSeasonSummer
										}
										handle2={
											ProductApi.HideSeasonSummer
										}
									/>
								</td>
							</tr>
							<tr className="flex p-2 mx-auto items-center justify-center ">
								<td className="text-center mx-auto">
									Spring
								</td>
								<td className="text-center mx-auto">
									{" "}
									<DropDown
										option1={"Active"}
										option2={"inActive"}
										handle1={
											ProductApi.ShowSeasonSpring
										}
										handle2={
											ProductApi.HideSeasonSpring
										}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</Section>
				<Section className="min-w-96 h-full self-start">
					<Title>Collection</Title>
					<Collection categories={categories} />
				</Section>
			</Row>
		</Container>
	);
};

const Collection = ({ categories }) => {
	const [productIds, setproductIds] = useState(
		[],
	);
	const [open, setOpen] = useState(null);
	const [idDelete, setIdDelete] = useState(null);
	const { data: Collection, refetch } =
		useCollections();

	const handleDelete = async (id) => {
		try {
			await Collections.DeleteOne(id);
			toast.success(
				"Collection deleted successfully!",
			);
			refetch();
		} catch (error) {
			console.error(error);

			// Extract error message from different possible error structures
			let errorMessage =
				"Failed to delete collection";

			if (error?.response?.data?.message) {
				errorMessage =
					error.response.data.message;
			} else if (error?.response?.data?.error) {
				errorMessage = error.response.data.error;
			} else if (error?.message) {
				errorMessage = error.message;
			} else if (error?.response?.statusText) {
				errorMessage = `Error ${error.response.status}: ${error.response.statusText}`;
			}

			toast.error(errorMessage);
		}
	};
	const categoriesData = categories?.data || [];
	const initialValues = {
		productIds: [],
	};
	const methods = useForm({
		defaultValues: initialValues,
		mode: "all",
	});
	const {
		register: registerCollection,
		control: controlCollection,
		reset: resetCollection,
		setValue: setValueCollection,
		// handleSubmit is not used directly; using methods.handleSubmit instead
	} = methods;
	const [numCategory, setNumCategory] =
		useState(0);
	const [numSubCategory, setNumSubCategory] =
		useState(0);
	const onSubmit = async (data) => {
		try {
			const draft = { ...data };

			// Build payload object - only include fields that have values
			const payload = {};

			// Add name if provided
			if (draft.name && draft.name.trim()) {
				payload.name = draft.name.trim();
			}

			// Add categoryIds if provided
			if (draft.categoryIds) {
				const categoryIds = Array.isArray(
					draft.categoryIds,
				)
					? draft.categoryIds
					: [draft.categoryIds];
				if (
					categoryIds.length > 0 &&
					categoryIds[0]
				) {
					payload.categoryIds = categoryIds.map(
						(id) => parseInt(id),
					);
				}
			}

			// Add subCategoryIds if provided
			if (draft.subCategoryIds) {
				const subCategoryIds = Array.isArray(
					draft.subCategoryIds,
				)
					? draft.subCategoryIds
					: [draft.subCategoryIds];
				if (
					subCategoryIds.length > 0 &&
					subCategoryIds[0]
				) {
					payload.subCategoryIds =
						subCategoryIds.map((id) =>
							parseInt(id),
						);
				}
			}

			// Add productIds from table state if any selected
			if (
				Array.isArray(productIds) &&
				productIds.length > 0
			) {
				payload.productIds = productIds.map(
					(id) => parseInt(id),
				);
			}

			// Handle file upload if present
			const hasFileList =
				draft.iconCollection instanceof
					FileList &&
				draft.iconCollection.length > 0;

			let finalPayload = payload;
			if (hasFileList) {
				// Use FormData for file uploads
				const fd = new FormData();

				// Add all non-file fields to FormData
				Object.keys(payload).forEach((key) => {
					if (Array.isArray(payload[key])) {
						payload[key].forEach((value) => {
							fd.append(key, value);
						});
					} else {
						fd.append(key, payload[key]);
					}
				});

				fd.append(
					"iconCollection",
					draft.iconCollection[0],
				);
				finalPayload = fd;
			}

			await CollectionApi.createCollection(
				finalPayload,
			);
			toast.success(
				"Collection created successfully!",
			);
			await refetch();

			// Reset both state and form values
			setproductIds([]);
			resetCollection();
			setValueCollection("productIds", []);
			setValueCollection("categoryIds", "");
			setValueCollection("subCategoryIds", "");
			setNumCategory(0);
			setNumSubCategory(0);
		} catch (error) {
			console.error(error);

			// Extract error message from different possible error structures
			let errorMessage =
				"Failed to create collection";

			if (error?.response?.data?.message) {
				errorMessage =
					error.response.data.message;
			} else if (error?.response?.data?.error) {
				errorMessage = error.response.data.error;
			} else if (error?.message) {
				errorMessage = error.message;
			} else if (error?.response?.statusText) {
				errorMessage = `Error ${error.response.status}: ${error.response.statusText}`;
			}

			toast.error(errorMessage);
		}
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
												categoriesData
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
					<Controller
						control={controlCollection}
						name="productIds"
						render={({ field }) => (
							<MultiSelect
								setproductIds={(ids) => {
									setproductIds(ids);
									field.onChange(ids);
								}}
								productIds={productIds}
								categoryId={numCategory}
								subcategoryId={numSubCategory}
							/>
						)}
					/>
					<Row className="gap-2 justify-between">
						<ButtonOne
							variant="cancel"
							onClick={() => {
								console.log(
									"Before cancel - productIds:",
									productIds,
								);
								setproductIds([]);
								setNumCategory(0);
								setNumSubCategory(0);
								resetCollection();
								setValueCollection(
									"productIds",
									[],
								);
								setValueCollection(
									"categoryIds",
									"",
								);
								setValueCollection(
									"subCategoryIds",
									"",
								);
								console.log(
									"After cancel - productIds should be empty",
								);
							}}
						>
							Cancel
						</ButtonOne>
						<ButtonOne type="submit">
							Add
						</ButtonOne>
					</Row>
				</Column>
				<Column>
					<span className="mx-auto text-3xl">
						Collections
					</span>
					<Column className="border rounded overflow-hidden">
						<div className="overflow-auto max-h-96">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50 dark:bg-gray-700">
									<tr>
										<th className="px-4 py-2 w-10 text-center  mx-auto font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
											ID
										</th>
										<th className="px-4 py-2   mx-auto text-center font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
											Name
										</th>
										<th className="px-4 py-2 w-16  mx-auto text-center font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
											Quantity
										</th>
										<th className="px-4 py-2 text-center  mx-auto font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
											Action
										</th>
									</tr>
								</thead>
								<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
									{Collection?.data?.map(
										(item) => (
											<tr key={item.id}>
												<td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
													{item.id}
												</td>
												<td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
													{item.name}
												</td>
												<td className="px-4 py-2 text-center whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
													{item.productCount}
												</td>
												<td className="px-4 py-2 text-center whitespace-nowrap text-sm">
													<button
														type="button"
														className="text-red-700 text-sm px-2 cursor-pointer"
														onClick={() => {
															setOpen(true);
															setIdDelete(
																item.id,
															);
														}}
													>
														<RiDeleteBin6Line className="text-red-500 w-4 h-4" />
													</button>
												</td>
											</tr>
										),
									)}
								</tbody>
							</table>
						</div>
					</Column>
				</Column>
			</Form>
			<ConfirmDelete
				open={open}
				setOpen={setOpen}
				id={idDelete}
				handleDelete={handleDelete}
				refetch={refetch}
			/>
		</FormProvider>
	);
};
const ConfirmDelete = ({
	open,
	setOpen,
	id,
	handleDelete,
	refetch,
}) => {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [open]);
	return (
		<div
			className={`fixed inset-0 bg-black/50 h-screen w-screen flex justify-center items-center transition-all duration-300 ${
				open
					? "opacity-100 z-50 pointer-events-auto"
					: "opacity-0 -z-50 pointer-events-none"
			}`}
			onClick={() => {
				setOpen(false);
			}}
		>
			<div
				className="relative bg-gray-100 w-3/4 lg:w-fit dark:bg-gray-700 p-4 rounded-md justify-center flex flex-col gap-4"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<button
					className="absolute cursor-pointer top-2 right-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
					onClick={() => {
						setOpen(false);
					}}
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<div className="text-center mb-6">
					<div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
						<MdDelete className="w-6 h-6 text-red-600 dark:text-red-400" />
					</div>
					<h2 className="font-Noto text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
						حذف المنتج
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						هل أنت متأكد من أنك تريد حذف هذا
						المنتج؟ لا يمكن التراجع عن هذا
						الإجراء.
					</p>
				</div>
				<ButtonOne
					className="bg-red-600 text-lg text-white mx-auto hover:bg-red-700 dark:hover:bg-red-700 dark:text-white"
					onClick={() => {
						handleDelete(id);
						setOpen(false);
						refetch();
					}}
				>
					حذف
				</ButtonOne>
			</div>
		</div>
	);
};
export default Category;
