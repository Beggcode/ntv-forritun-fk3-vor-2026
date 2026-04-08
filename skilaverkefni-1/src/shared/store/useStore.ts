import { create } from "zustand";
import type { Project, Task } from "../types";

interface AppState {
	projects: Project[];
	tasks: Task[];
	addProject: (project: Project) => void;
	deleteProject: (id: string) => void;
	addTask: (task: Task) => void;
	updateTask: (id: string, updatedTask: Partial<Task>) => void;
	deleteTask: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
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
}));
