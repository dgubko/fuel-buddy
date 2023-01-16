describe("Page404", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/notexist");
  });

  it("should have a message", () => {
    cy.get("h1").should("contain", "Sorry page does not exist");
  });

  it("should have a go back button that brings to main page", () => {
    cy.get("#go-back-button").click();
    cy.get(".all-station-container").should("be.visible");
  });
});
