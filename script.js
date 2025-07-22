// ===== ESPERAR A QUE CARGUE LA PÁGINA =====
document.addEventListener('DOMContentLoaded', function () {
    console.log('🎮 Nintendo Game Page - Iniciando JavaScript...');

    // Inicializar todas las funcionalidades
    initializeGallery();
    initializeDropdowns();
    initializeLightbox();
    initializeInteractions();

    console.log('✅ Todas las funcionalidades cargadas');
});

// ===== GALERÍA DE IMÁGENES =====
function initializeGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');

    // Agregar evento click a cada thumbnail
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            changeMainImage(this);
        });
    });

    // También hacer clickeable la imagen principal para lightbox
    mainImage.addEventListener('click', function () {
        openLightbox(this.src);
    });
}

function changeMainImage(clickedThumbnail) {
    const mainImage = document.getElementById('mainImage');

    // Cambiar la imagen principal (hacerla más grande)
    const newSrc = clickedThumbnail.src.replace('w=164&h=92', 'w=656&h=369');
    mainImage.src = newSrc;

    // Quitar clase 'active' de todos los thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });

    // Agregar clase 'active' al thumbnail clickeado
    clickedThumbnail.classList.add('active');

    // Pequeña animación (nivel estudiante)
    mainImage.style.opacity = '0.7';
    setTimeout(() => {
        mainImage.style.opacity = '1';
    }, 200);
}

// ===== LIGHTBOX (MODAL PARA VER IMÁGENES GRANDES) =====
let currentImageIndex = 0;
let allImages = [];

function initializeLightbox() {
    // Obtener todas las imágenes para navegación
    allImages = Array.from(document.querySelectorAll('.thumbnail')).map(img =>
        img.src.replace('w=164&h=92', 'w=800&h=600')
    );

    // Event listeners para los botones del lightbox
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', prevImage);
    document.querySelector('.lightbox-next').addEventListener('click', nextImage);

    // Cerrar lightbox al hacer click fuera de la imagen
    document.getElementById('lightbox').addEventListener('click', function (e) {
        if (e.target === this) {
            closeLightbox();
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');

    // Encontrar el índice de la imagen actual
    const fullSizeSrc = imageSrc.replace('w=656&h=369', 'w=800&h=600');
    currentImageIndex = allImages.findIndex(img => img === fullSizeSrc);

    // Si no encuentra la imagen, usar la primera
    if (currentImageIndex === -1) currentImageIndex = 0;

    lightboxImage.src = fullSizeSrc;
    lightbox.style.display = 'flex';

    // Pequeña animación de entrada
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);

    console.log('📸 Lightbox abierto - Imagen:', currentImageIndex + 1);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');

    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300);

    console.log('❌ Lightbox cerrado');
}

function prevImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : allImages.length - 1;
    document.getElementById('lightboxImage').src = allImages[currentImageIndex];
    console.log('⬅️ Imagen anterior:', currentImageIndex + 1);
}

function nextImage() {
    currentImageIndex = currentImageIndex < allImages.length - 1 ? currentImageIndex + 1 : 0;
    document.getElementById('lightboxImage').src = allImages[currentImageIndex];
    console.log('➡️ Imagen siguiente:', currentImageIndex + 1);
}

// ===== DROPDOWNS DEL MENÚ =====
function initializeDropdowns() {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');

    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');

        // Efecto hover simple (como haría un estudiante)
        link.addEventListener('mouseenter', function () {
            this.style.backgroundColor = 'rgba(255,255,255,0.2)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '';
        });

        // Click en dropdown (simple alert para mostrar funcionalidad)
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const menuName = this.textContent.trim().split(' ')[0];
            showDropdownMessage(menuName);
        });
    });
}

function showDropdownMessage(menuName) {
    // Crear un mensaje temporal (nivel estudiante)
    const message = document.createElement('div');
    message.textContent = `🎮 ${menuName} menu clicked! (Dropdown functionality)`;
    message.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #e60012;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 9999;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(message);

    // Quitar el mensaje después de 2 segundos
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 2000);
}

// ===== INTERACCIONES ADICIONALES =====
function initializeInteractions() {
    // Botón de wishlist con efecto
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', toggleWishlist);
    }

    // Botón de descarga
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', simulateDownload);
    }

    // Read more button
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', toggleReadMore);
    }

    // Efecto hover en game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== FUNCIONES DE INTERACCIÓN =====
function toggleWishlist() {
    const icon = this.querySelector('i');
    const isInWishlist = icon.classList.contains('fas');

    if (isInWishlist) {
        icon.classList.remove('fas');
        icon.classList.add('far');
        showNotification('💔 Removed from wishlist');
    } else {
        icon.classList.remove('far');
        icon.classList.add('fas');
        showNotification('❤️ Added to wishlist!');
    }
}

function simulateDownload() {
    const btn = this;
    const originalText = btn.innerHTML;

    // Simular proceso de descarga
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Download Started!';
        btn.style.backgroundColor = '#28a745';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
        }, 2000);
    }, 1500);

    showNotification('🎮 Starting download... Check your library!');
}

function toggleReadMore() {
    const btn = this;
    const isExpanded = btn.textContent.includes('Read less');

    if (isExpanded) {
        btn.innerHTML = '<i class="fas fa-plus"></i> Read more';
        showNotification('📖 Description collapsed');
    } else {
        btn.innerHTML = '<i class="fas fa-minus"></i> Read less';
        showNotification('📖 Showing full description');
    }
}

// ===== SISTEMA DE NOTIFICACIONES =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 9999;
        font-size: 14px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animación de entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);

    // Quitar después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== FUNCIONES GLOBALES (para onclick en HTML) =====
function changeImage(thumbnail) {
    changeMainImage(thumbnail);
}

// ===== EASTER EGG (nivel estudiante) =====
let clickCount = 0;
document.addEventListener('click', function () {
    clickCount++;
    if (clickCount === 30) {
        showNotification('🎉 Easter Egg! You clicked 50 times! 🎮');
        console.log('🥚 Easter egg activated!');
    }
});

console.log('🎯 JavaScript loaded successfully - Nintendo Game Page by sebasvitz and NatyU');