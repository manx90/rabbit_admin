import React, {
	useState,
	useEffect,
} from "react";
import StatsApi from "../api/statsApi";
import {
	TrendingUp,
	Package,
	Users,
	ShoppingCart,
	DollarSign,
	AlertTriangle,
	Eye,
	Calendar,
	Star,
	Image,
	BarChart3,
	Activity,
	Timer,
	Tag,
	ExternalLink,
	Edit,
	Trash2,
	AlertCircle,
	CheckCircle,
	Clock,
	ImageOff,
} from "lucide-react";

const getColorClasses = (color, isDark) => {
	const lightColors = {
		blue: {
			bg: "bg-blue-50 border-blue-200",
			iconBg: "bg-blue-100",
			iconColor: "text-blue-600",
			accent: "text-blue-600",
			change: "text-blue-500",
		},
		green: {
			bg: "bg-green-50 border-green-200",
			iconBg: "bg-green-100",
			iconColor: "text-green-600",
			accent: "text-green-600",
			change: "text-green-500",
		},
		red: {
			bg: "bg-red-50 border-red-200",
			iconBg: "bg-red-100",
			iconColor: "text-red-600",
			accent: "text-red-600",
			change: "text-red-500",
		},
		yellow: {
			bg: "bg-yellow-50 border-yellow-200",
			iconBg: "bg-yellow-100",
			iconColor: "text-yellow-600",
			accent: "text-yellow-600",
			change: "text-yellow-500",
		},
		purple: {
			bg: "bg-purple-50 border-purple-200",
			iconBg: "bg-purple-100",
			iconColor: "text-purple-600",
			accent: "text-purple-600",
			change: "text-purple-500",
		},
		indigo: {
			bg: "bg-indigo-50 border-indigo-200",
			iconBg: "bg-indigo-100",
			iconColor: "text-indigo-600",
			accent: "text-indigo-600",
			change: "text-indigo-500",
		},
		orange: {
			bg: "bg-orange-50 border-orange-200",
			iconBg: "bg-orange-100",
			iconColor: "text-orange-600",
			accent: "text-orange-600",
			change: "text-orange-500",
		},
	};

	const darkColors = {
		blue: {
			bg: "bg-blue-900/20 border-blue-700/50",
			iconBg: "bg-blue-800/30",
			iconColor: "text-blue-400",
			accent: "text-blue-400",
			change: "text-blue-300",
		},
		green: {
			bg: "bg-green-900/20 border-green-700/50",
			iconBg: "bg-green-800/30",
			iconColor: "text-green-400",
			accent: "text-green-400",
			change: "text-green-300",
		},
		red: {
			bg: "bg-red-900/20 border-red-700/50",
			iconBg: "bg-red-800/30",
			iconColor: "text-red-400",
			accent: "text-red-400",
			change: "text-red-300",
		},
		yellow: {
			bg: "bg-yellow-900/20 border-yellow-700/50",
			iconBg: "bg-yellow-800/30",
			iconColor: "text-yellow-400",
			accent: "text-yellow-400",
			change: "text-yellow-300",
		},
		purple: {
			bg: "bg-purple-900/20 border-purple-700/50",
			iconBg: "bg-purple-800/30",
			iconColor: "text-purple-400",
			accent: "text-purple-400",
			change: "text-purple-300",
		},
		indigo: {
			bg: "bg-indigo-900/20 border-indigo-700/50",
			iconBg: "bg-indigo-800/30",
			iconColor: "text-indigo-400",
			accent: "text-indigo-400",
			change: "text-indigo-300",
		},
		orange: {
			bg: "bg-orange-900/20 border-orange-700/50",
			iconBg: "bg-orange-800/30",
			iconColor: "text-orange-400",
			accent: "text-orange-400",
			change: "text-orange-300",
		},
	};

	return isDark
		? darkColors[color]
		: lightColors[color];
};

