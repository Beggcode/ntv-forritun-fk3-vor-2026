import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Container,
	Typography,
	Button,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useStore } from "../../../shared/store/useStore";
import { ProjectCard } from "../components/ProjectCard";
import {
	ProjectsHeader,
	ProjectsGrid,
	ProjectFormWrapper,
} from "../styles/ProjectsPage.styles";

const projectSchema = z.object({
	name: z
		.string()
		.min(1, "Project name is required")
		.max(30, "Name is too long"),
	description: z.string().max(100, "Description is too long").optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export const ProjectsPage = () => {
	const { projects, addProject, deleteProject, tasks } = useStore();
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ProjectFormData>({
		resolver: zodResolver(projectSchema),
	});

	const onFormSubmit = (data: ProjectFormData) => {
		addProject({
			id: uuidv4(),
			name: data.name,
			description: data.description || "New project created from dashboard",
			createdAt: new Date().toISOString(),
		});
		setIsModalOpen(false);
		reset();
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
							onDelete={deleteProject}
							onViewTasks={(id) => navigate(`/tasks?projectId=${id}`)}
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
					<ProjectFormWrapper
						component="form"
						onSubmit={handleSubmit(onFormSubmit)}
					>
						<Stack spacing={3}>
							<TextField
								fullWidth
								label="Project Name *"
								{...register("name")}
								error={!!errors.name}
								helperText={errors.name?.message}
								autoFocus
							/>
							<TextField
								fullWidth
								label="Description (optional)"
								multiline
								rows={2}
								{...register("description")}
								error={!!errors.description}
								helperText={errors.description?.message}
							/>
							<Stack
								direction="row"
								spacing={2}
								sx={{ justifyContent: "flex-end" }}
							>
								<Button onClick={() => setIsModalOpen(false)} color="inherit">
									Cancel
								</Button>
								<Button
									type="submit"
									variant="contained"
									sx={{ fontWeight: "bold" }}
								>
									Add Project
								</Button>
							</Stack>
						</Stack>
					</ProjectFormWrapper>
				</DialogContent>
			</Dialog>
		</Container>
	);
};
