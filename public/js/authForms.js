// assets/js/authForms.js

/**
 * Inicializa la validación del formulario de registro.
 */
function initializeRegisterForm() {
  console.log("Intentando inicializar formulario de registro...");
  const form = document.getElementById('register-form');

  if (form) {
      console.log(" - Formulario de registro encontrado. Añadiendo listener...");

      form.addEventListener('submit', function(event) {
     //     event.preventDefault();
          console.log("Submit interceptado (Registro).");
          clearErrors(form);
          let isValid = true;

          // Selectores y valores
          const nombreInput = document.getElementById('name');
          const apellidoInput = document.getElementById('lastname');
          const emailInput = document.getElementById('email');
          const telefonoInput = document.getElementById('phone');
          const passwordInput = document.getElementById('password');
          const confirmPasswordInput = document.getElementById('passwordconfirm');

          const nombre = nombreInput.value.trim();
          const apellido = apellidoInput.value.trim();
          const email = emailInput.value.trim();
          const telefono = telefonoInput.value.trim();
          const password = passwordInput.value;
          const confirmPassword = confirmPasswordInput.value;

          // Validación
          if (!nombre) { showError(nombreInput, 'error-nombre', 'El nombre es obligatorio.'); isValid = false; }
          if (!apellido) { showError(apellidoInput, 'error-apellido', 'El apellido es obligatorio.'); isValid = false; }
          if (!email) { showError(emailInput, 'error-email', 'El email es obligatorio.'); isValid = false; }
          else if (!isValidEmail(email)) { showError(emailInput, 'error-email', 'El formato del email no es válido.'); isValid = false; }
          if (!telefono) { showError(telefonoInput, 'error-telefono', 'El número de teléfono es obligatorio.'); isValid = false; }
          if (!password) { showError(passwordInput, 'error-password', 'La contraseña es obligatoria.'); isValid = false; }
          if (!confirmPassword) { showError(confirmPasswordInput, 'error-confirm-password', 'Debes confirmar la contraseña.'); isValid = false; }
          else if (password && confirmPassword !== password) { showError(confirmPasswordInput, 'error-confirm-password', 'Las contraseñas no coinciden.'); isValid = false; }

          // Resultado
          if (isValid) {
              console.log('Formulario válido (Registro). Enviando datos...');
              // Redirigir o limpiar formulario
          } else {
              console.log('Formulario inválido (Registro). Errores mostrados.');
          }
      });
  } else {
       console.log(" - Formulario de registro no encontrado en esta página.");
  }
}

// --------------------------------------------------
// Initialization Function for Login Form
// --------------------------------------------------
/**
 * Inicializa la validación del formulario de login.
 */
function initializeLoginForm() {
  console.log("Intentando inicializar formulario de login...");
  const form = document.getElementById('login-form');

  // Solo ejecutar si el formulario existe en esta página
  if (form) {
      console.log(" - Formulario de login encontrado. Añadiendo listener...");

      form.addEventListener('submit', function(event) {
         // event.preventDefault(); // Prevenir envío real
          console.log("Submit interceptado (Login).");

          // Limpiar errores previos
          clearErrors(form); // Reutilizamos la función helper

          let isValid = true;

          // Obtener valores
          const emailInput = document.getElementById('login-email');
          const passwordInput = document.getElementById('login-password');
          const email = emailInput.value.trim();
          const password = passwordInput.value;

          // --- Validación ---

          // Email obligatorio y formato
          if (!email) {
              showError(emailInput, 'error-login-email', 'El email es obligatorio.');
              isValid = false;
          } else if (!isValidEmail(email)) { // Reutilizamos helper
              showError(emailInput, 'error-login-email', 'El formato del email no es válido.');
              isValid = false;
          }

          // Contraseña obligatoria
          if (!password) {
              showError(passwordInput, 'error-login-password', 'La contraseña es obligatoria.');
              isValid = false;
          }

          // --- Si todo es válido ---
          if (isValid) {
              console.log('Formulario válido (Login). Iniciando sesión (simulado)...');
              // --- Aquí iría la llamada fetch() al backend para autenticar ---
              // Por ahora, podríamos redirigir al perfil:
              // window.location.href = 'perfil.html';
          } else {
              console.log('Formulario inválido (Login). Errores mostrados.');
          }
      });
  } else {
      console.log(" - Formulario de login no encontrado en esta página.");
  }
}

// --- Funciones de Ayuda para Validación --- (También van en este archivo)
function showError(inputElement, errorElementId, message) {
  const errorElement = document.getElementById(errorElementId);
  if (inputElement) inputElement.classList.add('input-error');
  if (errorElement) { errorElement.textContent = message; errorElement.classList.add('visible'); }
}

function clearErrors(formElement) {
  formElement.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
  formElement.querySelectorAll('.error-message').forEach(p => { p.textContent = ''; p.classList.remove('visible'); });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Puedes añadir aquí la función initializeLoginForm() cuando la creemos