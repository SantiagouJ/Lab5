document.addEventListener('DOMContentLoaded', function() {
    const productosContainer = document.getElementById('productos');

    // Función para obtener los datos del archivo JSON
    async function obtenerProductos() {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    }

    // Función para renderizar los productos en la página
    async function renderizarProductos() {
        const productos = await obtenerProductos();
        if (productos && productos.length > 0) {
            productos.forEach(producto => {
                const productoElemento = document.createElement('div');
                productoElemento.classList.add('producto');
                productoElemento.innerHTML = `
                    <img src="${producto.images[0]}" alt="${producto.title}">
                    <h3>${producto.title}</h3>
                    <p>${producto.description}</p>
                    <p>Precio: $${producto.price}</p>
                    <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                `;
                productosContainer.appendChild(productoElemento);
            });
        } else {
            console.error('No se encontraron productos.');
        }
    }

    // Llamamos a la función para renderizar los productos cuando se carga la página
    renderizarProductos();
});
