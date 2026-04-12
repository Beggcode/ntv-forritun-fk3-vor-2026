import { useState } from "react";
import {
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FormContainer, FormRow, SubmitButton } from "../styles";
import type { Task } from "../../../shared/types";

type TaskPriority = "low" | "medium" | "high";
type TaskFormData = Omit<Task, "id" | "createdAt">;

interface TaskFormProps {
	projectId: string;
	onSubmit: (task: TaskFormData) => void;
}

export const TaskForm = ({ projectId, onSubmit }: TaskFormProps) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState<TaskPriority>("medium");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		onSubmit({
			projectId,
			title,
			description,
			priority,
			status: "todo",
		});

		setTitle("");
		setDescription("");
		setPriority("medium");
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormContainer>
				<TextField
					label="Task title..."
					variant="outlined"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					fullWidth
				/>

				<TextField
					label="Description (optional)..."
					variant="outlined"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					multiline
					rows={3}
					fullWidth
				/>

				<FormRow>
					<FormControl fullWidth>
						<InputLabel>Priority</InputLabel>
						<Select
							value={priority}
							onChange={(e) => setPriority(e.target.value as TaskPriority)}
							label="Priority"
						>
							<MenuItem value="low">Low</MenuItem>
							<MenuItem value="medium">Medium</MenuItem>
							<MenuItem value="high">High</MenuItem>
						</Select>
					</FormControl>

					<SubmitButton
						type="submit"
						variant="contained"
						startIcon={<AddIcon />}
					>
						Add Task
					</SubmitButton>
				</FormRow>
			</FormContainer>
		</form>
	);
};
