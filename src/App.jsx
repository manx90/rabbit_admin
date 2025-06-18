import "./index.css";
import {
	BrowserRouter,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Order from "./pages/Order";
import SignUp from "./pages/SignUp";
import AccountsManager from "./pages/AccountsManager";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import ProtectedRoute from "./utils/ProtectRoute";
import { ProductProvider } from "./Contexts/Product.Context";
import { AuthProvider } from "./Contexts/Auth.context";
import PublicRoute from "./utils/PublicRoute";
import { UtilesProvider } from "./Contexts/utils.context";
import { CategoryProvider } from "./Contexts/Category.Context";
import { UpdateProvider } from "./Contexts/Update.Context";
import { AccountProvider } from "./Contexts/AccountContext";

export default function App() {
	const [sidebarOpen, setSidebarOpen] =
		useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth < 1024);
		};
		checkIsMobile();
		window.addEventListener(
			"resize",
			checkIsMobile,
		);
		return () =>
			window.removeEventListener(
				"resize",
				checkIsMobile,
			);
	}, []);

	useEffect(() => {
		const handleScroll = (e) => {
			if (
				sidebarOpen &&
				isMobile &&
				!e.target.closest("#sidebar")
			) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		if (sidebarOpen && isMobile) {
			document.body.style.overflow = "hidden";
			window.addEventListener(
				"wheel",
				handleScroll,
				{ passive: false },
			);
			window.addEventListener(
				"touchmove",
				handleScroll,
				{ passive: false },
			);
		} else {
			document.body.style.overflow = "auto";
			window.removeEventListener(
				"wheel",
				handleScroll,
			);
			window.removeEventListener(
				"touchmove",
				handleScroll,
			);
		}
		return () => {
			document.body.style.overflow = "auto";
			window.removeEventListener(
				"wheel",
				handleScroll,
			);
			window.removeEventListener(
				"touchmove",
				handleScroll,
			);
		};
	}, [sidebarOpen, isMobile]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				sidebarOpen &&
				isMobile &&
				!(
					e.target.closest("#sidebar") ||
					e.target.closest(".sidebar-toggle")
				)
			) {
				setSidebarOpen(false);
			}
		};

		document.addEventListener(
			"click",
			handleClickOutside,
		);
		document.addEventListener(
			"touchend",
			handleClickOutside,
		);

		return () => {
			document.removeEventListener(
				"click",
				handleClickOutside,
			);
			document.removeEventListener(
				"touchend",
				handleClickOutside,
			);
		};
	}, [sidebarOpen, isMobile, setSidebarOpen]);

	return (
		<AuthProvider>
			<UtilesProvider>
				<CategoryProvider>
					<ProductProvider>
						<UpdateProvider>
							<AccountProvider>
								<BrowserRouter>
									<div className="flex flex-col relative">
										{sidebarOpen && isMobile && (
											<div
												className="fixed inset-0 bg-black bg-opacity-15 z-[50] transition-opacity duration-500 ease-in-out"
												onClick={() =>
													setSidebarOpen(false)
												}
											/>
										)}
										<ProtectedRoute>
											<Header
												open={sidebarOpen}
												setOpen={setSidebarOpen}
											/>
										</ProtectedRoute>
										<Sidebar
											open={sidebarOpen}
											setOpen={setSidebarOpen}
										/>
										<div className="flex-1">
											<Routes>
												<Route
													path="/login"
													element={
														<PublicRoute>
															<Login />
														</PublicRoute>
													}
												/>
												<Route
													path="/signup"
													element={<SignUp />}
												/>
												<Route
													path="/"
													element={
														<ProtectedRoute>
															<Dashboard />
														</ProtectedRoute>
													}
												/>
												<Route
													path="/accounts"
													element={
														<ProtectedRoute>
															<AccountsManager />
														</ProtectedRoute>
													}
												/>

												<Route
													path="/product"
													element={
														<ProtectedRoute>
															<Product />
														</ProtectedRoute>
													}
												/>
												<Route
													path="/orders"
													element={
														<ProtectedRoute>
															<Order />
														</ProtectedRoute>
													}
												/>
											</Routes>
										</div>
									</div>
								</BrowserRouter>
							</AccountProvider>
						</UpdateProvider>
					</ProductProvider>
				</CategoryProvider>
			</UtilesProvider>
		</AuthProvider>
	);
}