function StatCard({
	title,
	value,
	change,
	changeType = "neutral",
	icon,
	color,
	subtitle,
	isDark,
}) {
	const classes = getColorClasses(color, isDark);

	const getChangeColor = () => {
		if (changeType === "positive")
			return isDark
				? "text-green-400"
				: "text-green-600";
		if (changeType === "negative")
			return isDark
				? "text-red-400"
				: "text-red-600";
		return isDark
			? "text-gray-400"
			: "text-gray-500";
	};

	return (
		<div
			className={`p-6 rounded-xl border-2 ${classes.bg} hover:shadow-lg transition-all duration-300 hover:scale-105`}
		>
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<p
						className={`text-sm font-medium mb-1 ${
							isDark
								? "text-gray-300"
								: "text-gray-600"
						}`}
					>
						{title}
					</p>
					<div className="flex items-baseline gap-2">
						<h3
							className={`text-3xl font-bold ${classes.accent}`}
						>
							{typeof value === "number"
								? value.toLocaleString()
								: value}
						</h3>
						{change && (
							<span
								className={`text-sm font-medium ${getChangeColor()}`}
							>
								{change}
							</span>
						)}
					</div>
					{subtitle && (
						<p
							className={`text-xs mt-1 ${
								isDark
									? "text-gray-400"
									: "text-gray-500"
							}`}
						>
							{subtitle}
						</p>
					)}
				</div>
				<div
					className={`p-3 rounded-full ${classes.iconBg}`}
				>
					<div
						className={`w-6 h-6 ${classes.iconColor}`}
					>
						{icon}
					</div>
				</div>
			</div>
		</div>
	);
}

function CategoryBar({
	category,
	isLast,
	isDark,
}) {
	return (
		<div
			className={`py-3 ${
				!isLast
					? `border-b ${
							isDark
								? "border-gray-700"
								: "border-gray-100"
					  }`
					: ""
			}`}
		>
			<div className="flex items-center justify-between mb-2">
				<span
					className={`text-sm font-medium ${
						isDark
							? "text-gray-200"
							: "text-gray-700"
					}`}
				>
					{category.categoryName}
				</span>
				<div className="flex items-center gap-2">
					<span
						className={`text-sm ${
							isDark
								? "text-gray-300"
								: "text-gray-600"
						}`}
					>
						{category.count}
					</span>
					<span
						className={`text-xs ${
							isDark
								? "text-gray-400"
								: "text-gray-500"
						}`}
					>
						({category.percentage}%)
					</span>
				</div>
			</div>
			<div
				className={`w-full rounded-full h-2 ${
					isDark ? "bg-gray-700" : "bg-gray-200"
				}`}
			>
				<div
					className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
					style={{
						width: `${category.percentage}%`,
					}}
				/>
			</div>
		</div>
	);
}

function SectionHeader({
	title,
	subtitle,
	isDark,
}) {
	return (
		<div className="mb-6">
			<h2
				className={`text-2xl font-bold mb-1 ${
					isDark ? "text-white" : "text-gray-900"
				}`}
			>
				{title}
			</h2>
			{subtitle && (
				<p
					className={
						isDark
							? "text-gray-300"
							: "text-gray-600"
					}
				>
					{subtitle}
				</p>
			)}
		</div>
	);
}

