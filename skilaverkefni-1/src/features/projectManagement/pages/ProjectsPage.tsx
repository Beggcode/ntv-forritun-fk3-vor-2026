import { useState } from "react";
import {
	Container,
	Typography,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../../shared/store/useStore";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectForm } from "../components/ProjectForm";
import {
	ProjectsHeader,
	ProjectsGrid,
} from "../styles/ProjectsPage.styles";

export const ProjectsPage = () => {
	const { projects, addProject, tasks } = useStore();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onFormSubmit = (data: { name: string; description?: string }) => {
		addProject({
			id: uuidv4(),
			name: data.name,
			description: data.description ?? "",
		});
		setIsModalOpen(false);
	};

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<ProjectsHeader>
				<Typography variant="h4" sx={{ fontWeight: "bold" }}>
					My Projects
				</Typography>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={() => setIsModalOpen(true)}
					sx={{ px: 3 }}
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
							taskCount={tasks.filter((t) => t.projectId === project.id).length}
						/>
					))}
				</ProjectsGrid>
			)}

			<Dialog
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				fullWidth
				maxWidth="sm"
				sx={{ "& .MuiPaper-root": { borderRadius: 3 } }}
			>
				<DialogTitle sx={{ fontWeight: "bold", pt: 3 }}>
					Create New Project
				</DialogTitle>
				<DialogContent>
					<ProjectForm
						onSubmit={onFormSubmit}
						onCancel={() => setIsModalOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</Container>
	);
};
