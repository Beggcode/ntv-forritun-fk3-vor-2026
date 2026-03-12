import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { RefObject } from "react";

interface Props {
	loadEmailRef: RefObject<HTMLInputElement | null>;
	onLoad: () => void;
}

export const EmailStartCard = ({ loadEmailRef, onLoad }: Props) => (
	<Card className="w-3/4 max-w-7xl bg-blue-950 p-10">
		<CardHeader>
			<CardTitle className="text-white text-center">
				Enter your email to start
			</CardTitle>
		</CardHeader>
		<div className="flex flex-col gap-4 items-center mt-6">
			<Input
				className="bg-white max-w-md text-black"
				ref={loadEmailRef}
				type="email"
				placeholder="asdf@ntv.is"
			/>
			<div className="flex gap-4 w-full max-w-md">
				<Button
					onClick={onLoad}
					className="bg-green-500 flex-1 p-4 rounded text-white font-bold uppercase"
				>
					Load
				</Button>
				<Button
					onClick={onLoad}
					className="bg-green-500 flex-1 p-4 rounded text-white font-bold uppercase"
				>
					Create New
				</Button>
			</div>
		</div>
	</Card>
);
