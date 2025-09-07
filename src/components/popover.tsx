import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Button,
} from "@heroui/react";
import React from "react";
import { IoLogoWhatsapp } from "@react-icons/all-files/io5/IoLogoWhatsapp";
export default function PopOver({
	phone = "924943733",
}) {
	const backdrops = ["blur"];

	const content = (
		<PopoverContent className="w-[240px]">
			{(titleProps) => (
				<div className="px-1 py-2 w-full bg-slate-800 rounded-sm">
					<p
						className="text-small font-bold text-foreground"
						{...titleProps}
					>
						Choose the code number
					</p>
					<div className="mt-2 flex flex-col gap-2 w-full">
						<a
							href={`https://wa.me/+972${phone}`}
						>
							<Button
								defaultValue="100%"
								variant="bordered"
							>
								+972
							</Button>
						</a>
						<a
							href={`https://wa.me/+970${phone}`}
						>
							<Button
								defaultValue="100%"
								variant="bordered"
							>
								+970
							</Button>
						</a>
					</div>
				</div>
			)}
		</PopoverContent>
	);

	return (
		<div className="flex flex-wrap gap-4">
			{backdrops.map((backdrop) => (
				<Popover
					key={backdrop}
					showArrow
					backdrop={backdrop}
					offset={10}
					placement="bottom"
				>
					<PopoverTrigger>
						<Button
							className="capitalize"
							color="warning"
							variant="flat"
						>
							<IoLogoWhatsapp className="text-green-500 w-5 h-5" />
							0{phone}
						</Button>
					</PopoverTrigger>
					{content}
				</Popover>
			))}
		</div>
	);
}
