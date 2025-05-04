// assets/js/productSection.js

/**
 * Inicializa la sección de productos populares (si existe en la página actual).
 * Carga datos, renderiza productos y paginación, añade listeners.
 */
function initializeProductSection() {
  console.log("Intentando inicializar sección de productos...");
  const productGrid = document.querySelector('.products-grid');
  const paginationContainer = document.querySelector('.pagination');

  if (productGrid && paginationContainer) {
      console.log(" - Contenedores de productos encontrados. Inicializando...");

      const perfumes = [ // Datos de ejemplo
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

      function renderProducts(page) {
         if (!productGrid) return; productGrid.innerHTML = '';
         const startIndex = (page - 1) * productsPerPage; const endIndex = startIndex + productsPerPage;
         const productsToShow = perfumes.slice(startIndex, endIndex);
         productsToShow.forEach(perfume => {
           const card = document.createElement('div'); card.classList.add('product-card');
           card.innerHTML = `
               <div class="product-image"> <img src="<span class="math-inline">\{perfume\.imageUrl\}" alt\="</span>{perfume.altText}"> </div>
               <div class="product-content">
                   <h3 class="product-title"><span class="math-inline">\{perfume\.name\}</h3\> <p class\="product\-price"\></span>{perfume.price}</p>
                   <button class="btn btn-dark btn-full add-to-cart-btn" data-id="<span class="math-inline">\{perfume\.id\}" data\-name\="</span>{perfume.name}">AGREGAR AL CARRITO</button>
               </div>`;
           productGrid.appendChild(card);
         });
         addCartButtonListeners();
      }

      function renderPagination() {
         if (!paginationContainer) return; const totalProducts = perfumes.length; const totalPages = Math.ceil(totalProducts / productsPerPage); paginationContainer.innerHTML = '';
         for (let i = 1; i <= totalPages; i++) { const dot = document.createElement('button'); dot.classList.add('pagination-dot'); dot.dataset.page = i; if (i === currentPage) { dot.classList.add('active'); }
           dot.addEventListener('click', (event) => { const newPage = parseInt(event.target.dataset.page); if (newPage !== currentPage) { currentPage = newPage; renderProducts(currentPage); document.querySelectorAll('.pagination-dot').forEach(d => d.classList.remove('active')); event.target.classList.add('active'); }});
           paginationContainer.appendChild(dot);
         }
      }

      function handleAddToCart(event) {
         const button = event.target; const productId = button.dataset.id; const productName = button.dataset.name;
         console.log(`Agregando al carrito (simulado): ID=<span class="math-inline">\{productId\}, Nombre\=</span>{productName}`);
         button.textContent = 'Agregado!'; button.disabled = true; setTimeout(() => { /* button.disabled = false; button.textContent = 'AGREGAR AL CARRITO'; */ }, 1500);
       }

      function addCartButtonListeners() {
         const cartButtons = productGrid.querySelectorAll('.add-to-cart-btn');
         cartButtons.forEach(button => { button.removeEventListener('click', handleAddToCart); button.addEventListener('click', handleAddToCart); });
      }

      renderProducts(currentPage);
      renderPagination();
      console.log(" - Sección de productos renderizada.");
  } else {
      console.log(" - Sección de productos no encontrada en esta página.");
  }
}