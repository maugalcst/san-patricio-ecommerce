// assets/js/main.js

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM cargado. Iniciando carga de parciales...");

    // Asegurarse que la función loadHTML esté disponible globalmente
    // (porque partialsLoader.js se cargará antes en el HTML)
    if (typeof loadHTML !== 'function') {
        console.error("Error: La función loadHTML no está definida. Asegúrate de que partialsLoader.js se cargue antes que main.js en tu HTML.");
        return; // Detener si la función esencial no existe
    }

    try {
        // Espera a que AMBOS parciales se carguen usando la función de partialsLoader.js
        await Promise.all([
            loadHTML('_header.html', 'header-placeholder'),
            loadHTML('_footer.html', 'footer-placeholder')
        ]);

        console.log("Parciales HTML (Header y Footer) cargados.");

        // --- Llamar a las Funciones de Inicialización (definidas en otros archivos) ---

        // Llama a la inicialización del header (definida en headerScripts.js)
        if (typeof initializeHeaderScripts === 'function') {
            initializeHeaderScripts();
        } else {
            console.warn("La función initializeHeaderScripts no está definida (asegúrate que headerScripts.js está cargado).");
        }

        // Llama a la inicialización de la sección de productos (definida en productSection.js)
        // Solo actuará si los elementos necesarios existen en la página actual
        if (typeof initializeProductSection === 'function') {
            initializeProductSection();
        } else {
            console.warn("La función initializeProductSection no está definida (asegúrate que productSection.js está cargado si es necesario en esta página).");
        }

        // Llama a la inicialización del formulario de registro (definida en authForms.js)
        // Solo actuará si el formulario existe en la página actual
        if (typeof initializeRegisterForm === 'function') {
            initializeRegisterForm();
        } else {
             console.warn("La función initializeRegisterForm no está definida (asegúrate que authForms.js está cargado si es necesario en esta página).");
        }

        if (typeof initializeLoginForm === 'function') {
            initializeLoginForm(); // Llama a la inicialización del login
        } else {
            console.warn("initializeLoginForm no está definida (asegúrate que authForms.js está cargado si es necesario en esta página).");
        }


        // --- Puedes añadir llamadas a otras funciones de inicialización aquí ---
        // if (typeof initializeLoginForm === 'function') { initializeLoginForm(); }
        // etc.

        console.log("Llamadas a inicialización completadas.");

    } catch (error) {
        console.error("Error fatal durante la carga de parciales o inicialización de scripts:", error);
    }
}); // Fin de DOMContentLoaded