// components/SelectSearch.tsx
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	CheckIcon,
	ChevronDownIcon,
} from "lucide-react";
import React, { useState } from "react";
import {
	Controller,
	useFormContext,
} from "react-hook-form";

export default function SelectSearch({
	disable = false,
	name,
	label,
	data = [],
	KeyName,
	KeyValue,
	KeyID,
	setSearchProd = null,
	isLoading = true,
	isFetching,
}) {
	const [open, setOpen] = useState(false);
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				const selected = data.find(
					(item) =>
						item[KeyValue] === field.value,
				);
				return (
					<div className="*:not-first:mt-1 w-full">
						<Label>{label}</Label>
						<Popover
							open={open}
							onOpenChange={setOpen}
						>
							<PopoverTrigger
								disabled={disable}
								asChild
							>
								<Button
									variant="outline"
									role="combobox"
									className="w-full justify-between"
								>
									<span className="truncate">
										{selected?.[KeyName] ||
											"Select item"}
									</span>
									<ChevronDownIcon size={16} />
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-full p-0"
								align="start"
							>
								<Command>
									<CommandInput
										onValueChange={(
											value: string,
										) => {
											if (setSearchProd) {
												setSearchProd(value);
											}
										}}
										placeholder="Search..."
									/>
									<CommandList>
										{isFetching && (
											<div className="p-2 text-sm text-gray-500">
												Loading...
											</div>
										)}
										<CommandEmpty>
											No results found.
										</CommandEmpty>
										<CommandGroup>
											{data?.map((item) => (
												<CommandItem
													key={item[KeyID]}
													value={item[KeyValue]}
													onSelect={() => {
														field.onChange(
															item[KeyValue],
														);
														setOpen(false);
													}}
												>
													{item[KeyName]}
													{field.value ===
														item[KeyValue] && (
														<CheckIcon
															size={16}
															className="ml-auto"
														/>
													)}
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</div>
				);
			}}
		/>
	);
}
