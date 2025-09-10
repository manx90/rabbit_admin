import {
	ButtonOne,
	Column,
	InputOne,
	Label,
	Row,
} from "../../Category/constant/tw-styled-components";

export default function SizeComponent({
	setFocus,
	field,
	index,
	register,
	watch,
	handleRemoveSize,
	handleAddSize,
}) {
	const quantities =
		watch(`sizes.${index}.quantities`) || [];

	return (
		<Column
			key={field.id}
			className="border-gray-500 border rounded-lg px-4 py-2 bg-white dark:bg-gray-800 shadow-sm"
		>
			<Row className="w-full mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">
				{/* Size Name */}
				<Column className="w-full">
					<Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Size Name
					</Label>
					<InputOne
						type="text"
						placeholder="e.g., Small, Medium, Large"
						className="border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
						{...register(
							`sizes.${index}.sizeName`,
						)}
						defaultValue={field.sizeName}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setFocus(`sizes.${index}.price`);
								e.preventDefault();
							}
						}}
					/>
				</Column>

				{/* Price */}
				<Column className="w-full">
					<Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Price
					</Label>
					<InputOne
						type="number"
						placeholder="Add price ..."
						className="border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
						{...register(`sizes.${index}.price`)}
						defaultValue={field.price}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setFocus(
									`sizes.${index}.quantities.[0].quantity`,
								);
								e.preventDefault();
							}
						}}
					/>
				</Column>

				<ButtonOne
					variant="cancel"
					className="dark:text-red-500 dark:border-red-500"
					onClick={() => handleRemoveSize(index)}
				>
					Remove
				</ButtonOne>
			</Row>
			{quantities.map((color, colorIdx, arr) => (
				<Row
					className="w-full items-end gap-2"
					key={String(colorIdx)}
				>
					<Column className="flex-1">
						<Label className="text-sm text-gray-600 dark:text-gray-400">
							Color
						</Label>
						<InputOne
							type="text"
							{...register(
								`sizes.${index}.quantities.${colorIdx}.colorName`,
							)}
							className="border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
							defaultValue={color.colorName}
							readOnly
						/>
					</Column>

					<Column className="flex-1">
						<Label className="text-sm text-gray-600 dark:text-gray-400">
							Quantity
						</Label>
						<InputOne
							type="number"
							placeholder="0"
							className="border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700"
							{...register(
								`sizes.${index}.quantities.${colorIdx}.quantity`,
							)}
							defaultValue={color.quantity}
							onKeyDown={(e) => {
								if (
									e.key === "Enter" &&
									arr.length - 1 > colorIdx
								) {
									setFocus(
										`sizes.${index}.quantities.${
											colorIdx + 1
										}.quantity`,
									);
									e.preventDefault();
								} else if (
									e.key === "Enter" &&
									arr.length - 1 === colorIdx
								) {
									handleAddSize();
									e.preventDefault();
								}
							}}
						/>
					</Column>
				</Row>
			))}
		</Column>
	);
}
