import { Layout } from "@/shared/components/Layout";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { AboutPage } from "@/shared/pages/AboutPage";
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { HomePage } from "@/shared/pages/HomePage";
import { LoginPage } from "@/features/auth/LoginPage";
import { ProfilePage } from "@/features/dashboard/pages/ProfilePage";
import { SettingsPage } from "@/features/dashboard/pages/SettingsPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/login" element={<LoginPage />} />

				<Route element={<ProtectedRoute />}>
					<Route element={<DashboardLayout />}>
						<Route path="/dashboard" element={<DashboardPage />} />
						<Route path="/dashboard/settings" element={<SettingsPage />} />
						<Route path="/dashboard/profile" element={<ProfilePage />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
