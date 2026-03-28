import { useTaskStore } from "../store/useTaskStore";
import type { Task } from "../types";

export default function useTaskFilter(
	projectId?: string,
	status?: string,
): Task[] {
	const tasks = useTaskStore((state) => state.tasks);

	const filteredTasks = tasks.filter((task) => {
		const matchesProject = !projectId || task.projectId === projectId;
		const matchesStatus = !status || task.status === status;

		return matchesProject && matchesStatus;
	});

	return filteredTasks;
}
