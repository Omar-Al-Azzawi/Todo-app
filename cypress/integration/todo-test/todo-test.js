/* eslint-disable no-undef */
/* import cy from "cypress"; */
/// <reference types="cypress" />

describe("test todo app", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should override the current time", () => {
    const currentTime = new Date(2022, 3, 12).getTime();
    cy.clock(currentTime);
    cy.log(currentTime);
  });
  it("check the url", () => {
    cy.url().should("eq", "http://localhost:3000/");
    cy.url().then((url) => {
      cy.request(url).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
    cy.intercept("GET", "http://localhost:3000/").as("getTodos");
  });
  it("test hover on the add btn", () => {
    cy.get("[data-cy=todo-btn]")
      .realHover()
      .should("have.css", "opacity", "0.7");
  });
  it("test the input functionality", () => {
    cy.get("[data-cy=todo-input]").should(
      "have.attr",
      "placeholder",
      "Add todo..."
    );
    cy.get("[data-cy=todo-input]").type("Learn Cypress");
    cy.clock().then((clock) => {
      clock.tick(1000);
    });
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
    cy.get("[data-cy=todo-row]")
      .eq(0)
      .should("contain", "Learn more about Cypress");
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
  it("test the remove alert", () => {
    cy.get("[data-cy=delete-icon]").first().click();
    cy.on("window:alert", (str) => {
      expect(str).to.eq("Todo 1 removed");
    });
  });
  it("test the update todo", () => {
    cy.get("[data-cy=todo-input]").as("todoInput");
    cy.get("@todoInput").type("Learn Cypress");
    cy.get("[data-cy=todo-btn]").click();
    cy.get("[data-cy=todo-row]").should("have.length", 4);
    cy.get("[data-cy=edit-icon]").first().click();
    cy.get(':nth-child(2) > [data-cy="todo-input"]').type(
      "Learn more about Cypress"
    );
    cy.get(':nth-child(2) > [data-cy="todo-btn"]').click();
    cy.get("[data-cy=todo-row]").should("contain", "Learn more about Cypress");
  });
  it("test the todo css opacity", () => {
    cy.get("[data-cy=todo-row]").should("have.css", "opacity", "1");
    cy.get("[data-cy=todo-text]").first().click();
    cy.get("[data-cy=todo-row]").should("have.css", "opacity", "0.4");
  });
  it("log all the todo", () => {
    // use each to loop and to log all the todo
    cy.get("[data-cy=todo-row]").each(($el, index, $list) => {
      cy.log($el.text());
      if (index === $list.length - 1) {
        cy.log("All todo are listed");
      } else {
        cy.log("Not all todo are listed");
      }
    });
  });
  it("test the background color", () => {
    cy.get("[data-cy=todo-row]").should(
      "have.css",
      "background-color",
      "rgb(22, 26, 43)"
    );
    cy.get("[data-cy=todo-text]").first().click();
    cy.get("[data-cy=todo-row]").should(
      "have.css",
      "background-color",
      "rgb(22, 26, 43)"
    );
  });
  it("test the todo text color", () => {
    cy.get("[data-cy=todo-row]").should(
      "have.css",
      "color",
      "rgb(255, 255, 255)"
    );
    cy.get("[data-cy=todo-text]").first().click();
    cy.get("[data-cy=todo-row]").should(
      "have.css",
      "color",
      "rgb(255, 255, 255)"
    );
  });
  // test blur text
  it("test the clear text", () => {
    cy.get("[data-cy=todo-input]").type("Learn more about Cypress").clear();
    cy.get("[data-cy=todo-input]").should("have.value", "");
  });

  // test the document
  it("test the document", () => {
    cy.document().should("have.property", "title", "Todo App");
    cy.document().should("have.property", "charset", "UTF-8");
    cy.document().should("have.property", "contentType", "text/html");
    cy.document().should("have.property", "cookie", "");
    cy.document().should("have.property", "referrer", "");
  });
  // filter todo
  it("test the filter todo", () => {
    cy.get("[data-cy=todo-text]").first().click();
    cy.get("[data-cy=todo-row]").filter(".complete").should("have.length", 1);
  });
  it("test the url properties", () => {
    cy.hash().should("eq", "");
    cy.url().should("include", "/");
    cy.window().should("have.property", "location");
    cy.window().should((win) => {
      expect(win.location.pathname).to.eq("/");
      expect(win.location.hash).to.eq("");
      expect(win.location.search).to.eq("");
    });
  });
  it("test the reload", () => {
    cy.get("[data-cy=delete-icon]").first().click();
    cy.reload();
    cy.url().should("include", "/");
    cy.get("[data-cy=todo-row]").should("have.length", 3);
  });
  it("test the next function", () => {
    cy.get("[data-cy=todo-row]").should("have.length", 3);
    cy.get("[data-cy=todo-row]")
      .first()
      .nextUntil("[data-cy=todo-row]")
      .should("have.length", 0);
    cy.screenshot();
  });
  it.only("test the length of the todo list", () => {
    cy.get("[data-cy=todo-row]").should("have.length", 3);
    cy.get("[data-cy=todo-row]")
      .first()
      .nextUntil("[data-cy=todo-row]")
      .should("have.length", 0);
  });
});
