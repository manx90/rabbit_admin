"use client";
import {
	AlertCircleIcon,
	ImageIcon,
	UploadIcon,
	XIcon,
} from "lucide-react";
import { useProduct } from "../../Contexts/Product.Context";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";

export default function UplaodImages({
	name,
	borderColor,
	multiple,
	type,
	productInfo,
}) {
	// console.log("type", type);
	const maxSizeMB = 5;
	const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
	const maxFiles = 6;
	const { dispatchProductInfo } = useProduct();

	const [
		{ files, isDragging, errors },
		{
			handleDragEnter,
			handleDragLeave,
			handleDragOver,
			handleDrop,
			openFileDialog,
			removeFile,
			getInputProps,
		},
	] = useFileUpload({
		accept:
			"image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
		maxSize,
		multiple: multiple,
		maxFiles,
	});

	return (
		<div className="flex flex-col gap-2">
			<div
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				data-dragging={isDragging || undefined}
				data-files={files.length > 0 || undefined}
				className={`data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border-2 p-4 ${borderColor} transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]`}
			>
				<input
					{...getInputProps()}
					className="sr-only"
					aria-label="Upload image file"
					onChange={(e) => {
						const images = e.target.files;
						console.log(images);
						if (images && images.length > 0) {
							if (type === "SET_IMG_COVER") {
								dispatchProductInfo({
									type: "SET_IMG_COVER",
									payload: images[0],
								});
							} else if (type === "SET_IMGS") {
								dispatchProductInfo({
									type: "SET_IMGS",
									payload: Array.from(images).map(
										(img) => img,
									),
								});
							} else if (
								type === "SET_IMG_MEASUREMENT"
							) {
								dispatchProductInfo({
									type: "SET_IMG_MEASUREMENT",
									payload: images[0],
								});
							} else if (
								type === "SET_IMG_CHART"
							) {
								dispatchProductInfo({
									type: "SET_IMG_CHART",
									payload: images[0],
								});
							} else {
								console.warn(
									"Received unknown type:",
									type,
								);
							}
							// Call the hook's onChange handler after processing
							getInputProps().onChange?.(e);
						}
					}}
				/>
				{files.length > 0 ? (
					<div className="flex w-full flex-col gap-3">
						<div className="flex items-center justify-between gap-2">
							<h3 className="truncate text-sm font-medium">
								{name} ({files.length})
							</h3>
							<Button
								variant="outline"
								size="sm"
								onClick={openFileDialog}
								disabled={
									files.length >= maxFiles
								}
							>
								<UploadIcon
									className="-ms-0.5 size-3.5 opacity-60"
									aria-hidden="true"
								/>
								Add more
							</Button>
						</div>

						<div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3">
							{files.map((file) => (
								<div
									key={file.id}
									className="bg-accent relative aspect-square rounded-md"
								>
									<img
										src={file.preview}
										alt={file.file.name}
										className="rounded-[inherit] object-contain"
									/>
									<Button
										onClick={() =>
											removeFile(file.id)
										}
										size="icon"
										className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
										aria-label="Remove image"
									>
										<XIcon className="size-3.5" />
									</Button>
								</div>
							))}
						</div>
					</div>
				) : (
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
						<p className="text-muted-foreground text-xs">
							SVG, PNG, JPG or GIF (max.{" "}
							{maxSizeMB}MB)
						</p>
						<Button
							variant="outline"
							className="mt-4"
							onClick={openFileDialog}
						>
							<UploadIcon
								className="-ms-1 opacity-60"
								aria-hidden="true"
							/>
							Select images
						</Button>
					</div>
				)}
			</div>

			{errors.length > 0 && (
				<div
					className="text-destructive flex items-center gap-1 text-xs"
					role="alert"
				>
					<AlertCircleIcon className="size-3 shrink-0" />
					<span>{errors[0]}</span>
				</div>
			)}
		</div>
	);
}
