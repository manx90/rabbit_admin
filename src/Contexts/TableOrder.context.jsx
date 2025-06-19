import { createContext, useContext } from "react";
import React, {
	useEffect,
	useState,
} from "react";
import { Order } from "../api/orderApi";
import { Optos } from "../api/optosApi";
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

const TableOrderContext = createContext();

export function TableOrderProvider({ children }) {
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
	const [cities, setCities] = useState([]);

	// Fetch both orders and cities, then map city and area names to orders
	const fetchOrdersCitiesAndAreas = async () => {
		try {
			setLoading(true);
			const [orders, citiesResponse] = await Promise.all([
				Order.getAll(),
				Optos.getCity(),
			]);

			// Handle case where citiesResponse is an array with an object that has a 'data' property
			const citiesArr = Array.isArray(citiesResponse) && citiesResponse[0]?.data ? citiesResponse[0].data : [];
			setCities(citiesArr);
			const cityMap = Object.fromEntries(citiesArr.map(city => [city.id, city.name]));

			// Get unique city IDs from orders
			const uniqueCityIds = Array.isArray(orders)
				? [...new Set(orders.map(order => order.consignee_city).filter(Boolean))]
				: [];

			// Fetch all areas for each unique city
			const areaResponses = await Promise.all(
				uniqueCityIds.map(cityId => Optos.gitArea(cityId))
			);
			// Build area map: { areaId: areaName }
			let areaMap = {};
			areaResponses.forEach(areaRes => {
				const areasArr = Array.isArray(areaRes) && areaRes[0]?.data ? areaRes[0].data : [];
				areasArr.forEach(area => {
					areaMap[area.id] = area.name;
				});
			});

			const ordersWithNames = Array.isArray(orders)
				? orders.map(order => ({
					...order,
					city_name: cityMap[order.consignee_city] || order.consignee_city || "-",
					area_name: areaMap[order.consignee_area] || order.consignee_area || "-"
				}))
				: [];
			setData(ordersWithNames);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchOrdersCitiesAndAreas();
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
			header: "id",
			cell: (info) => info.getValue(),
			enableSorting: true,
			enableResizing: true,
			size: 80,
		}),
		columnHelper.accessor("consignee_name", {
			header: "Name",
			cell: (info) => info.getValue(),
			enableSorting: true,
			enableResizing: true,
			size: 200,
		}),
		columnHelper.accessor("consignee_phone", {
			header: "Phone",
			cell: (info) => info.getValue(),
			enableSorting: true,
			enableResizing: true,
			size: 150,
		}),
		columnHelper.accessor("city_name", {
			header: "City",
			cell: (info) => info.getValue(),
			enableSorting: true,
			enableResizing: true,
			size: 150,
		}),
		columnHelper.accessor("area_name", {
			header: "Area",
			cell: (info) => info.getValue(),
			enableSorting: true,
			enableResizing: true,
			size: 150,
		}),
		columnHelper.accessor("status", {
			header: "Status",
			cell: (info) => {
				const value = info.getValue();
				let color = "bg-gray-200 text-gray-800";
				switch (value) {
					case "pending":
						color = "bg-gray-200 text-gray-800";
						break;
					case "processing":
						color = "bg-blue-100 text-blue-800";
						break;
					case "shipped":
						color = "bg-purple-100 text-purple-800";
						break;
					case "delivered":
						color = "bg-green-100 text-green-800";
						break;
					case "cancelled":
						color = "bg-red-100 text-red-800";
						break;
					default:
						color = "bg-gray-200 text-gray-800";
				}
				return (
					<span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>{value}</span>
				);
			},
			enableSorting: true,
			enableResizing: true,
			size: 120,
		}),
		columnHelper.accessor("quantity", {
			header: "Quantity",
			cell: (info) => info.getValue() || "0",
			enableSorting: true,
			enableResizing: true,
			size: 100,
		}),
		columnHelper.accessor("amount", {
			header: "Cost",
			cell: (info) => info.getValue(),
			enableSorting: true,
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
					<p className="text-xl font-semibold">Error loading orders</p>
					<p className="text-sm">{error}</p>
				</div>
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-gray-500 text-center">
					<p className="text-xl font-semibold">No orders found</p>
					<p className="text-sm">Add some orders to see them here</p>
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
	};

	return (
		<TableOrderContext.Provider value={value}>
			{children}
		</TableOrderContext.Provider>
	);
}

export function useTableOrder() {
	const context = useContext(TableOrderContext);
	if (!context) {
		throw new Error(
			"useTableOrder must be used within a TableOrderProvider",
		);
	}
	return context;
}
