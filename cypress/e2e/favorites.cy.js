describe("favorite page test", () => {
  beforeEach(() => {
    cy.intercept(
      "https://api.apify.com/v2/datasets/XNfzEMoqfsLBT5bOT/items?token=apify_api_zvLd5bcc9q4naeNIcfU5X3oc9guZJo1npQcP",
      {
        method: "GET",
        fixture: "../fixtures/mainPage.json",
      }
    );
    cy.visit("http://localhost:3000/favorites");
  });

  it("should have a message if no stations are favorited", () => {
    cy.get(".no-fav-message").contains(
      "You have no favorite gas stations yet!"
    );
  });

  it("should show favorite cards", () => {
    cy.get("header").children("a").eq(1).click();
    cy.get(".single-station-card").eq(0).should("contain", "Kum & Go");
    cy.get(".heart-button").eq(0).click();
    cy.get("header").children("a").eq(0).click();
    cy.get(".fav-card").eq(0).should("contain", "Kum & Go");
  });

  it("should remove favorite cards if fav button is clicked", () => {
    cy.get("header").children("a").eq(1).click();
    cy.get(".single-station-card").eq(0).should("contain", "Kum & Go");
    cy.get(".heart-button").eq(0).click();
    cy.get("header").children("a").eq(0).click();
    cy.get(".fav-card").eq(0).should("contain", "Kum & Go");
    cy.get(".heart-button").eq(0).click();
    cy.get(".no-fav-message").should("be.visible");
  });
});
