import { describe, it, expect } from "vitest";
import { ProjectSchema, TaskSchema } from "./index";

const makeProject = (overrides = {}) => ({
  id: "proj-1",
  name: "My Project",
  description: "A description",
  ...overrides,
});

const makeTask = (overrides = {}) => ({
  id: "task-1",
  projectId: "proj-1",
  title: "Fix bug",
  description: "",
  status: "todo",
  priority: "medium",
  ...overrides,
});

describe("ProjectSchema", () => {
  it("accepts a valid project", () => {
    const project = makeProject();
    expect(ProjectSchema.parse(project)).toEqual(project);
  });

  it("rejects a name that is too short", () => {
    expect(() => ProjectSchema.parse(makeProject({ name: "X" }))).toThrow("Project name is too short");
  });

  it("defaults description to an empty string if not provided", () => {
    expect(ProjectSchema.parse({ id: "proj-1", name: "My Project" }).description).toBe("");
  });

  it("requires an id", () => {
    expect(() => ProjectSchema.parse({ name: "My Project" })).toThrow();
  });
});

describe("TaskSchema", () => {
  it("accepts a valid task", () => {
    const task = makeTask();
    expect(TaskSchema.parse(task)).toEqual(task);
  });

  it("rejects a title that is too short", () => {
    expect(() => TaskSchema.parse(makeTask({ title: "Hi" }))).toThrow("Title must be at least 3 characters");
  });

  it("defaults description to an empty string if not provided", () => {
    expect(TaskSchema.parse({ id: "task-1", projectId: "proj-1", title: "Fix bug", status: "todo", priority: "medium" }).description).toBe("");
  });

  it("accepts todo, in-progress, and done as status", () => {
    for (const status of ["todo", "in-progress", "done"]) {
      expect(() => TaskSchema.parse(makeTask({ status }))).not.toThrow();
    }
  });

  it("rejects an unknown status like 'pending'", () => {
    expect(() => TaskSchema.parse(makeTask({ status: "pending" }))).toThrow();
  });

  it("accepts low, medium, and high as priority", () => {
    for (const priority of ["low", "medium", "high"]) {
      expect(() => TaskSchema.parse(makeTask({ priority }))).not.toThrow();
    }
  });

  it("rejects an unknown priority like 'urgent'", () => {
    expect(() => TaskSchema.parse(makeTask({ priority: "urgent" }))).toThrow();
  });

  it("requires a projectId", () => {
    expect(() => TaskSchema.parse({ id: "task-1", title: "Fix bug", status: "todo", priority: "medium" })).toThrow();
  });
});
