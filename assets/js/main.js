// assets/js/main.js

// --------------------------------------------------
// Helper Function to Load HTML Partials
// --------------------------------------------------
/**
 * Carga contenido HTML desde una URL y lo inserta en un elemento por ID.
 * @param {string} url - La ruta al archivo HTML parcial (ej: '_header.html').
 * @param {string} elementId - El ID del elemento donde se insertará el HTML.
 * @returns {Promise} - Una promesa que se resuelve cuando el HTML es insertado.
 */
function loadHTML(url, elementId) {
  // Usamos fetch para obtener el contenido del archivo HTML
  return fetch(url)
      .then(response => {
          // Verificamos si la petición fue exitosa
          if (!response.ok) {
              throw new Error(`Error al cargar ${url}: ${response.statusText} (${response.status})`);
          }
          // Convertimos la respuesta a texto (el HTML)
          return response.text();
      })
      .then(html => {
          // Buscamos el elemento contenedor en el DOM
          const element = document.getElementById(elementId);
          if (element) {
              // Insertamos el HTML obtenido dentro del contenedor
              element.innerHTML = html;
          } else {
              // Advertimos si no se encuentra el contenedor (puede ser normal si no está en todas las páginas)
              console.warn(`Elemento con ID '${elementId}' no encontrado en esta página.`);
          }
      });
      // El .catch general de Promise.all manejará los errores de fetch
}

// --------------------------------------------------
// Initialization Function for Header Scripts
// --------------------------------------------------
/**
* Inicializa los listeners y funcionalidades del header (menú móvil, búsqueda).
* DEBE llamarse DESPUÉS de que _header.html haya sido cargado.
*/
function initializeHeaderScripts() {
  console.log("Intentando inicializar scripts del header..."); // Log para depuración
  const menuToggleButton = document.getElementById('menuToggle'); // Busca el botón dentro del header ya cargado
  const mainNav = document.getElementById('mainNav');             // Busca el nav dentro del header ya cargado
  // Usamos selectores que buscan DENTRO del header cargado para más seguridad
  const searchButton = document.querySelector('#header-placeholder .search-bar button');
  const searchInput = document.querySelector('#header-placeholder .search-bar input');

  // Menú Móvil Toggle
  if (menuToggleButton && mainNav) {
      menuToggleButton.addEventListener('click', () => {
          mainNav.classList.toggle('nav-active'); // Añade/quita la clase para mostrar/ocultar
          const icon = menuToggleButton.querySelector('i');
          // Cambia el icono entre barras y 'X'
          if (mainNav.classList.contains('nav-active')) {
              icon.classList.remove('fa-bars');
              icon.classList.add('fa-times');
          } else {
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
          }
      });
      console.log(" - Menu toggle inicializado."); // Confirmación
  } else {
      // Si no se encuentran, puede ser un error en _header.html o el ID
      console.warn(" - Botón de menú (#menuToggle) o nav (#mainNav) no encontrados tras cargar header.");
  }

  // Funcionalidad básica de búsqueda (simulada)
  if (searchButton && searchInput) {
      // Al hacer clic en el botón de buscar
      searchButton.addEventListener('click', () => {
          const searchTerm = searchInput.value.trim(); // Obtiene el texto y quita espacios extra
          if (searchTerm) {
              console.log(`Buscando (simulado): ${searchTerm}`);
              // Acción futura: Redirigir a página de resultados
              // window.location.href = `productos.html?search=${encodeURIComponent(searchTerm)}`;
              alert(`Simulación: Buscarías "${searchTerm}"`); // Muestra alerta temporal
          } else {
              console.log("Término de búsqueda vacío.");
          }
      });
      // Al presionar Enter en el campo de búsqueda
      searchInput.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
              event.preventDefault(); // Evita comportamiento por defecto (si lo hubiera)
              searchButton.click(); // Simula un clic en el botón
          }
      });
      console.log(" - Búsqueda inicializada."); // Confirmación
  } else {
       console.warn(" - Botón o input de búsqueda no encontrados tras cargar header.");
  }
}

