"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Optos as OptosApi } from "@/api/optosApi";
import { Order as OrderApi } from "@/api/orderApi";
import DrawerComp from "./Drawer";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Dropdown from "@/components/dropDown";
import DropdownState from "@/components/dropDownState";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
	Column,
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getSortedRowModel,
	RowData,
	useReactTable,
} from "@tanstack/react-table";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	SearchIcon,
} from "lucide-react";
import React, {
	useEffect,
	useId,
	useMemo,
	useState,
} from "react";
import { FaShekelSign } from "@react-icons/all-files/fa/FaShekelSign";
import { useOrders } from "./../services/OrderService";
import PopOver from "@/components/popover";
import { Button } from "antd";
import { useProductOne } from "../../../hooks/useProductOne";

// Component to handle individual order items with product data
const OrderItem = ({ item }) => {
	const { data: product } = useProductOne(
		item.productId,
	);

	return (
		<li className="flex items-center gap-2 py-1 px-2 rounded-md bg-slate-50 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 mb-1">
			<div className="flex-1 min-w-0">
				<span className="font-medium text-slate-800 dark:text-slate-100 truncate">
					{product ? (
						product.name
					) : (
						<span className="italic text-slate-400">
							Product #{item.productId}
						</span>
					)}
				</span>
				<span className="mx-2 text-slate-400">
					|
				</span>
				<span className="text-xs text-slate-600 dark:text-slate-300">
					{item.sizeName}
				</span>
				<span className="mx-1 text-slate-400">
					/
				</span>
				<span className="text-xs text-slate-600 dark:text-slate-300">
					{item.colorName}
				</span>
			</div>
			<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-xs font-semibold">
				× {item.quantity}
			</span>
		</li>
	);
};

const CityAreaDisplay = React.memo(
	({
		cityId,
		areaId,
	}: {
		cityId: string;
		areaId: string;
	}) => {
		const [cityName, setCityName] =
			useState<string>("");
		const [areaName, setAreaName] =
			useState<string>("");
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			const fetchData = async () => {
				try {
					setLoading(true);

					// Fetch areas for the city
					const areasResponse =
						await OptosApi.gitArea(
							Number(cityId),
						);
					const areas =
						areasResponse?.[0]?.data || [];

					// Find the specific area
					const area = areas.find(
						(a: any) => a.id === Number(areaId),
					);

					if (area) {
						setAreaName(area.name);
						setCityName(area["city.name"] || "");
					} else {
						// Show IDs as fallback
						setAreaName(`Area ${areaId}`);
						setCityName(`City ${cityId}`);
					}
				} catch (error) {
					console.error(
						"Error fetching area data:",
						error,
					);
					setAreaName(`Area ${areaId}`);
					setCityName(`City ${cityId}`);
				} finally {
					setLoading(false);
				}
			};

			if (cityId && areaId) {
				fetchData();
			}
		}, [cityId, areaId]);

		if (loading) {
			return (
				<span className="text-gray-400">
					Loading...
				</span>
			);
		}

		return (
			<div
				className="text-xs truncate max-w-[200px]"
				title={`${cityName} / ${areaName}`}
			>
				{cityName} / {areaName}
			</div>
		);
	},
);

declare module "@tanstack/react-table" {
	//allows us to define custom properties for our columns
	interface ColumnMeta<
		TData extends RowData,
		TValue,
	> {
		filterVariant?: "text" | "range" | "select";
	}
}

type Order = {
	id: number;
	business: string;
	business_address: string;
	consignee_name: string;
	consignee_phone: string;
	consignee_city: string;
	consignee_area: string;
	consignee_address: string;
	shipment_types: string;
	quantity: string;
	cod_amount: string;
	items_description: string;
	is_cod: string;
	has_return: string;
	return_notes: string;
	notes: string;
	status: string;
	createdAt: string;
	amount: string;
	optos_id: string | null;
	optos_status: string | null;
	items: {
		id: number;
		productId: number;
		sizeName: string;
		colorName: string;
		quantity: number;
		price: string;
	}[];
};

