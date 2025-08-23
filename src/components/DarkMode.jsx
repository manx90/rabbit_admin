import { useEffect } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Toggle } from "./ui/toggle";

export default function DarkMode() {
	const toggleTheme = () => {
		document.documentElement.classList.toggle(
			"dark",
		);
	};
	useEffect(() => {
		if (
			document.documentElement.classList.contains(
				"dark",
			)
		) {
			return;
		}
		document.documentElement.classList.add(
			"dark",
		);
	}, []);
	return (
		<div>
			<Toggle
				variant="outline"
				className="group data-[state=on]:hover:bg-muted size-9 data-[state=on]:bg-transparent"
				pressed={document.documentElement.classList.contains(
					"dark",
				)}
				onPressedChange={toggleTheme}
				aria-label={`Switch to ${
					document.documentElement.classList.contains(
						"dark",
					)
						? "light"
						: "dark"
				} mode`}
			>
				{/* Note: After dark mode implementation, rely on dark: prefix rather than group-data-[state=on]: */}
				<MoonIcon
					size={16}
					className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100 dark:scale-100 dark:opacity-100"
					aria-hidden="true"
				/>
				<SunIcon
					size={16}
					className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0 dark:scale-0 dark:opacity-0"
					aria-hidden="true"
				/>
			</Toggle>
		</div>
	);
}
