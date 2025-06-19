import "../index.css";


import { useTableOrder } from "../Contexts/TableOrder.context";
import { flexRender } from "@tanstack/react-table";
import { useUtiles } from "../Contexts/utils.context";

export default function TableOrder() {
	const {
		loading,
		error,
		globalFilter,
		setGlobalFilter,
		table,
	} = useTableOrder();
	const { setMessage } = useUtiles();

	return (
		<div className="p-6 bg-white rounded-xl shadow-lg">
			{/* Search and Controls */}
			<div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
				<div className="w-full sm:w-72">
					<div className="relative">
						<input
							value={globalFilter ?? ""}
							onChange={(e) => setGlobalFilter(e.target.value)}
							className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
							placeholder="Search orders..."
						/>
						<svg
							className="absolute left-3 top-3 h-5 w-5 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>
				<div className="flex gap-3">
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}
						className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
					>
						{[5, 10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			</div>
			{loading ? (
				<div className="flex justify-center items-center h-48">
					<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
				</div>
			) : error ? (
				<div className="text-red-500 p-4 text-center bg-red-50 rounded-lg">
					{error}
				</div>
			) : (
				<>
					<div className="overflow-x-auto rounded-lg border border-gray-200">
						<table className="w-full">
							<thead className="bg-gray-50">
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<th
												key={header.id}
												onClick={header.column.getToggleSortingHandler()}
												className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors relative"
												style={{ width: header.getSize() }}
											>
												<div className="flex items-center space-x-1">
													<span className="mx-auto">
														{flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}
													</span>
													{header.column.getCanSort() && (
														<div className="flex flex-col">
															<svg
																className={`w-3 h-3 -mb-1 ${
																	header.column.getIsSorted() === "asc"
																	? "text-blue-600"
																	: "text-gray-400"
																}`}
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M5 15l7-7 7 7"
																/>
															</svg>
															<svg
																className={`w-3 h-3 ${
																	header.column.getIsSorted() === "desc"
																	? "text-blue-600"
																	: "text-gray-400"
																}`}
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M19 9l-7 7-7-7"
																/>
															</svg>
														</div>
													)}
												</div>
												{header.column.getCanResize() && (
													<div
														onMouseDown={header.getResizeHandler()}
														onTouchStart={header.getResizeHandler()}
														className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none ${
															header.column.getIsResizing() ? "bg-blue-500" : "bg-gray-200"
														}`}
													/>
												)}
											</th>
										))}
										<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Actions
										</th>
									</tr>
								))}
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{table.getRowModel().rows.map((row) => (
									<tr key={row.id} className="hover:bg-gray-50 transition-colors">
										{row.getVisibleCells().map((cell) => (
											<td
												key={cell.id}
												className={`px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600`}
												style={{ width: cell.column.getSize() }}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</td>
										))}
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
											{/* Actions for orders can be added here if needed */}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="mt-6 flex items-center justify-between">
						{/* Pagination controls can be added here if needed */}
					</div>
				</>
			)}
		</div>
	);
}
