import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/shared/components/Layout";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { HomePage } from "@/shared/pages/HomePage";
import { AboutPage } from "@/shared/pages/AboutPage";
import { LoginPage } from "@/features/auth/LoginPage";
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { SettingsPage } from "@/features/dashboard/pages/SettingsPage";
import { ProfilePage } from "@/features/dashboard/pages/ProfilePage";

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "/about", element: <AboutPage /> },
			{ path: "/login", element: <LoginPage /> },
			{
				path: "/dashboard",
				element: <ProtectedRoute />,
				children: [
					{
						element: <DashboardLayout />,
						children: [
							{ index: true, element: <DashboardPage /> },
							{ path: "settings", element: <SettingsPage /> },
							{ path: "profile", element: <ProfilePage /> },
						],
					},
				],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
