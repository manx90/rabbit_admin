import React from "react";
// import { Button } from "flowbite-react";
import ComponentChart from "./../components/Charts";
import MostBox from "./../components/MostBox";
// import Sidebar from "../components/sidebar";
export default function Dashboard() {
	return (
		<div className="ContentPage">
			<HeaderDashboard />
			<div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5">
				<ComponentChart
					Title={"Total Orders"}
					Count={"256.582"}
					Percentage={"15%"}
				/>
				<ComponentChart
					Title={"Total Revenue"}
					Count={"256.582"}
					Percentage={"15%"}
					IconPrice={true}
				/>
			</div>
			<div className="flex flex-wrap justify-between gap-2">
				<MostBox
					title={"Most Popular Items"}
					count={"320,000"}
					des={"Higher than last week"}
				/>
				<MostBox
					title={"Most Popular Items"}
					count={"320,000"}
					des={"Higher than last week"}
				/>
				<MostBox
					title={"Most Popular Items"}
					count={"320,000"}
					des={"Higher than last week"}
				/>
				<MostBox
					title={"Most Popular Items"}
					count={"320,000"}
					des={"Higher than last week"}
				/>
			</div>
			<MostFrequent />
		</div>
	);
}

function HeaderDashboard() {
	return (
		<div className="flex justify-between items-center">
			<div className="flex items-center gap-3">
				<span className="text-[32px] text-[#535353] font-medium">
					Statistics
				</span>
			</div>
			<select
				name="peroid"
				id=""
				className="bg-white text-[16px] font-semibold p-[12px] border-gray-300 text-[#0095FF] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option value="day">Last 7 days</option>
				<option value="hour">
					Last 24 hours
				</option>
				<option value="month">
					Last 1 month
				</option>
				<option value="year">Last 1 year</option>
			</select>
		</div>
	);
}

function MostFrequent() {
	return (
		<div className="flex flex-col p-[20px] bg-white border rounded-2xl">
			<div className="flex justify-between">
				<span className="text-black text-2xl font-semibold">
					Most Frequently Ordered Products
				</span>
				<button className="text-[#0095FF] text-lg  font-semibold  focus:outline-none focus:ring-2 focus:rounded-lg focus:ring-offset-2 focus:border-blue-500 dark:focus:border-offset-gray-800 dark:focus:ring-white">
					View all
				</button>
			</div>
			<div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 mt-5">
				<div className="flex flex-row gap-2 bg-[#F5F5F5] p-4 rounded-2xl">
					<img src="1.png" alt="" />
					<div className="flex flex-col flex-1 ">
						<span>Hoodie</span>
						<span>#2134559</span>
					</div>
					<div className="flex flex-col">
						<span>Dark Green</span>
						<span>30 NIS</span>
					</div>
				</div>
				<div className="flex flex-row gap-2 bg-[#F5F5F5] p-4 rounded-2xl">
					<img src="1.png" alt="" />
					<div className="flex flex-col flex-1 text-sm md:text-base lg:text-lg">
						<span>Hoodie</span>
						<span>#2134559</span>
					</div>
					<div className="flex flex-col">
						<span>Dark Green</span>
						<span>30 NIS</span>
					</div>
				</div>
				<div className="flex flex-row gap-2 bg-[#F5F5F5] p-4 rounded-2xl">
					<img src="1.png" alt="" />
					<div className="flex flex-col flex-1 text-sm md:text-base lg:text-lg	">
						<span>Hoodie</span>
						<span>#2134559</span>
					</div>
					<div className="flex flex-col">
						<span>Dark Green</span>
						<span>30 NIS</span>
					</div>
				</div>
				<div className="flex flex-row gap-2 bg-[#F5F5F5] p-4 rounded-2xl">
					<img src="1.png" alt="" />
					<div className="flex flex-col flex-1">
						<span>Hoodie</span>
						<span>#2134559</span>
					</div>
					<div className="flex flex-col">
						<span>Dark Green</span>
						<span>30 NIS</span>
					</div>
				</div>
				<div className="flex flex-row gap-2 bg-[#F5F5F5] p-4 rounded-2xl">
					<img src="1.png" alt="" />
					<div className="flex flex-col flex-1">
						<span>Hoodie</span>
						<span>#2134559</span>
					</div>
					<div className="flex flex-col">
						<span>Dark Green</span>
						<span>30 NIS</span>
					</div>
				</div>
				<div className="flex flex-row gap-2 bg-[#F5F5F5] p-4 rounded-2xl">
					<img src="1.png" alt="" />
					<div className="flex flex-col flex-1">
						<span>Hoodie</span>
						<span>#2134559</span>
					</div>
					<div className="flex flex-col">
						<span>Dark Green</span>
						<span>30 NIS</span>
					</div>
				</div>
				<div className="flex flex-row gap-2 bg-[#F5F5F5] p-4 rounded-2xl">
					<img src="1.png" alt="" />
					<div className="flex flex-col flex-1">
						<span>Hoodie</span>
						<span>#2134559</span>
					</div>
					<div className="flex flex-col">
						<span>Dark Green</span>
						<span>30 NIS</span>
					</div>
				</div>
				<div className="flex flex-row gap-2 bg-[#F5F5F5] p-4 rounded-2xl">
					<img src="1.png" alt="" />
					<div className="flex flex-col flex-1">
						<span>Hoodie</span>
						<span>#2134559</span>
					</div>
					<div className="flex flex-col">
						<span>Dark Green</span>
						<span>30 NIS</span>
					</div>
				</div>
				<div className="flex flex-row gap-2 bg-[#F5F5F5] p-4 rounded-2xl">
					<img src="1.png" alt="" />
					<div className="flex flex-col flex-1">
						<span>Hoodie</span>
						<span>#2134559</span>
					</div>
					<div className="flex flex-col">
						<span>Dark Green</span>
						<span>30 NIS</span>
					</div>
				</div>
				<div className="flex flex-row gap-2 bg-[#F5F5F5] p-4 rounded-2xl">
					<img src="1.png" alt="" />
					<div className="flex flex-col flex-1">
						<span>Hoodie</span>
						<span>#2134559</span>
					</div>
					<div className="flex flex-col">
						<span>Dark Green</span>
						<span>30 NIS</span>
					</div>
				</div>
			</div>
		</div>
	);
}
