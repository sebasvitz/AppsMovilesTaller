window.onload = () => {
    const enlaces = document.querySelectorAll('.enlace');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el salto inmediato

            // Obtiene el destino del href
            const destino = document.querySelector(this.getAttribute('href'));

            // Scroll suave
            destino.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
};
