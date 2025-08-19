let categorias = [];
// Obtenemos la lista de categorías y productos
const url = "data/data.json";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    categorias = data;

    if (document.getElementById("categorias")) {
      renderizarCategorias();
    }
    if (document.getElementById("productos")) {
      renderizarProductos();
    }

    if (document.getElementById("listado-productos")) {
      cargarListaDesdeLocalStorage();
    }

    if (document.getElementById("listado-completo")) {
      crearChecklist();
    }

    if (document.getElementById("limpiar")) {
      document
        .getElementById("limpiar")
        .addEventListener("click", limpiarLista);
    }

    if (document.getElementById("imprimir")) {
      document
        .getElementById("imprimir")
        .addEventListener("click", imprimirLista);
    }
  })
  .catch((error) => console.error("Error al cargar los datos:", error));

// Función flecha para renderizar las categorías
const renderizarCategorias = () => {
  const contenedorCategorias = document.getElementById("categorias");
  contenedorCategorias.innerHTML = "";

  categorias.forEach((categoria) => {
    const categoriaCard = document.createElement("article");
    categoriaCard.setAttribute("title", categoria.nombre);
    categoriaCard.classList.add("categoria-card");
    categoriaCard.setAttribute("data-categoria-objetivo", categoria.nombre);

    const imagenCategoria = document.createElement("img");
    imagenCategoria.src = categoria.imagen;
    imagenCategoria.alt = categoria.nombre;

    // const tituloCategoria = document.createElement("h3");
    // tituloCategoria.textContent = categoria.nombre;

    categoriaCard.appendChild(imagenCategoria);
    // categoriaCard.appendChild(tituloCategoria);
    contenedorCategorias.appendChild(categoriaCard);
  });
  const todas = document.createElement("article");
  todas.setAttribute("title", "Todas");
  todas.classList.add("categoria-card");
  todas.setAttribute("data-categoria-objetivo", "Todas");
  const imgTodas = document.createElement("img");
  imgTodas.src = "img/categorias/todas.webp";
  imgTodas.alt = "Todas";
  // const tituloTodas = document.createElement("h3");
  // tituloTodas.textContent = "Todas";
  todas.appendChild(imgTodas);
  // todas.appendChild(tituloTodas);
  contenedorCategorias.appendChild(todas);
};

const renderizarProductos = () => {
  const contenedorProductos = document.getElementById("productos");
  contenedorProductos.innerHTML = "";

  categorias.forEach((categoria) => {
    categoria.productos.forEach((producto) => {
      const productoItem = document.createElement("article");
      productoItem.classList.add("producto-item");
      productoItem.setAttribute("data-categoria", categoria.nombre);

      const categoriaProducto = document.createElement("span");
      categoriaProducto.classList.add("categoria");
      categoriaProducto.textContent = categoria.nombre;

      const imagenProducto = document.createElement("img");
      imagenProducto.src = producto.imagen;
      imagenProducto.alt = producto.nombre;

      const nombreProducto = document.createElement("span");
      nombreProducto.classList.add("nombre");
      nombreProducto.textContent = producto.nombre;

      const controlesCantidad = document.createElement("div");
      controlesCantidad.classList.add("cantidad-controles");

      const botonMenos = document.createElement("button");
      botonMenos.classList.add("menos");
      botonMenos.textContent = "–";

      const inputCantidad = document.createElement("input");
      inputCantidad.id = `cantidad-${producto.id}`;
      inputCantidad.type = "number";
      inputCantidad.value = "0";
      inputCantidad.min = "0";
      inputCantidad.classList.add("inputCantidad");

      const botonMas = document.createElement("button");
      botonMas.classList.add("mas");
      botonMas.textContent = "+";

      controlesCantidad.appendChild(botonMenos);
      controlesCantidad.appendChild(inputCantidad);
      controlesCantidad.appendChild(botonMas);

      productoItem.appendChild(categoriaProducto);
      productoItem.appendChild(imagenProducto);
      productoItem.appendChild(nombreProducto);
      productoItem.appendChild(controlesCantidad);
      contenedorProductos.appendChild(productoItem);
    });
  });
};

