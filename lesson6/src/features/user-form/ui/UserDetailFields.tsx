import { Input } from "@/shared/components/ui/Input";
import { Field, FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import type { FormValuesType } from "../types";

interface Props {
	values: FormValuesType;
	onInputChange: (key: keyof FormValuesType, value: string) => void;
	debouncedSearchTerm: string;
}

export const UserDetailFields = ({
	values,
	onInputChange,
	debouncedSearchTerm,
}: Props) => (
	<FieldSet>
		<FieldGroup>
			<Field>
				<p className="text-white">Search term: {debouncedSearchTerm}</p>
				<Input
					className="bg-white"
					value={values.firstName}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						onInputChange("firstName", e.target.value)
					}
					placeholder="First Name"
				/>
			</Field>
			<Field>
				<Input
					className="bg-white"
					value={values.lastName}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						onInputChange("lastName", e.target.value)
					}
					placeholder="Last Name"
				/>
			</Field>
			<Field>
				<Input
					className="bg-white"
					value={values.email}
					disabled
					placeholder="Email"
				/>
			</Field>
			<Field>
				<Input
					className="bg-white"
					value={values.mobileNumber}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						onInputChange("mobileNumber", e.target.value)
					}
					placeholder="Mobile Number"
				/>
			</Field>
		</FieldGroup>

		<FieldGroup>
			<Select
				value={values.selectedFruit}
				onValueChange={(v: string) => onInputChange("selectedFruit", v)}
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
				onValueChange={(v: string) => onInputChange("radioButton", v)}
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
);
