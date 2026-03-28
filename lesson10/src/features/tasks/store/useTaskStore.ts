import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Project } from "../../projects/types";
import type { Task } from "../types";

interface TaskState {
	projects: Project[];
	tasks: Task[];
	addProject: (project: Project) => void;
	deleteProject: (id: string) => void;
	addTask: (task: Task) => void;
	deleteTask: (id: string) => void;
	updateTaskStatus: (id: string, status: Task["status"]) => void;
}

export const useTaskStore = create<TaskState>()(
	persist(
		(set) => ({
			projects: [],
			tasks: [],
			addProject: (project) =>
				set((state) => ({ projects: [...state.projects, project] })),
			deleteProject: (id) =>
				set((state) => ({
					projects: state.projects.filter((p) => p.id !== id),
				})),
			addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
			deleteTask: (id) =>
				set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
			updateTaskStatus: (id, status) =>
				set((state) => ({
					tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
				})),
		}),
		{ name: "task-storage" },
	),
);
