fetch('/productos')
    .then(response => response.json())
    .then(productos => {
        const productosSection = document.getElementById('Novedades');

        productos.forEach((producto, index) => {
          // Chequear si el índice es menor que 8 para la primera sección
          // o mayor o igual a 8 para la segunda sección
          const esPrimeraSeccion = index < 8;

          // Crear el contenedor principal del producto
          const contenedor_producto = document.createElement("div");
          contenedor_producto.id = `contenedor_producto_${index + 1}`;
          contenedor_producto.className = "contenedor_producto";

          // Agregar los subcontenedores al contenedor principal del producto
          // Crear el subcontenedor para la imagen
          const imagen_div = document.createElement("div");
          imagen_div.id = `imagen_div_${index + 1}`;
          imagen_div.className = "imagen_div";

          // Crear el enlace
          const enlace = document.createElement("a");
          enlace.href = "carrito.html"; // Reemplaza 'ruta_de_tu_pagina_de_detalle.html' con la ruta correcta
          //enlace.target = "_blank"; // Opcional: abre el enlace en una nueva pestaña

          // Crear la imagen
          const imagen = document.createElement("img");
          imagen.src = producto.imagen; // Asegúrate de tener una columna 'imagen' en tu tabla PRODUCTO
          imagen.alt = producto.nombre;
          imagen.className = "imagen_producto";

          // Agregar la imagen al enlace
          enlace.appendChild(imagen);

          // Agregar la imagen al subcontenedor de la imagen
          imagen_div.appendChild(enlace);

          // Crear el subcontenedor para el precio
          const precio_div = document.createElement("div");
          precio_div.id = `precio_div_${index + 1}`;
          precio_div.className = "precio_div";

          // Crear el precio
          const pPrecio = document.createElement("p");
          pPrecio.textContent = "$" + producto.precio;

          // Agregar el precio al subcontenedor del precio
          precio_div.appendChild(pPrecio);

          // Crear el subcontenedor para la descripción
          const descripcion_div = document.createElement("div");
          descripcion_div.id = `descripcion_div_${index + 1}`;
          descripcion_div.className = "descripcion_div";

          // Crear la descripción
          const pDescripcion = document.createElement("p");
          pDescripcion.textContent = producto.descripcion;
          pDescripcion.className = "descripcion";

          // Agregar la descripción al subcontenedor de la descripción
          descripcion_div.appendChild(pDescripcion);

          // Crear el subcontenedor para el botón
          const boton_div = document.createElement("div");
          boton_div.id = `boton_div_${index + 1}`;
          boton_div.className = "boton_div";

          // Crear el botón
          const boton = document.createElement("button");
          boton.id = `boton_${index + 1}`;
          boton.className = "boton";
          boton.type = "button";
          boton.textContent = "Agregar al carrito";

          boton.dataset.nombre = producto.descripcion;
          boton.dataset.precio = producto.precio;
          // Asociar la función agregarAlCarrito al evento de clic del botón
          boton.addEventListener("click", function() {
            agregarAlCarrito(producto.descripcion, producto.precio, producto.imagen);
          });

          // Agregar el botón al subcontenedor del botón
          boton_div.appendChild(boton);


          contenedor_producto.appendChild(imagen_div);
          contenedor_producto.appendChild(precio_div);
          contenedor_producto.appendChild(descripcion_div);
          contenedor_producto.appendChild(boton_div);

          // Agregar el contenedor principal del producto a la sección de productos
          if (esPrimeraSeccion) {
            const primeraSeccion = document.getElementById("Novedades");
            primeraSeccion.appendChild(contenedor_producto);
          } else {
            const segundaSeccion = document.getElementById(
              "Productos_destacados"
            );
            segundaSeccion.appendChild(contenedor_producto);
          }

          // Verificar si es necesario agregar una hr después de cada conjunto de 4 elementos
          if ((index + 1) % 4 === 0) {
            const regla = document.createElement("hr");
            regla.className = "regla";

            if (esPrimeraSeccion) {
              const primeraSeccion = document.getElementById("Novedades");
              primeraSeccion.appendChild(regla);
            } else {
              const segundaSeccion = document.getElementById(
                "Productos_destacados"
              );
              segundaSeccion.appendChild(regla);
            }
          }
        });
    })
    .catch(error => console.error('Error al obtener la lista de productos:', error));

    /*function agregarAlCarrito(event) {
      var nombreProducto = event.target.dataset.nombre;
      var precioProducto = event.target.dataset.precio;
    
      // Almacenar detalles del producto en el almacenamiento local
      localStorage.setItem('nombreProducto', nombreProducto);
      localStorage.setItem('precioProducto', precioProducto);
    }*/


    function agregarAlCarrito(nombreProducto, precioProducto, imagenProducto) {
      // Obtener la lista de productos en el carrito del almacenamiento local
      var productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
    
      // Verificar si el producto ya está en el carrito
      var productoExistente = productosEnCarrito.find(producto => producto.nombre === nombreProducto);
    
      if (productoExistente) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        productoExistente.cantidad++;
      } else {
        // Si el producto no está en el carrito, agregarlo
        productosEnCarrito.push({
          nombre: nombreProducto,
          precio: precioProducto,
          imagen: imagenProducto,
          cantidad: 1
        });
      }
    
      // Actualizar la lista de productos en el almacenamiento local
      localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
    
      console.log('Producto agregado al carrito:', nombreProducto);
      alert('Producto agregado al carrito:', nombreProducto);
    }
    
    


