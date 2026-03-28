import { cn } from "@/shared/lib/utils";
import { useAppStore } from "@/shared/store/appStore";
import { Moon, ShoppingBag, ShoppingCart, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

export function NavBar() {
	const { count, increment, decrement, cartCount, theme, setTheme } =
		useAppStore(
			useShallow((state) => ({
				count: state.count,
				increment: state.increment,
				decrement: state.decrement,
				cartCount: state.items.reduce((acc, item) => acc + item.quantity, 0),
				theme: state.theme,
				setTheme: state.setTheme,
			})),
		);

	return (
		<nav className="border-border bg-card sticky top-0 z-10 border-b">
			<div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
				<div className="flex items-center gap-6">
					<NavLink
						to="/"
						end
						className={({ isActive }) =>
							cn(
								"flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
								isActive ? "text-foreground" : "text-muted-foreground",
							)
						}
					>
						<ShoppingBag className="size-4" />
						Products
					</NavLink>

					<NavLink
						to="/cart"
						className={({ isActive }) =>
							cn(
								"flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
								isActive ? "text-foreground" : "text-muted-foreground",
							)
						}
					>
						<ShoppingCart className="size-4" />
						Cart
						{cartCount > 0 && (
							<span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium">
								{cartCount}
							</span>
						)}
					</NavLink>
				</div>

				<div className="ml-auto flex items-center gap-4">
					<button
						onClick={() => setTheme(theme === "light" ? "dark" : "light")}
						className="p-2 hover:bg-accent rounded-md transition-colors"
						title="Toggle Theme"
					>
						{theme === "light" ? (
							<Moon className="size-4" />
						) : (
							<Sun className="size-4" />
						)}
					</button>

					<div className="flex items-center gap-3 text-xs text-muted-foreground border-l pl-4">
						<button
							type="button"
							onClick={decrement}
							className="px-2 py-1 bg-muted rounded hover:bg-accent border"
						>
							-
						</button>

						<span className="font-bold text-foreground whitespace-nowrap">
							Points: {count}
						</span>

						<button
							type="button"
							onClick={increment}
							className="px-2 py-1 bg-muted rounded hover:bg-accent border"
						>
							+
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
