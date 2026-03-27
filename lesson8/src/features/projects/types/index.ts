import { z } from "zod";

export const projectSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(3, "Name must be at least 3 characters"),
	description: z.string().optional(),
	color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid HEX color"),
});

export type Project = z.infer<typeof projectSchema>;
