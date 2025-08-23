import "../index.css";

import { Product } from "../api/productAPI";
import { useProduct } from "../Contexts/Product.Context";
import { useTableProduct } from "../Contexts/TableProduct.context";
import { flexRender } from "@tanstack/react-table";
import { useUtiles } from "../Contexts/utils.context";

export default function TableProduct() {
	const {
		loading,
		error,
		globalFilter,
		setGlobalFilter,
		table,
		fetchProductData,
	} = useTableProduct();
	const { setUpdateId, setIsUpdate } =
		useProduct();
	const { setMessage } = useUtiles();

	return (
		<div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900">
			{/* Search and Controls */}
			<div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
				<div className="w-full sm:w-72">
					<div className="relative">
						<input
							value={globalFilter ?? ""}
							onChange={(e) =>
								setGlobalFilter(e.target.value)
							}
							className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
							placeholder="Search products..."
						/>
						<svg
							className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500"
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
						value={
							table.getState().pagination.pageSize
						}
						onChange={(e) => {
							table.setPageSize(
								Number(e.target.value),
							);
						}}
						className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
					>
						{[
							5, 10, 20, 30, 40, 50, 100, 200,
						].map((pageSize) => (
							<option
								key={pageSize}
								value={pageSize}
							>
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
				<div className="text-red-500 p-4 text-center bg-red-50 dark:bg-red-900/20 rounded-lg">
					{error}
				</div>
			) : (
				<>
					<div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
						<table className="w-full">
							<thead className="bg-gray-50 dark:bg-gray-700">
								{table
									.getHeaderGroups()
									.map((headerGroup) => (
										<tr key={headerGroup.id}>
											{headerGroup.headers.map(
												(header) => (
													<th
														key={header.id}
														onClick={header.column.getToggleSortingHandler()}
														className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors relative"
														style={{
															width:
																header.getSize(),
														}}
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
																<div className="flex flex-col">
																	<svg
																		className={`w-3 h-3 -mb-1 ${
																			header.column.getIsSorted() ===
																			"asc"
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
																			strokeWidth={
																				2
																			}
																			d="M5 15l7-7 7 7"
																		/>
																	</svg>
																	<svg
																		className={`w-3 h-3 ${
																			header.column.getIsSorted() ===
																			"desc"
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
																			strokeWidth={
																				2
																			}
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
																	header.column.getIsResizing()
																		? "bg-blue-500"
																		: "bg-gray-200"
																}`}
															/>
														)}
													</th>
												),
											)}
											<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
												Actions
											</th>
										</tr>
									))}
							</thead>
							<tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
								{table
									.getRowModel()
									.rows.map((row) => (
										<tr
											key={row.id}
											className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
										>
											{row
												.getVisibleCells()
												.map((cell) => {
													const isNameCell =
														cell.column.id ===
														"name";
													return (
														<td
															key={cell.id}
															onClick={
																isNameCell
																	? () => {
																			setUpdateId(
																				row.getValue(
																					"id",
																				),
																			);
																			setIsUpdate(
																				true,
																			);
																	  }
																	: undefined
															}
															className={`px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600 dark:text-gray-300 ${
																isNameCell
																	? "cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
																	: ""
															}`}
															style={{
																width:
																	cell.column.getSize(),
															}}
														>
															{flexRender(
																cell.column
																	.columnDef.cell,
																cell.getContext(),
															)}
														</td>
													);
												})}
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
												<div className="flex items-center space-x-3">
													<button
														onClick={() => {
															setUpdateId(
																row.getValue(
																	"id",
																),
															);
															setIsUpdate(true);
														}}
														className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
													>
														<svg
															className="w-5 h-5"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
															/>
														</svg>
													</button>
													<button
														onClick={async () => {
															try {
																const res =
																	await Product.deleteOne(
																		row.getValue(
																			"id",
																		),
																	);
																if (
																	res &&
																	(res.status ===
																		true ||
																		res.success ===
																			true)
																) {
																	setMessage({
																		type: "success",
																		text: "Product deleted successfully",
																	});
																	fetchProductData();
																} else {
																	setMessage({
																		type: "error",
																		text:
																			res?.message ||
																			"Failed to delete product",
																	});
																	console.log(
																		"Delete response:",
																		res,
																	);
																}
															} catch (error) {
																setMessage({
																	type: "error",
																	text:
																		error.message ||
																		"An error occurred while deleting the product",
																});
																console.error(
																	"Delete error:",
																	error,
																);
															}
														}}
														className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
													>
														<svg
															className="w-5 h-5"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
															/>
														</svg>
													</button>
												</div>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
					<div className="mt-6 flex items-center justify-between">
						{/* <div className="flex items-center space-x-2">
							<button
								onClick={() => {
									table.setPageIndex(0);
									window.scrollTo({ top: 0, behavior: 'smooth' });
								}}
								className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								{"<<"}
							</button>
							<button
								onClick={() => {
									table.previousPage();
									window.scrollTo({ top: 0, behavior: 'smooth' });
								}}
								className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								{"<"}
							</button>
							<span className="px-3 py-2 text-sm font-medium text-gray-600">
								Page {table.getState().pagination.pageIndex + 1} of{" "}
								{table.getPageCount()}
							</span>
							<button
								onClick={() => {
									table.nextPage();
									window.scrollTo({ top: 0, behavior: 'smooth' });
								}}
								className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								{">"}
							</button>
							<button
								onClick={() => {
									table.setPageIndex(table.getPageCount() - 1);
									window.scrollTo({ top: 0, behavior: 'smooth' });
								}}
								className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								{">>"}
							</button>
						</div> */}
						{/* <div className="flex items-center space-x-4">
							<select
								value={table.getState().pagination.pageSize}
								onChange={(e) => {
									table.setPageSize(Number(e.target.value));
									window.scrollTo({ top: 0, behavior: 'smooth' });
								}}
								className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
							>
								{[5, 10, 20, 30, 40, 50].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										Show {pageSize}
									</option>
								))}
							</select>
						</div> */}
					</div>
				</>
			)}
		</div>
	);
}