const actualizarListaCompras = () => {
  const listadoProductos = document.getElementById("listado-productos");
  listadoProductos.innerHTML = "";

  let productosAgregados = 0;

  categorias.forEach((categoria) => {
    categoria.productos.forEach((producto) => {
      const inputCantidad = document.getElementById(`cantidad-${producto.id}`);
      const cantidad = parseInt(inputCantidad.value);

      if (cantidad > 0) {
        productosAgregados++;

        const itemLista = document.createElement("li");
        itemLista.textContent = `${producto.nombre} (${cantidad})`;

        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("eliminar");
        botonEliminar.textContent = "x";
        botonEliminar.addEventListener("click", () => {
          inputCantidad.value = "0";
          actualizarListaCompras();
        });

        itemLista.appendChild(botonEliminar);
        listadoProductos.appendChild(itemLista);
      }
    });
  });

  if (productosAgregados === 0) {
    const itemVacio = document.createElement("li");
    itemVacio.textContent = "No hay productos en la lista.";
    listadoProductos.appendChild(itemVacio);
  }
};

const guardarListaEnLocalStorage = () => {
  const lista = {};
  categorias.forEach((categoria) => {
    categoria.productos.forEach((producto) => {
      const inputCantidad = document.getElementById(`cantidad-${producto.id}`);
      if (inputCantidad) {
        const cantidad = parseInt(inputCantidad.value);
        if (cantidad > 0) {
          lista[producto.id] = cantidad;
        }
      }
    });
  });
  localStorage.setItem("listaCompras", JSON.stringify(lista));
};

const cargarListaDesdeLocalStorage = () => {
  const listaGuardada = JSON.parse(localStorage.getItem("listaCompras"));
  if (listaGuardada) {
    categorias.forEach((categoria) => {
      categoria.productos.forEach((producto) => {
        const inputCantidad = document.getElementById(
          `cantidad-${producto.id}`
        );
        if (listaGuardada[producto.id]) {
          inputCantidad.value = listaGuardada[producto.id];
        } else {
          inputCantidad.value = "0";
        }
      });
    });
    actualizarListaCompras();
  }
};

const limpiarLista = () => {
  categorias.forEach((categoria) => {
    categoria.productos.forEach((producto) => {
      const inputCantidad = document.getElementById(`cantidad-${producto.id}`);
      inputCantidad.value = "0";
    });
  });
  actualizarListaCompras();
  localStorage.removeItem("listaCompras");
};

