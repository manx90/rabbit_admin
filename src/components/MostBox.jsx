import React from "react";

export default function MostBox({
	title,
	count,
	des,
}) {
	return (
		<div className="flex flex-col p-[24px] max-w-[320px] gap-5 bg-white font-medium rounded-2xl border">
			<span className=" text-[20px] text-black">
				{title}
			</span>

			<p className="flex justify-between gap-3">
				<span className="text-[#0095FF] font-semibold text-[32px]">
					{count}
				</span>{" "}
				<span className="my-auto text-[#535353] text-[14px]">
					{des}
				</span>
			</p>
		</div>
	);
}
