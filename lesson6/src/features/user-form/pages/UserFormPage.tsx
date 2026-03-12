import { Button } from "@/shared/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import useDebounce from "@/shared/hooks/useDebounce";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormValuesType } from "../types";
import { EmailStartCard } from "../ui/EmailStartCard.tsx";
import { UserDetailFields } from "../ui/UserDetailFields.tsx";

export function UserFormPage() {
	const [values, setValues] = useState<FormValuesType>({
		firstName: "",
		lastName: "",
		email: "",
		mobileNumber: "",
		selectedFruit: "",
		radioButton: null,
	});

	const [isStarted, setIsStarted] = useState(false);
	const loadEmailRef = useRef<HTMLInputElement>(null);

	const onInputChange = useCallback(
		(key: keyof FormValuesType, value: string) => {
			setValues((prev) => ({ ...prev, [key]: value }));
		},
		[],
	);

	const onSubmit = () => {
		const { firstName, email } = values;
		localStorage.setItem(email, JSON.stringify(values));
		window.alert(`Hello ${firstName}; email address ${email}`);
	};

	const onLoad = useCallback(() => {
		if (loadEmailRef.current && loadEmailRef.current.value) {
			const email = loadEmailRef.current.value;
			const localStorageValue = localStorage.getItem(email);

			if (localStorageValue) {
				const parsed: FormValuesType = JSON.parse(localStorageValue);
				setValues(parsed);
				window.alert(parsed.firstName);
			} else {
				setValues((prev) => ({ ...prev, email: email }));
			}
			setIsStarted(true);
		} else {
			window.alert("Please enter an email!");
		}
	}, []);

	const debouncedSearchTerm = useDebounce(values.firstName, 1000);

	useEffect(() => {
		if (isStarted && values.email) {
			const handler = setTimeout(() => {
				localStorage.setItem(values.email, JSON.stringify(values));
			}, 1000);
			return () => clearTimeout(handler);
		}
	}, [values, isStarted]);

	const headerValue = `${values.firstName} ${values.lastName}`.trim();

	return (
		<div className="flex flex-col items-center py-10">
			{!isStarted ? (
				<EmailStartCard loadEmailRef={loadEmailRef} onLoad={onLoad} />
			) : (
				<Card className="w-3/4 max-w-7xl bg-blue-950 p-6">
					<CardHeader>
						<div className="flex items-center gap-2">
							<div className="grow border h-0"></div>
							<CardTitle className="text-white">User Details</CardTitle>
							<div className="grow border h-0"></div>
						</div>
					</CardHeader>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							onSubmit();
						}}
						className="w-full space-y-6"
					>
						<div className="mb-6 text-center text-white text-xl font-bold">
							{!values.firstName && !values.lastName && "What is your name?"}
							{values.firstName || values.lastName
								? `Your name is: ${headerValue}`
								: ""}
						</div>

						<UserDetailFields
							values={values}
							onInputChange={onInputChange}
							debouncedSearchTerm={debouncedSearchTerm}
						/>

						<div className="flex flex-col py-4 gap-4">
							<Button
								type="submit"
								className="bg-pink-500 p-4 rounded text-white uppercase"
							>
								Submit
							</Button>
							<Button
								type="button"
								onClick={() => setIsStarted(false)}
								className="bg-black p-4 rounded text-white uppercase border-pink-500 border"
							>
								Go Back
							</Button>
						</div>
					</form>
				</Card>
			)}
		</div>
	);
}
