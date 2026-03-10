import useDebounce from "@/hooks/useDebounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import { Field, FieldGroup, FieldSet } from "../../components/ui/field";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { Button } from "./components/Button";
import { Input } from "./components/Input";

type FormValuesType = {
	firstName: string;
	lastName: string;
	email: string;
	mobileNumber: string;
	selectedFruit: string;
	radioButton: string | null;
};

export function Form() {
	// TODO: Remove ref data set, and only use state to keep track of realtime local data (written in input)
	// NOTE: You might want to detach the email from the data set (since it's used to index the localstorage)
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

	// TODO: Use the correct state to connect to debounce state

	// Set delay time according to your needs
	const debouncedSearchTerm = useDebounce(values.firstName, 1000);
	// TODO: Write useEffect to repopulate the localstorage after debounce
	useEffect(() => {
		if (isStarted && values.email) {
			const handler = setTimeout(() => {
				localStorage.setItem(values.email, JSON.stringify(values));
				console.log("Autosaved to localStorage");
			}, 1000);
			return () => clearTimeout(handler);
		}
	}, [values, isStarted]);
	// NOTE: The email has to be present for this to work

	// TODO: If no email is provided, display only the email input, or some other alternative UX

	const headerValue = `${values.firstName} ${values.lastName}`.trim();

	return (
		<div className="flex flex-col items-center py-10">
			{!isStarted ? (
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
								value="Load"
								className="bg-green-500 flex-1 p-4 rounded text-white font-bold uppercase"
							/>
							<Button
								onClick={onLoad}
								value="Create New"
								className="bg-green-500 flex-1 p-4 rounded text-white font-bold uppercase"
							/>
						</div>
					</div>
				</Card>
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
							{(() => {
								if (values.firstName && values.lastName) {
									return (
										<p className="text-xl font-bold">
											Your full name is: {headerValue}
										</p>
									);
								} else if (values.firstName) {
									return (
										<p className="text-xl font-bold">
											Your first name is: {values.firstName}
										</p>
									);
								} else if (values.lastName) {
									return (
										<p className="text-xl font-bold">
											Your last name is: {values.lastName}
										</p>
									);
								} else {
									return (
										<p className="text-xl font-bold">What is your name?</p>
									);
								}
							})()}
						</div>
						<FieldSet>
							<FieldGroup>
								<Field>
									<p className="text-white">
										Search term: {debouncedSearchTerm}
									</p>
									<Input
										className="bg-white"
										id="firstName"
										autoComplete="off"
										placeholder="Gunnsteinn"
										// TODO: Set values to all input fields in the form
										value={values.firstName}
										onChange={(e) => {
											onInputChange("firstName", e.target.value);
										}}
									/>
								</Field>
								<Field>
									<Input
										className="bg-white"
										id="lastName"
										autoComplete="off"
										placeholder="Skulason"
										value={values.lastName}
										onChange={(e) => {
											onInputChange("lastName", e.target.value);
										}}
									/>
								</Field>
								<Field>
									<Input
										className="bg-white"
										id="email"
										disabled
										autoComplete="off"
										type="email"
										placeholder="asdf@ntv.is"
										value={values.email}
									/>
								</Field>
								<Field>
									<Input
										className="bg-white"
										id="mobileNumber"
										autoComplete="off"
										type="number"
										placeholder="Mobile number"
										value={values.mobileNumber}
										onChange={(e) => {
											onInputChange("mobileNumber", e.target.value);
										}}
									/>
								</Field>
							</FieldGroup>
							<FieldGroup>
								<Select
									value={values.selectedFruit}
									onValueChange={(v) => onInputChange("selectedFruit", v)}
								>
									<SelectTrigger className="w-full bg-white">
										<SelectValue placeholder="Select a fruit" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Fruits</SelectLabel>
											<SelectItem value="apple">Apple</SelectItem>
											<SelectItem value="banana">Banana</SelectItem>
											<SelectItem value="blueberry">Blueberry</SelectItem>
											<SelectItem value="grapes">Grapes</SelectItem>
											<SelectItem value="pineapple">Pineapple</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</FieldGroup>
							<FieldGroup>
								<RadioGroup
									className="w-fit flex"
									value={values.radioButton || ""}
									onValueChange={(v) => {
										onInputChange("radioButton", v);
									}}
								>
									<RadioGroupItem className="bg-white" value="yes" id="yes" />
									<Label className="text-white" htmlFor="yes">
										Yes
									</Label>
									<RadioGroupItem className="bg-white" value="no" id="no" />
									<Label className="text-white" htmlFor="no">
										No
									</Label>
								</RadioGroup>
							</FieldGroup>
						</FieldSet>

						<div className="flex flex-col py-4 gap-4">
							<Button
								type="submit"
								value="submit"
								className="bg-pink-500 p-4 rounded text-white uppercase"
							></Button>
							<Button
								type="button"
								onClick={() => setIsStarted(false)}
								value="Go Back"
								className="bg-black p-4 rounded text-white uppercase border-pink-500 border"
							></Button>
						</div>
					</form>
				</Card>
			)}
		</div>
	);
}
