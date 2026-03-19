import { NavBar } from "@/features/navigation";
import { useAppStore } from "@/shared/store/appStore";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
	const theme = useAppStore((state) => state.theme);
	const notification = useAppStore((state) => state.notification);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(theme);
		root.style.colorScheme = theme;
	}, [theme]);

	return (
		<div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">
			<NavBar />

			{notification && (
				<div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
					<div className="bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-2xl font-medium border border-primary-foreground/10">
						{notification}
					</div>
				</div>
			)}

			<main className="mx-auto w-full max-w-6xl px-4 py-8">
				<Outlet />
			</main>
		</div>
	);
}
