import { useOutletContext } from "react-router-dom";
import { DashboardContext } from "@/features/dashboard/components/DashboardLayout";

export function DashboardPage() {
	const { isLoggedIn } = useOutletContext<DashboardContext>();

	return (
		<div className="mx-auto max-w-2xl space-y-4 text-left">
			<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
			<p className="text-muted-foreground text-sm">
				login status: {isLoggedIn ? "logged in" : "out"}
			</p>
		</div>
	);
}
