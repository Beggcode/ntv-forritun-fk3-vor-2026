import { SignIn } from "@clerk/react";

export function LoginPage() {
	return (
		<div className="flex justify-center">
			<SignIn forceRedirectUrl="/dashboard" />
		</div>
	);
}
