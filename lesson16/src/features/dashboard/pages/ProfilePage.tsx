import { useEffect, useState } from "react";
import { useAuth, useSession } from "@clerk/react";

export function ProfilePage() {
	const { getToken } = useAuth();
	const { session } = useSession();
	const [jwt, setJwt] = useState<string | null>(null);

	useEffect(() => {
		getToken().then(setJwt);
	}, [getToken]);

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold tracking-tight">Profile</h1>

			<div className="space-y-2">
				<h2 className="text-lg font-semibold">Session</h2>
				<pre className="bg-muted rounded-md p-4 text-xs overflow-auto">
					{JSON.stringify(session, null, 2)}
				</pre>
			</div>

			<div className="space-y-2">
				<h2 className="text-lg font-semibold">JWT</h2>
				<pre className="bg-muted rounded-md p-4 text-xs break-all whitespace-pre-wrap">
					{jwt}
				</pre>
			</div>
		</div>
	);
}
