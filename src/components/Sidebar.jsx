import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
	const location = useLocation();

	const menuItems = [
		{
			title: "Dashboard",
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
			),
			path: "/dashboard",
		},
		{
			title: "Products",
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
					/>
				</svg>
			),
			path: "/products",
		},
		{
			title: "Orders",
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
					/>
				</svg>
			),
			path: "/orders",
		},
		{
			title: "Customers",
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg>
			),
			path: "/customers",
		},
		{
			title: "Settings",
			icon: (
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			),
			path: "/settings",
		},
	];

	return (
		<div className="h-screen w-64 bg-white shadow-lg">
			{/* Logo */}
			<div className="p-4 border-b">
				<div className="flex items-center justify-center">
					<img src="/logo.png" alt="Logo" className="w-32" />
				</div>
			</div>

			{/* Menu Items */}
			<nav className="mt-6">
				{menuItems.map((item) => (
					<Link
						key={item.path}
						to={item.path}
						className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${
							location.pathname === item.path
								? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
								: ""
						}`}
					>
						<div className="flex items-center">
							{item.icon}
							<span className="ml-3 text-sm font-medium">
								{item.title}
							</span>
						</div>
					</Link>
				))}
			</nav>

			{/* User Profile */}
			<div className="absolute bottom-0 w-full p-4 border-t">
				<div className="flex items-center">
					<img
						src="/avatar.png"
						alt="User"
						className="w-8 h-8 rounded-full"
					/>
					<div className="ml-3">
						<p className="text-sm font-medium text-gray-700">
							John Doe
						</p>
						<p className="text-xs text-gray-500">Admin</p>
					</div>
				</div>
			</div>
		</div>
	);
}
