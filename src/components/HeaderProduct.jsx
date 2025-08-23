export function HeaderProduct({ title, AddNew }) {
	return (
		<div className="flex justify-between items-center mb-6">
			<h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
				{title}
			</h1>
			{AddNew && (
				<button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md dark:shadow-gray-800">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Add New</span>
				</button>
			)}
		</div>
	);
}
