// assets/js/partialsLoader.js

/**
 * Carga contenido HTML desde una URL y lo inserta en un elemento por ID.
 * @param {string} url - La ruta al archivo HTML parcial (ej: '_header.html').
 * @param {string} elementId - El ID del elemento donde se insertará el HTML.
 * @returns {Promise} - Una promesa que se resuelve cuando el HTML es insertado.
 */
function loadHTML(url, elementId) {
  return fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Error al cargar ${url}: <span class="math-inline">\{response\.statusText\} \(</span>{response.status})`);
          }
          return response.text();
      })
      .then(html => {
          const element = document.getElementById(elementId);
          if (element) {
              element.innerHTML = html;
          } else {
              console.warn(`Elemento con ID '${elementId}' no encontrado en esta página.`);
          }
      });
}