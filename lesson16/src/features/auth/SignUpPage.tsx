import { SignUp } from "@clerk/react";

export function SignUpPage() {
	return (
		<div className="flex justify-center">
			<SignUp forceRedirectUrl="/dashboard" />
		</div>
	);
}
