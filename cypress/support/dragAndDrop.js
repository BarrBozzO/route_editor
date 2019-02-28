export default (subject, offset = { x: 0, y: 0 }) => {
  cy.clock(+new Date());

  cy.wrap(subject)
    .first()
    .then(element => {
      const coords = element[0].getBoundingClientRect();

      cy.wrap(element)
        .trigger("mousedown", {
          button: 0,
          clientX: coords.x,
          clientY: coords.y
        })
        .trigger("mousemove", {
          button: 0,
          clientX: coords.x + 5,
          clientY: coords.y
        })
        .tick(200);

      cy.get("body")
        .trigger("mousemove", {
          button: 0,
          clientX: coords.x + offset.x,
          clientY: coords.y + offset.y
        })
        .tick(200);

      cy.get("body").trigger("mouseup");
    });
};
