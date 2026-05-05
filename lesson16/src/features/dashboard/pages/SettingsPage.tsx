import { useOutletContext } from "react-router-dom";

type DashboardContext = { isLoggedIn: boolean };

export function SettingsPage() {
	const { isLoggedIn } = useOutletContext<DashboardContext>();

	return (
		<div>
			<h1>Settings</h1>
			<p>Logged in: {isLoggedIn ? "Yes" : "No"}</p>
		</div>
	);
}
