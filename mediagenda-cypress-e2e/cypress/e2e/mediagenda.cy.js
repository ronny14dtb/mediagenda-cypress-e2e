describe('MEDIAGENDA - Suite de Pruebas E2E Automatizadas (Cypress)', () => {
  const baseUrl = 'https://mediagenda.tdea.edu.co'; // Dominio base asignado al PPI

  // =========================================================================
  // CASO DE PRUEBA 1: Autenticación de Paciente (URL 1: /login)
  // =========================================================================
  it('TC_01 - Inicio de sesión válido y verificación de panel de usuario', () => {
    // Paso 1: Visitar URL de login
    cy.visit(`${baseUrl}/login`);

    // Paso 2: Validar URL esperada
    cy.url().should('eq', `${baseUrl}/login`);

    // Paso 3: Validar título de la página
    cy.title().should('eq', 'Iniciar Sesión | MediAgenda');

    // Paso 4: Validar presencia y visibilidad del logo
    cy.get('img.brand-logo').should('be.visible');

    // Paso 5: Validar propiedad CSS (color de fondo) del botón de submit
    cy.get('button[type="submit"]')
      .should('be.visible')
      .should('have.css', 'background-color', 'rgb(0, 102, 204)');

    // Paso 6: Ingresar credencial de usuario
    cy.get('input#username')
      .should('be.visible')
      .clear()
      .type('paciente_prueba');

    // Paso 7: Ingresar contraseña
    cy.get('input#password')
      .should('be.visible')
      .clear()
      .type('ClaveSegura2026*');

    // Paso 8: Marcar checkbox de términos/recordar sesión
    cy.get('input#rememberSession')
      .should('exist')
      .check()
      .should('be.checked');

    // Paso 9: Clic en botón de ingreso
    cy.get('button[type="submit"]').click();

    // Paso 10: Validar redirección exitosa al dashboard
    cy.url().should('include', '/dashboard');

    // Paso 11: Aserción de texto del mensaje de bienvenida
    cy.get('.welcome-banner')
      .should('be.visible')
      .and('contain.text', 'Bienvenido a MediAgenda');
  });

  // =========================================================================
  // CASO DE PRUEBA 2: Agendamiento de Cita Médica (URL 2: /citas/agendar)
  // =========================================================================
  it('TC_02 - Diligenciamiento de formulario de citas con dropdowns y estilos', () => {
    // Paso 1: Navegar a la URL de agendamiento
    cy.visit(`${baseUrl}/citas/agendar`);

    // Paso 2: Validar URL esperada
    cy.url().should('include', '/citas/agendar');

    // Paso 3: Validar título de la página
    cy.title().should('eq', 'Agendar Cita Médica | MediAgenda');

    // Paso 4: Validar estilo CSS (tipografía) del encabezado
    cy.get('h2.section-title')
      .should('be.visible')
      .should('have.css', 'font-family')
      .and('match', /Roboto|sans-serif|Segoe UI/);

    // Paso 5: Validar presencia del menú desplegable de especialidad
    cy.get('select#select-especialidad').should('be.visible');

    // Paso 6: Seleccionar especialidad en dropdown y validar valor
    cy.get('select#select-especialidad')
      .select('Medicina General')
      .should('have.value', 'medicina_general');

    // Paso 7: Validar presencia y seleccionar médico en segundo dropdown
    cy.get('select#select-medico')
      .should('be.visible')
      .select('Dr. Jhan Andrade')
      .should('have.value', 'doc_andrade');

    // Paso 8: Ingresar fecha de la consulta
    cy.get('input#fechaCita')
      .should('be.visible')
      .type('2026-11-15');

    // Paso 9: Seleccionar hora en menú de franjas
    cy.get('select#franja-horaria')
      .select('08:00 AM')
      .should('have.value', '08:00');

    // Paso 10: Diligenciar motivo de consulta en textarea
    cy.get('textarea#motivoConsulta')
      .should('be.visible')
      .type('Control médico general programado de rutina.');

    // Paso 11: Confirmar y enviar solicitud de cita
    cy.get('button#btn-confirmar-cita')
      .should('have.css', 'cursor', 'pointer')
      .click();

    // Paso 12: Validar mensaje de confirmación exitosa
    cy.get('.alert-success')
      .should('be.visible')
      .should('contain.text', 'Cita médica registrada con éxito');
  });

  // =========================================================================
  // CASO DE PRUEBA 3: Consulta y Filtrado de Disponibilidad (URL 3: /medicos/disponibilidad)
  // =========================================================================
  it('TC_03 - Consulta de disponibilidad de especialistas e inspección visual', () => {
    // Paso 1: Visitar la URL de disponibilidad de la clínica
    cy.visit(`${baseUrl}/medicos/disponibilidad`);

    // Paso 2: Validar la URL esperada
    cy.url().should('include', '/medicos/disponibilidad');

    // Paso 3: Validar título exacto de la pestaña
    cy.title().should('eq', 'Disponibilidad Médica | MediAgenda');

    // Paso 4: Validar presencia del campo de búsqueda
    cy.get('input#search-doctor')
      .should('be.visible')
      .type('Andrade');

    // Paso 5: Ejecutar acción de filtrado mediante botón
    cy.get('button#btn-buscar-agenda').click();

    // Paso 6: Validar dropdown de ordenamiento de resultados
    cy.get('select#sort-agenda')
      .should('exist')
      .select('horario-asc');

    // Paso 7: Validar presencia de tarjetas de resultados
    cy.get('.doctor-card')
      .should('have.length.greaterThan', 0)
      .first()
      .should('be.visible');

    // Paso 8: Validar presencia y carga de imagen del profesional
    cy.get('.doctor-card img.doctor-avatar')
      .first()
      .should('be.visible')
      .and('have.attr', 'src');

    // Paso 9: Validar estilo CSS (color de etiqueta de disponibilidad)
    cy.get('.doctor-card .badge-disponible')
      .first()
      .should('have.css', 'color', 'rgb(255, 255, 255)');

    // Paso 10: Hacer clic en ver detalle del horario
    cy.get('.doctor-card .btn-ver-detalle').first().click();

    // Paso 11: Validar aserción de texto en modal emergente
    cy.get('.modal-disponibilidad')
      .should('be.visible')
      .and('contain.text', 'Horarios Disponibles');
  });
});