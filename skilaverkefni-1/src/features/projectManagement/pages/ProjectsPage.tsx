import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Add this
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../../shared/store/useStore";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectsGrid, ProjectsHeader } from "../styles";

export const ProjectsPage = () => {
	const { projects, addProject, deleteProject, tasks } = useStore();
	const navigate = useNavigate();

	const handleAddProject = () => {
		const name = prompt("Enter project name:");
		if (name) {
			addProject({
				id: uuidv4(),
				name,
				description: "New project created from dashboard",
				createdAt: new Date().toISOString(),
			});
		}
	};

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<ProjectsHeader>
				<Typography variant="h4" sx={{ fontWeight: "bold" }}>
					My Projects
				</Typography>
				<Button
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					onClick={handleAddProject}
					sx={{ px: 3, py: 1 }}
				>
					Add Project
				</Button>
			</ProjectsHeader>

			{projects.length === 0 ? (
				<Typography color="text.secondary" align="center" sx={{ py: 8 }}>
					No projects yet. Create one to get started!
				</Typography>
			) : (
				<ProjectsGrid>
					{projects.map((project) => (
						<ProjectCard
							key={project.id}
							project={project}
							onDelete={deleteProject} // Fixes the unused var error
							onViewTasks={(id) => navigate(`/tasks?projectId=${id}`)} // Fixes the missing prop error
							taskCount={tasks.filter((t) => t.projectId === project.id).length}
						/>
					))}
				</ProjectsGrid>
			)}
		</Container>
	);
};
