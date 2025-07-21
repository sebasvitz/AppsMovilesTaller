
document.addEventListener('DOMContentLoaded', function () {


    const campoTexto = document.getElementById('texto');
    const contadorElemento = document.getElementById('contador');

    function actualizarContador() {
        const texto = campoTexto.value;
        const cantidad = texto.length;
        contadorElemento.textContent = cantidad + ' caracteres';
    }


    campoTexto.addEventListener('input', actualizarContador);

});