import React from "react";
import Dashboard from "./pages/dashboard";
import Sidebar from "./components/sidebar";
import Product from "./pages/Product";
export default function App() {
	return (
		<div>
			<Sidebar />
			{/* <Dashboard /> */}
			<Product />
		</div>
	);
}
