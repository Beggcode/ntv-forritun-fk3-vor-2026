import { isLoggedIn } from "@/features/auth/auth";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
	if (!isLoggedIn()) {
		return <Navigate to="/login" replace />;
	}
	return <Outlet />;
}
