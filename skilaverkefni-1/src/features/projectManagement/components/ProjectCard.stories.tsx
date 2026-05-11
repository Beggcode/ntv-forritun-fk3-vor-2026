import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "../../../shared/types";

const sampleProject: Project = {
  id: "project-1",
  name: "My project",
  description: "My project description",
};

const meta: Meta<typeof ProjectCard> = {
  title: "Project Management/ProjectCard",
  component: ProjectCard,
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    project: sampleProject,
    taskCount: 5,
  },
};

export const NoDescription: Story = {
  args: {
    project: { ...sampleProject, description: "" },
    taskCount: 3,
  },
};

export const ZeroTasks: Story = {
  args: {
    project: sampleProject,
    taskCount: 0,
  },
};

export const SingleTask: Story = {
  args: {
    project: sampleProject,
    taskCount: 1,
  },
};

export const LotsOfTasks: Story = {
  args: {
    project: { ...sampleProject, name: "big boy" },
    taskCount: 18,
  },
};
