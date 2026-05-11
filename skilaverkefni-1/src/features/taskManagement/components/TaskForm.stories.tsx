import { vi } from "vitest";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TaskForm } from "./TaskForm";
import { useStore } from "../../../shared/store/useStore";
import type { Project } from "../../../shared/types";

const projects: Project[] = [
	{ id: "1", name: "project 1", description: "description 1" },
	{ id: "2", name: "project 2", description: "description 2" },
	{ id: "3", name: "project 3", description: "description 3" },
];

const meta: Meta<typeof TaskForm> = {
	title: "Task Management/TaskForm",
	component: TaskForm,
	args: {
		onSubmit: vi.fn(),
		onCancel: vi.fn(),
	},
	beforeEach() {
		useStore.setState({ projects });
		return () => useStore.setState({ projects: [], tasks: [] });
	},
};

export default meta;
type Story = StoryObj<typeof TaskForm>;

export const Default: Story = {};

export const WithDefaultProject: Story = {
	args: {
		defaultProjectId: "1",
	},
};

export const NoProjectsAvailable: Story = {
	beforeEach() {
		useStore.setState({ projects: [] });
	},
};
