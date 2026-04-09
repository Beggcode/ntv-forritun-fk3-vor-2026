import { useMemo, useState } from "react";
import type { Task } from "../types";

export function useTaskFilters(tasks: Task[]) {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [priorityFilter, setPriorityFilter] = useState<string>("all");

	const filteredTasks = useMemo(() => {
		return tasks.filter((task) => {
			const matchesSearch = task.title
				.toLowerCase()
				.includes(search.toLowerCase());
			const matchesStatus =
				statusFilter === "all" || task.status === statusFilter;
			const matchesPriority =
				priorityFilter === "all" || task.priority === priorityFilter;
			return matchesSearch && matchesStatus && matchesPriority;
		});
	}, [tasks, search, statusFilter, priorityFilter]);

	return {
		search,
		setSearch,
		statusFilter,
		setStatusFilter,
		priorityFilter,
		setPriorityFilter,
		filteredTasks,
	};
}