// --------------------------------------------------
// Initialization Function for Products Section
// --------------------------------------------------
/**
* Inicializa la sección de productos populares (si existe en la página actual).
* Carga datos, renderiza productos y paginación, añade listeners.
*/
function initializeProductSection() {
  console.log("Intentando inicializar sección de productos..."); // Log para depuración
  // Busca los contenedores específicos de esta sección
  const productGrid = document.querySelector('.products-grid');
  const paginationContainer = document.querySelector('.pagination');

  // --- Solo ejecutar si AMBOS contenedores existen en la página actual ---
  if (productGrid && paginationContainer) {
      console.log(" - Contenedores de productos encontrados. Inicializando...");

      // --- Datos y Lógica de Productos Populares ---
      const perfumes = [
           { id: 1, name: "Aura Floral", price: "$1950 MX", imageUrl: "https://via.placeholder.com/300/FFC0CB/000000?text=Perfume+Rosa", altText: "Perfume rosa elegante" },
           { id: 2, name: "Citrus Dream", price: "$1950 MX", imageUrl: "https://via.placeholder.com/300/FFFFE0/000000?text=Perfume+Amarillo", altText: "Perfume amarillo vibrante" },
           { id: 3, name: "Ocean Breeze", price: "$1950 MX", imageUrl: "https://via.placeholder.com/300/E0FFFF/000000?text=Perfume+Transparente", altText: "Perfume transparente fresco" },
           { id: 4, name: "Golden Hour", price: "$1950 MX", imageUrl: "https://via.placeholder.com/300/FFD700/000000?text=Perfume+Dorado", altText: "Perfume dorado lujoso" },
           { id: 5, name: "Velvet Night", price: "$2100 MX", imageUrl: "https://via.placeholder.com/300/800080/FFFFFF?text=Perfume+Oscuro", altText: "Perfume oscuro misterioso" },
           { id: 6, name: "Spring Blossom", price: "$1850 MX", imageUrl: "https://via.placeholder.com/300/98FB98/000000?text=Perfume+Claro", altText: "Perfume claro floral" },
           { id: 7, name: "Spiced Wood", price: "$2200 MX", imageUrl: "https://via.placeholder.com/300/A0522D/FFFFFF?text=Perfume+Madera", altText: "Perfume amaderado especiado" },
           { id: 8, name: "Aqua Marine", price: "$1900 MX", imageUrl: "https://via.placeholder.com/300/ADD8E6/000000?text=Perfume+Azul", altText: "Perfume azul acuático" },
      ];
      const productsPerPage = 4;
      let currentPage = 1;

      // --- Funciones Internas --- (Definidas aquí para encapsulamiento)

      function renderProducts(page) {
         if (!productGrid) return; productGrid.innerHTML = ''; // Limpiar antes de añadir
         const startIndex = (page - 1) * productsPerPage;
         const endIndex = startIndex + productsPerPage;
         const productsToShow = perfumes.slice(startIndex, endIndex);
         productsToShow.forEach(perfume => {
           const card = document.createElement('div'); card.classList.add('product-card');
           card.innerHTML = `
               <div class="product-image">
                   <img src="${perfume.imageUrl}" alt="${perfume.altText}">
               </div>
               <div class="product-content">
                   <h3 class="product-title">${perfume.name}</h3>
                   <p class="product-price">${perfume.price}</p>
                   <button class="btn btn-dark btn-full add-to-cart-btn" data-id="${perfume.id}" data-name="${perfume.name}">
                       AGREGAR AL CARRITO
                   </button>
               </div>
           `;
           productGrid.appendChild(card);
         });
         addCartButtonListeners(); // Añadir listeners a los nuevos botones
      }

      function renderPagination() {
         if (!paginationContainer) return;
         const totalProducts = perfumes.length;
         const totalPages = Math.ceil(totalProducts / productsPerPage);
         paginationContainer.innerHTML = ''; // Limpiar antes de añadir
         for (let i = 1; i <= totalPages; i++) {
           const dot = document.createElement('button');
           dot.classList.add('pagination-dot');
           dot.dataset.page = i; // Guardar página en el botón
           if (i === currentPage) { dot.classList.add('active'); } // Marcar página actual
           // Listener para cambiar de página al hacer clic
           dot.addEventListener('click', (event) => {
               const newPage = parseInt(event.target.dataset.page);
               if (newPage !== currentPage) {
                   currentPage = newPage;
                   renderProducts(currentPage); // Re-renderizar productos
                   // Actualizar clase 'active' en los puntos
                   document.querySelectorAll('.pagination-dot').forEach(d => d.classList.remove('active'));
                   event.target.classList.add('active');
               }
           });
           paginationContainer.appendChild(dot);
         }
      }

      function handleAddToCart(event) {
         const button = event.target;
         const productId = button.dataset.id;
         const productName = button.dataset.name;
         console.log(`Agregando al carrito (simulado): ID=${productId}, Nombre=${productName}`);
         // Simulación visual
         button.textContent = 'Agregado!';
         button.disabled = true;
         setTimeout(() => {
             // Decide si quieres reactivar el botón o no
             // button.textContent = 'AGREGAR AL CARRITO';
             // button.disabled = false;
         }, 1500);
       }

      function addCartButtonListeners() {
         // Selecciona los botones DENTRO del grid de productos para evitar seleccionar otros
         const cartButtons = productGrid.querySelectorAll('.add-to-cart-btn');
         cartButtons.forEach(button => {
            // Limpia listeners antiguos antes de añadir nuevos (importante si se re-renderiza)
            button.removeEventListener('click', handleAddToCart);
            button.addEventListener('click', handleAddToCart);
         });
      }

      // --- Llamadas Iniciales ---
      renderProducts(currentPage);
      renderPagination();
      console.log(" - Sección de productos renderizada."); // Confirmación

  } else {
      // Mensaje si esta sección no está en la página actual
      console.log(" - Sección de productos no encontrada en esta página.");
  }
}


// --------------------------------------------------
// DOMContentLoaded Event Listener (Punto de Entrada Principal)
// --------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  // Este código se ejecuta cuando el HTML inicial está listo
  console.log("DOM cargado. Iniciando carga de parciales...");

  try {
      // Carga el header y el footer simultáneamente y espera a que ambos terminen
      await Promise.all([
          loadHTML('_header.html', 'header-placeholder'), // Asegúrate que _header.html está en la raíz o ajusta ruta
          loadHTML('_footer.html', 'footer-placeholder')  // Asegúrate que _footer.html está en la raíz o ajusta ruta
      ]);

      console.log("Parciales HTML (Header y Footer) cargados.");

      // --- Inicializa los scripts DESPUÉS de cargar los parciales ---
      // Es crucial llamar a esto aquí para que encuentre los elementos del header
      initializeHeaderScripts();

      // Llama a la inicialización de la sección de productos (solo actuará si la sección existe)
      initializeProductSection();

      // --- Puedes añadir llamadas a otras inicializaciones aquí ---
      // Ejemplo: Si tuvieras un formulario de contacto en contactanos.html:
      // if (document.getElementById('contact-form')) {
      //     initializeContactForm();
      // }

      console.log("Todos los scripts necesarios inicializados.");

  } catch (error) {
      // Captura errores si falla la carga de _header.html o _footer.html
      console.error("Error fatal durante la carga de parciales o inicialización de scripts:", error);
  }
}); // Fin de DOMContentLoaded