import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useStats } from "./useStats";
import type { Task } from "../types";

const makeTask = (overrides: Partial<Task> = {}): Task => ({
  id: "1",
  projectId: "proj-1",
  title: "Test task",
  description: "",
  status: "todo",
  priority: "medium",
  createdAt: "2024-01-01",
  ...overrides,
});

describe("useStats", () => {
  it("returns all zeros when there are no tasks", () => {
    const { result } = renderHook(() => useStats([]));
    expect(result.current).toEqual({ total: 0, completed: 0, pending: 0, percentComplete: 0 });
  });

  it("counts the total number of tasks", () => {
    const tasks = [makeTask(), makeTask({ id: "2" }), makeTask({ id: "3" })];
    const { result } = renderHook(() => useStats(tasks));
    expect(result.current.total).toBe(3);
  });

  it("only counts done tasks as completed", () => {
    const tasks = [
      makeTask({ status: "done" }),
      makeTask({ id: "2", status: "in-progress" }),
      makeTask({ id: "3", status: "todo" }),
    ];
    const { result } = renderHook(() => useStats(tasks));
    expect(result.current.completed).toBe(1);
    expect(result.current.pending).toBe(2);
  });

  it("calculates the completion percentage correctly", () => {
    const tasks = [
      makeTask({ status: "done" }),
      makeTask({ id: "2", status: "done" }),
      makeTask({ id: "3", status: "todo" }),
      makeTask({ id: "4", status: "todo" }),
    ];
    const { result } = renderHook(() => useStats(tasks));
    expect(result.current.percentComplete).toBe(50);
  });

  it("rounds the completion percentage to a whole number", () => {
    const tasks = [
      makeTask({ status: "done" }),
      makeTask({ id: "2", status: "todo" }),
      makeTask({ id: "3", status: "todo" }),
    ];
    const { result } = renderHook(() => useStats(tasks));
    expect(result.current.percentComplete).toBe(33);
  });

  it("shows 100% and zero pending when all tasks are done", () => {
    const tasks = [makeTask({ status: "done" }), makeTask({ id: "2", status: "done" })];
    const { result } = renderHook(() => useStats(tasks));
    expect(result.current.percentComplete).toBe(100);
    expect(result.current.pending).toBe(0);
  });
});
