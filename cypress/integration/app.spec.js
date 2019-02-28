describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Adds a new waypoint on submit", () => {
    let waypointTestName = "test-waypoint-name";
    cy.get("input")
      .type(waypointTestName)
      .type("{enter}")
      .should("be.empty");

    cy.get(".waypoints__item")
      .should("have.length", 1)
      .contains(waypointTestName);
  });

  it("Remove a waypoint on click", () => {
    cy.get("input")
      .type("test")
      .type("{enter}");

    cy.get(".waypoints__item .btn")
      .should("have.length", 1)
      .click();

    cy.get(".waypoints__item").should("have.length", 0);
  });

  it("Should toggle sidebar", () => {
    // hide sidebar
    cy.get(".toggle-btn")
      .should("have.length", 1)
      .click()
      .should("have.class", "toggled")
      .contains("показать");

    cy.get(".d-flex").should("have.class", "toggled");

    // show sidebar
    cy.get(".toggle-btn")
      .should("have.length", 1)
      .should("have.class", "toggled")
      .click()
      .should("not.have.class", "toggled")
      .contains("скрыть");

    cy.get(".d-flex").should("not.have.class", "toggled");
  });

  it("Should drag and drop element", () => {
    // add 2 waypoints
    cy.get("input")
      .type("test1")
      .type("{enter}")
      .type("test2")
      .type("{enter}");

    // check waypoints
    cy.get(".waypoints__item").should("have.length", 2);

    // check first waypoint name = test1
    cy.get(".waypoints__item:nth-child(1) > .waypoints__item-name").contains(
      "test1"
    );

    // move first waypoint after the second one
    cy.get(".waypoints__item:nth-child(1)").dragAndDrop({
      x: 0,
      y: 70
    });

    // check last waypoint name = test1
    cy.get(".waypoints__item:nth-child(2) > .waypoints__item-name").contains(
      "test1"
    );
  });
});
