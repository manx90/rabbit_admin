import React, { useState } from "react";
import {
	useQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { SizeTable } from "../api/sizeTableApi";
import {
	Plus,
	Trash2,
	Edit,
	X,
	Save,
	Eye,
} from "lucide-react";

export default function SizeTables() {
	const queryClient = useQueryClient();
	const [showForm, setShowForm] = useState(false);
	const [editingTable, setEditingTable] =
		useState(null);
	const [formData, setFormData] = useState({
		tableName: "",
		dimensions: [],
	});
	const [previewTable, setPreviewTable] =
		useState(null);

	// Fetch all size tables
	const {
		data: sizeTables,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["sizeTables"],
		queryFn: async () => {
			try {
				const result = await SizeTable.getAll();
				console.log(
					"Size tables fetched:",
					result,
				);
				return result;
			} catch (err) {
				console.error(
					"Error fetching size tables:",
					err,
				);
				throw err;
			}
		},
	});

	// Create mutation
	const createMutation = useMutation({
		mutationFn: async (data) => {
			console.log(
				"Creating size table with data:",
				data,
			);
			try {
				const result = await SizeTable.create(
					data,
				);
				console.log("Create result:", result);
				return result;
			} catch (err) {
				console.error("Create error:", err);
				throw err;
			}
		},
		onSuccess: (data) => {
			console.log("Create success:", data);
			queryClient.invalidateQueries([
				"sizeTables",
			]);
			toast.success(
				"Size table created successfully!",
			);
			resetForm();
		},
		onError: (error) => {
			console.error(
				"Create mutation error:",
				error,
			);
			toast.error(
				error?.message ||
					error?.error ||
					"Failed to create size table",
			);
		},
	});

	// Update mutation
	const updateMutation = useMutation({
		mutationFn: ({ id, data }) =>
			SizeTable.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries([
				"sizeTables",
			]);
			toast.success(
				"Size table updated successfully!",
			);
			resetForm();
		},
		onError: (error) => {
			toast.error(
				error?.message ||
					"Failed to update size table",
			);
		},
	});

	// Delete mutation
	const deleteMutation = useMutation({
		mutationFn: SizeTable.delete,
		onSuccess: () => {
			queryClient.invalidateQueries([
				"sizeTables",
			]);
			toast.success(
				"Size table deleted successfully!",
			);
		},
		onError: (error) => {
			toast.error(
				error?.message ||
					"Failed to delete size table",
			);
		},
	});

	const resetForm = () => {
		setFormData({
			tableName: "",
			dimensions: [],
		});
		setEditingTable(null);
		setShowForm(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!formData.tableName.trim()) {
			toast.error("Please enter a table name");
			return;
		}

		const submitData = {
			tableName: formData.tableName,
			dimensions: formData.dimensions,
		};

		if (editingTable) {
			updateMutation.mutate({
				id: editingTable.id,
				data: submitData,
			});
		} else {
			createMutation.mutate(submitData);
		}
	};

	const handleEdit = (table) => {
		setEditingTable(table);
		setFormData({
			tableName: table.tableName,
			dimensions: table.data?.dimensions || [],
		});
		setShowForm(true);
	};

	const handleDelete = (id) => {
		if (
			window.confirm(
				"Are you sure you want to delete this size table?",
			)
		) {
			deleteMutation.mutate(id);
		}
	};

	const handlePreview = (table) => {
		setPreviewTable(table);
	};

	const closePreview = () => {
		setPreviewTable(null);
	};

	const addDimension = () => {
		setFormData({
			...formData,
			dimensions: [
				...formData.dimensions,
				{ sizeName: "", fields: [] },
			],
		});
	};

	const removeDimension = (index) => {
		const newDimensions =
			formData.dimensions.filter(
				(_, i) => i !== index,
			);
		setFormData({
			...formData,
			dimensions: newDimensions,
		});
	};

	const updateDimension = (
		index,
		field,
		value,
	) => {
		const newDimensions = [
			...formData.dimensions,
		];
		newDimensions[index][field] = value;
		setFormData({
			...formData,
			dimensions: newDimensions,
		});
	};

	const addField = (dimensionIndex) => {
		const newDimensions = [
			...formData.dimensions,
		];
		newDimensions[dimensionIndex].fields.push({
			fieldName: "",
			fieldValue: "",
		});
		setFormData({
			...formData,
			dimensions: newDimensions,
		});
	};

	const removeField = (
		dimensionIndex,
		fieldIndex,
	) => {
		const newDimensions = [
			...formData.dimensions,
		];
		newDimensions[dimensionIndex].fields =
			newDimensions[dimensionIndex].fields.filter(
				(_, i) => i !== fieldIndex,
			);
		setFormData({
			...formData,
			dimensions: newDimensions,
		});
	};

	const updateField = (
		dimensionIndex,
		fieldIndex,
		field,
		value,
	) => {
		const newDimensions = [
			...formData.dimensions,
		];
		newDimensions[dimensionIndex].fields[
			fieldIndex
		][field] = value;
		setFormData({
			...formData,
			dimensions: newDimensions,
		});
	};

	return (
		<div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
			<div className="max-w-7xl mx-auto">
				{/* Debug Info */}
				<div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded text-xs dark:text-yellow-200">
					<strong>Debug:</strong> Tables count:{" "}
					{sizeTables?.length || 0} | Loading:{" "}
					{isLoading ? "Yes" : "No"} | Error:{" "}
					{error ? "Yes" : "No"} | API Base:{" "}
					{
						import.meta.env
							.VITE_RABBIT_PI_BASE_URL
					}
				</div>

				{/* Header */}
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold text-gray-800 dark:text-white">
						Size Tables
					</h1>
					<button
						onClick={() => setShowForm(!showForm)}
						className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
					>
						{showForm ? (
							<>
								<X size={20} />
								Cancel
							</>
						) : (
							<>
								<Plus size={20} />
								New Size Table
							</>
						)}
					</button>
				</div>

				{/* Form */}
				{showForm && (
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
						<h2 className="text-xl font-semibold mb-4 dark:text-white">
							{editingTable
								? "Edit Size Table"
								: "Create New Size Table"}
						</h2>
						<form onSubmit={handleSubmit}>
							{/* Table Name */}
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Table Name
								</label>
								<input
									type="text"
									value={formData.tableName}
									onChange={(e) =>
										setFormData({
											...formData,
											tableName: e.target.value,
										})
									}
									className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
									placeholder="e.g., Men's T-Shirt Sizes"
									required
								/>
							</div>

							{/* Dimensions */}
							<div className="mb-4">
								<div className="flex justify-between items-center mb-2">
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
										Size Dimensions
									</label>
									<button
										type="button"
										onClick={addDimension}
										className="flex items-center gap-1 text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
									>
										<Plus size={16} />
										Add Size
									</button>
								</div>

								{formData.dimensions.map(
									(dimension, dimIndex) => (
										<div
											key={dimIndex}
											className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-3 bg-gray-50 dark:bg-gray-700"
										>
											<div className="flex justify-between items-start mb-3">
												<input
													type="text"
													value={
														dimension.sizeName
													}
													onChange={(e) =>
														updateDimension(
															dimIndex,
															"sizeName",
															e.target.value,
														)
													}
													className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
													placeholder="Size Name (e.g., Small, Medium, Large)"
													required
												/>
												<button
													type="button"
													onClick={() =>
														removeDimension(
															dimIndex,
														)
													}
													className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
												>
													<Trash2 size={20} />
												</button>
											</div>

											{/* Fields */}
											<div className="ml-4">
												<div className="flex justify-between items-center mb-2">
													<span className="text-sm font-medium text-gray-600 dark:text-gray-300">
														Measurements
													</span>
													<button
														type="button"
														onClick={() =>
															addField(dimIndex)
														}
														className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
													>
														+ Add Field
													</button>
												</div>

												{dimension.fields.map(
													(field, fieldIndex) => (
														<div
															key={fieldIndex}
															className="flex gap-2 mb-2"
														>
															<input
																type="text"
																value={
																	field.fieldName
																}
																onChange={(e) =>
																	updateField(
																		dimIndex,
																		fieldIndex,
																		"fieldName",
																		e.target
																			.value,
																	)
																}
																className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
																placeholder="Field Name (e.g., Chest)"
																required
															/>
															<input
																type="text"
																value={
																	field.fieldValue
																}
																onChange={(e) =>
																	updateField(
																		dimIndex,
																		fieldIndex,
																		"fieldValue",
																		e.target
																			.value,
																	)
																}
																className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
																placeholder="Value (e.g., 36 inches)"
																required
															/>
															<button
																type="button"
																onClick={() =>
																	removeField(
																		dimIndex,
																		fieldIndex,
																	)
																}
																className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
															>
																<X size={18} />
															</button>
														</div>
													),
												)}
											</div>
										</div>
									),
								)}

								{formData.dimensions.length ===
									0 && (
									<p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
										No sizes added yet. Click "Add
										Size" to create dimensions.
									</p>
								)}
							</div>

							{/* Submit Button */}
							<div className="flex gap-3">
								<button
									type="submit"
									disabled={
										createMutation.isPending ||
										updateMutation.isPending
									}
									className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors"
								>
									<Save size={20} />
									{editingTable
										? "Update"
										: "Create"}{" "}
									Size Table
								</button>
								<button
									type="button"
									onClick={resetForm}
									className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				)}

				{/* Tables List */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
						<h2 className="text-xl font-semibold text-gray-800 dark:text-white">
							All Size Tables
						</h2>
					</div>

					{error && (
						<div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-700 text-red-700 dark:text-red-300">
							<p className="font-semibold">
								Error loading size tables:
							</p>
							<p>
								{error?.message ||
									"Unknown error occurred"}
							</p>
						</div>
					)}

					{isLoading ? (
						<div className="p-8 text-center text-gray-500 dark:text-gray-400">
							Loading...
						</div>
					) : sizeTables &&
					  Array.isArray(sizeTables) &&
					  sizeTables.length > 0 ? (
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50 dark:bg-gray-700">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
											Table Name
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
											Sizes
										</th>
										<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
									{sizeTables.map((table) => (
										<tr
											key={table.id}
											className="hover:bg-gray-50 dark:hover:bg-gray-700"
										>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm font-medium text-gray-900 dark:text-white">
													{table.tableName}
												</div>
											</td>
											<td className="px-6 py-4">
												<div className="text-sm text-gray-600 dark:text-gray-400">
													{table.data?.dimensions
														?.length || 0}{" "}
													size(s):{" "}
													{table.data?.dimensions
														?.map(
															(d) => d.sizeName,
														)
														.join(", ") ||
														"No sizes"}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<button
													onClick={() =>
														handlePreview(table)
													}
													className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-3"
													title="Preview"
												>
													<Eye size={18} />
												</button>
												<button
													onClick={() =>
														handleEdit(table)
													}
													className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
													title="Edit"
												>
													<Edit size={18} />
												</button>
												<button
													onClick={() =>
														handleDelete(table.id)
													}
													className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
													disabled={
														deleteMutation.isPending
													}
													title="Delete"
												>
													<Trash2 size={18} />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div className="p-8 text-center text-gray-500 dark:text-gray-400">
							No size tables found. Create one to
							get started!
						</div>
					)}
				</div>

				{/* Preview Modal */}
				{previewTable && (
					<div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
							{/* Modal Header */}
							<div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
								<div>
									<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
										{previewTable.tableName}
									</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
										Size Table Preview
									</p>
								</div>
								<button
									onClick={closePreview}
									className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
								>
									<X size={24} />
								</button>
							</div>

							{/* Modal Content */}
							<div className="p-6 overflow-auto max-h-[calc(90vh-140px)]">
								{previewTable.data?.dimensions &&
								previewTable.data.dimensions
									.length > 0 ? (
									<div className="overflow-x-auto">
										<table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
											<thead>
												<tr className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700">
													<th className="border border-gray-300 dark:border-blue-500 px-4 py-3 text-left text-white font-semibold">
														Size / المقاس
													</th>
													{previewTable.data.dimensions[0]?.fields?.map(
														(field, idx) => (
															<th
																key={idx}
																className="border border-gray-300 dark:border-blue-500 px-4 py-3 text-center text-white font-semibold"
															>
																{field.fieldName}
															</th>
														),
													)}
												</tr>
											</thead>
											<tbody>
												{previewTable.data.dimensions.map(
													(dimension, dimIdx) => (
														<tr
															key={dimIdx}
															className={
																dimIdx % 2 === 0
																	? "bg-gray-50 dark:bg-gray-700"
																	: "bg-white dark:bg-gray-800"
															}
														>
															<td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white">
																{
																	dimension.sizeName
																}
															</td>
															{dimension.fields?.map(
																(
																	field,
																	fieldIdx,
																) => (
																	<td
																		key={fieldIdx}
																		className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-gray-700 dark:text-gray-300"
																	>
																		{
																			field.fieldValue
																		}
																	</td>
																),
															)}
														</tr>
													),
												)}
											</tbody>
										</table>
									</div>
								) : (
									<div className="text-center py-12">
										<p className="text-gray-500 dark:text-gray-400">
											No size data available for
											preview
										</p>
									</div>
								)}
							</div>

							{/* Modal Footer */}
							<div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
								<button
									onClick={closePreview}
									className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
