describe("Homepage (E2E)", () => {
	it("should navigate to the login page", () => {
		cy.visit("/");
		cy.contains("Skrá inn").click();
		cy.url().should("include", "/login");
	});

	it("should show the dashboard after a successful login", () => {
		cy.visit("/login");

		cy.get("input").first().type("apa@rass.is");
		cy.get("input").last().type("password12345{enter}");

		cy.url().should("include", "/velkominn");
		cy.contains("Velkomin").should("be.visible");
	});
});
