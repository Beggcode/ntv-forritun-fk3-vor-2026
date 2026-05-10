import type { Meta, StoryObj } from "@storybook/react-vite";
import { vi } from "vitest";
import { ProjectForm } from "./ProjectForm";

const meta: Meta<typeof ProjectForm> = {
  title: "Project Management/ProjectForm",
  component: ProjectForm,
  args: {
    onSubmit: vi.fn(),
    onCancel: vi.fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ProjectForm>;

export const Empty: Story = {};

export const WithCancelHandler: Story = {
  args: {
    onCancel: vi.fn(),
  },
};
