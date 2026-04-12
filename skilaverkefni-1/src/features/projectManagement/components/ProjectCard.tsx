import { Typography, IconButton, Divider } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Project } from "../../../shared/types";
import {
	StyledProjectCard,
	ProjectHeader,
	ProjectFooter,
	ProjectContent,
	TaskCountLabel,
	ViewButton,
} from "../styles/ProjectCard.styles";

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
			<ProjectContent>
				<ProjectHeader>
					<FolderOpenIcon color="primary" />
					<Typography variant="h6" sx={{ fontWeight: "bold" }}>
						{project.name}
					</Typography>
				</ProjectHeader>

				<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
					{project.description || "No description provided."}
				</Typography>

				<TaskCountLabel variant="caption">
					{taskCount} {taskCount === 1 ? "TASK" : "TASKS"}
				</TaskCountLabel>
			</ProjectContent>

			<Divider />

			<ProjectFooter>
				<ViewButton
					variant="outlined"
					endIcon={<ArrowForwardIcon />}
					onClick={() => onViewTasks(project.id)}
				>
					View Project
				</ViewButton>
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
