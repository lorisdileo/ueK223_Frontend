describe("Blog Creation Test with User", () => {
  it("should create a new blog", () => {
    // Besuche die Homepage
    cy.visit("http://localhost:3000/");

    // Klicke auf den Login-Button
    cy.contains("Login").click();

    // Überprüfe, ob man auf der Loginpage ist
    cy.url().should("eq", "http://localhost:3000/login");

    // Gib die Benutzerdaten für den Admin ein
    cy.get("#email").type("ronaldo@example.com");
    cy.get("#password").type("1234");

    // Klicke auf den Sign-In-Button
    cy.contains("Sign in").click();

    // Überprüfe, ob die Anmeldung erfolgreich war und man auf der Homepage ist
    cy.url().should("eq", "http://localhost:3000/home");

    // Klicke auf den Button "Your Blog Posts"
    cy.contains("Your Blog Posts").click();

    // Überprüfe, ob man auf der Dashboard-Seite mit der Benutzer-ID ist
    cy.url().should("include", "http://localhost:3000/dashboard/1c5b661f-ac5d-436f-a839-941e611dcc41");

    // Klicke auf den "Add"-Button
    cy.contains("Add").click();

    // Überprüfe, ob man auf der Seite zum Erstellen eines neuen Blogs ist
    cy.url().should("eq", "http://localhost:3000/createBlog");

    // Fülle die Felder aus und klicke auf den "Add"-Button
    cy.get('#title').type("Mein erster Blog");
    cy.get('#text').type("Ronaldo is the GOAT");
    cy.get('#category').type("Sport");
    cy.contains("Add").click();

    // Überprüfe, ob der Blog erfolgreich erstellt wurde
    cy.url().should("include", "http://localhost:3000/dashboard/1c5b661f-ac5d-436f-a839-941e611dcc41");
  });
});

describe("Blog Creation Test with Admin", () => {
    it("should create a new blog", () => {
      // Besuche die Homepage
      cy.visit("http://localhost:3000/");
  
      // Klicke auf den Login-Button
      cy.contains("Login").click();
  
      // Überprüfe, ob man auf der Loginpage ist
      cy.url().should("eq", "http://localhost:3000/login");
  
      // Gib die Benutzerdaten für den Admin ein
      cy.get("#email").type("admin@example.com");
      cy.get("#password").type("1234");
  
      // Klicke auf den Sign-In-Button
      cy.contains("Sign in").click();
  
      // Überprüfe, ob die Anmeldung erfolgreich war und man auf der Homepage ist
      cy.url().should("eq", "http://localhost:3000/home");
  
      // Klicke auf den Button "Your Blog Posts"
      cy.contains("Your Blog Posts").click();
  
      // Überprüfe, ob man auf der Dashboard-Seite mit der Benutzer-ID sind
      cy.url().should("include", "http://localhost:3000/dashboard/ba804cb9-fa14-42a5-afaf-be488742fc54");
  
      // Klicke auf den "Add"-Button
      cy.contains("Add").click();
  
      // Überprüfe, ob man auf der Seite zum Erstellen eines neuen Blogs ist
      cy.url().should("eq", "http://localhost:3000/createBlog");
  
      // Fülle die Felder aus und klicke auf den "Add"-Button
      cy.get('#title').type("Mein Blog");
      cy.get('#text').type("Neymar is the GOAT");
      cy.get('#category').type("Sport1");
      cy.contains("Add").click();
  
      // Überprüfe, ob der Blog erfolgreich erstellt wurde
      cy.url().should("include", "http://localhost:3000/dashboard/ba804cb9-fa14-42a5-afaf-be488742fc54");
    });
  });


