import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import {
	Box,
	CardActions,
	Divider,
	FormControl,
	IconButton,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { useStore } from "../../../shared/store/useStore";
import type { Task } from "../../../shared/types";
import {
	PriorityTag,
	ProjectBadge,
	StyledCard,
	TaskContent,
} from "../styles/Card.styles";

interface TaskCardProps {
	task: Task;
	onDelete: (id: string) => void;
	onUpdateStatus: (id: string, status: Task["status"]) => void;
}

export const TaskCard = ({ task, onDelete, onUpdateStatus }: TaskCardProps) => {
	const { projects } = useStore();
	const project = projects.find((p) => p.id === task.projectId);

	return (
		<StyledCard elevation={0}>
			<TaskContent>
				<Box sx={{ mb: 1.5 }}>
					<ProjectBadge
						icon={<FolderOpenIcon />}
						label={project ? project.name : "Unassigned"}
						color={project ? "primary" : "default"}
						variant={project ? "filled" : "outlined"}
					/>
				</Box>

				<Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
					{task.title}
				</Typography>

				{task.description && (
					<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
						{task.description}
					</Typography>
				)}

				<Box sx={{ mt: "auto" }}>
					<PriorityTag priority={task.priority}>{task.priority}</PriorityTag>
				</Box>
			</TaskContent>

			<Divider />

			<CardActions
				sx={{
					px: 2,
					py: 1.5,
					justifyContent: "space-between",
					bgcolor: "#fafafa",
				}}
			>
				<FormControl size="small" sx={{ minWidth: 120 }}>
					<Select
						value={task.status}
						onChange={(e) =>
							onUpdateStatus(task.id, e.target.value as Task["status"])
						}
						sx={{ borderRadius: 2, fontSize: "0.875rem", bgcolor: "white" }}
					>
						<MenuItem value="todo">Todo</MenuItem>
						<MenuItem value="in-progress">In Progress</MenuItem>
						<MenuItem value="done">Done</MenuItem>
					</Select>
				</FormControl>

				<IconButton onClick={() => onDelete(task.id)} color="error">
					<DeleteOutlineIcon />
				</IconButton>
			</CardActions>
		</StyledCard>
	);
};
