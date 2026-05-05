import { useOutletContext } from "react-router-dom";

type DashboardContext = { isLoggedIn: boolean };

export function ProfilePage() {
	const { isLoggedIn } = useOutletContext<DashboardContext>();

	return (
		<div>
			<h1>Profile</h1>
			<p>Logged in: {isLoggedIn ? "Yes" : "No"}</p>
		</div>
	);
}
