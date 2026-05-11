import { beforeEach, describe, it, expect } from "vitest";
import { useStore } from "./useStore";
import type { Project, Task } from "../types";

const makeProject = (overrides: Partial<Project> = {}): Project => ({
	id: "proj-1",
	name: "Test Project",
	description: "A test project",
	...overrides,
});

const makeTask = (overrides: Partial<Task> = {}): Task => ({
	id: "task-1",
	projectId: "proj-1",
	title: "Test task",
	description: "",
	status: "todo",
	priority: "medium",
	...overrides,
});

beforeEach(() => {
	useStore.setState({ projects: [], tasks: [] });
});

describe("useStore - projects", () => {
	it("starts with no projects", () => {
		expect(useStore.getState().projects).toHaveLength(0);
	});

	it("adds a project", () => {
		const project = makeProject();
		useStore.getState().addProject(project);
		expect(useStore.getState().projects).toHaveLength(1);
		expect(useStore.getState().projects[0]).toEqual(project);
	});

	it("can add multiple projects", () => {
		useStore.getState().addProject(makeProject({ id: "1", name: "Alpha" }));
		useStore.getState().addProject(makeProject({ id: "2", name: "Beta" }));
		expect(useStore.getState().projects).toHaveLength(2);
	});

	it("deletes a project by id", () => {
		const project = makeProject();
		useStore.getState().addProject(project);
		useStore.getState().deleteProject(project.id);
		expect(useStore.getState().projects).toHaveLength(0);
	});

	it("only deletes the targeted project", () => {
		useStore.getState().addProject(makeProject({ id: "1", name: "Keep" }));
		useStore.getState().addProject(makeProject({ id: "2", name: "Delete me" }));
		useStore.getState().deleteProject("2");
		expect(useStore.getState().projects).toHaveLength(1);
		expect(useStore.getState().projects[0].id).toBe("1");
	});

	it("also deletes tasks that belong to the deleted project", () => {
		useStore.getState().addProject(makeProject({ id: "proj-1" }));
		useStore.getState().addTask(makeTask({ id: "t1", projectId: "proj-1" }));
		useStore.getState().addTask(makeTask({ id: "t2", projectId: "proj-1" }));
		useStore.getState().deleteProject("proj-1");
		expect(useStore.getState().tasks).toHaveLength(0);
	});

	it("leaves tasks from other projects untouched when deleting a project", () => {
		useStore.getState().addProject(makeProject({ id: "proj-1" }));
		useStore
			.getState()
			.addProject(makeProject({ id: "proj-2", name: "Other" }));
		useStore.getState().addTask(makeTask({ id: "t1", projectId: "proj-1" }));
		useStore.getState().addTask(makeTask({ id: "t2", projectId: "proj-2" }));
		useStore.getState().deleteProject("proj-1");
		expect(useStore.getState().tasks).toHaveLength(1);
		expect(useStore.getState().tasks[0].id).toBe("t2");
	});
});

describe("useStore - tasks", () => {
	it("starts with no tasks", () => {
		expect(useStore.getState().tasks).toHaveLength(0);
	});

	it("adds a task", () => {
		const task = makeTask();
		useStore.getState().addTask(task);
		expect(useStore.getState().tasks).toHaveLength(1);
		expect(useStore.getState().tasks[0]).toEqual(task);
	});

	it("deletes a task by id", () => {
		const task = makeTask();
		useStore.getState().addTask(task);
		useStore.getState().deleteTask(task.id);
		expect(useStore.getState().tasks).toHaveLength(0);
	});

	it("only removes the targeted task", () => {
		useStore.getState().addTask(makeTask({ id: "1", title: "Keep me" }));
		useStore.getState().addTask(makeTask({ id: "2", title: "Delete me" }));
		useStore.getState().deleteTask("2");
		expect(useStore.getState().tasks).toHaveLength(1);
		expect(useStore.getState().tasks[0].id).toBe("1");
	});

	it("updates a task's status", () => {
		const task = makeTask({ status: "todo" });
		useStore.getState().addTask(task);
		useStore.getState().updateTask(task.id, { status: "done" });
		expect(useStore.getState().tasks[0].status).toBe("done");
	});

	it("updates a task's priority", () => {
		const task = makeTask({ priority: "low" });
		useStore.getState().addTask(task);
		useStore.getState().updateTask(task.id, { priority: "high" });
		expect(useStore.getState().tasks[0].priority).toBe("high");
	});

	it("does not change unrelated fields when updating a task", () => {
		const task = makeTask({
			title: "Original",
			priority: "high",
			status: "todo",
		});
		useStore.getState().addTask(task);
		useStore.getState().updateTask(task.id, { status: "done" });
		const updated = useStore.getState().tasks[0];
		expect(updated.title).toBe("Original");
		expect(updated.priority).toBe("high");
	});

	it("only updates the targeted task, not others", () => {
		useStore.getState().addTask(makeTask({ id: "1", status: "todo" }));
		useStore
			.getState()
			.addTask(makeTask({ id: "2", title: "Other task", status: "todo" }));
		useStore.getState().updateTask("1", { status: "done" });
		expect(useStore.getState().tasks.find((t) => t.id === "2")?.status).toBe(
			"todo",
		);
	});
});
