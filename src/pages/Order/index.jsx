/* eslint-disable no-undef */
import React, {
	useEffect,
	useState,
} from "react";
import { FormProvider } from "react-hook-form";
import InputUI from "../../components/InputUI";
import SelectSearch from "../../components/Select&Search";
import { useArea } from "../../hooks/useArea";
import { useCity } from "../../hooks/useCity";
import { useOrderForm } from "../../hooks/useOrderForm";
import { useProduct } from "../../hooks/useProduct";
import { useProductOne } from "../../hooks/useProductOne";
import SSAnted from "./components/searchselect";
import Chart from "./components/Chart";
import TableOrigin from "./components/Table";
import { Order as OrderApi } from "../../api/orderApi";
export default function Order() {
	const [isUpdate, setIsUpdate] = useState(false);
	const [updateData, setUpdateData] =
		useState(null);
	const form = useOrderForm();
	const {
		reset,
		watch,
		itemsFields,
		itemsAppend,
		itemsRemove,
		setValue,
		itemsUpdate,
	} = form;
	const { data: city } = useCity();
	const cityId = watch("city");
	const { data: area } = useArea(cityId);
	useEffect(() => {
		const sub = watch((values) =>
			console.log("📌 Form Values:", values),
		);
		return () => sub.unsubscribe();
	}, [watch]);
	const [pending, setPending] = useState();
	useEffect(() => {
		const fetchCountPending = async () => {
			try {
				const res = await OrderApi.countPending();
				console.log(res);
				setPending(res);
			} catch (error) {
				console.error(
					"Failed to fetch pending orders count:",
					error,
				);
			}
		};
		fetchCountPending();
	}, []);

	const [cancelled, setCancelled] = useState();
	useEffect(() => {
		const fetchCountPending = async () => {
			try {
				const res =
					await OrderApi.countCancelled();
				console.log(res);
				setCancelled(res);
			} catch (error) {
				console.error(
					"Failed to fetch pending orders count:",
					error,
				);
			}
		};
		fetchCountPending();
	}, []);
	const [shipped, setShipped] = useState();
	useEffect(() => {
		const fetchCountPending = async () => {
			try {
				const res = await OrderApi.countShipped();
				console.log(res);
				setShipped(res);
			} catch (error) {
				console.error(
					"Failed to fetch pending orders count:",
					error,
				);
			}
		};
		fetchCountPending();
	}, []);
	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit((data) =>
					form.onSubmit(
						data,
						isUpdate,
						updateData,
					),
				)}
				className="ContentPage flex lg:flex-row flex-col gap-4 justify-between w-full"
			>
				<div className="w-full">
					<div className="mx-auto grid lg:grid-cols-4 grid-cols-2 justify-between gap-2">
						<Chart counts={100} />
						<Chart
							name="Cancelled Orders"
							counts={cancelled}
							color="red"
						/>
						<Chart
							name="Delivered Orders"
							counts={shipped}
							color="green"
						/>
						<Chart
							name="Pending Orders"
							counts={pending}
							color="yellow"
						/>
					</div>
					<div className="justify-between gap-2 border rounded-md border-slate-700 p-2 mt-10">
						<TableOrigin
							setValue={setValue}
							itemsUpdate={itemsUpdate}
							isUpdate={isUpdate}
							setIsUpdate={setIsUpdate}
							setUpdateData={setUpdateData}
						/>
					</div>
				</div>

				<OrderForm
					reset={reset}
					isUpdate={isUpdate}
					setIsUpdate={setIsUpdate}
					cityId={cityId}
					city={city}
					area={area}
					form={form}
					watch={watch}
					itemsFields={itemsFields}
					itemsAppend={itemsAppend}
					itemsRemove={itemsRemove}
				/>
			</form>
		</FormProvider>
	);
}
function OrderForm({
	reset,
	isUpdate,
	setIsUpdate,
	form,
	watch,
	itemsFields,
	itemsAppend,
	itemsRemove,
	city,
	area,
	cityId,
}) {
	return (
		<div className="w-full mx-auto flex flex-col max-w-[500px] gap-3 border p-2 rounded-md border-slate-800">
			{/* Basic Info */}
			<div className="flex flex-col gap-2 border-b-2 pb-2 border-slate-700">
				<InputUI
					labelInput="Name"
					placeHolderInput="Enter the Name"
					type="text"
					{...form.register("name")}
				/>
				<InputUI
					labelInput="Phone"
					placeHolderInput="05********"
					type="number"
					className="appearance-none 
        [&::-webkit-outer-spin-button]:appearance-none 
        [&::-webkit-inner-spin-button]:appearance-none"
					{...form.register("phone")}
				/>
				<div className="flex flex-col lg:flex-row gap-2">
					<SelectSearch
						name="city"
						label="City"
						data={city?.[0]?.data || []}
						KeyID={"id"}
						KeyValue={"id"}
						KeyName={"name"}
					/>
					<SelectSearch
						disable={!cityId}
						name="area"
						label="Area"
						data={area?.[0]?.data || []}
						KeyID={"id"}
						KeyValue={"id"}
						KeyName={"name"}
					/>
				</div>
				<InputUI
					labelInput="Address"
					placeHolderInput="Address"
					type="text"
					{...form.register("address")}
				/>
				<InputUI
					labelInput="Note"
					placeHolderInput="Note..."
					type="text"
					{...form.register("note")}
				/>
			</div>
			{/* Items */}
			<div className="flex flex-col gap-4">
				{itemsFields.map((field, index) => (
					<FormProd
						key={field.id}
						field={field}
						index={index}
						remove={itemsRemove}
						form={form}
						watch={watch}
						itemsAppend={itemsAppend}
					/>
				))}
			</div>
			<div
				dir="rtl"
				className="flex items-center justify-between"
			>
				<div className="gap-2 flex  items-center">
					<button
						type="button"
						className="border cursor-pointer transition-colors text-black px-2 py-1 rounded-sm"
						onClick={() =>
							itemsAppend({
								productId: "",
								sizeName: "",
								colorName: "",
								quantity: "",
							})
						}
					>
						Add Item
					</button>
					<button
						type="submit"
						className="bg-cyan-400 dark:text-cyan-900 hover:bg-cyan-600 border cursor-pointer transition-colors text-semibold px-2 py-1 rounded-sm"
					>
						{isUpdate ? "update" : "Create"}
					</button>
				</div>
				<button
					className="bg-red-400 border hover:bg-red-600 cursor-pointer transition-colors dark:text-black text-semibold px-2 py-1 rounded-sm mt-8 mb-2"
					onClick={() => {
						reset();
						setIsUpdate(false);
						setUpdateData(null);
					}}
				>
					Cancel
				</button>
			</div>
		</div>
	);
}
function FormProd({
	field,
	index,
	form,
	remove,
	watch,
}) {
	const WatchProdId = watch(
		`items.${index}.productId`,
	);
	const [ProdId, setProdId] = useState(1);
	const {
		data: ProductOne,
		isLoading,
		isFetching,
	} = useProductOne(ProdId);
	const [searchProd, setSearchProd] =
		useState("");
	const { data: products } =
		useProduct(searchProd);

	useEffect(() => {
		setProdId(WatchProdId);
	}, [WatchProdId]);
	useEffect(() => {
		console.log(searchProd, products);
	}, [setSearchProd, searchProd, products]);
	useEffect(() => {
		console.log(
			"🔍 search:",
			searchProd,
			"fetching:",
			isFetching,
			"data:",
			products,
		);
	}, [searchProd, isFetching, products]);
	return (
		<div
			key={field.id}
			className="rounded-md flex flex-col gap-2"
		>
			{/* Product */}
			<SSAnted
				name={`items.${index}.productId`}
				label="Product"
				data={products?.data || []}
				KeyID="id"
				KeyName="name"
				KeyValue="id"
				setSearchProd={setSearchProd}
				isLoading={isLoading}
				isFetching={isFetching}
			/>

			<div className="flex gap-2">
				<SelectSearch
					name={`items.${index}.sizeName`}
					label="Size"
					data={ProductOne?.sizeDetails || []}
					KeyID="sizeName"
					KeyName="sizeName"
					disable={!WatchProdId}
					KeyValue="sizeName"
				/>
				<SelectSearch
					name={`items.${index}.colorName`}
					label="Color"
					data={ProductOne?.colors || []}
					KeyID="name"
					KeyName="name"
					disable={!WatchProdId}
					KeyValue="name"
				/>
			</div>
			<div className="flex gap-2">
				<InputUI
					labelInput="Quantity"
					placeHolderInput="quantity"
					disable={!WatchProdId}
					className="appearance-none 
        [&::-webkit-outer-spin-button]:appearance-none 
        [&::-webkit-inner-spin-button]:appearance-none"
					type="number"
					{...form.register(
						`items.${index}.quantity`,
					)}
				/>

				<button
					type="button"
					className="dark:bg-slate-900 h-9 self-end hover:bg-slate-800 cursor-pointer transition-colors border-[0.5px] text-slate-300 text-lg px-2 py-1 rounded-sm w-full"
					onClick={() => remove(index)}
				>
					Remove
				</button>
			</div>
		</div>
	);
}