export default function TableOrigin({
	setValue,
	setIsUpdate,
	setUpdateData,
}) {
	const [update, setUpdate] = useState<any>({});

	const columns: ColumnDef<Order>[] = [
		{
			header: "Name",
			accessorKey: "consignee_name",
			cell: ({ row }) => (
				<div
					className="text-xs truncate max-w-[150px]"
					title={row.getValue("consignee_name")}
				>
					{row.getValue("consignee_name")}
				</div>
			),
		},

		{
			header: "Phone",
			accessorKey: "consignee_phone",
			cell: ({ row }) => {
				const result =
					row.original.consignee_phone.replace(
						/^0/,
						"",
					);
				return <PopOver phone={result} />;
			},
		},

		{
			header: "City/Area",
			cell: ({ row }) => (
				<CityAreaDisplay
					cityId={row.original.consignee_city}
					areaId={row.original.consignee_area}
				/>
			),
		},

		{
			header: "Optos_Status",
			accessorKey: "optos_status",
			cell: ({ row }) => (
				<span className="line-clamp-2 text-center">
					{row.getValue("optos_status")}
				</span>
			),
		},
		{
			header: "Amount",
			accessorKey: "cod_amount",
			cell: ({ row }) => (
				<div className="flex items-center text-lg gap-1">
					{row.getValue("cod_amount")}
					<FaShekelSign className="w-3 h-3 self-end" />
				</div>
			),
			meta: {
				filterVariant: "range",
			},
		},
		{
			header: "Status",
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status",
				) as string;

				// Status-based styling with better visual hierarchy
				const getStatusStyles = (
					status: string,
				) => {
					const baseStyles =
						"px-3 py-1.5 rounded-full text-xs font-semibold capitalize border transition-all duration-200 hover:scale-105 cursor-pointer";

					switch (status.toLowerCase()) {
						case "pending":
							return `${baseStyles} bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100`;
						case "readied":
						case "ready":
							return `${baseStyles} bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100`;
						case "shipped":
							return `${baseStyles} bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100`;
						case "delivered":
							return `${baseStyles} bg-green-50 text-green-700 border-green-200 hover:bg-green-100`;
						case "cancelled":
							return `${baseStyles} bg-red-50 text-red-700 border-red-200 hover:bg-red-100`;
						default:
							return `${baseStyles} bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100`;
					}
				};

				return (
					<DropdownState
						className={getStatusStyles(status)}
						option1={"Readied"}
						option2={"Shipped"}
						option3={"Cancelled"}
						handle1={async () => {
							await OrderApi.readied(
								row.original.id,
							);
							refetch();
						}}
						handle2={async () => {
							await OrderApi.shipped(
								row.original.id,
							);
							refetch();
						}}
						handle3={async () => {
							await OrderApi.cancelled(
								row.original.id,
							);
							refetch();
						}}
						Value={status}
					/>
				);
			},
			enableSorting: true,
			meta: {
				filterVariant: "select",
			},
		},

		{
			header: "Optos Link",
			accessorKey: "optos_id",
			cell: ({ row }) =>
				row.getValue("optos_id") ? (
					<span>{row.getValue("optos_id")}</span>
				) : (
					<span className="text-gray-400">—</span>
				),
		},
		{
			id: "action",
			header: "Action",
			cell: ({ row }) => (
				<Dropdown
					option1={"Edit"}
					option2={"Delete"}
					handle1={async () => {
						setUpdate(row.original);
						setUpdateData(row.original);
						setIsUpdate(true);
					}}
					handle2={async () => {
						await OrderApi.deleteOne(
							row.original.id,
						);
						refetch();
					}}
					toastProps={false}
				/>
			),
		},
	];
	useEffect(() => {
		setValue("name", update.consignee_name);
		setValue("phone", update.consignee_phone);
		setValue("address", update.consignee_address);
		setValue(
			"city",
			Number(update.consignee_city),
		);
		setValue(
			"area",
			Number(update.consignee_area),
		);
		if (Array.isArray(update.items)) {
			update.items.forEach(
				(
					item: {
						productId: any;
						sizeName: any;
						colorName: any;
						quantity: any;
					},
					index: any,
				) => {
					setValue(
						`items.${index}.productId`,
						item.productId,
					);
					setValue(
						`items.${index}.sizeName`,
						item.sizeName,
					);
					setValue(
						`items.${index}.colorName`,
						item.colorName,
					);
					setValue(
						`items.${index}.quantity`,
						item.quantity,
					);
				},
			);
		}
	}, [setUpdate, update]);
	const { data: Orders, refetch } = useOrders();
	const [columnFilters, setColumnFilters] =
		useState<ColumnFiltersState>([]);

	const table = useReactTable({
		data: Orders ?? [],
		columns,
		state: {
			// sorting,
			columnFilters,
		},
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues:
			getFacetedUniqueValues(),
		getFacetedMinMaxValues:
			getFacetedMinMaxValues(),
		// onSortingChange: setSorting,
		enableSortingRemoval: false,
	});
	const [openDrawer, setOpenDrawer] =
		useState(false);
	const [selectedOrder, setSelectedOrder] =
		useState<Order | null>(null);

	const showDrawer = (order: Order) => {
		setSelectedOrder(order);
		setOpenDrawer(true);
	};

	const onCloseDrawer = () => {
		setOpenDrawer(false);
		setSelectedOrder(null);
	};
	return (
		<div className="space-y-6 ">
			{/* Filters */}
			<div className="flex flex-wrap gap-3">
				{/* Name search */}
				<div className="w-44">
					<Filter
						column={
							table.getColumn("consignee_name")!
						}
					/>
				</div>
				{/* Status select */}
				<div className="w-36 flex items-center gap-3">
					<Filter
						column={table.getColumn("status")!}
					/>
				</div>
				{/* COD Amount range */}
			</div>
			<div className="rounded-md [&>div]:max-h-[500px] overflow-hidden border-[1px] border-slate-800">
				<Table>
					<TableHeader className="sticky top-0 z-10 backdrop-blur-xs">
						{table
							.getHeaderGroups()
							.map((headerGroup) => (
								<TableRow
									key={headerGroup.id}
									className="bg-muted/50 w-full "
								>
									{headerGroup.headers.map(
										(header) => {
											return (
												<TableHead
													key={header.id}
													className="relative h-10 select-none text-center"
													aria-sort={
														header.column.getIsSorted() ===
														"asc"
															? "ascending"
															: header.column.getIsSorted() ===
															  "desc"
															? "descending"
															: "none"
													}
												>
													{header.isPlaceholder ? null : header.column.getCanSort() ? (
														<div
															className={cn(
																header.column.getCanSort() &&
																	"flex h-full cursor-pointer items-center justify-center gap-2 select-none text-center",
															)}
															onClick={header.column.getToggleSortingHandler()}
															onKeyDown={(e) => {
																// Enhanced keyboard handling for sorting
																if (
																	header.column.getCanSort() &&
																	(e.key ===
																		"Enter" ||
																		e.key === " ")
																) {
																	e.preventDefault();
																	header.column.getToggleSortingHandler()?.(
																		e,
																	);
																}
															}}
															tabIndex={
																header.column.getCanSort()
																	? 0
																	: undefined
															}
														>
															{flexRender(
																header.column
																	.columnDef
																	.header,
																header.getContext(),
															)}
															{{
																asc: (
																	<ChevronUpIcon
																		className="shrink-0 opacity-60"
																		size={16}
																		aria-hidden="true"
																	/>
																),
																desc: (
																	<ChevronDownIcon
																		className="shrink-0 opacity-60"
																		size={16}
																		aria-hidden="true"
																	/>
																),
															}[
																header.column.getIsSorted() as string
															] ?? null}
														</div>
													) : (
														flexRender(
															header.column
																.columnDef.header,
															header.getContext(),
														)
													)}
												</TableHead>
											);
										},
									)}
								</TableRow>
							))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table
								.getRowModel()
								.rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={
											row.getIsSelected() &&
											"selected"
										}
										onClick={() =>
											showDrawer(row.original)
										}
										className="cursor-pointer hover:bg-muted/30 transition"
									>
										{row
											.getVisibleCells()
											.map((cell) => (
												<TableCell
													key={cell.id}
													className="text-center"
												>
													{flexRender(
														cell.column.columnDef
															.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
									</TableRow>
								))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<p className="text-muted-foreground mt-4 text-center text-sm">
				Data table with filters made with{" "}
				<a
					className="hover:text-foreground underline"
					href="https://tanstack.com/table"
					target="_blank"
					rel="noopener noreferrer"
				>
					TanStack Table
				</a>
			</p>
			<DrawerComp
				title={`Order #${selectedOrder?.id}`}
				placement="right"
				height={400}
				onClose={onCloseDrawer}
				open={openDrawer}
				extra={
					<Button
						type="primary"
						onClick={onCloseDrawer}
					>
						Close
					</Button>
				}
			>
				{selectedOrder ? (
					<>
						<div className="grid grid-cols-3 gap-2">
							<span className="font-medium text-gray-600 ">
								Name:
							</span>
							<span className="col-span-2 text-gray-900 ">
								{selectedOrder.consignee_name}
							</span>

							<span className="font-medium text-gray-600 ">
								Phone:
							</span>
							<span className="col-span-2 text-gray-900 ">
								{selectedOrder.consignee_phone}
							</span>

							<span className="font-medium text-gray-600 ">
								Address:
							</span>
							<span className="col-span-2 text-gray-900 ">
								{selectedOrder.consignee_address}
							</span>

							<span className="font-medium text-gray-600 ">
								Status:
							</span>
							<span
								className={`col-span-2 px-2 py-0.5 rounded-md text-xs font-medium w-fit
            ${
							selectedOrder.status === "delivered"
								? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
								: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
						}`}
							>
								{selectedOrder.status}
							</span>

							<span className="font-medium text-gray-600 ">
								Amount:
							</span>
							<span className="col-span-2 font-semibold text-gray-900 ">
								${selectedOrder.cod_amount}
							</span>
						</div>

						<div>
							<h4 className="text-sm font-semibold text-gray-700 mb-1">
								Items:
							</h4>
							<ul className="list-disc pl-5 space-y-1 text-gray-800 ">
								{selectedOrder.items.map(
									(item) => (
										<OrderItem
											key={item.id}
											item={item}
										/>
									),
								)}
							</ul>
						</div>
					</>
				) : (
					<p>No order selected</p>
				)}
			</DrawerComp>
		</div>
	);
}

function Filter({
	column,
}: {
	column: Column<any, unknown>;
}) {
	const id = useId();
	const columnFilterValue =
		column.getFilterValue();
	const { filterVariant } =
		column.columnDef.meta ?? {};
	const columnHeader =
		typeof column.columnDef.header === "string"
			? column.columnDef.header
			: "";
	const sortedUniqueValues = useMemo(() => {
		if (filterVariant === "range") return [];

		// Get all unique values from the column
		const values = Array.from(
			column.getFacetedUniqueValues().keys(),
		);

		// If the values are arrays, flatten them and get unique items
		const flattenedValues = values.reduce(
			(acc: string[], curr) => {
				if (Array.isArray(curr)) {
					return [...acc, ...curr];
				}
				return [...acc, curr];
			},
			[],
		);

		// Get unique values and sort them
		return Array.from(
			new Set(flattenedValues),
		).sort();
	}, [
		column.getFacetedUniqueValues(),
		filterVariant,
	]);

	if (filterVariant === "range") {
		return (
			<div className="*:not-first:mt-2">
				<Label>{columnHeader}</Label>
				<div className="flex">
					<Input
						id={`${id}-range-1`}
						className="flex-1 rounded-e-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
						value={
							(
								columnFilterValue as [
									number,
									number,
								]
							)?.[0] ?? ""
						}
						onChange={(e) =>
							column.setFilterValue(
								(old: [number, number]) => [
									e.target.value
										? Number(e.target.value)
										: undefined,
									old?.[1],
								],
							)
						}
						placeholder="Min"
						type="number"
						aria-label={`${columnHeader} min`}
					/>
					<Input
						id={`${id}-range-2`}
						className="-ms-px flex-1 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
						value={
							(
								columnFilterValue as [
									number,
									number,
								]
							)?.[1] ?? ""
						}
						onChange={(e) =>
							column.setFilterValue(
								(old: [number, number]) => [
									old?.[0],
									e.target.value
										? Number(e.target.value)
										: undefined,
								],
							)
						}
						placeholder="Max"
						type="number"
						aria-label={`${columnHeader} max`}
					/>
				</div>
			</div>
		);
	}

	if (filterVariant === "select") {
		return (
			<div className="*:not-first:mt-2 flex flex-col gap-2 ">
				<Label htmlFor={`${id}-select`}>
					{columnHeader}
				</Label>
				<Select
					value={
						columnFilterValue?.toString() ?? "all"
					}
					onValueChange={(value) => {
						column.setFilterValue(
							value === "all" ? undefined : value,
						);
					}}
				>
					<SelectTrigger id={`${id}-select`}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">
							All
						</SelectItem>
						{sortedUniqueValues.map((value) => (
							<SelectItem
								key={String(value)}
								value={String(value)}
							>
								{String(value)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		);
	}

	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor={`${id}-input`}>
				{columnHeader}
			</Label>
			<div className="relative">
				<Input
					id={`${id}-input`}
					className="peer ps-9"
					value={
						(columnFilterValue ?? "") as string
					}
					onChange={(e) =>
						column.setFilterValue(e.target.value)
					}
					placeholder={`Search ${columnHeader.toLowerCase()}`}
					type="text"
				/>
				<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
					<SearchIcon size={16} />
				</div>
			</div>
		</div>
	);
}
