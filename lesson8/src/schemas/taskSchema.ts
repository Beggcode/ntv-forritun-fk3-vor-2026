import { z } from "zod";

export const taskSchema = z.object({
	title: z.string().min(1, "Title required"),
	description: z.string().optional(),
	projectId: z.string().uuid("Project must be valid"),
	status: z.enum(["todo", "in-progress", "done"]),
	priority: z.enum(["low", "medium", "high"]),
	dueDate: z.string().datetime().optional().or(z.literal("")),
});

export type TaskInput = z.infer<typeof taskSchema>;
