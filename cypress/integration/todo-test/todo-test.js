/// <reference types="cypress" />

describe("test todo app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("test the input functionality", () => {
    cy.get("[data-cy=todo-input]").should(
      "have.attr",
      "placeholder",
      "Add todo"
    );
    cy.get("[data-cy=todo-input]").type("Learn Cypress");
    cy.get("[data-cy=todo-input]").should("have.value", "Learn Cypress");
    cy.get("[data-cy=todo-btn]").click();
  });
  it("test the todo list", () => {
    cy.get("[data-cy=todo-list]")
      .should("contain", "Learn Cypress")
      .and("contain", "Learn Redux")
      .and("contain", "Learn React");
  });
});
