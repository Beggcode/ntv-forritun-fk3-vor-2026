import { useOutletContext } from "react-router-dom";
import type { DashboardContext } from "@/features/dashboard/components/DashboardLayout";

export function SettingsPage() {
	const { isLoggedIn } = useOutletContext<DashboardContext>();

	return (
		<div>
			<h1>Settings</h1>
			<p>Logged in: {isLoggedIn ? "Yes" : "No"}</p>
		</div>
	);
}
