import React, {
	useEffect,
	useState,
} from "react";
import "../index.css";
import {
	useReactTable,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getFacetedUniqueValues,
	getFacetedRowModel,
	getFacetedMinMaxValues,
} from "@tanstack/react-table";
import { useProduct } from "../Contexts/Product.Context";
export default function Table() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [globalFilter, setGlobalFilter] =
		useState("");
	const { setUpdateId } = useProduct();

	useEffect(() => {
		const fetchProductData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					"http://api.rabbit.ps/product",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token",
							)}`,
							referrerPolicy: "unsafe-url",
						},
					},
				);
				if (!response.ok) {
					throw new Error(
						"Failed to fetch products",
					);
				}
				const data = await response.json();
				setData(data.data);
			} catch (error) {
				console.error(
					"Error fetching product data:",
					error,
				);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProductData();
	}, []);

	const columnHelper = createColumnHelper();
	const columns = [
		columnHelper.accessor("id", {
			header: "#",
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor("name", {
			header: "Name",
			cell: (info) => info.getValue(),
			enableSorting: true,
		}),
		columnHelper.accessor("description", {
			header: "Description",
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor("category", {
			header: "Category",
			cell: (info) => {
				const category = info.getValue();
				return category?.name || "N/A";
			},
			enableSorting: true,
		}),
		columnHelper.accessor("subCategory", {
			header: "Sub Category",
			cell: (info) => {
				const subCategory = info.getValue();
				return subCategory?.name || "N/A";
			},
			enableSorting: true,
		}),
		columnHelper.accessor("publishState", {
			header: "publishState",
			cell: (info) => {
				return (
					<span
						className={`px-2 py-1 rounded-full text-sm ${
							info.getValue() === "published"
								? "bg-green-100 text-green-800"
								: "bg-red-100 text-red-800"
						}`}
					>
						{info.getValue()}
					</span>
				);
			},
			enableSorting: true,
		}),
	];

	const [sorting, setSorting] = useState([]);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [columnFilters, setColumnFilters] =
		useState([]);
	const [columnResizeMode] = useState("onChange");
	const [columnResizeDirection] = useState("ltr");

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			pagination,
			globalFilter,
		},
		onGlobalFilterChange: setGlobalFilter,
		onColumnFiltersChange: setColumnFilters,
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel:
			getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedMinMaxValues:
			getFacetedMinMaxValues(),
		getFacetedUniqueValues:
			getFacetedUniqueValues(),
		columnResizeMode,
		columnResizeDirection,
	});

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-red-500 text-center">
					<p className="text-xl font-semibold">
						Error loading products
					</p>
					<p className="text-sm">{error}</p>
				</div>
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-gray-500 text-center">
					<p className="text-xl font-semibold">
						No products found
					</p>
					<p className="text-sm">
						Add some products to see them here
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="p-4 bg-white rounded-lg shadow-lg">
			{/* Search and Controls */}
			<div className="mb-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
				<div className="w-full sm:w-64">
					<input
						value={globalFilter ?? ""}
						onChange={(e) =>
							setGlobalFilter(e.target.value)
						}
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Search products..."
					/>
				</div>
				<div className="flex gap-2">
					<select
						value={
							table.getState().pagination.pageSize
						}
						onChange={(e) => {
							table.setPageSize(
								Number(e.target.value),
							);
						}}
						className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						{[5, 10, 20, 30, 40, 50].map(
							(pageSize) => (
								<option
									key={pageSize}
									value={pageSize}
								>
									Show {pageSize}
								</option>
							),
						)}
					</select>
				</div>
			</div>
			{loading ? (
				<div className="flex justify-center items-center h-48">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
				</div>
			) : error ? (
				<div className="text-red-500 p-4 text-center">
					{error}
				</div>
			) : (
				<>
					<div className="overflow-x-auto rounded-lg border border-gray-200">
						<table className="w-full">
							<thead className="bg-gray-50">
								{table
									.getHeaderGroups()
									.map((headerGroup) => (
										<tr key={headerGroup.id}>
											{headerGroup.headers.map(
												(header) => (
													<th
														key={header.id}
														onClick={() => {
															header.column.getToggleSortingHandler();
														}}
														className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
													>
														<div className="flex items-center space-x-1">
															<span>
																{flexRender(
																	header.column
																		.columnDef
																		.header,
																	header.getContext(),
																)}
															</span>

															{header.column.getCanSort() && (
																<svg
																	className="w-4 h-4 text-gray-400"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={
																			2
																		}
																		d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
																	/>
																</svg>
															)}
														</div>
													</th>
												),
											)}
										</tr>
									))}
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{table
									.getRowModel()
									.rows.map((row) => (
										<tr
											key={row.id}
											onClick={() => {
												setUpdateId(
													row.getValue("id"),
												);
												console.log(
													row.getValue("id"),
												);
											}}
											className="hover:bg-gray-50 transition-colors cursor-pointer"
										>
											{row
												.getVisibleCells()
												.map((cell) => (
													<td
														key={cell.id}
														className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
													>
														{flexRender(
															cell.column
																.columnDef.cell,
															cell.getContext(),
														)}
													</td>
												))}
										</tr>
									))}
							</tbody>
						</table>
					</div>
					<div className="mt-6 flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<button
								onClick={() =>
									table.setPageIndex(0)
								}
								disabled={
									!table.getCanPreviousPage()
								}
								className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								{"<<"}
							</button>
							<button
								onClick={() =>
									table.previousPage()
								}
								disabled={
									!table.getCanPreviousPage()
								}
								className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								{"<"}
							</button>
							<button
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
								className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								{">"}
							</button>
							<button
								onClick={() =>
									table.setPageIndex(
										table.getPageCount() - 1,
									)
								}
								disabled={!table.getCanNextPage()}
								className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								{">>"}
							</button>
						</div>
						<div className="flex items-center space-x-4">
							<select
								value={
									table.getState().pagination
										.pageSize
								}
								onChange={(e) =>
									table.setPageSize(
										Number(e.target.value),
									)
								}
								className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
							>
								{[10, 25, 50].map((pageSize) => (
									<option
										key={pageSize}
										value={pageSize}
									>
										Show {pageSize}
									</option>
								))}
							</select>
							<span className="text-sm text-gray-600">
								Page{" "}
								{table.getState().pagination
									.pageIndex + 1}{" "}
								of {table.getPageCount()}
							</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
