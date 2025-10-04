import React, {
	useState,
	useEffect,
} from "react";
import SidebarToggle from "./SidebarToggle";
import { useLocation } from "react-router-dom";

import DarkMode from "./DarkMode";
export default function Header({
	open,
	setOpen,
}) {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);
	const { pathname } = useLocation();

	// Format hours, minutes and seconds to always have 2 digits
	const formatNumber = (num) => {
		return num.toString().padStart(2, "0");
	};

	return (
		<div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md py-3 flex items-center justify-between z-10 transition-all duration-300 ease-in-out">
			<div className="pl-4 pr-6 md:px-[60px] flex items-center gap-4 flex-1">
				<SidebarToggle
					open={open}
					setOpen={setOpen}
					className="text-gray-800 hover:text-blue-500 sidebar-toggle"
				/>
				<h1 className="text-xl font-semibold text-gray-800 dark:text-white hidden md:block flex-1">
					{" "}
					{pathname === "/dashboard"
						? "Dashboard"
						: pathname === "/product" ||
						  pathname === "/"
						? "Product"
						: pathname === "/order"
						? "Order"
						: pathname === "/advertisements"
						? "Advertising"
						: pathname === "/category"
						? "Category"
						: "Rabbit Admin Dashboard"}
				</h1>
			</div>
			<div className="pr-4 md:pr-[60px] flex items-center gap-5">
				<div className="clock bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-1">
					<span className="hour font-bold text-lg">
						{formatNumber(time.getHours())}
					</span>
					<span className="text-lg animate-pulse">
						:
					</span>
					<span className="minute font-bold text-lg">
						{formatNumber(time.getMinutes())}
					</span>
					<span className="text-lg animate-pulse">
						:
					</span>
					<span className="second font-bold text-lg">
						{formatNumber(time.getSeconds())}
					</span>
				</div>
				<DarkMode />

				<div className="avatar bg-blue-100 hover:bg-blue-200 transition-colors duration-300 p-2 rounded-full cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-blue-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}
