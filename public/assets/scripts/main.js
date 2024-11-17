const languageSwitcher = document.getElementById('languageSwitcher');
let currentLanguage = 'es';

// Carga de las traducciones desde los archivos JSON
async function loadTranslations(lang) {
  try {
    const response = await fetch(`./assets/locales/${lang}.json`);
    return response.json();
  } catch (error) {
    console.error('Error loading translations:', error);
    return {};
  }
}

// Aplicacion de las traducciones al HTML
function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });
}

// Cambio del idioma
async function changeLanguage(lang) {
  const translations = await loadTranslations(lang);
  applyTranslations(translations);
  currentLanguage = lang;
}

// Listener para cambiar el idioma
languageSwitcher.addEventListener('change', (e) => {
  changeLanguage(e.target.value);
});

// Inicializacion  del idioma por defecto
changeLanguage(currentLanguage);

// Escuchar los clics en el menú de navegación
document.querySelectorAll('.sections a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Creacion de un mapa y centrados en Lima (coordenadas aproximadas)
var map = L.map('map').setView([-12.0464, -77.0428], 12); // Lima, Perú

// Usar OpenStreetMap como capa del mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Coordenadas de ejemplo de los proveedores en Lima
var providers = [
    { name: "FestivaPro", lat: -12.0464, lng: -77.0428 }, 
    { name: "ArteFiesta", lat: -12.0600, lng: -77.0500 }, 
    { name: "Mundo Fiesta", lat: -12.0300, lng: -77.0800 },  
    { name: "FiestaVibe", lat: -12.0390, lng: -77.0360 },  
    { name: "GalaMaster", lat: -12.0525, lng: -77.0350 },  
    { name: "LuxeEventos", lat: -12.0740, lng: -77.0460 },  
    { name: "CelebrarX", lat: -12.0655, lng: -77.0735 },  
    { name: "GlamourParty", lat: -12.0250, lng: -77.0565 },  
    { name: "FiestaBrilla", lat: -11.9800, lng: -77.0710 },  
    { name: "EventosPlus", lat: -11.9655, lng: -77.0625 }  
];

// Adicion de los marcadores de los proveedores en el mapa
providers.forEach(function(provider) {
    L.marker([provider.lat, provider.lng]).addTo(map)
        .bindPopup("<b>" + provider.name + "</b>"); 
});

document.addEventListener('DOMContentLoaded', () => {
    const headerHeight = document.querySelector('header').offsetHeight; 
    const links = document.querySelectorAll('nav a'); 

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 

            const targetId = link.getAttribute('href').substring(1); 
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight, 
                    behavior: 'smooth', 
                });
            }
        });
    });
});
