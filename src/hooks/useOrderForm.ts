import {
	useFieldArray,
	useForm,
} from "react-hook-form";
import { Order as OrderApi } from "@/api/orderApi";
import { toast } from "react-toastify";
export function useOrderForm() {
	const methods = useForm({
		defaultValues: {
			name: "",
			phone: "",
			address: "",
			note: "",
			city: "",
			area: "",
			items: [
				{
					productId: "",
					sizeName: "",
					colorName: "",
					quantity: "",
				},
			],
		},
	});

	const {
		fields: itemsFields,
		append: itemsAppend,
		remove: itemsRemove,
		update: itemsUpdate,
	} = useFieldArray({
		control: methods.control,
		name: "items",
	});

	const onSubmit = async (
		data: any,
		isUpdate: boolean,
		updateData?: any,
	) => {
		try {
			// Validate required fields
			if (
				!data.name ||
				!data.phone ||
				!data.city ||
				!data.area ||
				!data.address
			) {
				toast.error(
					"Please fill in all required fields",
				);
				return;
			}

			// Validate items
			if (
				!data.items ||
				data.items.length === 0
			) {
				toast.error(
					"Please add at least one item",
				);
				return;
			}

			// Validate each item
			for (const item of data.items) {
				if (
					!item.productId ||
					!item.sizeName ||
					!item.colorName ||
					!item.quantity
				) {
					toast.error(
						"Please fill in all item details",
					);
					return;
				}
			}

			// Transform form data to match API structure
			const transformedData = {
				consignee_name: data.name,
				consignee_phone: data.phone,
				consignee_city: data.city,
				consignee_area: data.area,
				consignee_address: data.address,
				// Only include note for create operations, not for updates
				...(isUpdate
					? {}
					: { note: data.note || "" }),
				items: data.items.map((item: any) => ({
					productId: Number(item.productId),
					sizeName: item.sizeName,
					colorName: item.colorName,
					quantity: Number(item.quantity),
				})),
			};

			let result;
			if (isUpdate && updateData) {
				result = await OrderApi.update(
					updateData.id,
					transformedData,
				);
				toast.success(
					"Order updated successfully!",
				);
			} else {
				result = await OrderApi.create(
					transformedData,
				);
				toast.success(
					"Order created successfully!",
				);
			}

			// Reset form after successful submission
			methods.reset();
			return result;
		} catch (error) {
			console.error(
				"Order submission error:",
				error,
			);

			// Extract error message from different possible error structures
			let errorMessage = isUpdate
				? "Failed to update order"
				: "Failed to create order";

			if (error?.response?.data?.message) {
				errorMessage =
					error.response.data.message;
			} else if (error?.response?.data?.error) {
				errorMessage = error.response.data.error;
			} else if (error?.message) {
				errorMessage = error.message;
			} else if (error?.response?.statusText) {
				errorMessage = `Error ${error.response.status}: ${error.response.statusText}`;
			}

			toast.error(errorMessage);
			throw error;
		}
	};

	return {
		...methods,
		itemsFields,
		itemsAppend,
		itemsRemove,
		itemsUpdate,
		onSubmit,
	};
}
