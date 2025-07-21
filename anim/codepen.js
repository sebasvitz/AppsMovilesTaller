
let sonidoAmbiente;
let sonidoActivo = false;

// Inicializar animaciones cuando la página cargue

window.addEventListener('load', function () {

    // Animación de la bicicleta moviéndose de lado a lado
    gsap.to("#bici", {
        x: 250,
        duration: 5,
        repeat: -1,
        yoyo: false,
        ease: "power1.inOut"
    });

    // SONIDOS DE AMBIENTE
    sonidoAmbiente = new Howl({
        // Opción 1
        src: ['https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'],
        loop: true,
        volume: 0.15,
        onloaderror: function () {
            console.log('Probando segunda opción...');
            sonidoAmbiente = new Howl({
                // Opción 2
                src: ['https://www.soundjay.com/misc/sounds/wind-chimes.wav'],
                loop: true,
                volume: 0.5,
                onloaderror: function () {
                    console.log('Sonido no disponible');
                }
            });
        }
    });
});

// Función para activar/desactivar el sonido
function toggleSonido() {
    const boton = document.getElementById('btnSonido');

    if (!sonidoActivo) {

        sonidoAmbiente.play();
        sonidoActivo = true;
        boton.textContent = '🔇 Silenciar Naturaleza';
        boton.style.backgroundColor = '#f44336';
        console.log('Sonido activado');
    } else {

        sonidoAmbiente.pause();
        sonidoActivo = false;
        boton.textContent = '🌿 Activar Sonidos de Naturaleza';
        boton.style.backgroundColor = '#4CAF50';
        console.log('Sonido pausado');
    }
}