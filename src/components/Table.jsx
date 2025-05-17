import React, { useEffect, useState } from "react";
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

export default function Table() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [globalFilter, setGlobalFilter] = useState("");

	useEffect(() => {
		const fetchProductData = async () => {
			try {
				setLoading(true);
				const response = await fetch('http://localhost:3003/product');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setData(data);
			} catch (error) {
				console.error('Error fetching product data:', error);
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
		columnHelper.accessor("quantity", {
			header: "Quantity",
			cell: (info) => info.getValue(),
			enableSorting: true,
		}),
		columnHelper.accessor("Sales", {
			header: "Sales",
			cell: (info) => info.getValue(),
			enableSorting: true,
		}),
		columnHelper.accessor("isActive", {
			header: "Status",
			cell: (info) => (
				<span className={`px-2 py-1 rounded-full text-sm ${
					info.getValue() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
				}`}>
					{info.getValue() ? 'Active' : 'Inactive'}
				</span>
			),
			enableSorting: true,
		}),
	];

	const [sorting, setSorting] = useState([]);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [columnFilters, setColumnFilters] = useState([]);
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
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
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
					<p className="text-xl font-semibold">Error loading data</p>
					<p className="text-sm">{error}</p>
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
						onChange={(e) => setGlobalFilter(e.target.value)}
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Search all columns..."
					/>
				</div>
				<div className="flex gap-2">
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}
						className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						{[5, 10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto rounded-lg border">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
										onClick={header.column.getToggleSortingHandler()}
									>
										<div className="flex items-center gap-2">
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{header.column.getCanSort() && (
												<span className="flex flex-col">
													{header.column.getIsSorted() === "asc" ? "↑" : "↓"}
												</span>
											)}
										</div>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="hover:bg-gray-50">
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="mt-4 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<button
						className="px-3 py-1 border rounded-lg disabled:opacity-50"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						{"<<"}
					</button>
					<button
						className="px-3 py-1 border rounded-lg disabled:opacity-50"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						{"<"}
					</button>
					<button
						className="px-3 py-1 border rounded-lg disabled:opacity-50"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						{">"}
					</button>
					<button
						className="px-3 py-1 border rounded-lg disabled:opacity-50"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						{">>"}
					</button>
				</div>
				<div className="text-sm text-gray-700">
					Page {table.getState().pagination.pageIndex + 1} of{" "}
					{table.getPageCount()}
				</div>
			</div>
		</div>
	);
}
