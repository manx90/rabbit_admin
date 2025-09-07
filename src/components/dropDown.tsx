import { EllipsisIcon } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dropdown({
	option1,
	option2,
	handle1,
	handle2,
	toastProps = true,
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="rounded-full shadow-none"
					aria-label="Open edit menu"
				>
					<EllipsisIcon
						size={16}
						aria-hidden="true"
					/>
				</Button>
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
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
