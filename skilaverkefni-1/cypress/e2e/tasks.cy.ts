describe("Tasks", () => {
	beforeEach(() => {
		cy.visit("/projects");
		cy.contains("Add Project").click();
		cy.get('input[name="name"]').type("My project");
		cy.contains("button", "Create Project").click();
		cy.contains("View Project").click();
	});

	it("adds a task to a project", () => {
		cy.contains("New Task").click();
		cy.get('input[name="title"]').type("Fix bug");
		cy.contains("button", "Add Task").click();

		cy.contains("Fix bug").should("be.visible");
	});

	it("marks a task as done", () => {
		cy.contains("New Task").click();
		cy.get('input[name="title"]').type("Fix bug");
		cy.contains("button", "Add Task").click();

		cy.contains("Todo").click();
		cy.get("[role='option']").contains("Done").click();

		cy.contains("Done").should("be.visible");
	});

	it("deletes a task", () => {
		cy.contains("New Task").click();
		cy.get('input[name="title"]').type("Fix bug");
		cy.contains("button", "Add Task").click();

		cy.contains("Fix bug").should("be.visible");

		cy.get('[data-testid="DeleteOutlinedIcon"]').click();

		cy.contains("Fix bug").should("not.exist");
	});
});
