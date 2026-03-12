import { Button } from "@/shared/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import useDebounce from "@/shared/hooks/useDebounce";
import { useRef } from "react";
import { useUserForm } from "../hooks/useUserForm";
import { EmailStartCard } from "../ui/EmailStartCard";
import { UserDetailFields } from "../ui/UserDetailFields";

const initialData = {
	firstName: "",
	lastName: "",
	email: "",
	mobileNumber: "",
	selectedFruit: "",
	radioButton: null,
};

export function UserFormPage() {
	const { values, isStarted, onInputChange, toggleStarted, goBack, setValues } =
		useUserForm(initialData);
	const loadEmailRef = useRef<HTMLInputElement>(null);
	const debouncedSearchTerm = useDebounce(values.firstName, 1000);

	const onLoad = () => {
		if (loadEmailRef.current && loadEmailRef.current.value) {
			const email = loadEmailRef.current.value;
			const localStorageValue = localStorage.getItem(email);

			if (localStorageValue) {
				const parsed = JSON.parse(localStorageValue);
				setValues(parsed);
				window.alert(parsed.firstName);
			} else {
				setValues((prev) => ({ ...prev, email: email }));
			}
			toggleStarted();
		} else {
			window.alert("Please enter an email!");
		}
	};

	const onSubmit = () => {
		localStorage.setItem(values.email, JSON.stringify(values));
		window.alert(`Hello ${values.firstName}; email address ${values.email}`);
	};

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
						<div className="mb-6 text-center text-white">
							{!values.firstName && !values.lastName ? (
								<p className="text-xl font-bold">What is your name?</p>
							) : (
								<p className="text-xl font-bold">
									Your{" "}
									{values.firstName && values.lastName
										? "full name"
										: values.firstName
											? "first name"
											: "last name"}{" "}
									is: {headerValue}
								</p>
							)}
						</div>

						<UserDetailFields
							values={values}
							onInputChange={onInputChange}
							debouncedSearchTerm={debouncedSearchTerm}
						/>

						<div className="flex flex-col py-4 gap-4">
							<Button
								type="submit"
								value="submit"
								className="bg-pink-500 p-4 rounded text-white uppercase"
							/>
							<Button
								type="button"
								onClick={goBack}
								value="Go Back"
								className="bg-black p-4 rounded text-white uppercase border-pink-500 border"
							/>
						</div>
					</form>
				</Card>
			)}
		</div>
	);
}
