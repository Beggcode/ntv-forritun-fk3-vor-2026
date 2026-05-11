describe("Projects", () => {
	beforeEach(() => {
		cy.visit("/projects");
	});

	it("creates a new project", () => {
		cy.contains("Add Project").click();
		cy.get('input[name="name"]').type("My project");
		cy.contains("button", "Create Project").click();

		cy.contains("My project").should("be.visible");
	});

	it("deletes a project", () => {
		cy.contains("Add Project").click();
		cy.get('input[name="name"]').type("My project");
		cy.contains("button", "Create Project").click();

		cy.contains("My project").should("be.visible");

		cy.get('[data-testid="DeleteIcon"]').click();

		cy.contains("My project").should("not.exist");
	});
});
