import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../../shared/store/useStore";
import { TaskCard } from "../components/TaskCard";
import { TaskForm } from "../components/TaskForm";
import { useTaskFilters } from "../hooks/useTaskFilters";

export const TasksPage = () => {
	const { tasks, deleteTask, updateTask, addTask } = useStore();
	const { filteredTasks, setSearch, setStatusFilter } = useTaskFilters(tasks);

	return (
		<div>
			<h2>All Tasks</h2>

			{/* Requirement #2: Form to add tasks */}
			<TaskForm
				projectId="default-project" // You can update this later to handle specific projects
				onSubmit={(data) =>
					addTask({
						...data,
						id: uuidv4(),
						createdAt: new Date().toISOString(),
					})
				}
			/>

			<div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
				<input
					placeholder="Search tasks..."
					onChange={(e) => setSearch(e.target.value)}
					style={{ padding: "8px", flex: 1 }}
				/>
				<select
					onChange={(e) => setStatusFilter(e.target.value)}
					style={{ padding: "8px" }}
				>
					<option value="all">All Statuses</option>
					<option value="todo">Todo</option>
					<option value="in-progress">In Progress</option>
					<option value="done">Done</option>
				</select>
			</div>

			<div className="task-list">
				{filteredTasks.map((task) => (
					<TaskCard
						key={task.id}
						task={task}
						onDelete={deleteTask}
						onUpdateStatus={(id, status) => updateTask(id, { status })}
					/>
				))}
			</div>
		</div>
	);
};
