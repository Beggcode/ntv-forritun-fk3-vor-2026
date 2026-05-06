import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Button,
	Stack,
	FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useStore } from "../../../shared/store/useStore";

const taskFormSchema = z.object({
	projectId: z.string().min(1, "Project is required"),
	title: z.string().min(3, "Title must be at least 3 characters"),
	description: z.string().optional(),
	status: z.enum(["todo", "in-progress", "done"]),
	priority: z.enum(["low", "medium", "high"]),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
	defaultProjectId?: string;
	onSubmit: (data: TaskFormData) => void;
	onCancel: () => void;
}

export const TaskForm = ({
	defaultProjectId,
	onSubmit,
	onCancel,
}: TaskFormProps) => {
	const { projects } = useStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskFormData>({
		resolver: zodResolver(taskFormSchema),
		defaultValues: {
			projectId: defaultProjectId ?? "",
			status: "todo",
			priority: "medium",
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={3} sx={{ mt: 1 }}>
				<TextField
					fullWidth
					label="Title *"
					{...register("title")}
					error={!!errors.title}
					helperText={errors.title?.message}
				/>

				<FormControl fullWidth error={!!errors.projectId}>
					<InputLabel>Project *</InputLabel>
					<Select
						label="Project *"
						defaultValue={defaultProjectId ?? ""}
						{...register("projectId")}
					>
						{projects.map((p) => (
							<MenuItem key={p.id} value={p.id}>
								{p.name}
							</MenuItem>
						))}
					</Select>
					{errors.projectId && (
						<FormHelperText>{errors.projectId.message}</FormHelperText>
					)}
				</FormControl>

				<Stack direction="row" spacing={2}>
					<FormControl fullWidth>
						<InputLabel>Priority</InputLabel>
						<Select
							label="Priority"
							defaultValue="medium"
							{...register("priority")}
						>
							<MenuItem value="low">Low</MenuItem>
							<MenuItem value="medium">Medium</MenuItem>
							<MenuItem value="high">High</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth>
						<InputLabel>Status</InputLabel>
						<Select
							label="Status"
							defaultValue="todo"
							{...register("status")}
						>
							<MenuItem value="todo">Todo</MenuItem>
							<MenuItem value="in-progress">In Progress</MenuItem>
							<MenuItem value="done">Done</MenuItem>
						</Select>
					</FormControl>
				</Stack>

				<TextField
					fullWidth
					label="Description"
					multiline
					rows={3}
					{...register("description")}
				/>

				<Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
					<Button onClick={onCancel}>Cancel</Button>
					<Button type="submit" variant="contained" startIcon={<AddIcon />}>
						Add Task
					</Button>
				</Stack>
			</Stack>
		</form>
	);
};
