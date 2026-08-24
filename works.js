// Lista de imágenes con sus nombres de marca
const images = [
    { src: '/content/VirginiaIurinic1.jpg', name: 'Virginia Iurinic Joyas' },
    { src: '/content/VirginiaIurinic2.jpg', name: 'Virginia Iurinic Joyas' },
    { src: '/content/VirginiaIurinic3.jpg', name: 'Virginia Iurinic Joyas' },
    { src: '/content/VirginiaIurinic4.jpg', name: 'Virginia Iurinic Joyas' },
    { src: '/content/VirginiaIurinic5.jpg', name: 'Virginia Iurinic Joyas' },
    { src: '/content/Vertice (1).jpg', name: 'Vértice Automotores' },
    { src: '/content/Vertice (4).jpg', name: 'Vértice Automotores' },
    { src: '/content/Vertice (3).jpg', name: 'Vértice Automotores' },
    { src: '/content/Vertice (2).jpg', name: 'Vértice Automotores' },
    { src: '/content/chiply1 (1).jpg', name: 'Baterias Chiply' },
    { src: '/content/chiply1 (2).jpg', name: 'Baterias Chiply' },
    { src: '/content/chiply1 (3).jpg', name: 'Baterias Chiply' },
    { src: '/content/chiply1 (4).jpg', name: 'Baterias Chiply' },
    { src: '/content/chiply1 (5).jpg', name: 'Baterias Chiply' },
    { src: '/content/bacovino1.jpg', name: 'Vinoteca Baco' },
    { src: '/content/bacovino2.jpg', name: 'Vinoteca Baco' },
    { src: '/content/bacovino3.jpg', name: 'Vinoteca Baco' },
    { src: '/content/bacovino4.jpg', name: 'Vinoteca Baco' },
    { src: '/content/obermann (1).jpg', name: 'Neumáticos Obermann' },
    { src: '/content/obermann (2).jpg', name: 'Neumáticos Obermann' },
    { src: '/content/obermann (3).jpg', name: 'Neumáticos Obermann' },
    { src: '/content/obermann (4).jpg', name: 'Neumáticos Obermann' },
    { src: '/content/vipal (1).jpg', name: 'Vipal Cauchos' },
    { src: '/content/vipal (2).jpg', name: 'Vipal Cauchos' },
    { src: '/content/vipal (3).jpg', name: 'Vipal Cauchos' },
    { src: '/content/vipal (4).jpg', name: 'Vipal Cauchos' },
    { src: '/content/Futbol5 yaguarete (1).jpg', name: 'Yaguarete Fútbol' },
    { src: '/content/Futbol5 yaguarete (2).jpg', name: 'Yaguarete Fútbol' },
    { src: '/content/Futbol5 yaguarete (3).jpg', name: 'Yaguarete Fútbol' },
    { src: '/content/Futbol5 yaguarete (4).jpg', name: 'Yaguarete Fútbol' },
    { src: '/content/Futbol5 yaguarete (5).jpg', name: 'Yaguarete Fútbol' },
    { src: '/content/Futbol5 yaguarete (6).jpg', name: 'Yaguarete Fútbol' }
];

let currentIndex = 0;
const imagePlane = document.getElementById('image-plane');
const imageTitle = document.getElementById('image-title');

function fadeImage() {
    imagePlane.classList.remove('fade');
    void imagePlane.offsetWidth;
    imagePlane.classList.add('fade');
}

function loadImage(index) {
    const item = images[index];
    const preloader = new Image();
    const imageElement = document.getElementById('image-element');
    preloader.onload = function() {
        if (window.matchMedia('(max-width: 768px)').matches) {
            imagePlane.style.backgroundImage = `url('${item.src}')`;
        } else {
            imagePlane.style.backgroundImage = 'none';
        }
        imageElement.src = item.src;
        imageElement.alt = item.name;
        imageTitle.textContent = item.name;
        fadeImage();
    };
    preloader.onerror = function() {
        console.error('Error al cargar la imagen:', item.src);
    };
    preloader.src = item.src;
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    loadImage(currentIndex);
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    loadImage(currentIndex);
}

// Inicializar con la primera imagen
loadImage(0);

// Navegación con teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        showNextImage();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        showPrevImage();
    }
});

// Navegación con scroll (rueda del mouse)
let scrollTimeout;
document.addEventListener('wheel', function(e) {
    e.preventDefault();
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        if (e.deltaY > 0) {
            showNextImage();
        } else {
            showPrevImage();
        }
    }, 80);
}, { passive: false });

// Navegación táctil (swipe)
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    const absDiffX = Math.abs(diffX);
    const absDiffY = Math.abs(diffY);

    // Solo detectar swipe si el movimiento horizontal es mayor que el vertical
    if (absDiffX > absDiffY && absDiffX > 50) {
        if (diffX > 0) {
            showNextImage(); // swipe izquierda → siguiente
        } else {
            showPrevImage(); // swipe derecha → anterior
        }
    }
}

// Click en los lados de la pantalla para navegar
document.addEventListener('click', function(e) {
    const screenWidth = window.innerWidth;
    const clickX = e.clientX;

    if (clickX > screenWidth * 0.6) {
        showNextImage();
    } else if (clickX < screenWidth * 0.4) {
        showPrevImage();
    }
});