
// JavaScript para controlar el cambio automático de imágenes
let currentIndex = 0;
const images = document.querySelectorAll('.banner-img');
const radioButtons = document.querySelectorAll('.radio-button');

function showImage(index) {
    images.forEach((image, i) => {
        image.style.display = i === index ? 'block' : 'none';
    });
    radioButtons.forEach((radio, i) => {
        radio.checked = i === index;
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

// Cambiar automáticamente la imagen cada 3 segundos (ajusta según tus necesidades)
setInterval(nextImage, 3000);

// Mostrar la imagen correspondiente cuando se hace clic en un radiobutton
radioButtons.forEach((radio, i) => {
    radio.addEventListener('click', () => {
        currentIndex = i;
        showImage(currentIndex);
    });
});

// Mostrar la primera imagen al cargar la página
showImage(currentIndex);