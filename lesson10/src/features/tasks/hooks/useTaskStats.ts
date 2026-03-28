import { useMemo } from "react";
import { useTaskStore } from "../store/useTaskStore";
import type { Task } from "../types";

export const useTaskStats = (projectId?: string) => {
	const tasks = useTaskStore((state) => state.tasks);

	const stats = useMemo(() => {
		const initialState = { total: 0, completed: 0 };

		const counts = tasks.reduce((acc, task: Task) => {
			const isCorrectProject = !projectId || task.projectId === projectId;

			if (isCorrectProject) {
				acc.total += 1;
				if (task.status === "done") {
					acc.completed += 1;
				}
			}
			return acc;
		}, initialState);
		const percentage =
			counts.total > 0
				? Math.round((counts.completed / counts.total) * 100)
				: 0;

		return {
			total: counts.total,
			completed: counts.completed,
			percentage,
		};
	}, [tasks, projectId]);

	return stats;
};
