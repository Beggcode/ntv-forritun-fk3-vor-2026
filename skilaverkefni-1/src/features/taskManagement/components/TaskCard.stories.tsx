import type { Meta, StoryObj } from "@storybook/react-vite";
import { TaskCard } from "./TaskCard";
import type { Task } from "../../../shared/types";

const baseTask: Task = {
  id: "task-1",
  projectId: "project-1",
  title: "Fix bug",
  description: "Fix bug description",
  status: "todo",
  priority: "medium",
};

const meta: Meta<typeof TaskCard> = {
  title: "Task Management/TaskCard",
  component: TaskCard,
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

export const Todo: Story = {
  args: {
    task: { ...baseTask, status: "todo" },
    projectName: "My project",
  },
};

export const InProgress: Story = {
  args: {
    task: { ...baseTask, status: "in-progress" },
    projectName: "My project",
  },
};

export const Done: Story = {
  args: {
    task: { ...baseTask, status: "done" },
    projectName: "My project",
  },
};

export const HighPriority: Story = {
  args: {
    task: { ...baseTask, priority: "high" },
    projectName: "My project",
  },
};

export const LowPriority: Story = {
  args: {
    task: { ...baseTask, priority: "low" },
    projectName: "My project",
  },
};

export const NoDescription: Story = {
  args: {
    task: { ...baseTask, description: "" },
    projectName: "My project",
  },
};

export const NoProject: Story = {
  args: {
    task: baseTask,
  },
};
