import AddIcon from "@mui/icons-material/Add";
import {
	Button,
	Container,
	Dialog,
	DialogContent,
	DialogTitle,
	Fab,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../../shared/store/useStore";
import type { Task } from "../../../shared/types";
import { TaskCard } from "../components/TaskCard";
import { TaskForm } from "../components/TaskForm";
import { useTaskFilters } from "../hooks/useTaskFilters";
import { ActionHeader, FilterContainer } from "../styles";

type TaskFormData = Omit<Task, "id" | "createdAt">;

export const TasksPage = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const { tasks, deleteTask, updateTask, addTask } = useStore();
	const { filteredTasks, setSearch, setStatusFilter } = useTaskFilters(tasks);

	const handleAddTask = (data: TaskFormData) => {
		addTask({
			...data,
			id: uuidv4(),
			createdAt: new Date().toISOString(),
		});
		setIsFormOpen(false);
	};

	return (
		<Container maxWidth="lg" sx={{ py: 4, pb: 10 }}>
			<ActionHeader>
				<Typography variant="h4" sx={{ fontWeight: "bold" }}>
					All Tasks
				</Typography>
				{!isMobile && (
					<Button
						variant="contained"
						startIcon={<AddIcon />}
						onClick={() => setIsFormOpen(true)}
						sx={{
							borderRadius: 2,
							px: 3,
							py: 1,
							textTransform: "none",
							fontWeight: "bold",
						}}
					>
						New Task
					</Button>
				)}
			</ActionHeader>

			<FilterContainer>
				<TextField
					fullWidth
					label="Search tasks..."
					variant="outlined"
					onChange={(e) => setSearch(e.target.value)}
					sx={{ backgroundColor: "white" }}
				/>

				<FormControl sx={{ minWidth: 200 }}>
					<InputLabel>Status</InputLabel>
					<Select
						label="Status"
						defaultValue="all"
						onChange={(e) => setStatusFilter(e.target.value as string)}
					>
						<MenuItem value="all">All Statuses</MenuItem>
						<MenuItem value="todo">Todo</MenuItem>
						<MenuItem value="in-progress">In Progress</MenuItem>
						<MenuItem value="done">Done</MenuItem>
					</Select>
				</FormControl>
			</FilterContainer>

			<Grid container spacing={3}>
				{filteredTasks.length === 0 ? (
					<Grid size={12}>
						<Typography color="text.secondary" align="center" sx={{ py: 8 }}>
							No tasks found.
						</Typography>
					</Grid>
				) : (
					filteredTasks.map((task) => (
						<Grid key={task.id} size={{ xs: 12, md: 6, lg: 4 }}>
							<TaskCard
								task={task}
								onDelete={deleteTask}
								onUpdateStatus={(id, status) => updateTask(id, { status })}
							/>
						</Grid>
					))
				)}
			</Grid>

			{isMobile && (
				<Fab
					color="primary"
					onClick={() => setIsFormOpen(true)}
					sx={{ position: "fixed", bottom: 16, right: 16 }}
				>
					<AddIcon />
				</Fab>
			)}

			<Dialog
				open={isFormOpen}
				onClose={() => setIsFormOpen(false)}
				fullWidth
				maxWidth="sm"
			>
				<DialogTitle sx={{ fontWeight: "bold" }}>Create New Task</DialogTitle>
				<DialogContent>
					<TaskForm projectId="default-project" onSubmit={handleAddTask} />
				</DialogContent>
			</Dialog>
		</Container>
	);
};
