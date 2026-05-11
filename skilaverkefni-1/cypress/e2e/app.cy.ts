describe("Team Task Hub", () => {
	beforeEach(() => {
		cy.visit("/projects");
	});

	it("creates a project, adds a task and marks it as done", () => {
		// Create project
		cy.contains("Add Project").click();
		cy.get('input[name="name"]').type("My project");
		cy.contains("button", "Create Project").click();

		// Project card should appear
		cy.contains("My project").should("be.visible");

		// Go to project's tasks
		cy.contains("View Project").click();
		cy.url().should("include", "/tasks");

		// Add a task
		cy.contains("New Task").click();
		cy.get('input[name="title"]').type("Fix bug");
		cy.contains("button", "Add Task").click();

		// Task should appear
		cy.contains("Fix bug").should("be.visible");

		// Change task status to Done
		cy.contains("Todo").click();
		cy.get("[role='option']").contains("Done").click();

		// Status should update
		cy.contains("Done").should("be.visible");
	});
});
