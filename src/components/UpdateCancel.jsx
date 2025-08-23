import { useProduct } from "../Contexts/Product.Context";
import { useUpdate } from "../Contexts/Update.Context";
import Product from "../pages/Product";

export default function UpdateCancel() {
	const { handleUpdate } = useUpdate();
	const {
		dispatchProductInfo,
		setMessage,
		setIsUpdate,
		ProductInfo,
	} = useProduct();
	return (
		<div className="flex self-end gap-5">
			<button
				className="text-white hover:scale-105 bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 px-5 rounded-lg max-w-[8em] h-full py-3.5 self-end"
				onClick={() => {
					dispatchProductInfo({
						type: "RESET_FORM",
					});
					setMessage({
						type: "success",
						text: "Form reset successfully",
					});
					setIsUpdate(false);
				}}
			>
				Cancel
			</button>
			<button
				className="text-white bg-[#0095FF] dark:bg-blue-600 dark:hover:bg-blue-700 px-5 rounded-lg max-w-[8em] h-full py-3.5 self-end hover:scale-105"
				onClick={handleUpdate}
			>
				Update
			</button>
		</div>
	);
}
