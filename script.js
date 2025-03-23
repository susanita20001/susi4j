document.addEventListener('DOMContentLoaded', function () {
    // Cargar fecha automáticamente
    const fecha = new Date().toLocaleDateString();
    if (document.getElementById('fecha')) {
        document.getElementById('fecha').value = fecha;
    }

    // Calcular total de pizzas y complementos
    if (document.getElementById('calcular-total')) {
        document.getElementById('calcular-total').addEventListener('click', function () {
            const pizza1 = parseInt(document.getElementById('pizza1').value);
            const pizza2 = parseInt(document.getElementById('pizza2').value);
            const pizza3 = parseInt(document.getElementById('pizza3').value);

            const complementos = document.querySelectorAll('input[name="complementos"]:checked');
            let totalComplementos = 0;
            complementos.forEach(complemento => {
                totalComplementos += parseInt(complemento.value);
            });

            const total = pizza1 + pizza2 + pizza3 + totalComplementos;
            document.getElementById('total-pizzas').textContent = `Total de Pizzas: $${total}`;
        });
    }

    // Guardar datos y redirigir
    if (document.getElementById('pizzeria-form')) {
        document.getElementById('pizzeria-form').addEventListener('submit', function (event) {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const total = document.getElementById('total-pizzas').textContent.split('$')[1];
            const entrega = document.querySelector('input[name="entrega"]:checked').value;

            // Guardar detalles de las pizzas
            const pizza1 = document.getElementById('pizza1').options[document.getElementById('pizza1').selectedIndex].text;
            const pizza2 = document.getElementById('pizza2').options[document.getElementById('pizza2').selectedIndex].text;
            const pizza3 = document.getElementById('pizza3').options[document.getElementById('pizza3').selectedIndex].text;

            // Guardar complementos seleccionados
            const complementos = Array.from(document.querySelectorAll('input[name="complementos"]:checked')).map(c => c.nextSibling.textContent.trim());

            // Guardar en localStorage
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('total', total);
            localStorage.setItem('pizza1', pizza1);
            localStorage.setItem('pizza2', pizza2);
            localStorage.setItem('pizza3', pizza3);
            localStorage.setItem('complementos', JSON.stringify(complementos));

            // Redirigir
            if (entrega === 'local') {
                window.location.href = 'entregalocal.html';
            } else {
                window.location.href = 'envio.html';
            }
        });
    }

    // Cargar datos en entrega local
    if (window.location.pathname.includes('entregalocal.html')) {
        const nombre = localStorage.getItem('nombre');
        const total = localStorage.getItem('total');
        const pizza1 = localStorage.getItem('pizza1');
        const pizza2 = localStorage.getItem('pizza2');
        const pizza3 = localStorage.getItem('pizza3');
        const complementos = JSON.parse(localStorage.getItem('complementos'));

        // Mostrar nombre y total
        document.getElementById('nombre-cliente').value = nombre;
        document.getElementById('total-pedido').value = `$${total}`;

        // Mostrar detalles del pedido
        const detalles = `Pizza 1: ${pizza1}\nPizza 2: ${pizza2}\nPizza 3: ${pizza3}\nComplementos: ${complementos.join(', ')}`;
        document.getElementById('detalles-pedido').value = detalles;

        // Redirigir según el método de pago seleccionado
        document.getElementById('entrega-local-form').addEventListener('submit', function (event) {
            event.preventDefault();
            const pago = document.querySelector('input[name="pago"]:checked').value;

            if (pago === 'tarjeta') {
                window.location.href = 'tarjeta.html';
            } else if (pago === 'efectivo') {
                window.location.href = 'efectivo.html';
            } else {
                alert('Por favor, selecciona un método de pago.');
            }
        });
    }

    // Cargar datos en envío
    if (window.location.pathname.includes('envio.html')) {
        const nombre = localStorage.getItem('nombre');
        document.getElementById('nombre-cliente').value = nombre;

        document.getElementById('envio-form').addEventListener('submit', function (event) {
            event.preventDefault();
            const pago = document.querySelector('input[name="pago"]:checked').value;

            if (pago === 'tarjeta') {
                window.location.href = 'tarjeta.html';
            } else if (pago === 'efectivo') {
                window.location.href = 'efectivo.html';
            } else {
                alert('Por favor, selecciona un método de pago.');
            }
        });
    }

    // Cargar total en tarjeta.html
    if (window.location.pathname.includes('tarjeta.html')) {
        const total = localStorage.getItem('total');
        document.getElementById('total-pagar').value = `$${total}`;

        document.getElementById('tarjeta-form').addEventListener('submit', function (event) {
            event.preventDefault();
            window.location.href = 'final.html';
        });
    }

    // Calcular cambio en efectivo.html
    if (window.location.pathname.includes('efectivo.html')) {
        const total = localStorage.getItem('total');
        document.getElementById('total-pagar').value = `$${total}`;

        document.getElementById('cantidad-recibida').addEventListener('input', function () {
            const cantidadRecibida = parseFloat(document.getElementById('cantidad-recibida').value);
            const totalPagar = parseFloat(total);
            const cambio = cantidadRecibida - totalPagar;
            document.getElementById('cambio').value = `$${cambio.toFixed(2)}`;
        });

        document.getElementById('efectivo-form').addEventListener('submit', function (event) {
            event.preventDefault();
            window.location.href = 'final.html';
        });
    }
});