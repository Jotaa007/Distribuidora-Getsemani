const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () =>{
    if (window.pageYOffset >100 ){
        toTop.classList.add("active")
    } else {
        toTop.classList.remove("active");
    }
    
})

// Asegúrate de que el script de Swiper esté incluido en tu HTML antes de este script

document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.card-wrapper', {
      loop: true,
      spaceBetween: 30,
    
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true, // Habilitar clic en los puntos de paginación
        dynamicBullets: true
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      breakpoints: {
        0:{
          slidesPerView: 1
        },
        768:{
          slidesPerView: 2
        },
        1024:{
          slidesPerView: 3
        },
      }
  });
});

// Array de productos
const catalog = [
  { name: "Toalla Para Manos", id: "toalla-para-manos" },
  { name: "Toalla de Manos", id: "toalla-de-manos" },
  { name: "Servilleta", id: "servilleta" },
  { name: "Stretch de Mueble", id: "stretch-de-mueble" },
  // Agrega todos los demás productos aquí...
];

// Selecciona el input y el contenedor de autocompletado
const searchInput = document.getElementById('dfd-searchbox-id-OOuMM-input');
const autocompleteResults = document.getElementById('autocomplete-results');

// Función para filtrar resultados
function filterResults(query) {
  return catalog.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
}

// Evento para manejar la entrada en el campo de búsqueda
searchInput.addEventListener('input', function() {
  const query = this.value;
  
  // Limpiar resultados anteriores
  autocompleteResults.innerHTML = '';
  
  if (query) {
      const results = filterResults(query);
      
      if (results.length > 0) {
          results.forEach(result => {
              const div = document.createElement('div');
              div.textContent = result.name;
              div.classList.add('autocomplete-item');
              
              // Evento para seleccionar un resultado
              div.addEventListener('click', function() {
                  // Redirige a la sección del catálogo correspondiente
                  const element = document.getElementById(result.id);
                  if (element) {
                      element.scrollIntoView({ behavior: 'smooth' }); // Desplaza suavemente a la sección
                  }
              });
              
              autocompleteResults.appendChild(div);
          });
          autocompleteResults.hidden = false; // Muestra los resultados
      } else {
          autocompleteResults.hidden = true; // Oculta si no hay resultados
      }
  } else {
      autocompleteResults.hidden = true; // Oculta si el input está vacío
  }
});

// Manejar el evento de "Enter"
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      const query = this.value;
      const results = filterResults(query);
      if (results.length > 0) {
          const firstResult = results[0]; // Toma el primer resultado
          const element = document.getElementById(firstResult.id);
          if (element) {
              element.scrollIntoView({ behavior: 'smooth' }); // Desplaza suavemente a la sección
          }
      }
  }
});

// Ocultar los resultados al hacer clic fuera del input
document.addEventListener('click', function(event) {
  if (!searchInput.contains(event.target) && !autocompleteResults.contains(event.target)) {
      autocompleteResults.hidden = true;
  }
});