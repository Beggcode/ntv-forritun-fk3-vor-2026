import { login } from "@/features/auth/auth";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
	const navigate = useNavigate();

	function handleLogin() {
		login();
		navigate("/dashboard");
	}

	return (
		<div className="mx-auto max-w-sm space-y-6 text-left">
			<h1 className="text-3xl font-bold tracking-tight">Login</h1>
			<button
				type="button"
				onClick={handleLogin}
				className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium"
			>
				Log in
			</button>
		</div>
	);
}
