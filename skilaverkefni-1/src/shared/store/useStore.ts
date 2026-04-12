import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Task {
	id: string;
	title: string;
	description?: string;
	status: "todo" | "in-progress" | "done";
	priority: "low" | "medium" | "high";
	projectId: string;
	createdAt: string;
}

export interface Project {
	id: string;
	name: string;
	description: string;
	createdAt: string;
}

interface AppState {
	projects: Project[];
	tasks: Task[];
	addProject: (project: Project) => void;
	deleteProject: (id: string) => void;
	addTask: (task: Task) => void;
	updateTask: (id: string, updatedTask: Partial<Task>) => void;
	deleteTask: (id: string) => void;
}

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
		},
	),
);
