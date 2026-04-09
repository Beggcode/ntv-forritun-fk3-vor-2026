import { useMemo } from "react";
import type { Task } from "../types";

export function useStats(tasks: Task[]) {
	return useMemo(() => {
		const total = tasks.length;
		const completed = tasks.filter((t) => t.status === "done").length;
		const pending = total - completed;
		const percentComplete =
			total === 0 ? 0 : Math.round((completed / total) * 100);

		return {
			total,
			completed,
			pending,
			percentComplete,
		};
	}, [tasks]);
}