function ProductTable({
	title,
	products,
	columns,
	isDark,
}) {
	return (
		<div
			className={`rounded-xl shadow-sm p-6 ${
				isDark ? "bg-gray-800" : "bg-white"
			}`}
		>
			<div className="flex items-center justify-between mb-4">
				<h3
					className={`text-lg font-semibold ${
						isDark
							? "text-white"
							: "text-gray-900"
					}`}
				>
					{title}
				</h3>
				{products && products.length > 0 && (
					<span
						className={`px-3 py-1 rounded-full text-xs font-medium ${
							isDark
								? "bg-blue-900/30 text-blue-400"
								: "bg-blue-100 text-blue-700"
						}`}
					>
						{products.length} items
					</span>
				)}
			</div>
			<div className="overflow-x-auto">
				<table className="w-full ">
					<thead>
						<tr
							className={`border-b ${
								isDark
									? "border-gray-700"
									: "border-gray-200"
							}`}
						>
							{columns.map((column) => (
								<th
									key={column.key}
									className={`text-center py-4 px-3 font-medium text-sm ${
										isDark
											? "text-gray-300"
											: "text-gray-600"
									}`}
								>
									{column.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{products && products.length > 0 ? (
							products.map((product) => (
								<tr
									key={product.id}
									className={`border-b ${
										isDark
											? "border-gray-700/50"
											: "border-gray-100"
									} hover:${
										isDark
											? "bg-gray-700/30"
											: "bg-gray-50"
									} transition-colors`}
								>
									{columns.map((column) => (
										<td
											key={column.key}
											className={`py-4 px-3 text-center ${
												isDark
													? "text-gray-200"
													: "text-gray-700"
											}`}
										>
											{column.render
												? column.render(
														product[column.key],
														product,
												  )
												: product[column.key]}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={columns.length}
									className={`py-8 text-center ${
										isDark
											? "text-gray-400"
											: "text-gray-500"
									}`}
								>
									<div className="flex flex-col items-center gap-2">
										<Package className="w-8 h-8 opacity-50" />
										<span>No products found</span>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default function Dashboard() {
	const [isDark, setIsDark] = useState(false);
	const [stats, setStats] = useState();
	const [growthStats, setGrowthStats] =
		useState(null);
	const [missImg, setMissImg] = useState(null);
	const [topSelling, setTopSelling] = useState(
		[],
	);

	useEffect(() => {
		async function fetchData() {
			try {
				const [
					overviewRes,
					growthRes,
					missImgRes,
					topSellingRes,
				] = await Promise.all([
					StatsApi.getProductStatsOverview(),
					StatsApi.getGrowth(30),
					StatsApi.getProductsWithoutImages(),
					StatsApi.getTopSellingProducts(), // No limit parameter
				]);
				setMissImg(missImgRes);
				setStats(overviewRes);
				setGrowthStats(growthRes);
				setTopSelling(topSellingRes);

				console.log(
					"Overview:",
					overviewRes?.data,
				);
				console.log("Growth:", growthRes?.data);
			} catch (error) {
				console.error(
					"Error fetching dashboard data:",
					error,
				);
			}
		}
		fetchData();
	}, []);
	useEffect(() => {
		const root = document.documentElement;
		const update = () =>
			setIsDark(root.classList.contains("dark"));
		update();
		const observer = new MutationObserver(update);
		observer.observe(root, {
			attributes: true,
			attributeFilter: ["class"],
		});
		return () => observer.disconnect();
	}, []);

	const lowStockColumns = [
		{ key: "name", label: "Product Name" },
		{
			key: "quantity",
			label: "Stock",
			render: (value) => (
				<span
					className={`px-2 py-1 rounded-full text-xs font-medium ${
						Number(value) <= 2
							? isDark
								? "bg-red-900/30 text-red-400"
								: "bg-red-100 text-red-700"
							: Number(value) <= 5
							? isDark
								? "bg-yellow-900/30 text-yellow-400"
								: "bg-yellow-100 text-yellow-700"
							: isDark
							? "bg-green-900/30 text-green-400"
							: "bg-green-100 text-green-700"
					}`}
				>
					{value} left
				</span>
			),
		},
		{ key: "season", label: "Season" },
	];

	const missingImagesColumns = [
		{
			key: "name",
			label: "Product Name",
			render: (value) => (
				<div className="font-medium text-sm">
					{value}
				</div>
			),
		},
		{
			key: "hasCover",
			label: "Cover Image",
			render: (value) => (
				<div className="flex items-center justify-center">
					{value ? (
						<div className="flex items-center gap-2">
							<CheckCircle
								className={`w-5 h-5 ${
									isDark
										? "text-green-400"
										: "text-green-600"
								}`}
							/>
							<span
								className={`text-xs font-medium ${
									isDark
										? "text-green-300"
										: "text-green-700"
								}`}
							>
								Available
							</span>
						</div>
					) : (
						<div className="flex items-center gap-2">
							<AlertCircle
								className={`w-5 h-5 ${
									isDark
										? "text-red-400"
										: "text-red-600"
								}`}
							/>
							<span
								className={`text-xs font-medium ${
									isDark
										? "text-red-300"
										: "text-red-700"
								}`}
							>
								Missing
							</span>
						</div>
					)}
				</div>
			),
		},
		{
			key: "hasImages",
			label: "Gallery Images",
			render: (value) => (
				<div className="flex items-center justify-center">
					{value ? (
						<div className="flex items-center gap-2">
							<CheckCircle
								className={`w-5 h-5 ${
									isDark
										? "text-green-400"
										: "text-green-600"
								}`}
							/>
							<span
								className={`text-xs font-medium ${
									isDark
										? "text-green-300"
										: "text-green-700"
								}`}
							>
								Available
							</span>
						</div>
					) : (
						<div className="flex items-center gap-2">
							<AlertCircle
								className={`w-5 h-5 ${
									isDark
										? "text-red-400"
										: "text-red-600"
								}`}
							/>
							<span
								className={`text-xs font-medium ${
									isDark
										? "text-red-300"
										: "text-red-700"
								}`}
							>
								Missing
							</span>
						</div>
					)}
				</div>
			),
		},
		{
			key: "hasSizeChart",
			label: "Size Chart",
			render: (value) => (
				<div className="flex items-center justify-center">
					{value ? (
						<div className="flex items-center gap-2">
							<CheckCircle
								className={`w-5 h-5 ${
									isDark
										? "text-green-400"
										: "text-green-600"
								}`}
							/>
							<span
								className={`text-xs font-medium ${
									isDark
										? "text-green-300"
										: "text-green-700"
								}`}
							>
								Available
							</span>
						</div>
					) : (
						<div className="flex items-center gap-2">
							<AlertCircle
								className={`w-5 h-5 ${
									isDark
										? "text-red-400"
										: "text-red-600"
								}`}
							/>
							<span
								className={`text-xs font-medium ${
									isDark
										? "text-red-300"
										: "text-red-700"
								}`}
							>
								Missing
							</span>
						</div>
					)}
				</div>
			),
		},
		{
			key: "hasMeasure",
			label: "Measurements",
			render: (value) => (
				<div className="flex items-center justify-center">
					{value ? (
						<div className="flex items-center gap-2">
							<CheckCircle
								className={`w-5 h-5 ${
									isDark
										? "text-green-400"
										: "text-green-600"
								}`}
							/>
							<span
								className={`text-xs font-medium ${
									isDark
										? "text-green-300"
										: "text-green-700"
								}`}
							>
								Available
							</span>
						</div>
					) : (
						<div className="flex items-center gap-2">
							<AlertCircle
								className={`w-5 h-5 ${
									isDark
										? "text-red-400"
										: "text-red-600"
								}`}
							/>
							<span
								className={`text-xs font-medium ${
									isDark
										? "text-red-300"
										: "text-red-700"
								}`}
							>
								Missing
							</span>
						</div>
					)}
				</div>
			),
		},
	];

	const topSellingColumns = [
		{
			key: "name",
			label: "Product Name",
			render: (value) => (
				<div className="font-medium text-sm">
					{value}
				</div>
			),
		},
		{
			key: "sales",
			label: "Sales",
			render: (value) => (
				<div className="flex items-center justify-center">
					<span
						className={`px-3 py-1 rounded-full text-sm font-medium ${
							Number(value) > 0
								? isDark
									? "bg-green-900/30 text-green-400"
									: "bg-green-100 text-green-700"
								: isDark
								? "bg-gray-700/50 text-gray-400"
								: "bg-gray-100 text-gray-600"
						}`}
					>
						{value} sold
					</span>
				</div>
			),
		},
		{
			key: "totalQuantity",
			label: "Stock Available",
			render: (value) => (
				<div className="flex items-center justify-center">
					<span
						className={`px-3 py-1 rounded-full text-sm font-medium ${
							Number(value) <= 5
								? isDark
									? "bg-red-900/30 text-red-400"
									: "bg-red-100 text-red-700"
								: Number(value) <= 20
								? isDark
									? "bg-yellow-900/30 text-yellow-400"
									: "bg-yellow-100 text-yellow-700"
								: isDark
								? "bg-green-900/30 text-green-400"
								: "bg-green-100 text-green-700"
						}`}
					>
						{value} in stock
					</span>
				</div>
			),
		},
	];

	return (
		<div
			className={`min-h-screen p-6 transition-colors duration-300 mt-20 ${
				isDark ? "bg-gray-900" : "bg-gray-50"
			}`}
		>
			<div className="max-w-7xl mx-auto space-y-8">
				{/* Header */}
				<div
					className={`rounded-xl shadow-sm p-6 ${
						isDark ? "bg-gray-800" : "bg-white"
					}`}
				>
					<div className="flex items-center justify-between">
						<div>
							<h1
								className={`text-3xl font-bold ${
									isDark
										? "text-white"
										: "text-gray-900"
								}`}
							>
								Product Analytics Dashboard
							</h1>
							<p
								className={`mt-1 ${
									isDark
										? "text-gray-300"
										: "text-gray-600"
								}`}
							>
								Comprehensive insights into your
								product catalog and sales
								performance
							</p>
						</div>
						<div className="flex items-center gap-4">
							<div
								className={`flex items-center gap-2 text-sm ${
									isDark
										? "text-gray-400"
										: "text-gray-500"
								}`}
							>
								<Activity className="w-4 h-4" />
								<span>Real-time data</span>
							</div>
						</div>
					</div>
				</div>

				{/* Key Metrics Row */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<StatCard
						title="Total Products"
						value={stats?.totalProducts}
						changeType="positive"
						icon={<Package />}
						color="blue"
						subtitle="Active catalog items"
						isDark={isDark}
					/>
					<StatCard
						title="Total Sales"
						value={stats?.salesStats?.totalSales}
						changeType="positive"
						icon={<TrendingUp />}
						color="green"
						subtitle="Units sold"
						isDark={isDark}
					/>
					<StatCard
						title="Revenue"
						value={`$${stats?.salesStats?.totalRevenue.toLocaleString()}`}
						changeType="positive"
						icon={<DollarSign />}
						color="purple"
						subtitle="Total earnings"
						isDark={isDark}
					/>
					<StatCard
						title="Avg Sales/Product"
						value={
							stats?.salesStats
								.averageSalesPerProduct
						}
						changeType="positive"
						icon={<BarChart3 />}
						color="indigo"
						subtitle="Performance metric"
						isDark={isDark}
					/>
				</div>

				{/* Sales Analytics */}
				<div
					className={`rounded-xl shadow-sm p-6 ${
						isDark ? "bg-gray-800" : "bg-white"
					}`}
				>
					<SectionHeader
						title="Sales Analytics"
						subtitle="Revenue and performance insights"
						isDark={isDark}
					/>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2 space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div
									className={`p-4 rounded-lg border ${
										isDark
											? "bg-green-900/20 border-green-700/50"
											: "bg-gradient-to-br from-green-50 to-green-100 border-green-200"
									}`}
								>
									<div className="flex items-center gap-3">
										<div
											className={`p-2 rounded-full ${
												isDark
													? "bg-green-800/30"
													: "bg-green-200"
											}`}
										>
											<DollarSign
												className={`w-5 h-5 ${
													isDark
														? "text-green-400"
														: "text-green-700"
												}`}
											/>
										</div>
										<div>
											<p
												className={`text-sm font-medium ${
													isDark
														? "text-green-400"
														: "text-green-700"
												}`}
											>
												Best Seller
											</p>
											<p
												className={`text-lg font-bold ${
													isDark
														? "text-green-300"
														: "text-green-800"
												}`}
											>
												{stats?.salesStats
													?.bestSellingProduct
													?.name || null}
											</p>
											<p
												className={`text-sm ${
													isDark
														? "text-green-400"
														: "text-green-600"
												}`}
											>
												{stats?.salesStats
													?.bestSellingProduct
													?.sales || null}{" "}
												units
											</p>
										</div>
									</div>
								</div>

								<div
									className={`p-4 rounded-lg border ${
										isDark
											? "bg-blue-900/20 border-blue-700/50"
											: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
									}`}
								>
									<div className="flex items-center gap-3">
										<div
											className={`p-2 rounded-full ${
												isDark
													? "bg-blue-800/30"
													: "bg-blue-200"
											}`}
										>
											<Activity
												className={`w-5 h-5 ${
													isDark
														? "text-blue-400"
														: "text-blue-700"
												}`}
											/>
										</div>
										<div>
											<p
												className={`text-sm font-medium ${
													isDark
														? "text-blue-400"
														: "text-blue-700"
												}`}
											>
												Avg Revenue
											</p>
											<p
												className={`text-lg font-bold ${
													isDark
														? "text-blue-300"
														: "text-blue-800"
												}`}
											>
												$
												{(
													stats?.salesStats
														.totalRevenue /
													stats?.totalProducts
												).toFixed(0)}
											</p>
											<p
												className={`text-sm ${
													isDark
														? "text-blue-400"
														: "text-blue-600"
												}`}
											>
												per product
											</p>
										</div>
									</div>
								</div>

								<div
									className={`p-4 rounded-lg border ${
										isDark
											? "bg-purple-900/20 border-purple-700/50"
											: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
									}`}
								>
									<div className="flex items-center gap-3">
										<div
											className={`p-2 rounded-full ${
												isDark
													? "bg-purple-800/30"
													: "bg-purple-200"
											}`}
										>
											<TrendingUp
												className={`w-5 h-5 ${
													isDark
														? "text-purple-400"
														: "text-purple-700"
												}`}
											/>
										</div>
										<div>
											<p
												className={`text-sm font-medium ${
													isDark
														? "text-purple-400"
														: "text-purple-700"
												}`}
											>
												Growth Rate
											</p>
											<p
												className={`text-lg font-bold ${
													growthStats?.revenue
														?.percentChange > 0
														? isDark
															? "text-green-300"
															: "text-green-800"
														: growthStats?.revenue
																?.percentChange <
														  0
														? isDark
															? "text-red-300"
															: "text-red-800"
														: isDark
														? "text-purple-300"
														: "text-purple-800"
												}`}
											>
												{growthStats?.revenue
													?.percentChange
													? `${
															growthStats.revenue
																.percentChange > 0
																? "+"
																: ""
													  }${
															growthStats.revenue
																.percentChange
													  }%`
													: "0%"}
											</p>
											<p
												className={`text-sm ${
													isDark
														? "text-purple-400"
														: "text-purple-600"
												}`}
											>
												last 30 days
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div
							className={`p-4 rounded-lg ${
								isDark
									? "bg-gray-700/50"
									: "bg-gray-50"
							}`}
						>
							<h3
								className={`font-semibold mb-3 flex items-center gap-2 ${
									isDark
										? "text-gray-200"
										: "text-gray-800"
								}`}
							>
								<BarChart3 className="w-4 h-4" />
								Top Categories
							</h3>
							<div className="space-y-2">
								{stats?.categoryStats?.map(
									(category, index) => (
										<CategoryBar
											key={category.categoryName}
											category={category}
											isLast={
												index ===
												stats?.categoryStats
													.length -
													1
											}
											isDark={isDark}
										/>
									),
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Product Status Overview */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Publish States */}
					<div
						className={`rounded-xl shadow-sm p-6 ${
							isDark ? "bg-gray-800" : "bg-white"
						}`}
					>
						<SectionHeader
							title="Publication Status"
							subtitle="Product visibility and readiness"
							isDark={isDark}
						/>
						<div className="grid grid-cols-2 gap-4">
							<StatCard
								title="Published"
								value={
									stats?.publishStateStats
										.published
								}
								change={`${(
									(stats?.publishStateStats
										.published /
										stats?.publishStateStats
											.total) *
									100
								).toFixed(1)}%`}
								icon={<Eye />}
								color="green"
								isDark={isDark}
							/>
							<StatCard
								title="Drafts"
								value={
									stats?.publishStateStats?.draft
								}
								change={`${(
									(stats?.publishStateStats
										.draft /
										stats?.publishStateStats
											.total) *
									100
								).toFixed(1)}%`}
								icon={<Timer />}
								color="yellow"
								isDark={isDark}
							/>
						</div>
					</div>

					{/* Season Distribution */}
					<div
						className={`rounded-xl shadow-sm p-6 ${
							isDark ? "bg-gray-800" : "bg-white"
						}`}
					>
						<SectionHeader
							title="Seasonal Distribution"
							subtitle="Products by season category"
							isDark={isDark}
						/>
						<div className="grid grid-cols-2 gap-4">
							<StatCard
								title="Winter"
								value={stats?.seasonStats?.winter}
								icon={<Package />}
								color="blue"
								isDark={isDark}
							/>
							<StatCard
								title="Summer"
								value={stats?.seasonStats?.summer}
								icon={<Package />}
								color="orange"
								isDark={isDark}
							/>
							<StatCard
								title="Spring/Autumn"
								value={
									stats?.seasonStats
										?.spring_autumn
								}
								icon={<Package />}
								color="green"
								isDark={isDark}
							/>
							<StatCard
								title="All Seasons"
								value={stats?.seasonStats?.all}
								icon={<Package />}
								color="purple"
								isDark={isDark}
							/>
						</div>
					</div>
				</div>

				{/* Product Flags & Recent Activity */}
				<div className="grid w-full gap-8">
					{/* Recent Activity */}
					<div
						className={`rounded-xl shadow-sm p-6 ${
							isDark ? "bg-gray-800" : "bg-white"
						}`}
					>
						<SectionHeader
							title="Recent Activity"
							subtitle="New product additions"
							isDark={isDark}
						/>
						<div className="space-y-4 gap-8 grid grid-cols-1 lg:grid-cols-3">
							{/* Last 7 days */}
							<div
								className={`flex items-center h-full justify-between p-3 rounded-lg border ${
									isDark
										? "bg-blue-900/20 border-blue-700/50"
										: "bg-blue-50 border-blue-200"
								}`}
							>
								<div className="flex items-center gap-3">
									<Calendar
										className={`w-5 h-5 ${
											isDark
												? "text-blue-400"
												: "text-blue-600"
										}`}
									/>
									<div>
										<p
											className={`font-medium ${
												isDark
													? "text-blue-300"
													: "text-blue-800"
											}`}
										>
											Last 7 days
										</p>
										<p
											className={`text-sm ${
												isDark
													? "text-blue-400"
													: "text-blue-600"
											}`}
										>
											New products
										</p>
									</div>
								</div>
								<div className="text-right">
									<p
										className={`text-2xl font-bold ${
											isDark
												? "text-blue-300"
												: "text-blue-700"
										}`}
									>
										{
											stats?.recentChange
												?.last7Days?.current
										}
									</p>
									<p className="text-xs text-gray-500">
										Prev:{" "}
										{
											stats?.recentChange
												?.last7Days?.previous
										}{" "}
										| Δ{" "}
										{
											stats?.recentChange
												?.last7Days?.percentChange
										}
										%
									</p>
								</div>
							</div>

							{/* Last 30 days */}
							<div
								className={`flex items-center h-full justify-between p-3 rounded-lg border ${
									isDark
										? "bg-green-900/20 border-green-700/50"
										: "bg-green-50 border-green-200"
								}`}
							>
								<div className="flex items-center gap-3">
									<Calendar
										className={`w-5 h-5 ${
											isDark
												? "text-green-400"
												: "text-green-600"
										}`}
									/>
									<div>
										<p
											className={`font-medium ${
												isDark
													? "text-green-300"
													: "text-green-800"
											}`}
										>
											Last 30 days
										</p>
										<p
											className={`text-sm ${
												isDark
													? "text-green-400"
													: "text-green-600"
											}`}
										>
											New products
										</p>
									</div>
								</div>
								<div className="text-right">
									<p
										className={`text-2xl font-bold ${
											isDark
												? "text-green-300"
												: "text-green-700"
										}`}
									>
										{
											stats?.recentChange
												?.last30Days?.current
										}
									</p>
									<p className="text-xs text-gray-500">
										Prev:{" "}
										{
											stats?.recentChange
												?.last30Days?.previous
										}{" "}
										| Δ{" "}
										{
											stats?.recentChange
												?.last30Days
												?.percentChange
										}
										%
									</p>
								</div>
							</div>

							{/* Last 90 days */}
							<div
								className={`flex items-center h-full justify-between p-3 rounded-lg border ${
									isDark
										? "bg-purple-900/20 border-purple-700/50"
										: "bg-purple-50 border-purple-200"
								}`}
							>
								<div className="flex items-center gap-3">
									<Calendar
										className={`w-5 h-5 ${
											isDark
												? "text-purple-400"
												: "text-purple-600"
										}`}
									/>
									<div>
										<p
											className={`font-medium ${
												isDark
													? "text-purple-300"
													: "text-purple-800"
											}`}
										>
											Last 90 days
										</p>
										<p
											className={`text-sm ${
												isDark
													? "text-purple-400"
													: "text-purple-600"
											}`}
										>
											New products
										</p>
									</div>
								</div>
								<div className="text-right">
									<p
										className={`text-2xl font-bold ${
											isDark
												? "text-purple-300"
												: "text-purple-700"
										}`}
									>
										{
											stats?.recentChange
												?.last90Days?.current
										}
									</p>
									<p className="text-xs text-gray-500">
										Prev:{" "}
										{
											stats?.recentChange
												?.last90Days?.previous
										}{" "}
										| Δ{" "}
										{
											stats?.recentChange
												?.last90Days
												?.percentChange
										}
										%
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Product Tables */}
				<div className="space-y-8">
					{/* Low Stock Products Table */}
					<ProductTable
						title="Low Stock Products"
						products={stats?.lowStock}
						columns={lowStockColumns}
						isDark={isDark}
					/>

					{/* Missing Images Products Table */}
					<ProductTable
						title="Products Missing Images"
						products={missImg}
						columns={missingImagesColumns}
						isDark={isDark}
					/>

					{/* Top Selling Products */}
					<ProductTable
						title="Top Selling Products"
						products={topSelling}
						columns={topSellingColumns}
						isDark={isDark}
					/>
				</div>
			</div>
		</div>
	);
}
