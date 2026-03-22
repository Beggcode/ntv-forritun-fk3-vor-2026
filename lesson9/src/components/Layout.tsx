import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
	return (
		<div className="min-h-screen bg-background">
			<header className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-10">
				<nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
					<div className="font-bold text-xl tracking-tight text-indigo-600">
						Title
					</div>

					<div className="flex gap-6">
						<NavLink
							to="/"
							className={({ isActive }) =>
								`text-sm font-medium transition-colors hover:text-indigo-600 ${
									isActive
										? "text-indigo-600 underline underline-offset-4"
										: "text-muted-foreground"
								}`
							}
						>
							Home
						</NavLink>

						<NavLink
							to="/recipes"
							className={({ isActive }) =>
								`text-sm font-medium transition-colors hover:text-indigo-600 ${
									isActive
										? "text-indigo-600 underline underline-offset-4"
										: "text-muted-foreground"
								}`
							}
						>
							Recipes
						</NavLink>
					</div>
				</nav>
			</header>

			<main className="mx-auto w-full max-w-6xl px-4 py-8">
				<Outlet />
			</main>
		</div>
	);
}
