import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { TaskSchema } from "../../../shared/types";

const taskFormSchema = TaskSchema.omit({ id: true, createdAt: true });
type TaskFormData = z.output<typeof taskFormSchema>;

interface TaskFormProps {
	onSubmit: (data: TaskFormData) => void;
	projectId: string;
}

export const TaskForm = ({ onSubmit, projectId }: TaskFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TaskFormData>({
		resolver: zodResolver(taskFormSchema) as Resolver<TaskFormData>,
		defaultValues: {
			projectId,
			title: "",
			description: "",
			status: "todo",
			priority: "medium",
		},
	});

	const handleFormSubmit = (data: TaskFormData) => {
		onSubmit(data);
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "12px",
				padding: "15px",
				background: "#222",
				borderRadius: "8px",
			}}
		>
			<input type="hidden" {...register("projectId")} />

			<div>
				<input
					{...register("title")}
					placeholder="Task title..."
					style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
				/>
				{errors.title && (
					<p style={{ color: "red", fontSize: "12px", margin: "4px 0" }}>
						{errors.title.message}
					</p>
				)}
			</div>

			<input
				{...register("description")}
				placeholder="Description (optional)"
				style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
			/>

			<div style={{ display: "flex", gap: "10px" }}>
				<select {...register("priority")} style={{ flex: 1, padding: "8px" }}>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>

				<button
					type="submit"
					style={{
						padding: "8px 16px",
						background: "#007bff",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}
				>
					Add Task
				</button>
			</div>
		</form>
	);
};
