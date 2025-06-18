import { createContext, useContext } from "react";
import React, {
	useEffect,
	useState,
} from "react";
import { Product } from "../api/productAPI";
import {
	useReactTable,
	createColumnHelper,
	getCoreRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getFacetedUniqueValues,
	getFacetedRowModel,
	getFacetedMinMaxValues,
} from "@tanstack/react-table";
const TableProductContext = createContext();

export function TableProvider({ children }) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState([]);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 20,
	});
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnResizeMode] = useState("onChange");
	const [columnResizeDirection] = useState("ltr");
	const [columnSizing, setColumnSizing] = useState({});

	const fetchProductData = async () => {
		try {
			setLoading(true);
			const response = await Product.getAll({
				limit: pagination.pageSize
			});
			console.log('API Response:', response.data);
			setData(response.data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProductData();
	}, [pagination.pageSize]);

	const handlePaginationChange = (updater) => {
		if (typeof updater === 'function') {
			setPagination((old) => {
				const newState = updater(old);
				// If only pageSize is changing, prevent scroll
				if (old.pageIndex === newState.pageIndex && old.pageSize !== newState.pageSize) {
					// Store current scroll position
					const scrollPosition = window.scrollY;
					// Update pagination
					setTimeout(() => {
						window.scrollTo(0, scrollPosition);
					}, 0);
				}
				return newState;
			});
		} else {
			setPagination(updater);
		}
	};

	const columnHelper = createColumnHelper();
	const columns = [
		columnHelper.accessor("id", {
			header: "#",
			cell: (info) => info.getValue(),
			enableSorting: true,
			enableResizing: true,
			size: 80,
		}),
		columnHelper.accessor("name", {
			header: "Name",
			cell: (info) => info.getValue(),
			enableSorting: true,
			sortingFn: "alphanumeric",
			enableResizing: true,
			size: 200,
		}),
		columnHelper.accessor("quantity", {
			header: "Quantity",
			cell: (info) => info.getValue() || "0",
			enableSorting: true,
			sortingFn: "alphanumeric",
			enableResizing: true,
			size: 100,
		}),
		columnHelper.accessor("poster", {
			header: "Poster",
			cell: (info) => info.getValue()?.username || "N/A",
			enableSorting: true,
			sortingFn: "alphanumeric",
			enableResizing: true,
			size: 150,
		}),
		columnHelper.accessor("category", {
			header: "Category",
			cell: (info) => {
				const category = info.getValue();
				return category?.name || "N/A";
			},
			enableSorting: true,
			enableResizing: true,
			size: 150,
			sortingFn: (rowA, rowB) => {
				const categoryA =
					rowA.getValue("category")?.name ||
					"N/A";
				const categoryB =
					rowB.getValue("category")?.name ||
					"N/A";
				return categoryA.localeCompare(categoryB);
			},
		}),
		columnHelper.accessor("subCategory", {
			header: "Sub Category",
			cell: (info) => {
				const subCategory = info.getValue();
				return subCategory?.name || "N/A";
			},
			enableSorting: true,
			enableResizing: true,
			size: 150,
			sortingFn: (rowA, rowB) => {
				const subCategoryA =
					rowA.getValue("subCategory")?.name ||
					"N/A";
				const subCategoryB =
					rowB.getValue("subCategory")?.name ||
					"N/A";
				return subCategoryA.localeCompare(
					subCategoryB,
				);
			},
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
			sortingFn: "alphanumeric",
			enableResizing: true,
			size: 120,
		}),
	];

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			pagination,
			globalFilter,
			columnSizing,
		},
		onGlobalFilterChange: setGlobalFilter,
		onColumnFiltersChange: setColumnFilters,
		onSortingChange: setSorting,
		onPaginationChange: handlePaginationChange,
		onColumnSizingChange: setColumnSizing,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		columnResizeMode,
		columnResizeDirection,
		enableColumnResizing: true,
		manualPagination: false,
		manualSorting: false,
		manualFiltering: false,
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
					<p className="text-xl font-semibold">Error loading products</p>
					<p className="text-sm">{error}</p>
				</div>
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-gray-500 text-center">
					<p className="text-xl font-semibold">No products found</p>
					<p className="text-sm">Add some products to see them here</p>
				</div>
			</div>
		);
	}

	const value = {
		data,
		setData,
		loading,
		setLoading,
		error,
		setError,
		globalFilter,
		setGlobalFilter,
		table,
		sorting,
		setSorting,
		pagination,
		setPagination,
		columnFilters,
		setColumnFilters,
		columnResizeMode,
		columnResizeDirection,
		fetchProductData,
	};

	return (
		<TableProductContext.Provider value={value}>
			{children}
		</TableProductContext.Provider>
	);
}

export function useTableProduct() {
	const context = useContext(TableProductContext);
	if (!context) {
		throw new Error(
			"useTableProduct must be used within a TableProductProvider",
		);
	}
	return context;
}
