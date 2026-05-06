import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	Container,
	Typography,
	Button,
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../../shared/store/useStore";
import { TaskCard } from "../components/TaskCard";
import { TaskForm } from "../components/TaskForm";
import { TaskFilters } from "../components/TaskFilters";
import { useTaskFilters } from "../hooks/useTaskFilters";
import type { TaskFormData } from "../components/TaskForm";
import { ActionHeader } from "../styles/TasksPage.styles";

export const TasksPage = () => {
	const [searchParams] = useSearchParams();
	const projectIdParam = searchParams.get("projectId");
	const { tasks, projects, addTask } = useStore();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const projectTasks = projectIdParam
		? tasks.filter((t) => t.projectId === projectIdParam)
		: tasks;

	const {
		search,
		setSearch,
		statusFilter,
		setStatusFilter,
		priorityFilter,
		setPriorityFilter,
		filteredTasks,
	} = useTaskFilters(projectTasks);

	const onFormSubmit = (data: TaskFormData) => {
		addTask({
			...data,
			description: data.description ?? "",
			id: uuidv4(),
			createdAt: new Date().toISOString(),
		});
		setIsModalOpen(false);
	};

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<ActionHeader>
				<Typography variant="h4" sx={{ fontWeight: "bold" }}>
					Tasks
					{projectIdParam &&
						` - ${projects.find((p) => p.id === projectIdParam)?.name}`}
				</Typography>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={() => setIsModalOpen(true)}
				>
					New Task
				</Button>
			</ActionHeader>

			<TaskFilters
				search={search}
				onSearchChange={setSearch}
				statusFilter={statusFilter}
				onStatusChange={setStatusFilter}
				priorityFilter={priorityFilter}
				onPriorityChange={setPriorityFilter}
			/>

			<Grid container spacing={3}>
				{filteredTasks.map((task) => (
					<Grid size={{ xs: 12, sm: 6, md: 4 }} key={task.id}>
						<TaskCard
							task={task}
							projectName={projects.find((p) => p.id === task.projectId)?.name}
						/>
					</Grid>
				))}
			</Grid>

			<Dialog
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				fullWidth
				maxWidth="sm"
			>
				<DialogTitle sx={{ fontWeight: "bold" }}>Create New Task</DialogTitle>
				<DialogContent>
					<TaskForm
						defaultProjectId={projectIdParam ?? undefined}
						onSubmit={onFormSubmit}
						onCancel={() => setIsModalOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</Container>
	);
};
