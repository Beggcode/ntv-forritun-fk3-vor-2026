import { useAuth } from "@clerk/react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedRoute() {
	const location = useLocation();
	const { isSignedIn, isLoaded } = useAuth();

	if (!isLoaded) return null;

	if (!isSignedIn) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return <Outlet />;
}
