/* === FUNCIONES JAVASCRIPT === */
/* Función para compartir el enlace en móviles */
function compartirEnlace() {
  const url = window.location.href;
  const title = document.title || "Business Card";
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url
    }).catch(() => {
      alert("No se pudo compartir el enlace.");
    });
  } else {
    // Fallback para desktop o navegadores sin soporte
    navigator.clipboard.writeText(url);
    alert("Enlace copiado al portapapeles: " + url);
  }
}

/* Función para mostrar las locaciones */
function mostrarLocaciones() {
  const locationsBtn = document.getElementById('locations-btn');
  const locacionesDiv = document.getElementById('locaciones-expandidas');
  
  // Ocultar el botón de locations
  locationsBtn.style.display = 'none';
  
  // Insertar los botones de locaciones justo después del botón de locations
  locationsBtn.parentNode.insertBefore(locacionesDiv, locationsBtn.nextSibling);
  
  // Mostrar los botones de locaciones
  locacionesDiv.style.display = 'block';
}

function cerrarLocacionesPopup() {
  const locationsBtn = document.getElementById('locations-btn');
  const locacionesDiv = document.getElementById('locaciones-expandidas');
  
  // Ocultar los botones de locaciones
  locacionesDiv.style.display = 'none';
  
  // Mover el div de vuelta a su posición original (fuera del button-grid)
  document.body.appendChild(locacionesDiv);
  
  // Mostrar el botón de locations
  locationsBtn.style.display = 'flex';
}

/* Función para agregar contacto - Compatible con móviles */
function agregarContacto() {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Javier A. Estevez Díaz
N:Estevez;Javier A.;;;;
ORG:Beer Me Home - Beer Me Valhalla
TEL;TYPE=CELL:939-232-3317
EMAIL:beermehome@gmail.com
URL:https://hatechnologiespr.github.io/JavierEstevez/
NOTE:Taproom de Tapas y Cervezas Artesanales.
END:VCARD`;

  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Para dispositivos móviles, crear un enlace temporal y hacer click
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Javier_Estevez_Contacto.vcf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    // Limpiar después de un breve delay
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  } else {
    // Para desktop, usar el método tradicional
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Javier_Estevez_Contacto.vcf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}

// Carrusel de banners
const bannerImages = [
  'images/Banner1.png',
  'images/Banner2.png',
  'images/Banner3.png',
  'images/Banner4.png',
  'images/Banner5.png'
];
let currentBanner = 0;
function showNextBanner() {
  const banner = document.getElementById('banner-carousel');
  if (banner) {
    currentBanner = (currentBanner + 1) % bannerImages.length;
    banner.src = bannerImages[currentBanner];
  }
}
setInterval(showNextBanner, 5000);