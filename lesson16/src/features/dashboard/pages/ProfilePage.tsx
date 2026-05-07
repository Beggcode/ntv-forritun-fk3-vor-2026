import { useOutletContext } from "react-router-dom";
import { DashboardContext } from "@/features/dashboard/components/DashboardLayout";

export function ProfilePage() {
	const { isLoggedIn } = useOutletContext<DashboardContext>();

	return (
		<div>
			<h1>Profile</h1>
			<p>Logged in: {isLoggedIn ? "Yes" : "No"}</p>
		</div>
	);
}
