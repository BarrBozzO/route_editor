import dragAndDrop from "./dragAndDrop";

Cypress.Commands.add("dragAndDrop", { prevSubject: "optional" }, dragAndDrop);
