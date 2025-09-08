"use client";

import { Button } from "@/components/ui/button";
import {
	formatBytes,
	useFileUpload,
} from "@/hooks/use-file-upload";
import {
	AlertCircleIcon,
	ImageIcon,
	UploadIcon,
	XIcon,
} from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
// Create some dummy initial files

export default function FileUpload({
	resetKey,
	name,
	registerName,
	maxFiles,
}) {
	const maxSizeMB = 5;
	const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
	const { setValue } = useFormContext();

	const [
		{ files, isDragging, errors },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			clearFiles,
			getInputProps,
		},
	] = useFileUpload({
		accept: "image/*",
		maxSize,
		multiple: true,
		maxFiles,
	});
	useEffect(() => {
		clearFiles();
	}, [clearFiles, resetKey]);
	useEffect(() => {
		const fileList = new DataTransfer();
		files.forEach((file) => {
			if (file.file instanceof File) {
				fileList.items.add(file.file);
			}
		});
		setValue(registerName, fileList.files);
	}, [files, setValue, registerName, maxFiles]);

	return (
		<div className="flex flex-col gap-2 border-2 border-gray-500 rounded-lg p-2">
			<p className="dark:text-gray-300  text-sm font-semibold">
				{name}
			</p>
			{/* Drop area */}
			{files.length === 0 && (
				<div
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					data-dragging={isDragging || undefined}
					data-files={
						files.length > 0 || undefined
					}
					className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex flex-col overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px] w-full h-42 items-center justify-center"
				>
					<input
						{...getInputProps()}
						className="sr-only"
						aria-label="Upload image file"
					/>
					<div className="flex flex-col items-center justify-center px-4 py-3 text-center">
						<div
							className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
							aria-hidden="true"
						>
							<ImageIcon className="size-4 opacity-60" />
						</div>
						<p className="mb-1.5 text-sm font-medium">
							Drop your {name} here
						</p>
						{/* <p className="text-muted-foreground text-xs">
						SVG, PNG, JPG or GIF (max. {maxSizeMB}
						MB)
					</p> */}
						<Button
							variant="outline"
							className="mt-4 "
							type="button"
							onClick={openFileDialog}
						>
							<UploadIcon
								className="-ms-1 opacity-60"
								aria-hidden="true"
							/>
							Select {name}
						</Button>
					</div>
				</div>
			)}

			{errors.length > 0 && (
				<div
					className="text-destructive flex items-center gap-1 text-xs"
					role="alert"
				>
					<AlertCircleIcon className="size-3 shrink-0" />
					<span>{errors[0]}</span>
				</div>
			)}

			{/* File list */}
			{files.length > 0 && (
				<div className="grid grid-cols-1">
					<div
						className={`grid ${
							maxFiles === 1
								? "grid-cols-1"
								: "grid-cols-2"
						} gap-2`}
					>
						{files.map((file) => (
							<div
								key={file.id}
								className="flex bg-white dark:bg-gray-800 items-center justify-between gap-2 rounded-lg border-1 border-gray-500 p-2 pe-3"
							>
								<div className="flex items-center gap-3 overflow-hidden">
									<div className="bg-accent aspect-square shrink-0 rounded">
										<img
											src={file.preview}
											alt={file.file.name}
											className="size-10 rounded-[inherit] object-cover"
										/>
									</div>
									<div className="flex min-w-0 flex-col gap-0.5">
										<p className="truncate text-[13px] font-medium">
											{file.file.name}
										</p>
										<p className="text-muted-foreground text-xs">
											{formatBytes(
												file.file.size,
											)}
										</p>
									</div>
								</div>

								<Button
									size="icon"
									variant="ghost"
									className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
									onClick={() =>
										removeFile(file.id)
									}
									aria-label="Remove file"
								>
									<XIcon aria-hidden="true" />
								</Button>
							</div>
						))}
					</div>
					{/* Remove all files button */}
					{files.length > 0 && (
						<div className="flex items-center justify-between gap-2 mt-2">
							<Button
								size="sm"
								variant="outline"
								type="button"
								onClick={clearFiles}
								className="dark:bg-red-500 dark:text-white cursor-pointer hover:dark:bg-red-700 hover:dark:text-white"
							>
								{maxFiles > 1
									? "Remove all files"
									: "Remove file"}
							</Button>
							{files.length < maxFiles && (
								<div className="flex items-center gap-2">
									<input
										{...getInputProps()}
										className="sr-only"
										aria-label="Upload image file"
									/>
									<Button
										size="sm"
										variant="outline"
										type="button"
										onClick={openFileDialog}
										className="dark:bg-blue-500 dark:text-white cursor-pointer hover:dark:bg-blue-700 hover:dark:text-white"
									>
										Add more {name}
									</Button>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
