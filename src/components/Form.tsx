import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "./ui/field";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export function Form() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [selectedFruit, setSelectedFruit] = useState("");
	const [radioButton, setRadioButton] = useState<string | null>(null);

	return (
		<Card className="w-3/4 max-w-7xl bg-blue-950">
			<CardHeader>
				<div className="flex items-center gap-2">
					<div className="grow border h-0"></div>
					<CardTitle>Example</CardTitle>
					<div className="grow border h-0"></div>
				</div>
			</CardHeader>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					console.log("Submit", {
						firstName,
						lastName,
						email,
						selectedFruit,
						radioButton,
					});
				}}
				className="p-6 border-black border-2 w-full"
			>
				<FieldSet>
					<FieldGroup className="space-y-4">
						<Field>
							<FieldLabel className="text-white" htmlFor="firstName">
								First name
							</FieldLabel>
							<Input
								className="bg-white"
								id="firstName"
								autoComplete="off"
								placeholder="first name"
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</Field>
						<Field>
							<FieldLabel className="text-white" htmlFor="lastName">
								Last name
							</FieldLabel>
							<Input
								className="bg-white"
								id="lastName"
								autoComplete="off"
								placeholder="last name"
								onChange={(e) => setLastName(e.target.value)}
							/>
						</Field>
						<Field>
							<FieldLabel className="text-white" htmlFor="email">
								Email
							</FieldLabel>
							<Input
								className="bg-white"
								id="email"
								autoComplete="off"
								type="email"
								placeholder="example@example.com"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Field>
					</FieldGroup>

					<FieldGroup className="mt-6">
						<Select
							onValueChange={(e) => {
								setSelectedFruit(e);
							}}
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

					<FieldGroup className="mt-6">
						<RadioGroup
							defaultValue="no"
							className="w-fit flex gap-4 items-center"
							onValueChange={(e) => {
								setRadioButton(e);
							}}
						>
							<div className="flex items-center gap-2">
								<RadioGroupItem className="bg-white" value="yes" id="yes" />
								<Label className="text-white cursor-pointer" htmlFor="yes">
									Yes
								</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem className="bg-white" value="no" id="no" />
								<Label className="text-white cursor-pointer" htmlFor="no">
									No
								</Label>
							</div>
						</RadioGroup>
					</FieldGroup>
				</FieldSet>

				<div className="flex flex-col py-6 gap-4">
					<Button
						type="submit"
						className="bg-pink-500 p-4 rounded text-white uppercase font-bold"
					>
						Submit
					</Button>

					<div className="flex items-center gap-2">
						<div className="grow border-t border-white/30 h-0"></div>
						<span className="text-white text-sm uppercase">or</span>
						<div className="grow border-t border-white/30 h-0"></div>
					</div>

					<Button
						type="button"
						className="bg-black p-4 rounded text-white uppercase border-pink-500 border-2 font-bold"
					>
						Edit
					</Button>
				</div>
			</form>
		</Card>
	);
}
