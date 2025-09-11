import { Product as ProductAPI } from "@/api/productAPI";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import {
	useEffect,
	useRef,
	useState,
} from "react";
import {
	Controller,
	FormProvider,
	useFieldArray,
	useForm,
} from "react-hook-form";
import {
	ButtonOne,
	Column,
	Container,
	Form,
	InputOne,
	Label,
	Row,
	Section,
} from "../Category/constant/tw-styled-components";
import ColorImg from "./components/ColorImg";
import { DateCalender } from "./components/DateCalender";
import FileUpload from "./components/fileupload";
import SizeComponent from "./components/SizeComponents";
import { TableProduct } from "./components/Table";
const Product = ({ categories }) => {
	const [isEditing, setIsEditing] =
		useState(false);
	const [editingProductId, setEditingProductId] =
		useState(null);

	const handleAddColor = () => {
		appendColor({ name: "", imgColor: "" });
	};
	const [query, setQuery] = useState("");
	const [limit, setLimit] = useState(10);
	const {
		data: products,
		refetch,
		isLoading,
	} = useQuery({
		queryKey: ["products", query, limit],
		queryFn: () =>
			ProductAPI.getAll({
				q: query,
				limit: limit,
			}),
	});

	const handleRemoveColor = (colorIndex) => {
		removeColor(colorIndex);
	};
	const handleColorNameChange = (
		colorIndex,
		newName,
	) => {
		setValue(
			`colors.${colorIndex}.name`,
			newName,
			{
				shouldDirty: true,
				shouldTouch: true,
			},
		);

		const sizesVal = getValues("sizes") || [];
		for (
			let sIdx = 0;
			sIdx < sizesVal.length;
			sIdx++
		) {
			setValue(
				`sizes.${sIdx}.quantities.${colorIndex}.colorName`,
				newName,
				{
					shouldDirty: true,
				},
			);
		}
	};
	const handleRemoveSize = (sizeIndex) => {
		removeSize(sizeIndex);
	};
	const handleAddSize = () => {
		const colorsArr = getValues("colors") || [];
		appendSize({
			sizeName: "",
			price: "",
			quantities: colorsArr.map((c) => ({
				colorName: c?.name || "",
				quantity: "",
			})),
		});
	};

	const methods = useForm({
		defaultValues: {
			name: "",
			wordkey: [],
			date: "",
			description: "",
			category: "",
			subcategory: "",
			season: "",
			videoLink: "",
			sizes: [
				{
					sizeName: "",
					price: "",
					quantities: [
						{
							colorName: "",
							quantity: "",
						},
					],
				},
			],
			colors: [{ name: "", imgColor: [] }],
		},
	});
	const {
		control,
		handleSubmit,
		register,
		setValue,
		watch,
		getValues,
		reset,
		setFocus,
	} = methods;

	const {
		append: appendSize,
		remove: removeSize,
		replace: replaceSize,
		fields: sizeFields,
	} = useFieldArray({
		control,
		name: "sizes",
	});

	const {
		append: appendColor,
		remove: removeColor,
		replace: replaceColor,
		fields: colorFields,
	} = useFieldArray({
		control,
		name: "colors",
	});
	const colors = watch("colors");
	const sizesLen = watch("sizes")?.length || 0;

	const handleEditProduct = (item) => {
		// reset();
		setIsEditing(true);
		setEditingProductId(item.id);
		setValue("name", item.name);
		setValue("description", item.description);
		setValue("season", item.season);
		setValue("videoLink", item.videoLink);
		// Convert date string to Date object if needed
		const dateValue = item.date
			? new Date(item.date)
			: null;
		setValue("date", dateValue);

		// Set category and subcategory IDs (not names)
		setValue(
			"category",
			String(item.category.id),
		);
		setValue(
			"subcategory",
			String(item.subCategory.id),
		);

		// Set wordkey as array if it's a string
		const wordkeyArray = Array.isArray(
			item.wordkey,
		)
			? item.wordkey
			: item.wordkey
			? item.wordkey
					.split(",")
					.map((w) => w.trim())
			: [];
		setValue("wordkey", wordkeyArray);

		// Set colors with proper structure using replace
		if (
			item.colors &&
			Array.isArray(item.colors)
		) {
			const colorsData = item.colors.map(
				(color) => ({
					name: color.name || "",
					imgColor:
						typeof color.imgColor === "string"
							? ""
							: color.imgColor || [],
				}),
			);
			replaceColor(colorsData);
		}

		// Set sizes with proper structure using replace
		if (
			item.sizeDetails &&
			Array.isArray(item.sizeDetails)
		) {
			const sizesData = item.sizeDetails.map(
				(size) => ({
					sizeName: size.sizeName || "",
					price: size.price || "",
					quantities: size.quantities || [],
				}),
			);
			replaceSize(sizesData);
		}
	};
	const sizeNameRefs = useRef([]);
	const priceRefs = useRef([]);
	const quantityRefs = useRef([]);
	const [resetKey, setResetKey] = useState(0);

	useEffect(() => {
		const colorsArr = (
			getValues("colors") || []
		).map((c) => c ?? {});
		const sizesVal = getValues("sizes") || [];
		if (!sizesVal.length) return;

		const rebuilt = sizesVal.map((size) => {
			const nextQ = colorsArr.map((c, idx) => ({
				colorName: c.name || "",
				quantity:
					size.quantities?.[idx]?.quantity ?? "",
			}));
			return { ...size, quantities: nextQ };
		});

		if (
			JSON.stringify(rebuilt) !==
			JSON.stringify(sizesVal)
		) {
			setValue("sizes", rebuilt, {
				shouldDirty: true,
			});
		}
	}, [colors, sizesLen, getValues, setValue]);
	const [loadingSubmit, setLoadingSubmit] =
		useState(false);
	const onSubmit = async (data) => {
		const formdata = new FormData();
		formdata.append("name", data.name);
		data.wordkey.map((w, idx) => {
			formdata.append(`wordKeys[${idx}]`, w);
		});
		// Handle date properly - send in YYYY-MM-DD format which is commonly accepted
		if (data.date) {
			let dateToSend;

			if (data.date instanceof Date) {
				dateToSend = data.date;
			} else if (typeof data.date === "string") {
				dateToSend = new Date(data.date);
			} else {
				dateToSend = new Date(data.date);
			}

			// Check if the date is valid
			if (!isNaN(dateToSend.getTime())) {
				// Send in YYYY-MM-DD format which is more commonly accepted
				const dateString = dateToSend
					.toISOString()
					.split("T")[0];
				formdata.append(
					"datePublished",
					dateString,
				);
			} else {
				console.warn(
					"Invalid date provided:",
					data.date,
				);
				// If date is invalid, send current date
				const now = new Date();
				formdata.append(
					"datePublished",
					now.toISOString().split("T")[0],
				);
			}
		} else {
			// If no date provided, send current date
			const now = new Date();
			formdata.append(
				"datePublished",
				now.toISOString().split("T")[0],
			);
		}
		formdata.append(
			"description",
			data.description,
		);
		formdata.append(
			"categoryId",
			String(data.category),
		);
		formdata.append(
			"subCategoryId",
			String(data.subcategory),
		);
		if (
			data.imgCover &&
			data.imgCover.length > 0
		) {
			// Extract the actual File object from FileWithPreview wrapper
			const coverFile = data.imgCover[0];
			if (coverFile) {
				formdata.append("imgCover", coverFile);
			}
		}
		if (data.images) {
			for (const image of data.images) {
				formdata.append("images", image);
			}
		}
		data.colors.map((c, idx) => {
			formdata.append(
				`colors[${idx}][name]`,
				c.name,
			);
		});
		data.sizes.map((s, idx) => {
			formdata.append(
				`sizes[${idx}][sizeName]`,
				s.sizeName,
			);
			formdata.append(
				`sizes[${idx}][price]`,
				s.price,
			);
			s.quantities.map((q, qIdx) => {
				formdata.append(
					`sizes[${idx}][quantities][${qIdx}][colorName]`,
					q.colorName,
				);
				formdata.append(
					`sizes[${idx}][quantities][${qIdx}][quantity]`,
					q.quantity || 0,
				);
			});
		});
		console.log(data.sizes);
		if (
			data.colors &&
			Array.isArray(data.colors)
		) {
			data.colors.forEach((c) => {
				if (c.imgColor && c.imgColor.length > 0) {
					// Extract the actual File object from FileWithPreview wrapper
					const colorFile = c.imgColor[0];
					if (colorFile) {
						formdata.append(
							"imgColors",
							colorFile,
						);
					}
				}
			});
		}
		if (
			data.imgMeasure &&
			data.imgMeasure.length > 0
		) {
			// Extract the actual File object from FileWithPreview wrapper
			const measureFile = data.imgMeasure[0];
			if (measureFile) {
				formdata.append(
					"imgMeasure",
					measureFile,
				);
			}
		}
		if (
			data.imgSizeChart &&
			data.imgSizeChart.length > 0
		) {
			// Extract the actual File object from FileWithPreview wrapper
			const sizeChartFile = data.imgSizeChart[0];
			if (sizeChartFile) {
				formdata.append(
					"imgSizeChart",
					sizeChartFile,
				);
			}
		}
		formdata.append("videoLink", data.videoLink);
		formdata.append("season", data.season);
		try {
			setLoadingSubmit(true);

			if (isEditing && editingProductId) {
				await ProductAPI.update(
					editingProductId,
					formdata,
				).then((res) => {
					console.log(res);
				});
			} else {
				await ProductAPI.create(formdata);
				refetch();
			}

			reset();
			setIsEditing(false);
			setEditingProductId(null);
			refetch();
		} catch (error) {
			console.error(
				"Error saving product:",
				error,
			);
		} finally {
			setResetKey((prev) => prev + 1);
			setLoadingSubmit(false);
		}
	};
	const CateWatch = watch("category") || "";
	return (
		<FormProvider {...methods}>
			<Container>
				{isEditing && (
					<div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
						<h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
							Editing Product:{" "}
							{watch("name") || "Loading..."}
						</h2>
						<p className="text-sm text-blue-600 dark:text-blue-300">
							Make your changes and click "Update"
							to save, or "Cancel Edit" to discard
							changes.
						</p>
					</div>
				)}
				<Form
					className="grid grid-cols-1 lg:grid-cols-2 gap-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Section className=" col-span-1 lg:max-w-[800px]">
						<Column className="w-full">
							<Row className="w-full">
								<Column className="w-full">
									<Label>Name</Label>
									<InputOne
										type="text"
										placeholder="Jeans"
										className="border-gray-500 dark:border-gray-600"
										{...register("name", {
											setValueAs: (value) =>
												value.trim(),
										})}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												setFocus("description");
												e.preventDefault();
											}
										}}
									/>
								</Column>
								<Column className="w-full">
									<Label>Description</Label>
									<InputOne
										dir="rtl"
										type="text"
										className="border-gray-500 dark:border-gray-600"
										{...register("description", {
											setValueAs: (value) =>
												value.trim(),
										})}
									/>
								</Column>
							</Row>
							<Row className="w-full">
								<Column className="w-full">
									<Label className="text-gray-500 dark:text-gray-400">
										Category
									</Label>
									<Controller
										control={control}
										name="category"
										render={({ field }) => (
											<Select
												className="w-full"
												value={field.value || ""}
												onValueChange={(
													value,
												) => {
													field.onChange(value);
												}}
											>
												<SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600">
													<SelectValue
														placeholder="Select a category"
														className="text-gray-500 dark:text-gray-400 h-20 truncate"
													/>
												</SelectTrigger>
												<SelectContent className="bg-white dark:bg-gray-700 dark:border-gray-600">
													{categories?.data?.map(
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
								<Column className="w-full">
									<Label className="text-gray-500 dark:text-gray-400">
										Subcategory
									</Label>
									<Controller
										control={control}
										name="subcategory"
										render={({ field }) => (
											<Select
												className="w-full"
												value={field.value || ""}
												disabled={!CateWatch}
												onValueChange={(
													value,
												) => {
													field.onChange(value);
												}}
											>
												<SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600">
													<SelectValue
														placeholder="Select a subcategory"
														className="text-gray-500 dark:text-gray-400 h-20 truncate"
													/>
												</SelectTrigger>
												<SelectContent className="bg-white dark:bg-gray-700 dark:border-gray-600">
													{categories?.data
														?.find(
															(category) =>
																String(
																	category.id,
																) ===
																getValues(
																	"category",
																),
														)
														?.subCategories?.map(
															(subcategory) => (
																<SelectItem
																	key={
																		subcategory.id
																	}
																	value={String(
																		subcategory.id,
																	)}
																	className="dark:text-gray-300 dark:hover:bg-gray-600"
																>
																	{
																		subcategory.name
																	}
																</SelectItem>
															),
														)}
												</SelectContent>
											</Select>
										)}
									/>
								</Column>
							</Row>
							<Row className="w-full">
								<Column className="w-full">
									<Label className="text-gray-500 dark:text-gray-400">
										Season
									</Label>
									<Controller
										control={control}
										name="season"
										render={({ field }) => (
											<Select
												className="w-full bg-gray-100 dark:bg-gray-700"
												value={field.value || ""}
												onValueChange={(
													value,
												) => {
													field.onChange(value);
												}}
											>
												<SelectTrigger className="w-full">
													<SelectValue
														placeholder="Select Season"
														className="text-gray-500 dark:text-gray-400 h-20 truncate"
													/>
												</SelectTrigger>
												<SelectContent className="bg-white dark:bg-gray-700 dark:border-gray-600">
													<SelectItem className="text-gray-500 dark:text-gray-400">
														Select Season
													</SelectItem>
													<SelectItem value="summer">
														صيفي
													</SelectItem>
													<SelectItem value="winter">
														شتوي
													</SelectItem>
													<SelectItem value="spring_autumn">
														خريفي و ربيعي
													</SelectItem>
													<SelectItem value="all">
														كل السنة
													</SelectItem>
												</SelectContent>
											</Select>
										)}
									/>
								</Column>
								<Column className="w-full">
									<Label className="text-gray-500 dark:text-gray-400">
										Video Link
									</Label>
									<InputOne
										type="text"
										placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
										className="border-gray-500 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
										{...register("videoLink")}
									/>
								</Column>
							</Row>
						</Column>

						<Row className="w-full justify-between">
							<Label className="text-2xl font-medium text-gray-700 dark:text-gray-300">
								Color & Image
							</Label>
							<ButtonOne
								type="button"
								variant="outline"
								onClick={handleAddColor}
								className=" dark:text-blue-500 dark:border-blue-500  hover:dark:bg-gray-600 hover:dark:text-white"
							>
								Add Color
							</ButtonOne>
						</Row>
						{colorFields?.map((field, index) => (
							<ColorImg
								setFocus={setFocus}
								key={field.id}
								field={field}
								index={index}
								control={control}
								register={register}
								removeColor={removeColor}
								appendColor={appendColor}
								handleRemoveColor={
									handleRemoveColor
								}
								handleColorNameChange={
									handleColorNameChange
								}
							/>
						))}
						<Column className="w-full border-t border-gray-500 dark:border-gray-600 pt-4">
							<Label className="text-2xl font-medium text-gray-700 dark:text-gray-300">
								Sizes & Quantities
							</Label>
							{sizeFields.map((field, index) => (
								<SizeComponent
									setFocus={setFocus}
									key={field.id}
									field={field}
									index={index}
									control={control}
									register={register}
									handleAddSize={handleAddSize}
									removeSize={removeSize}
									colors={colorFields}
									watch={watch}
									handleRemoveSize={
										handleRemoveSize
									}
									sizeNameRefs={sizeNameRefs}
									priceRefs={priceRefs}
									quantityRefs={quantityRefs}
								/>
							))}
							<ButtonOne
								type="button"
								variant="outline"
								className="dark:text-blue-500 self-end dark:border-blue-500  hover:dark:bg-gray-600 hover:dark:text-white"
								onClick={handleAddSize}
							>
								Add Size
							</ButtonOne>
						</Column>
						<Row className="w-full border-t border-gray-500 dark:border-gray-600 pt-4">
							<Column className="w-full  dark:border-gray-600 pt-4">
								<Label className="text-gray-500 dark:text-gray-400">
									Word Key
								</Label>
								<InputOne
									type="text"
									placeholder="jeans, three years, etc."
									className="border-gray-500 dark:border-gray-600"
									{...register("wordkey", {
										setValueAs: (value) => {
											if (
												typeof value === "string"
											) {
												return value
													.split(",")
													.map((word) =>
														word.trim(),
													);
											}
											return [];
										},
									})}
									value={
										watch("wordkey")
											? watch("wordkey").join(
													", ",
											  )
											: ""
									}
								/>
							</Column>
							<Column className="w-full  dark:border-gray-600 pt-4">
								<Label className="text-gray-500 dark:text-gray-400">
									Date Published
								</Label>
								<DateCalender
									setValue={setValue}
								/>
							</Column>
						</Row>
					</Section>
					<Section className="col-span-1 lg:max-w-[800px]">
						<FileUpload
							resetKey={resetKey}
							name={"Images"}
							registerName={"images"}
							maxFiles={10}
						/>
						<FileUpload
							resetKey={resetKey}
							name={"Img Cover"}
							registerName={"imgCover"}
							maxFiles={1}
						/>
						<FileUpload
							resetKey={resetKey}
							name={"Img Measure"}
							registerName={"imgMeasure"}
							maxFiles={1}
						/>
						<FileUpload
							resetKey={resetKey}
							name={"Img Size Chart"}
							registerName={"imgSizeChart"}
							maxFiles={1}
						/>
					</Section>
					<Row className="w-full">
						<ButtonOne
							type="submit"
							className="hover:dark:bg-cyan-500 dark:bg-cyan-600 dark:text-white hover:dark:text-white flex items-center justify-center"
							disabled={loadingSubmit}
						>
							{loadingSubmit ? (
								<>
									<span>
										{isEditing
											? "Updating..."
											: "Creating..."}
									</span>
								</>
							) : (
								<span>
									{isEditing
										? "Update"
										: "Create"}
								</span>
							)}
						</ButtonOne>
						<ButtonOne
							type="button"
							variant="outline"
							className="hover:dark:bg-gray-600   hover:dark:text-white"
							onClick={() => {
								reset();
								setIsEditing(false);
								setEditingProductId(null);
								setLoadingSubmit(false);
							}}
						>
							{isEditing
								? "Cancel Edit"
								: "Cancel"}
						</ButtonOne>
					</Row>
				</Form>
				<TableProduct
					query={query}
					data={products}
					setQuery={setQuery}
					limit={limit}
					setLimit={setLimit}
					refetch={refetch}
					isLoading={isLoading}
					setValues={setValue}
					onEditProduct={handleEditProduct}
				/>
			</Container>
		</FormProvider>
	);
};

export default Product;
