import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { z } from "zod";
import type { Task, Project } from "../types";
import { ProjectSchema, TaskSchema } from "../types";

export type { Task, Project };

const PersistedStateSchema = z.object({
	state: z.object({
		projects: z.array(ProjectSchema).catch([]),
		tasks: z.array(TaskSchema).catch([]),
	}),
	version: z.number().optional(),
});

interface AppState {
	projects: Project[];
	tasks: Task[];
	addProject: (project: Project) => void;
	deleteProject: (id: string) => void;
	addTask: (task: Task) => void;
	updateTask: (id: string, updatedTask: Partial<Task>) => void;
	deleteTask: (id: string) => void;
}

const zodStorage = createJSONStorage<AppState>(() => ({
	getItem: (name: string): string | null => {
		const raw = localStorage.getItem(name);
		if (!raw) return null;
		try {
			const validated = PersistedStateSchema.parse(JSON.parse(raw));
			return JSON.stringify(validated);
		} catch {
			return null;
		}
	},
	setItem: (name: string, value: string): void => {
		localStorage.setItem(name, value);
	},
	removeItem: (name: string): void => {
		localStorage.removeItem(name);
	},
}));

export const useStore = create<AppState>()(
	persist(
		(set) => ({
			projects: [],
			tasks: [],

			addProject: (project) =>
				set((state) => ({ projects: [...state.projects, project] })),

			deleteProject: (id) =>
				set((state) => ({
					projects: state.projects.filter((p) => p.id !== id),
					tasks: state.tasks.filter((t) => t.projectId !== id),
				})),

			addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

			updateTask: (id, updatedTask) =>
				set((state) => ({
					tasks: state.tasks.map((t) =>
						t.id === id ? { ...t, ...updatedTask } : t,
					),
				})),

			deleteTask: (id) =>
				set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
		}),
		{
			name: "team-task-hub-storage",
			storage: zodStorage,
		},
	),
);
