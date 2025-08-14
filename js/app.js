// creamos un objeto para almacenar los productos desde el JSON
const categorias = [
  {
    nombre: "Limpieza",
    imagen: "img/categorias/limpieza.webp",
    productos: [
      { id: 1, nombre: "Lavandina", imagen: "img/productos/lavandina.webp" },
      {
        id: 2,
        nombre: "Jabón para ropa",
        imagen: "img/productos/jabon-ropa.webp",
      },
      {
        id: 3,
        nombre: "Suavizante para ropa",
        imagen: "img/productos/suavisante.webp",
      },
      { id: 4, nombre: "Detergente", imagen: "img/productos/detergente.webp" },
      {
        id: 5,
        nombre: "Limpiador de pisos",
        imagen: "img/productos/limpiador-pisos.webp",
      },
    ],
  },
  {
    nombre: "Despensa",
    imagen: "img/categorias/despensa.webp",
    productos: [
      {
        id: 6,
        nombre: "Tomates en lata",
        imagen: "img/productos/tomates-en-lata.webp",
      },
      { id: 7, nombre: "Arroz", imagen: "img/productos/arroz.webp" },
      { id: 8, nombre: "Fideos", imagen: "img/productos/fideos.webp" },
      { id: 9, nombre: "Aceite", imagen: "img/productos/aceite.webp" },
      { id: 10, nombre: "Azúcar", imagen: "img/productos/azucar.webp" },
      { id: 11, nombre: "Sal", imagen: "img/productos/sal.webp" },
      { id: 12, nombre: "Harina", imagen: "img/productos/harina.webp" },
    ],
  },
  {
    nombre: "Bebidas",
    imagen: "img/categorias/bebidas.webp",
    productos: [
      {
        id: 13,
        nombre: "Agua mineral",
        imagen: "img/productos/agua-mineral.webp",
      },
      {
        id: 14,
        nombre: "Gaseosa cola",
        imagen: "img/productos/gaseosa-cola.webp",
      },
      {
        id: 15,
        nombre: "Jugo de naranja",
        imagen: "img/productos/jugo-de-naranja.webp",
      },
      { id: 16, nombre: "Té", imagen: "img/productos/te.webp" },
      { id: 17, nombre: "Café", imagen: "img/productos/cafe.webp" },
    ],
  },
  {
    nombre: "Bebidas Alcohólicas",
    imagen: "img/categorias/bebidas-alcoholicas.webp",
    productos: [
      { id: 18, nombre: "Cerveza", imagen: "img/productos/cerveza.webp" },
      { id: 19, nombre: "Vino tinto", imagen: "img/productos/vino-tinto.webp" },
      { id: 20, nombre: "Vodka", imagen: "img/productos/vodka.webp" },
      { id: 21, nombre: "Whisky", imagen: "img/productos/whisky.webp" },
    ],
  },
  {
    nombre: "Higiene Personal",
    imagen: "img/categorias/higiene-personal.webp",
    productos: [
      { id: 22, nombre: "Champú", imagen: "img/productos/champu.webp" },
      {
        id: 23,
        nombre: "Acondicionador",
        imagen: "img/productos/acondicionador.webp",
      },
      {
        id: 24,
        nombre: "Jabón de tocador",
        imagen: "img/productos/jabon-tocador.webp",
      },
      {
        id: 25,
        nombre: "Pasta dental",
        imagen: "img/productos/pasta-dental.webp",
      },
      {
        id: 26,
        nombre: "Cepillo de dientes",
        imagen: "img/productos/cepillo-de-dientes.webp",
      },
    ],
  },
  {
    nombre: "Lácteos",
    imagen: "img/categorias/lacteos.webp",
    productos: [
      { id: 27, nombre: "Leche", imagen: "img/productos/leche.webp" },
      { id: 28, nombre: "Yogur", imagen: "img/productos/yogur.webp" },
      {
        id: 29,
        nombre: "Queso cremoso",
        imagen: "img/productos/queso-cremoso.webp",
      },
      { id: 30, nombre: "Manteca", imagen: "img/productos/manteca.webp" },
      {
        id: 31,
        nombre: "Crema de leche",
        imagen: "img/productos/crema-leche.webp",
      },
    ],
  },
  {
    nombre: "Mascotas",
    imagen: "img/categorias/mascotas.webp",
    productos: [
      {
        id: 32,
        nombre: "Alimento para perros",
        imagen: "img/productos/alimento-para-perros.webp",
      },
      {
        id: 33,
        nombre: "Alimento para gatos",
        imagen: "img/productos/alimento-para-gatos.webp",
      },
      {
        id: 34,
        nombre: "Piedras sanitarias",
        imagen: "img/productos/piedras-sanitarias.webp",
      },
      {
        id: 35,
        nombre: "Juguete para mascotas",
        imagen: "img/productos/juguete-para-mascotas.webp",
      },
    ],
  },
  {
    nombre: "Panadería",
    imagen: "img/categorias/panaderia.webp",
    productos: [
      { id: 36, nombre: "Pan lactal", imagen: "img/productos/pan-lactal.webp" },
      { id: 37, nombre: "Facturas", imagen: "img/productos/facturas.webp" },
      { id: 38, nombre: "Galletitas", imagen: "img/productos/galletitas.webp" },
      { id: 39, nombre: "Medialunas", imagen: "img/productos/medialunas.webp" },
      {
        id: 40,
        nombre: "Tarta de frutas",
        imagen: "img/productos/tarta-de-frutas.webp",
      },
    ],
  },
  {
    nombre: "Perfumería",
    imagen: "img/categorias/perfumeria.webp",
    productos: [
      { id: 41, nombre: "Perfume", imagen: "img/productos/perfume.webp" },
      {
        id: 42,
        nombre: "Desodorante",
        imagen: "img/productos/desodorante.webp",
      },
      {
        id: 43,
        nombre: "Loción corporal",
        imagen: "img/productos/locion-corporal.webp",
      },
      {
        id: 44,
        nombre: "Agua de colonia",
        imagen: "img/productos/agua-de-colonia.webp",
      },
    ],
  },
  {
    nombre: "Verdulería",
    imagen: "img/categorias/verduleria.webp",
    productos: [
      { id: 45, nombre: "Tomates", imagen: "img/productos/tomates.webp" },
      { id: 46, nombre: "Papas", imagen: "img/productos/papas.webp" },
      { id: 47, nombre: "Zanahorias", imagen: "img/productos/zanahorias.webp" },
      { id: 48, nombre: "Lechuga", imagen: "img/productos/lechuga.webp" },
      { id: 49, nombre: "Manzanas", imagen: "img/productos/manzanas.webp" },
      { id: 50, nombre: "Bananas", imagen: "img/productos/bananas.webp" },
    ],
  },
];

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

  // Guardar la lista en localStorage cada vez que se actualiza
  document.querySelectorAll(".inputCantidad").forEach((input) => {
    input.addEventListener("change", guardarListaEnLocalStorage);
  });

  document.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("mas") ||
      event.target.classList.contains("menos") ||
      event.target.classList.contains("eliminar")
    ) {
      guardarListaEnLocalStorage();
    }
  });

  // Abrimos y cerramos el modal de enviar por whatsapp
  // verificamos si existe el id enviarPorWhatsapp
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

// Llamar a la función para renderizar las categorías al cargar la página
// verificamos si existe el id categorias y productos
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
  document.getElementById("limpiar").addEventListener("click", limpiarLista);
}

if (document.getElementById("imprimir")) {
  document.getElementById("imprimir").addEventListener("click", imprimirLista);
}
