import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useTaskFilters } from "./useTaskFilters";
import type { Task } from "../../../shared/types";

const makeTask = (overrides: Partial<Task> = {}): Task => ({
  id: "1",
  projectId: "proj-1",
  title: "Test task",
  description: "",
  status: "todo",
  priority: "medium",
  ...overrides,
});

const tasks: Task[] = [
  makeTask({ id: "1", title: "Fix bug", status: "todo", priority: "high" }),
  makeTask({ id: "2", title: "Write docs", status: "in-progress", priority: "low" }),
  makeTask({ id: "3", title: "Fix tests", status: "done", priority: "high" }),
  makeTask({ id: "4", title: "Deploy app", status: "todo", priority: "medium" }),
];

describe("useTaskFilters", () => {
  it("shows all tasks when no filters are set", () => {
    const { result } = renderHook(() => useTaskFilters(tasks));
    expect(result.current.filteredTasks).toHaveLength(4);
  });

  it("filters by search term, case-insensitively", () => {
    const { result } = renderHook(() => useTaskFilters(tasks));
    act(() => result.current.setSearch("fix"));
    expect(result.current.filteredTasks).toHaveLength(2);
    expect(result.current.filteredTasks.map((t) => t.title)).toEqual(["Fix bug", "Fix tests"]);
  });

  it("returns no tasks when the search matches nothing", () => {
    const { result } = renderHook(() => useTaskFilters(tasks));
    act(() => result.current.setSearch("xyz"));
    expect(result.current.filteredTasks).toHaveLength(0);
  });

  it("filters by status", () => {
    const { result } = renderHook(() => useTaskFilters(tasks));
    act(() => result.current.setStatusFilter("todo"));
    expect(result.current.filteredTasks).toHaveLength(2);
    expect(result.current.filteredTasks.every((t) => t.status === "todo")).toBe(true);
  });

  it("filters by priority", () => {
    const { result } = renderHook(() => useTaskFilters(tasks));
    act(() => result.current.setPriorityFilter("high"));
    expect(result.current.filteredTasks).toHaveLength(2);
    expect(result.current.filteredTasks.every((t) => t.priority === "high")).toBe(true);
  });

  it("combines search and status filters", () => {
    const { result } = renderHook(() => useTaskFilters(tasks));
    act(() => {
      result.current.setSearch("fix");
      result.current.setStatusFilter("todo");
    });
    expect(result.current.filteredTasks).toHaveLength(1);
    expect(result.current.filteredTasks[0].title).toBe("Fix bug");
  });

  it("combines all three filters at once", () => {
    const { result } = renderHook(() => useTaskFilters(tasks));
    act(() => {
      result.current.setSearch("fix");
      result.current.setStatusFilter("done");
      result.current.setPriorityFilter("high");
    });
    expect(result.current.filteredTasks).toHaveLength(1);
    expect(result.current.filteredTasks[0].title).toBe("Fix tests");
  });

  it("shows all tasks again when filters are reset to 'all'", () => {
    const { result } = renderHook(() => useTaskFilters(tasks));
    act(() => result.current.setStatusFilter("done"));
    expect(result.current.filteredTasks).toHaveLength(1);
    act(() => result.current.setStatusFilter("all"));
    expect(result.current.filteredTasks).toHaveLength(4);
  });
});
