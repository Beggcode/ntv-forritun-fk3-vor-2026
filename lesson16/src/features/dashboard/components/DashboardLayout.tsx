import { Link, Outlet } from "react-router-dom";
import { useAuth } from "@clerk/react";

export type DashboardContext = { isLoggedIn: boolean };

export default function DashboardLayout() {
	const { isSignedIn } = useAuth();

	return (
		<div style={{ display: "flex", height: "100vh" }}>
			<aside
				style={{
					width: "200px",
					background: "#eee",
					padding: "1rem",
				}}
			>
				<h3>Menu</h3>
				<nav>
					<ul style={{ listStyle: "none", padding: 0 }}>
						<li>
							<Link to="/dashboard">Dashboard</Link>
						</li>
						<li>
							<Link to="/dashboard/settings">Settings</Link>
						</li>
						<li>
							<Link to="/dashboard/profile">Profile</Link>
						</li>
					</ul>
				</nav>
			</aside>
			<main style={{ flex: 1, padding: "1rem" }}>
				<header>
					<h2>My App</h2>
					<hr />
				</header>
				<Outlet context={{ isLoggedIn: isSignedIn ?? false } satisfies DashboardContext} />
			</main>
		</div>
	);
}
