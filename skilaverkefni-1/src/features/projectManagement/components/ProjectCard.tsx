import {
	CardContent,
	Typography,
	Button,
	IconButton,
	Divider,
} from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete"; // Changed this for better compatibility
import { StyledProjectCard, ProjectHeader, ProjectFooter } from "../styles";
import type { Project } from "../../../shared/types";

interface ProjectCardProps {
	project: Project;
	taskCount: number;
	onViewTasks: (id: string) => void;
	onDelete: (id: string) => void;
}

export const ProjectCard = ({
	project,
	taskCount,
	onViewTasks,
	onDelete,
}: ProjectCardProps) => {
	return (
		<StyledProjectCard elevation={0}>
			<CardContent
				sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}
			>
				<ProjectHeader>
					<FolderOpenIcon color="primary" />
					<Typography variant="h6" sx={{ fontWeight: "bold" }}>
						{project.name}
					</Typography>
				</ProjectHeader>

				<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
					{project.description || "No description provided."}
				</Typography>

				<Typography
					variant="caption"
					sx={{ fontWeight: "bold", color: "primary.main", mt: "auto" }}
				>
					{taskCount} {taskCount === 1 ? "TASK" : "TASKS"}
				</Typography>
			</CardContent>

			<Divider />

			<ProjectFooter sx={{ display: "flex", gap: 1 }}>
				<Button
					variant="outlined"
					endIcon={<ArrowForwardIcon />}
					onClick={() => onViewTasks(project.id)}
					sx={{ borderRadius: 2, textTransform: "none", flexGrow: 1 }}
				>
					View Project
				</Button>
				<IconButton
					onClick={() => onDelete(project.id)}
					color="error"
					size="small"
				>
					<DeleteIcon />
				</IconButton>
			</ProjectFooter>
		</StyledProjectCard>
	);
};
