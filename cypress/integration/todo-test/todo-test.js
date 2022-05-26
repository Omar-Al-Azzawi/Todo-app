/* eslint-disable no-undef */
/* import cy from "cypress"; */
/// <reference types="cypress" />

describe("Todo app", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should add a todo", function () {
    cy.addTodo("Learn Cypress"); // create custom command to add todo
    cy.get('[data-cy="todo-row"]').should("have.length", 4);
  });
  it("should delete a todo", function () {
    cy.get('[data-cy="todo-row"]')
      .eq(0)
      .find('[data-cy="delete-icon"]')
      .click();
    cy.get('[data-cy="todo-row"]').should("have.length", 2);
  });
  it("should edit a todo", function () {
    cy.get('[data-cy="todo-row"]').eq(0).find('[data-cy="edit-icon"]').click();
    cy.get('[data-cy="todo-edit-input"]').type("Learn Robot Framework{enter}");
    cy.get('[data-cy="todo-row"]').should("have.length", 3);
  });
  it("should complete a todo", function () {
    cy.get('[data-cy="todo-text"]').eq(0).click();
    cy.get('[data-cy="todo-row"]').eq(0).should("have.class", "complete");
    cy.get('[data-cy="todo-text"]').first().click();
    cy.get('[data-cy="todo-row"]').first().should("not.have.class", "complete");
  });
  it("can completed all todos", function () {
    for (let i = 0; i < 3; i++) {
      cy.get('[data-cy="todo-text"]').eq(i).click();
    }
    cy.get('[data-cy="todo-row"]').should("have.length", 3);
    cy.get('[data-cy="todo-row"]').should("have.class", "complete");
  });
  it("can clear completed todos", function () {
    for (let i = 0; i < 3; i++) {
      cy.get('[data-cy="todo-text"]').eq(i).click();
    }
    cy.get('[data-cy="todo-row"]').should("have.length", 3);
    cy.get('[data-cy="todo-row"]').should("have.class", "complete");
    for (let i = 0; i < 3; i++) {
      cy.get('[data-cy="todo-text"]').eq(i).click();
    }
    cy.get('[data-cy="todo-row"]').should("not.have.class", "complete");
  });
  it("Can delete all todos", function () {
    for (let i = 0; i < 3; i++) {
      cy.get('[data-cy="todo-row"]')
        .eq(0)
        .find('[data-cy="delete-icon"]')
        .click();
    }
    cy.get('[data-cy="todo-row"]').should("have.length", 0);
  });
  it("should not add a todo if input is empty", function () {
    cy.addTodo("{enter}");
    cy.get('[data-cy="todo-row"]').should("have.length", 3);
  });
});
