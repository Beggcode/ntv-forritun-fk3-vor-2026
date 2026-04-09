import type { Project } from "../../../shared/types";

interface ProjectCardProps {
	project: Project;
	taskCount: number;
	onDelete: (id: string) => void;
}

export const ProjectCard = ({
	project,
	taskCount,
	onDelete,
}: ProjectCardProps) => {
	return (
		<div className="project-card">
			<h3>{project.name}</h3>
			<p>{project.description}</p>
			<span>Tasks: {taskCount}</span>
			<button onClick={() => onDelete(project.id)}>Delete Project</button>
		</div>
	);
};
