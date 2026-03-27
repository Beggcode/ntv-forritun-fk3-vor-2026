import { z } from "zod";

export const taskSchema = z.object({
	id: z.string().uuid(),
	projectId: z.string().uuid(),
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	status: z.enum(["todo", "in-progress", "done"]),
	priority: z.enum(["low", "medium", "high"]),
	dueDate: z.string().datetime().optional().or(z.literal("")),
});

export type Task = z.infer<typeof taskSchema>;
