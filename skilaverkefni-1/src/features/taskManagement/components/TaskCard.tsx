import {
	CardContent,
	CardActions,
	Typography,
	IconButton,
	Select,
	MenuItem,
	FormControl,
	Box,
	Divider,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { StyledCard } from "../styles";
import type { Task } from "../../../shared/types";

interface TaskCardProps {
	task: Task;
	onDelete: (id: string) => void;
	onUpdateStatus: (id: string, status: Task["status"]) => void;
}

export const TaskCard = ({ task, onDelete, onUpdateStatus }: TaskCardProps) => {
	return (
		<StyledCard elevation={0}>
			{/* The main content area */}
			<CardContent sx={{ flexGrow: 1, p: 3 }}>
				<Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
					{task.title}
				</Typography>

				{task.description && (
					<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
						{task.description}
					</Typography>
				)}

				<Box sx={{ mt: "auto" }}>
					<Typography
						variant="caption"
						sx={{
							fontWeight: "bold",
							letterSpacing: 1,
							px: 1,
							py: 0.5,
							borderRadius: 1,
							bgcolor:
								task.priority === "high" ? "error.light" : "action.hover",
							color: task.priority === "high" ? "error.main" : "text.secondary",
						}}
					>
						{task.priority.toUpperCase()}
					</Typography>
				</Box>
			</CardContent>

			<Divider />

			{/* The actions footer */}
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

				<IconButton
					onClick={() => onDelete(task.id)}
					color="error"
					sx={{ "&:hover": { bgcolor: "rgba(211, 47, 47, 0.04)" } }}
				>
					<DeleteOutlineIcon />
				</IconButton>
			</CardActions>
		</StyledCard>
	);
};
