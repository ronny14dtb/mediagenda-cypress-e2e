describe('PPI - Suite de Pruebas Automatizadas E2E (Sitio de Elección Libre)', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com';

  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  // =========================================================================
  // CASO DE PRUEBA 1: Autenticación y Validación de Elementos Visuales
  // URL 1: /web/index.php/auth/login
  // =========================================================================
  it('TC_01 - Inicio de sesión válido, validación de estilos CSS y panel principal', () => {
    // Paso 1: Visitar URL de login
    cy.visit(`${baseUrl}/web/index.php/auth/login`);

    // Paso 2: Validar URL esperada
    cy.url().should('include', '/auth/login');

    // Paso 3: Validar título de la página
    cy.title().should('eq', 'OrangeHRM');

    // Paso 4: Validar presencia y visibilidad del logo
    cy.get('img[alt="company-branding"]').should('be.visible');

    // Paso 5: Validar propiedad CSS (cursor pointer) en botón de submit
    cy.get('button[type="submit"]')
      .should('be.visible')
      .should('have.css', 'cursor', 'pointer');

    // Paso 6: Validar estilo CSS (color de fondo del botón principal)
    cy.get('button[type="submit"]')
      .should('have.css', 'background-color', 'rgb(255, 123, 29)');

    // Paso 7: Ingresar credencial de usuario
    cy.get('input[name="username"]')
      .should('be.visible')
      .clear()
      .type('Admin');

    // Paso 8: Ingresar contraseña
    cy.get('input[name="password"]')
      .should('be.visible')
      .clear()
      .type('admin123');

    // Paso 9: Validar texto informativo de ayuda (independiente del idioma)
    cy.get('.orangehrm-login-forgot p')
      .should('be.visible')
      .and('not.be.empty');

    // Paso 10: Clic en botón de ingreso
    cy.get('button[type="submit"]').click();

    // Paso 11: Validar redirección exitosa al dashboard
    cy.url().should('include', '/dashboard/index');

    // Paso 12: Aserción de texto del encabezado principal (independiente del idioma)
    cy.get('.oxd-topbar-header-breadcrumb-module')
      .should('be.visible')
      .and('not.be.empty');
  });

  // =========================================================================
  // CASO DE PRUEBA 2: Módulo Administrativo y Menús Desplegables
  // URL 2: /web/index.php/admin/viewSystemUsers
  // =========================================================================
  it('TC_02 - Navegación a módulo de administración, menús desplegables y filtros', () => {
    // Paso 1: Autenticación inicial
    cy.visit(`${baseUrl}/web/index.php/auth/login`);
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard/index');

    // Paso 2: Navegar a la segunda URL del dominio
    cy.visit(`${baseUrl}/web/index.php/admin/viewSystemUsers`);

    // Paso 3: Validar URL esperada
    cy.url().should('include', '/admin/viewSystemUsers');

    // Paso 4: Validar título de la página
    cy.title().should('eq', 'OrangeHRM');

    // Paso 5: Validar tipografía CSS del encabezado de filtros
    cy.get('h5.oxd-table-filter-title')
      .should('be.visible')
      .should('have.css', 'font-family')
      .and('match', /Nunito|sans-serif/);

    // Paso 6: Validar campo de texto de usuario y escribir
    cy.get('.oxd-form-row input').first()
      .should('be.visible')
      .type('Admin');

    // Paso 7: Interactuar con el menú desplegable (Dropdown)
    cy.get('.oxd-select-text').first().click();

    // Paso 8: Seleccionar primera opción válida del dropdown
    cy.get('[role="option"]').eq(1).click();

    // Paso 9: Validar estilo CSS (color de texto) del botón de búsqueda
    cy.get('button[type="submit"]')
      .should('have.css', 'color', 'rgb(255, 255, 255)');

    // Paso 10: Ejecutar acción de búsqueda
    cy.get('button[type="submit"]').click({ force: true });

    // Paso 11: Validar presencia de la tabla de resultados
    cy.get('.oxd-table-body', { timeout: 10000 }).should('be.visible');

    // Paso 12: Aserción de texto en la tarjeta/fila encontrada
    cy.get('.oxd-table-card')
      .should('have.length.greaterThan', 0)
      .first()
      .should('be.visible');
  });

  // =========================================================================
  // CASO DE PRUEBA 3: Catálogo de Empleados e Inspección Visual
  // URL 3: /web/index.php/pim/viewEmployeeList
  // =========================================================================
  it('TC_03 - Consulta de directorio, validación de avatares e inspección visual', () => {
    // Paso 1: Autenticación inicial
    cy.visit(`${baseUrl}/web/index.php/auth/login`);
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard/index');

    // Paso 2: Navegar a la tercera URL del dominio
    cy.visit(`${baseUrl}/web/index.php/pim/viewEmployeeList`);

    // Paso 3: Validar URL esperada
    cy.url().should('include', '/pim/viewEmployeeList');

    // Paso 4: Validar título de la página
    cy.title().should('eq', 'OrangeHRM');

    // Paso 5: Validar presencia de imagen de avatar de usuario
    cy.get('img.oxd-userdropdown-img')
      .should('be.visible')
      .and('have.attr', 'src');

    // Paso 6: Validar estilo CSS de la cabecera (color de fondo)
    cy.get('.oxd-topbar-header')
      .should('have.css', 'background-color', 'rgb(255, 146, 11)');

    // Paso 7: Validar input de ID de empleado y escribir
    cy.get('.oxd-form-row input').eq(1)
      .should('be.visible')
      .type('00');

    // Paso 8: Desplegar menú dropdown de estado de empleo
    cy.get('.oxd-select-text').first().click();

    // Paso 9: Seleccionar opción en el dropdown
    cy.get('[role="option"]').eq(1).click();

    // Paso 10: Ejecutar búsqueda con clic
    cy.get('button[type="submit"]').click({ force: true });

    // Paso 11: Validar existencia del contenedor de la tabla
    cy.get('.oxd-table-body', { timeout: 10000 }).should('exist');

    // Paso 12: Aserción de texto en la vista
    cy.get('.orangehrm-paper-container')
      .should('be.visible')
      .and('not.be.empty');
  });
});