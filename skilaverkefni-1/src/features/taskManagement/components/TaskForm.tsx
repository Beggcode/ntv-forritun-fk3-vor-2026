import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema } from "../../../shared/types";

const taskFormSchema = TaskSchema.omit({ id: true, createdAt: true });
type TaskFormData = z.infer<typeof taskFormSchema>;

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
		resolver: zodResolver(taskFormSchema),
		defaultValues: {
			projectId,
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
			<div>
				<input
					{...register("title")}
					placeholder="What needs to be done?"
					style={{
						width: "100%",
						padding: "8px",
						borderRadius: "4px",
						border: "1px solid #444",
					}}
				/>
				{errors.title && (
					<p
						style={{ color: "#ff4d4d", fontSize: "0.8rem", margin: "4px 0 0" }}
					>
						{errors.title.message}
					</p>
				)}
			</div>

			<div style={{ display: "flex", gap: "10px" }}>
				<select {...register("priority")} style={{ flex: 1, padding: "8px" }}>
					<option value="low">Low Priority</option>
					<option value="medium">Medium Priority</option>
					<option value="high">High Priority</option>
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
