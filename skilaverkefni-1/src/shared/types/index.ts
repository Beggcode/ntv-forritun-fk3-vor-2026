import { z } from "zod";

export const ProjectSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(2, "Project name is too short"),
	description: z.string().optional(),
	createdAt: z.string().datetime(),
});

export const TaskSchema = z.object({
	id: z.string().uuid(),
	projectId: z.string().uuid(),
	title: z.string().min(3, "Title must be at least 3 characters"),
	description: z.string().optional(),
	status: z.enum(["todo", "in-progress", "done"]),
	priority: z.enum(["low", "medium", "high"]),
	createdAt: z.string().datetime(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Task = z.infer<typeof TaskSchema>;
