import React from "react";
import {
	LayoutDashboard,
	Shirt,
	Package,
	Megaphone,
	User,
	ListTree,
	Table2,
} from "lucide-react";
import { Link } from "react-router-dom";
import SidebarToggle from "./SidebarToggle";

export default function Sidebar({
	open,
	setOpen,
}) {
	return (
		<div
			id="sidebar"
			// Sidebar container: fixed position, full height, black bg, shadow, transition for open/close
			className={`fixed top-0 left-0 h-screen bg-black shadow-xl z-[100] flex flex-col overflow-hidden
        transform transition-transform duration-300 ease-linear
        ${
					open
						? "translate-x-0"
						: "-translate-x-full"
				}
        w-[250px] md:w-[300px]`} // fixed width for better consistency on large screens
		>
			{/* Logo and toggle container */}
			<div className="flex justify-between items-center w-full px-4 md:px-[60px] py-5 border-b border-[#363030]">
				<img
					src="logo-white.png"
					alt="logo"
					className="w-full max-w-[150px] mx-auto"
				/>
				<SidebarToggle
					open={open}
					setOpen={setOpen}
					className="text-white hover:text-blue-400"
				/>
			</div>

			{/* Navigation links */}
			<nav className="flex flex-col gap-4 w-full px-4 md:px-10 py-5 border-b border-[#363030] flex-grow overflow-y-auto">
				<NavLink
					to="/dashboard"
					open={open}
					setOpen={setOpen}
					icon={<LayoutDashboard />}
					label="Dashboard"
					isActive={
						window.location.pathname ===
							"/dashboard" ||
						window.location.pathname === "/"
					}
				/>
				<NavLink
					to="/accounts"
					open={open}
					setOpen={setOpen}
					icon={<User />}
					label="Accounts"
					isActive={
						window.location.pathname ===
						"/accounts"
					}
				/>
				<NavLink
					to="/product"
					open={open}
					setOpen={setOpen}
					icon={<Shirt />}
					label="Product"
					isActive={
						window.location.pathname ===
						"/product"
					}
				/>
				<NavLink
					to="/category"
					open={open}
					setOpen={setOpen}
					icon={<ListTree />}
					label="Category"
					isActive={
						window.location.pathname ===
						"/category"
					}
				/>
				<NavLink
					to="/tables"
					open={open}
					setOpen={setOpen}
					icon={<Table2 />}
					label="Size Tables"
					isActive={
						window.location.pathname === "/tables"
					}
				/>
				<NavLink
					to="/order"
					open={open}
					setOpen={setOpen}
					icon={<Package />}
					label="Order"
					isActive={
						window.location.pathname === "/order"
					}
				/>
				<NavLink
					to="/advertisements"
					open={open}
					setOpen={setOpen}
					icon={<Megaphone />}
					label="Advertising"
					isActive={
						window.location.pathname ===
						"/advertisements"
					}
				/>
			</nav>
		</div>
	);
}

// NavLink component for sidebar links
function NavLink({
	to,
	icon,
	label,
	isActive,
	setOpen,
}) {
	return (
		<Link
			to={to}
			onClick={() => setOpen(false)}
			className={`Sidebar-Button flex items-center gap-4 cursor-pointer px-3 py-2 rounded
        ${
					isActive
						? "bg-[#363030]"
						: "hover:bg-[#2a2a2a]"
				}`}
			aria-current={isActive ? "page" : undefined}
		>
			<span className="text-white">{icon}</span>
			<span className="text-white font-medium">
				{label}
			</span>
		</Link>
	);
}
