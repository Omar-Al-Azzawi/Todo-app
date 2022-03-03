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
  it("test the length of the todo list", () => {
    cy.get("[data-cy=todo-row]").should("have.length", 3);
    cy.get("[data-cy=todo-input]").type("Learn more about Cypress");
    cy.get("[data-cy=todo-btn]").click();
    cy.get("[data-cy=todo-row]").should("have.length", 4);
  });
  it("test the complete todo", () => {
    cy.get("[data-cy=todo-row]").should("have.class", "todo-row");
    cy.get("[data-cy=todo-text]").first().click();
    // test if the todo is completed or not by check the class complete!
    cy.get("[data-cy=todo-row]").first().should("have.class", "complete");
  });
  it("test the remove todo", () => {
    cy.get("[data-cy=todo-row]").should("have.length", 3);
    cy.get("[data-cy=delete-icon]").first().click();
    cy.get("[data-cy=todo-row]").should("have.length", 2);
    cy.get("[data-cy=delete-icon]").first().click();
    cy.get("[data-cy=todo-row]").should("have.length", 1);
    cy.get("[data-cy=delete-icon]").first().click();
    cy.get("[data-cy=todo-row]").should("have.length", 0);
  });
  it("test the update todo", () => {
    cy.get("[data-cy=todo-input]").type("Learn Cypress");
    cy.get("[data-cy=todo-btn]").click();
    cy.get("[data-cy=todo-row]").should("have.length", 4);
    cy.get("[data-cy=edit-icon]").first().click();
    cy.get(':nth-child(2) > [data-cy="todo-input"]').type(
      "Learn more about Cypress"
    );
    cy.get(':nth-child(2) > [data-cy="todo-btn"]').click();
    cy.get("[data-cy=todo-row]").should("contain", "Learn more about Cypress");
  });
});
