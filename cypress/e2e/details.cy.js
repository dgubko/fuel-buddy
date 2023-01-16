describe("details page test", () => {
  beforeEach(() => {
    cy.intercept(
      "https://api.apify.com/v2/datasets/XNfzEMoqfsLBT5bOT/items?token=apify_api_zvLd5bcc9q4naeNIcfU5X3oc9guZJo1npQcP",
      {
        method: "GET",
        fixture: "../fixtures/mainPage.json",
      }
    );
    cy.visit("http://localhost:3000/");
    cy.get(".single-station-card").eq(0).contains("Kum & Go").click();
  });

  it("should have title", () => {
    cy.get("h2").contains("Kum & Go");
  });

  it("should have address", () => {
    cy.get("h3").contains("11505 W Belleview Ave, Littleton, CO 80127");
  });

  it("should have review count", () => {
    cy.get(".details-review-count").contains("44");
  });

  it("should have a phone number", () => {
    cy.get(".details-phone-number").contains("Phone number: (303) 904-9338");
  });

  it("should have gas prices", () => {
    cy.get(".details-prices-section").should("be.visible");
    cy.get(".details-price").eq(0).should("contain", "Regular : $3.20");
    cy.get(".details-price").eq(1).should("contain", "Midgrade : $3.50");
    cy.get(".details-price").eq(2).should("contain", "Premium : $3.85");
    cy.get(".details-price").eq(3).should("contain", "Diesel : $4.10");
  });

  it("should be able to favorite and unfavorite station by click", () => {
    cy.get("header").children("a").eq(0).click();
    cy.get(".no-fav-message").should("be.visible");

    //Favoriting
    cy.get("header").children("a").eq(1).click();
    cy.get(".single-station-card").eq(0).click();
    cy.get("h2").should("contain", "Kum & Go");
    cy.get(".heart-button").click();
    cy.get("header").children("a").eq(0).click();
    cy.get(".fav-card").eq(0).should("contain", "Kum & Go");

    //Unfavoriting
    cy.get("header").children("a").eq(1).click();
    cy.get(".single-station-card").eq(0).click();
    cy.get(".heart-button").click();
    cy.get("header").children("a").eq(0).click();
    cy.get(".no-fav-message").should("be.visible");
  });

  it("should have a map with station location", () => {
    cy.get(".mapboxgl-canvas").should("be.visible");
  });
});
