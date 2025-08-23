"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function DateCalender({ setValue }) {
	const [open, setOpen] = React.useState(false);
	const [date, setDate] =
		React.useState<Date | undefined>(undefined);

	return (
		<div className="flex flex-col gap-3">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-full justify-between font-normal"
					>
						{date
							? date.toLocaleDateString()
							: "Select date"}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto overflow-hidden p-0"
					align="start"
				>
					<Calendar
						mode="single"
						selected={date}
						captionLayout="dropdown"
						// Disable all dates before today
						disabled={(date) =>
							date <
							new Date(
								new Date().setHours(0, 0, 0, 0),
							)
						}
						onSelect={(date) => {
							setValue("date", date);
							setDate(date);
							setOpen(false);
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
