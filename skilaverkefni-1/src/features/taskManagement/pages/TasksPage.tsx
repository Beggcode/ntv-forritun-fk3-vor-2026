import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
	Container,
	Typography,
	Button,
	TextField,
	MenuItem,
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "../../../shared/store/useStore";
import { TaskCard } from "../components/TaskCard";
import { TaskSchema } from "../../../shared/types";
import type { Task } from "../../../shared/store/useStore";
import {
	ActionHeader,
	FilterContainer,
	ModalFormWrapper,
} from "../styles/TasksPage.styles";

type TaskFormData = Omit<Task, "id" | "createdAt">;

export const TasksPage = () => {
	const [searchParams] = useSearchParams();
	const projectIdParam = searchParams.get("projectId");
	const { tasks, projects, deleteTask, updateTask, addTask } = useStore();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [priorityFilter, setPriorityFilter] = useState("all");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TaskFormData>({
		resolver: zodResolver(TaskSchema.omit({ id: true, createdAt: true })),
		defaultValues: {
			projectId: projectIdParam || "",
			status: "todo",
			priority: "medium",
		},
	});

	const filteredTasks = useMemo(() => {
		return tasks.filter((task) => {
			const matchesProject = projectIdParam
				? task.projectId === projectIdParam
				: true;
			const matchesSearch = task.title
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const matchesStatus =
				statusFilter === "all" || task.status === statusFilter;
			const matchesPriority =
				priorityFilter === "all" || task.priority === priorityFilter;
			return (
				matchesProject && matchesSearch && matchesStatus && matchesPriority
			);
		});
	}, [tasks, projectIdParam, searchTerm, statusFilter, priorityFilter]);

	const onFormSubmit = (data: TaskFormData) => {
		addTask({ ...data, id: uuidv4(), createdAt: new Date().toISOString() });
		setIsModalOpen(false);
		reset();
	};

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<ActionHeader>
				<Typography variant="h4" sx={{ fontWeight: "bold" }}>
					Tasks{" "}
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

			<FilterContainer direction={{ xs: "column", sm: "row" }} spacing={2}>
				<TextField
					label="Search tasks"
					size="small"
					fullWidth
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<TextField
					select
					label="Status"
					size="small"
					sx={{ minWidth: 150 }}
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
				>
					<MenuItem value="all">All Statuses</MenuItem>
					<MenuItem value="todo">Todo</MenuItem>
					<MenuItem value="in-progress">In Progress</MenuItem>
					<MenuItem value="done">Done</MenuItem>
				</TextField>
				<TextField
					select
					label="Priority"
					size="small"
					sx={{ minWidth: 150 }}
					value={priorityFilter}
					onChange={(e) => setPriorityFilter(e.target.value)}
				>
					<MenuItem value="all">All Priorities</MenuItem>
					<MenuItem value="low">Low</MenuItem>
					<MenuItem value="medium">Medium</MenuItem>
					<MenuItem value="high">High</MenuItem>
				</TextField>
			</FilterContainer>

			<Grid container spacing={3}>
				{filteredTasks.map((task) => (
					<Grid size={{ xs: 12, sm: 6, md: 4 }} key={task.id}>
						<TaskCard
							task={task}
							projectName={projects.find((p) => p.id === task.projectId)?.name}
							onDelete={deleteTask}
							onStatusChange={(id, status) => updateTask(id, { status })}
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
					<ModalFormWrapper
						component="form"
						onSubmit={handleSubmit(onFormSubmit)}
					>
						<Stack spacing={3} sx={{ mt: 1 }}>
							<TextField
								fullWidth
								label="Title *"
								{...register("title")}
								error={!!errors.title}
								helperText={errors.title?.message}
							/>
							<TextField
								select
								fullWidth
								label="Project *"
								defaultValue={projectIdParam || ""}
								{...register("projectId")}
								error={!!errors.projectId}
							>
								{projects.map((p) => (
									<MenuItem key={p.id} value={p.id}>
										{p.name}
									</MenuItem>
								))}
							</TextField>
							<Stack direction="row" spacing={2}>
								<TextField
									select
									fullWidth
									label="Priority"
									{...register("priority")}
								>
									<MenuItem value="low">Low</MenuItem>
									<MenuItem value="medium">Medium</MenuItem>
									<MenuItem value="high">High</MenuItem>
								</TextField>
								<TextField
									select
									fullWidth
									label="Status"
									{...register("status")}
								>
									<MenuItem value="todo">Todo</MenuItem>
									<MenuItem value="in-progress">In Progress</MenuItem>
									<MenuItem value="done">Done</MenuItem>
								</TextField>
							</Stack>
							<TextField
								fullWidth
								label="Description"
								multiline
								rows={3}
								{...register("description")}
							/>
							<Stack
								direction="row"
								spacing={2}
								sx={{ justifyContent: "flex-end" }}
							>
								<Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
								<Button type="submit" variant="contained">
									Create
								</Button>
							</Stack>
						</Stack>
					</ModalFormWrapper>
				</DialogContent>
			</Dialog>
		</Container>
	);
};
