import type { Meta, StoryObj } from "@storybook/react-vite";
import { vi } from "vitest";
import { TaskFilters } from "./TaskFilters";

const meta: Meta<typeof TaskFilters> = {
  title: "Task Management/TaskFilters",
  component: TaskFilters,
  args: {
    search: "",
    statusFilter: "all",
    priorityFilter: "all",
    onSearchChange: vi.fn(),
    onStatusChange: vi.fn(),
    onPriorityChange: vi.fn(),
  },
};

export default meta;
type Story = StoryObj<typeof TaskFilters>;

export const Default: Story = {};

export const WithSearch: Story = {
  args: {
    search: "fix bug",
  },
};

export const FilteredByStatus: Story = {
  args: {
    statusFilter: "in-progress",
  },
};

export const FilteredByPriority: Story = {
  args: {
    priorityFilter: "high",
  },
};

export const AllFiltersActive: Story = {
  args: {
    search: "bug",
    statusFilter: "todo",
    priorityFilter: "medium",
  },
};
