import React from "react";
import { TableOrderProvider } from "../../Contexts/TableOrder.context";
import TableOrder from "./components/TableOrder";
import { MdDelete } from "react-icons/md";
import {
	ButtonOne,
	Row,
} from "../Category/constant/tw-styled-components";
import { Order as OrderApi } from "../../api/orderApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
export default function Order() {
	const {
		data: orders,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["orders"],
		queryFn: () => OrderApi.getAll(),
	});
	const [open, setOpen] = useState(false);
	const [id, setId] = useState(null);
	const handleDelete = async (id) => {
		await OrderApi.deleteOne(id)
			.then(() => {
				refetch();
				toast.success(
					"Order deleted successfully",
				);
				setOpen(false);
				setId(null);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
	};
	return (
		<div className="ContentPage">
			<TableOrderProvider>
				<TableOrder
					orders={orders}
					isLoading={isLoading}
					error={error}
					refetch={refetch}
					open={open}
					setOpen={setOpen}
					id={id}
					setId={setId}
					handleDelete={handleDelete}
				>
					<ConfirmDelete
						open={open}
						setOpen={setOpen}
						id={id}
						handleDelete={handleDelete}
						setId={setId}
					/>
				</TableOrder>
			</TableOrderProvider>
		</div>
	);
}

const ConfirmDelete = ({
	open,
	setOpen,
	id,
	handleDelete,
}) => {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [open]);
	return (
		<div
			className={`fixed inset-0 bg-black/50 h-screen w-screen flex justify-center items-center transition-all duration-300 ${
				open
					? "opacity-100 z-50 pointer-events-auto"
					: "opacity-0 -z-50 pointer-events-none"
			}`}
			onClick={() => {
				setOpen(false);
			}}
		>
			<div
				className="relative bg-gray-100 w-3/4 lg:w-fit dark:bg-gray-700 lg:max-w-md p-4 rounded-md justify-center flex flex-col gap-4"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<button
					className="absolute cursor-pointer top-2 right-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
					onClick={() => {
						setOpen(false);
					}}
				>
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
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<div className="text-center mb-6">
					<div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
						<MdDelete className="w-6 h-6 text-red-600 dark:text-red-400" />
					</div>
					<h2 className="font-Noto text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
						حذف الطلب
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						هل أنت متأكد من أنك تريد حذف هذا
						الطلب؟ لا يمكن التراجع عن هذا الإجراء.
					</p>
				</div>
				<Row className="justify-center">
					<ButtonOne
						className="bg-red-600 text-lg text-white mx-auto hover:bg-red-700 dark:hover:bg-red-700 dark:text-white"
						onClick={() => {
							handleDelete(id);
						}}
					>
						حذف
					</ButtonOne>
				</Row>
			</div>
		</div>
	);
};
