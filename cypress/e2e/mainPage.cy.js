describe("Main page test", () => {
  beforeEach(() => {
    cy.intercept(
      "https://api.apify.com/v2/datasets/XNfzEMoqfsLBT5bOT/items?token=apify_api_zvLd5bcc9q4naeNIcfU5X3oc9guZJo1npQcP",
      {
        method: "GET",
        fixture: "../fixtures/mainPage.json",
      }
    );
    cy.visit("http://localhost:3000/");
  });

  it("should see the header", () => {
    cy.get("header").should("be.visible");
  });

  it("header should contain two links", () => {
    cy.get("header").children("a").should("have.length", 2);
  });

  it("first link should take user to favorites page", () => {
    cy.get("header")
      .children("a")
      .eq(0)
      .should("have.attr", "href", "/favorites");
  });

  it("second link should take user to All stations page", () => {
    cy.get("header").children("a").eq(1).should("have.attr", "href", "/");
  });

  it("should contain input and select", () => {
    cy.get("#location-input").should("be.visible");
    cy.get("#fuel-type").should("be.visible");
  });

  it("should be able to search for a specific location", () => {
    cy.get("#location-input").type("Littleton");
    cy.get(".single-station-card")
      .eq(0)
      .should("contain", "Kum & Go")
      .and("contain", "11505 W Belleview Ave, Littleton, CO 80127")
      .and("contain", "Regular : $3.20");
  });

  it("should show error message if no stations found in given location", () => {
    cy.get("#location-input").type("Costa-Rica");
    cy.get("#location-error-message").should(
      "contain",
      "There are no stations found in the selected area"
    );
  });

  it("should have a container for stations", () => {
    cy.get(".all-station-container").should("be.visible");
  });

  it("station container should have childrens", () => {
    cy.get(".all-station-container")
      .children(".single-station-card")
      .should("have.length", 1);
  });

  it("should show Regular fuel prices by default", () => {
    cy.get("select[name='fuel-type']").contains("Regular fuel prices");
  });

  it("should change fuel-type value", () => {
    cy.get("select[name='fuel-type']").invoke("val").should("eq", "Regular");

    cy.get("select[name='fuel-type']")
      .select(1)
      .invoke("val")
      .should("eq", "Midgrade");

    cy.get(".single-station-card").eq(0).should("contain", "Midgrade : $3.50");
  });

  it("should take to details page when user clicks on name", () => {
    cy.get(".single-station-card").eq(0).should("contain", "Kum & Go");
    cy.get(".single-station-card").eq(0).contains("Kum & Go").click();
    cy.get(".details > h2").contains("Kum & Go");
  });

  it("should be able to favorite station by click", () => {
    cy.get("header").children("a").eq(0).click();
    cy.get(".no-fav-message").should("be.visible");
    cy.get("header").children("a").eq(1).click();
    cy.get(".single-station-card").eq(0).should("contain", "Kum & Go");
    cy.get(".heart-button").eq(0).click();
    cy.get("header").children("a").eq(0).click();
    cy.get(".fav-card").eq(0).should("contain", "Kum & Go");
  });
});
