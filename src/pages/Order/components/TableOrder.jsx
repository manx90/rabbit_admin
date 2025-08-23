import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	FaEdit,
	FaBox,
	FaPalette,
	FaRuler,
	FaShoppingCart,
} from "react-icons/fa";
import {
	MdDelete,
	MdExpandMore,
	MdExpandLess,
} from "react-icons/md";
import { Order as OrderApi } from "../../../api/orderApi";
import {
	ButtonOne,
	Column,
	Row,
} from "../../Category/constant/tw-styled-components";
import { PopoverDemo } from "./popOver";
import { useState } from "react";
export default function TableOrder({
	children,
	orders,
	isLoading,
	error,
	refetch,
	setOpen,
	setId,
}) {
	const [expandedOrders, setExpandedOrders] =
		useState(new Set());

	const toggleOrderExpansion = (orderId) => {
		const newExpanded = new Set(expandedOrders);
		if (newExpanded.has(orderId)) {
			newExpanded.delete(orderId);
		} else {
			newExpanded.add(orderId);
		}
		setExpandedOrders(newExpanded);
	};
	if (isLoading) return <div>Loading...</div>;
	if (error)
		return <div>Error: {error.message}</div>;

	return (
		<div className="overflow-x-auto overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-md">
			<Table className="mx-auto w-full table-fixed min-w-[800px]">
				<TableHeader className="bg-transparent">
					<TableRow className="top-0 z-10  bg-white dark:bg-gray-800">
						<TableHead className="text-center">
							ID
						</TableHead>
						<TableHead className="text-center">
							Name
						</TableHead>
						<TableHead className="text-center">
							Phone
						</TableHead>
						<TableHead className="text-center">
							City
						</TableHead>
						<TableHead className="text-center">
							Area
						</TableHead>
						<TableHead className="text-center">
							Amount
						</TableHead>
						<TableHead className="text-center">
							Optos
						</TableHead>
						<TableHead className="text-center">
							Status
						</TableHead>
						<TableHead className="text-center">
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<tbody
					aria-hidden="true"
					className="table-row h-2"
				></tbody>
				<TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
					{orders?.map((item) => (
						<>
							<TableRow
								key={item.id}
								className="odd:bg-muted/50 odd:hover:bg-muted/50 border-none  hover:bg-transparent"
							>
								<TableCell className="py-2.5 font-medium text-center">
									{item.id}
								</TableCell>
								<TableCell className="py-2.5 font-medium text-center">
									{item.consignee_name}
								</TableCell>
								<TableCell className="py-2.5 font-medium text-center">
									{item.consignee_phone}
								</TableCell>
								<TableCell className="py-2.5 font-medium text-center">
									{item.consignee_city}
								</TableCell>
								<TableCell className="py-2.5 font-medium text-center">
									{item.consignee_area}
								</TableCell>
								<TableCell className="py-2.5 font-medium text-center">
									{item.amount}
								</TableCell>
								<TableCell className="py-2.5 font-medium text-center">
									{item.optos_status}
								</TableCell>
								<TableCell className="py-2.5 font-medium text-center">
									{/* <select
									className="p-1 text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
									value={item.status}
									onChange={(e) => {
										const newStatus =
											e.target.value;
										if (newStatus === "readied") {
											OrderApi.readied(item.id);
											refetch();
										} else if (
											newStatus === "cancelled"
										) {
											OrderApi.cancelled(item.id);
											refetch();
										} else if (
											newStatus === "shipped"
										) {
											OrderApi.shipped(item.id);
											refetch();
										}
									}}
								>
									<option
										value="pending"
										className=" bg-white dark:bg-gray-900 text-center"
									>
										قيد الانتظار
									</option>
									<option
										value="readied"
										className="bg-white dark:bg-gray-900 text-center"
									>
										جاهز
									</option>
									<option
										value="cancelled"
										className="bg-white dark:bg-gray-900 text-center	"
									>
										ملغي
									</option>
									<option
										value="shipped"
										className="bg-white  dark:bg-gray-900 text-center"
									>
										تم التحصيل
									</option>
								</select> */}
									<PopoverDemo
										id={item.id}
										status={item.status}
										refetch={refetch}
									/>
								</TableCell>
								<TableCell className="py-2.5 font-medium text-center">
									<Row className="flex justify-center items-center gap-3">
										<button
											onClick={() =>
												toggleOrderExpansion(
													item.id,
												)
											}
											className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
											title={
												expandedOrders.has(
													item.id,
												)
													? "Hide items"
													: "Show items"
											}
										>
											{expandedOrders.has(
												item.id,
											) ? (
												<MdExpandLess className="text-blue-600 w-5 h-5" />
											) : (
												<MdExpandMore className="text-blue-600 w-5 h-5" />
											)}
										</button>
										<FaEdit className="text-blue-500 w-5 h-5 cursor-pointer hover:text-blue-700 transition-colors" />
										<MdDelete
											onClick={() => {
												setOpen(true);
												setId(item.id);
											}}
											disabled={
												item.status === "pending"
											}
											className="text-red-500 w-5 h-5 cursor-pointer hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
										/>
									</Row>
								</TableCell>
							</TableRow>
							{expandedOrders.has(item.id) && (
								<TableRow>
									<TableCell
										colSpan={9}
										className="p-0 border-none"
									>
										<div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-l-4 border-blue-500 rounded-r-lg shadow-lg">
											<div className="p-6">
												<div className="flex items-center gap-3 mb-4">
													<FaShoppingCart className="text-blue-600 w-5 h-5" />
													<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
														Order Items (
														{item.items?.length ||
															0}
														)
													</h3>
												</div>

												{item.items &&
												item.items.length > 0 ? (
													<div className="grid gap-4">
														{item.items.map(
															(
																orderItem,
																index,
															) => (
																<div
																	key={
																		orderItem.id ||
																		index
																	}
																	className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 p-4 hover:shadow-md transition-all duration-200"
																>
																	<div className="flex items-center justify-between">
																		<div className="flex items-center gap-4 flex-1">
																			<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
																				<FaBox className="text-white w-6 h-6" />
																			</div>
																			<div className="flex-1">
																				<div className="flex items-center gap-2 mb-1">
																					<span className="text-sm font-medium text-gray-900 dark:text-gray-100">
																						ProductID
																						:
																						{
																							orderItem.productId
																						}
																					</span>
																					<span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium">
																						$
																						{
																							orderItem.price
																						}
																					</span>
																				</div>
																				<div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
																					<div className="flex items-center gap-1">
																						<FaRuler className="w-3 h-3" />
																						<span>
																							{
																								orderItem.sizeName
																							}
																						</span>
																					</div>
																					<div className="flex items-center gap-1">
																						<FaPalette className="w-3 h-3" />
																						<span>
																							{
																								orderItem.colorName
																							}
																						</span>
																					</div>
																				</div>
																			</div>
																		</div>
																		<div className="text-right">
																			<div className="flex items-center gap-2">
																				<span className="text-sm font-medium text-gray-900 dark:text-gray-100">
																					Quantity
																				</span>
																				<span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold rounded-full">
																					{
																						orderItem.quantity
																					}
																				</span>
																			</div>
																			<div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">
																				$
																				{(
																					parseFloat(
																						orderItem.price,
																					) *
																					orderItem.quantity
																				).toFixed(
																					2,
																				)}
																			</div>
																		</div>
																	</div>
																</div>
															),
														)}

														<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
															<div className="flex justify-between items-center">
																<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
																	Total Items:{" "}
																	{
																		item.items
																			.length
																	}
																</span>
																<span className="text-lg font-bold text-gray-900 dark:text-gray-100">
																	Order Total: $
																	{item.amount}
																</span>
															</div>
														</div>
													</div>
												) : (
													<div className="text-center py-8">
														<FaBox className="w-12 h-12 text-gray-400 mx-auto mb-3" />
														<p className="text-gray-500 dark:text-gray-400 font-medium">
															No items found for
															this order
														</p>
													</div>
												)}
											</div>
										</div>
									</TableCell>
								</TableRow>
							)}
						</>
					))}
				</TableBody>
			</Table>
			{children}
		</div>
	);
}
