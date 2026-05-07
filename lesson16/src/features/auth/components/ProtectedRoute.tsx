import { isLoggedIn } from "@/features/auth/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedRoute() {
	const location = useLocation();

	if (!isLoggedIn()) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return <Outlet />;
}
