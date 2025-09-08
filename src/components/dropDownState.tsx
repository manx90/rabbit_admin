import { EllipsisIcon } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropdownState({
	option1,
	option2,
	option3,
	handle1,
	handle2,
	handle3,
	toastProps = true,
	Value,
	className,
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<span
					size="icon"
					variant="ghost"
					className={className}
					aria-label="Open edit menu"
					onClick={(e) => e.stopPropagation()}
				>
					{Value}
				</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={async () => {
						handle1().then(() => {
							if (toastProps)
								toast.success(
									"Operation successful",
								);
						});
					}}
				>
					{option1}
				</DropdownMenuItem>

				{option2 && (
					<DropdownMenuItem
						onClick={() => {
							console.log("hi");
							handle2().then(() => {
								if (toastProps)
									toast.success(
										"Operation successful",
									);
							});
						}}
					>
						{option2}
					</DropdownMenuItem>
				)}
				{option3 && (
					<DropdownMenuItem
						onClick={() => {
							console.log("hi");
							handle3().then(() => {
								if (toastProps)
									toast.success(
										"Operation successful",
									);
							});
						}}
					>
						{option3}
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
