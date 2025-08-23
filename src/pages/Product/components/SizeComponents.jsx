import {
	Column,
	Row,
} from "../../Category/constant/tw-styled-components";
import { InputOne } from "../../Category/constant/tw-styled-components";
import { ButtonOne } from "../../Category/constant/tw-styled-components";
import { Label } from "../../Category/constant/tw-styled-components";

export default function SizeComponent({
	field,
	index,
	register,
	watch,
	handleRemoveSize,
}) {
	const quantities =
		watch(`sizes.${index}.quantities`) || [];

	return (
		<Column
			key={field.id}
			className="border-gray-500 border rounded-lg px-4 py-2 bg-white dark:bg-gray-800 shadow-sm"
		>
			<Row className="w-full mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">
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
					/>
				</Column>
				<Column className="w-full">
					<Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Price
					</Label>
					<InputOne
						type="number"
						placeholder="Add price ..."
						className="border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
						{...register(`sizes.${index}.price`)}
					/>
				</Column>
				<ButtonOne
					variant="outline"
					className="dark:text-red-500 dark:border-red-500  hover:dark:bg-gray-600 hover:dark:text-white"
					onClick={() => handleRemoveSize(index)}
				>
					Remove
				</ButtonOne>
			</Row>

			{quantities.map((color, colorIdx) => (
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
							placeholder="Color name"
							className="border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
							onChange={(e) => {
								setValue(
									`sizes.${index}.quantities.${colorIdx}.colorName`,
									e.target.value,
								);
							}}
							value={color.colorName}
							disabled
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
						/>
					</Column>
				</Row>
			))}
		</Column>
	);
}
