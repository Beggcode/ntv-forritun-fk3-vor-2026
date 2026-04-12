import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../../shared/store/useStore";
import { ProjectCard } from "../components/ProjectCard";

export const ProjectsPage = () => {
	const { projects, addProject, deleteProject, tasks } = useStore();

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
		<div className="projects-page">
			<header
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "20px",
				}}
			>
				<h2>My Projects</h2>
				<button
					onClick={handleAddProject}
					style={{
						padding: "8px 16px",
						background: "#28a745",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}
				>
					+ Add Project
				</button>
			</header>

			{projects.length === 0 ? (
				<p>No projects yet. Create one to get started!</p>
			) : (
				<div style={{ display: "grid", gap: "15px" }}>
					{projects.map((project) => (
						<ProjectCard
							key={project.id}
							project={project}
							onDelete={deleteProject}
							taskCount={tasks.filter((t) => t.projectId === project.id).length}
						/>
					))}
				</div>
			)}
		</div>
	);
};
