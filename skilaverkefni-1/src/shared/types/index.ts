import { z } from "zod";

export const ProjectSchema = z.object({
	id: z.string(),
	name: z.string().min(2, "Project name is too short"),
	description: z.string().default(""),
	createdAt: z.string(),
});

export const TaskSchema = z.object({
	id: z.string(),
	projectId: z.string(),
	title: z.string().min(3, "Title must be at least 3 characters"),
	description: z.string().default(""),
	status: z.enum(["todo", "in-progress", "done"]),
	priority: z.enum(["low", "medium", "high"]),
	createdAt: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Task = z.infer<typeof TaskSchema>;
