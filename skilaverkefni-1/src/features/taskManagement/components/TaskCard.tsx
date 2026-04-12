import {
	Box,
	IconButton,
	MenuItem,
	Select,
	Stack,
	Typography,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import type { Task } from "../../../shared/store/useStore";
import {
	StyledCard,
	TaskContent,
	ProjectBadge,
	PriorityTag,
	TaskFooter,
} from "../styles/Card.styles";

interface TaskCardProps {
	task: Task;
	projectName?: string;
	onDelete: (id: string) => void;
	onStatusChange: (id: string, status: Task["status"]) => void;
}

export const TaskCard = ({
	task,
	projectName,
	onDelete,
	onStatusChange,
}: TaskCardProps) => {
	return (
		<StyledCard>
			<TaskContent>
				<Stack spacing={2} component="div">
					<Box>
						<ProjectBadge
							icon={<FolderOpenIcon />}
							label={projectName || "Unassigned"}
							color={projectName ? "primary" : "default"}
							variant="outlined"
						/>
					</Box>

					<Box>
						<Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
							{task.title}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{task.description || "No description provided"}
						</Typography>
					</Box>

					<Box>
						<PriorityTag priority={task.priority}>{task.priority}</PriorityTag>
					</Box>
				</Stack>
			</TaskContent>

			<TaskFooter>
				<Select
					value={task.status}
					onChange={(e) =>
						onStatusChange(task.id, e.target.value as Task["status"])
					}
					size="small"
					sx={{
						minWidth: 120,
						borderRadius: 2,
						fontSize: "0.875rem",
						bgcolor: "grey.50",
					}}
				>
					<MenuItem value="todo">Todo</MenuItem>
					<MenuItem value="in-progress">In Progress</MenuItem>
					<MenuItem value="done">Done</MenuItem>
				</Select>

				<IconButton
					onClick={() => onDelete(task.id)}
					color="error"
					size="small"
					sx={{
						bgcolor: "rgba(211, 47, 47, 0.08)",
						"&:hover": { bgcolor: "rgba(211, 47, 47, 0.14)" },
					}}
				>
					<DeleteOutlinedIcon fontSize="small" />
				</IconButton>
			</TaskFooter>
		</StyledCard>
	);
};
