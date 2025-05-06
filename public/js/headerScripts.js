// assets/js/headerScripts.js

/**
* Inicializa los listeners y funcionalidades del header (menú móvil, búsqueda).
* DEBE llamarse DESPUÉS de que _header.html haya sido cargado.
*/
function initializeHeaderScripts() {
  console.log("Intentando inicializar scripts del header...");
  const menuToggleButton = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const searchButton = document.querySelector('#header-placeholder .search-bar button');
  const searchInput = document.querySelector('#header-placeholder .search-bar input');

  // Menú Móvil Toggle
  if (menuToggleButton && mainNav) {
      menuToggleButton.addEventListener('click', () => {
          mainNav.classList.toggle('nav-active');
          const icon = menuToggleButton.querySelector('i');
          if (mainNav.classList.contains('nav-active')) {
              icon.classList.remove('fa-bars'); icon.classList.add('fa-times');
          } else {
              icon.classList.remove('fa-times'); icon.classList.add('fa-bars');
          }
      });
      console.log(" - Menu toggle inicializado.");
  } else {
      console.warn(" - Botón de menú (#menuToggle) o nav (#mainNav) no encontrados tras cargar header.");
  }

  // Funcionalidad básica de búsqueda (simulada)
  if (searchButton && searchInput) {
      searchButton.addEventListener('click', () => {
          const searchTerm = searchInput.value.trim();
          if (searchTerm) {
              console.log(`Buscando (simulado): ${searchTerm}`);
              alert(`Simulación: Buscarías "${searchTerm}"`);
              // Futuro: window.location.href = `productos.html?search=${encodeURIComponent(searchTerm)}`;
          } else {
              console.log("Término de búsqueda vacío.");
          }
      });
      searchInput.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
              event.preventDefault();
              searchButton.click();
          }
      });
      console.log(" - Búsqueda inicializada.");
  } else {
       console.warn(" - Botón o input de búsqueda no encontrados tras cargar header.");
  }
}