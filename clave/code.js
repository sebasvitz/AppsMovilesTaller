window.onload = () => {
    const teclado = document.getElementById('teclado');
    const inputClave = document.querySelector('.clave');

    function generarTeclado() {
        teclado.innerHTML = ''; // Limpia

        const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const mezclados = numeros.sort(() => Math.random() - 0.5);

        mezclados.forEach(num => {
            const btn = document.createElement('input');
            btn.type = 'button';
            btn.value = num;
            btn.className = 'tecla';
            // evento click
            btn.addEventListener('click', () => {
                if (inputClave.value.length < 6) {
                    inputClave.value += num;
                }
            });
            teclado.appendChild(btn);
        });

        // Botón borrar
        const btnBorrar = document.createElement('input');
        btnBorrar.type = 'button';
        btnBorrar.value = 'Borrar';
        btnBorrar.className = 'tecla borrar';
        btnBorrar.addEventListener('click', () => {
            inputClave.value = inputClave.value.slice(0, -1);
        });
        teclado.appendChild(btnBorrar);
    }

    generarTeclado();
};