const crearChecklist = () => {
  const listaGuardada = JSON.parse(localStorage.getItem("listaCompras"));
  const listadoCompleto = document.getElementById("listado-completo");
  listadoCompleto.innerHTML = "";
  // Verificamos si hay productos en la lista
  if (listaGuardada && Object.keys(listaGuardada).length > 0) {
    // Iteramos sobre cada producto en la lista guardada
    for (const [id, cantidad] of Object.entries(listaGuardada)) {
      const producto = categorias
        .flatMap((c) => c.productos)
        .find((p) => p.id == id);
      if (producto) {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="left">
                <input type="checkbox" name="${producto.nombre}" id="${producto.nombre}ID">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <label for="${producto.nombre}ID">${producto.nombre}</label>
            </div>
            <span class="cantidad">${cantidad}</span>
          `;
        listadoCompleto.appendChild(li);
      }
    }
  } else {
    listadoCompleto.innerHTML = "<li>No hay productos en la lista.</li>";
  }
};

// preparamos lista para imprimir en impresora y abrimos el dialogo de impresion
const imprimirLista = () => {
  window.print();
};

// Esperar a que el DOM esté completamente cargado

document.addEventListener("DOMContentLoaded", () => {
  // Filtrado de productos por categoría

  document.querySelectorAll(".categoria-card").forEach((card) => {
    card.addEventListener("click", () => {
      const categoriaSeleccionada = card.getAttribute(
        "data-categoria-objetivo"
      );
      if (categoriaSeleccionada === "Todas") {
        document.querySelectorAll(".producto-item").forEach((producto) => {
          producto.style.display = "block";
        });
      } else {
        document.querySelectorAll(".producto-item").forEach((producto) => {
          if (
            producto.getAttribute("data-categoria") === categoriaSeleccionada
          ) {
            producto.style.display = "block";
          } else {
            producto.style.display = "none";
          }
        });
      }
    });
  });

  // Manejo de botones + y - para ajustar cantidades
  document.querySelectorAll(".producto-item").forEach((item) => {
    const botonMas = item.querySelector(".mas");
    const botonMenos = item.querySelector(".menos");
    const inputCantidad = item.querySelector(".inputCantidad");

    botonMas.addEventListener("click", () => {
      inputCantidad.value = parseInt(inputCantidad.value) + 1;
      actualizarListaCompras();
    });

    botonMenos.addEventListener("click", () => {
      inputCantidad.value = Math.max(0, parseInt(inputCantidad.value) - 1);
      actualizarListaCompras();
    });
  });

  // Cuando cambia el valor del input, actualizar la lista de compras
  document
    .querySelectorAll(".producto-item .inputCantidad")
    .forEach((input) => {
      input.addEventListener("change", () => {
        actualizarListaCompras();
      });
    });

  if (!document.getElementById("enviarPorWhatsapp")) return;
  const botonEnviar = document.getElementById("enviar");
  const modal = document.getElementById("enviarPorWhatsapp");
  const botonCerrar = document.querySelector(".modal .close");

  botonEnviar.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  botonCerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Enviar la lista por WhatsApp
  const botonEnviarWhatsApp = document.getElementById("confirmar-enviar");
  botonEnviarWhatsApp.addEventListener("click", () => {
    const numeroWhatsApp = document.getElementById("numero-whatsapp").value;
    const listaCompleta = [];
    // obtenemos el listado de productos del localStorage
    const listaGuardada = JSON.parse(localStorage.getItem("listaCompras"));
    if (listaGuardada) {
      for (const [id, cantidad] of Object.entries(listaGuardada)) {
        const producto = categorias
          .flatMap((c) => c.productos)
          .find((p) => p.id == id);
        if (producto) {
          listaCompleta.push(`\n[  ] ${producto.nombre} (${cantidad})`);
        }
      }
    }

    const mensaje = `Lista de Compras:\n${listaCompleta.join("\n\n")}`;
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(urlWhatsApp, "_blank");
    modal.style.display = "none";
  });
});

if (document.getElementById("productos")) {
  document.getElementById("productos").addEventListener("click", (e) => {
    if (e.target.classList.contains("mas")) {
      const input = e.target.parentElement.querySelector(".inputCantidad");
      input.value = parseInt(input.value) + 1;
      actualizarListaCompras();
      guardarListaEnLocalStorage();
    }

    if (e.target.classList.contains("menos")) {
      const input = e.target.parentElement.querySelector(".inputCantidad");
      input.value = Math.max(0, parseInt(input.value) - 1);
      actualizarListaCompras();
      guardarListaEnLocalStorage();
    }
  });

  // También escuchar cambios directos en los inputs dinámicos
  document.getElementById("productos").addEventListener("change", (e) => {
    if (e.target.classList.contains("inputCantidad")) {
      actualizarListaCompras();
      guardarListaEnLocalStorage();
    }
  });
}

// mostramos y ocultamos el aside
if (document.querySelector(".aside-toggle")) {
  document.querySelector(".aside-toggle").addEventListener("click", () => {
    const aside = document.querySelector("aside");
    aside.classList.toggle("open");
    // si existe la clase open
    if (aside.classList.contains("open")) {
      document
        .querySelector(".aside-toggle .derecha")
        .setAttribute("style", "display: flex;");
      document
        .querySelector(".aside-toggle .izquierda")
        .setAttribute("style", "display: none;");
    } else {
      document
        .querySelector(".aside-toggle .derecha")
        .setAttribute("style", "display: none;");
      document
        .querySelector(".aside-toggle .izquierda")
        .setAttribute("style", "display: flex;");
    }
  });
}
