import {
	useFieldArray,
	useForm,
} from "react-hook-form";
import { Order as OrderApi } from "@/api/orderApi";
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
		// Transform form data to match API structure
		const transformedData = {
			consignee_name: data.name,
			consignee_phone: data.phone,
			consignee_city: data.city,
			consignee_area: data.area,
			consignee_address: data.address,
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
		} else {
			result = await OrderApi.create(
				transformedData,
			);
		}
		return result;
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
