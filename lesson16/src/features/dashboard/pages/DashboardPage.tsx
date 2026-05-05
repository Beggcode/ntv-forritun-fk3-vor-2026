import { logout } from "@/features/auth/auth";
import { Link, useOutletContext } from "react-router-dom";

type DashboardContext = { isLoggedIn: boolean };

export function DashboardPage() {
	const { isLoggedIn } = useOutletContext<DashboardContext>();

	return (
		<div className="mx-auto max-w-2xl space-y-4 text-left">
			<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
			<p className="text-muted-foreground text-sm">
				login status: {isLoggedIn ? "Yes" : "No"}!
			</p>
			<Link
				to="/login"
				onClick={logout}
				className="bg-destructive text-white rounded-md px-4 py-2 text-sm font-medium"
			>
				Log out
			</Link>
		</div>
	);
}
