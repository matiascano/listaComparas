document.addEventListener("DOMContentLoaded", () => {
  const cargarLista = () => {
    const listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];
    const listadoProductos = document.getElementById("listado-productos");
    listadoProductos.innerHTML = "";

    if (listaGuardada.length === 0) {
      listadoProductos.innerHTML =
        "<li>Puedes agregar tu primer producto aquí.</li>";
      return;
    }

    listaGuardada.forEach((producto) => {
      const item = `
        <li data-id="${producto.id}">
          ${producto.nombre}: ${producto.cantidad}
          <button class="eliminar" data-id="${producto.id}">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </li>
      `;
      listadoProductos.innerHTML += item;
    });
  };

  const toast = new Notyf();

  let categoriasGlobal = [];
  let productosGlobal = [];

  axios
    .get("data/data.json")
    .then((res) => {
      categoriasGlobal = res.data.categorias;
      productosGlobal = res.data.productos;

      renderizarCategorias(categoriasGlobal);
      renderizarProductos(productosGlobal, categoriasGlobal);
      cargarLista();

      // Actualizar inputs después de renderizar
      actualizarInputsDesdeLocalStorage();

      buscadorProductos();

      document.querySelectorAll(".categoria-card").forEach((card) => {
        card.addEventListener("click", () => {
          const categoriaSeleccionada = card.getAttribute(
            "data-categoria-objetivo"
          );
          document
            .querySelectorAll(".categoria-card")
            .forEach((c) => c.classList.remove("active"));
          card.classList.add("active");

          if (categoriaSeleccionada === "Todas") {
            document.querySelectorAll(".producto-item").forEach((producto) => {
              producto.style.display = "block";
            });
          } else {
            document.querySelectorAll(".producto-item").forEach((producto) => {
              if (
                producto.getAttribute("data-categoria") ===
                categoriaSeleccionada
              ) {
                producto.style.display = "block";
              } else {
                producto.style.display = "none";
              }
            });
          }
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });

  const renderizarCategorias = (categorias) => {
    const contenedorCategorias = document.getElementById("categorias");
    contenedorCategorias.innerHTML = "";
    categorias.forEach((categoria) => {
      const categoriaCard = `
        <article class="categoria-card" data-categoria-objetivo="${categoria.nombre}">
          <img src="${categoria.imagen}" alt="${categoria.nombre}" />
        </article>
      `;
      contenedorCategorias.innerHTML += categoriaCard;
    });
    contenedorCategorias.innerHTML = `
                ${contenedorCategorias.innerHTML}
                <article class="categoria-card" data-categoria-objetivo="Todas">
                  <img src="img/categorias/todas.webp" alt="Todas" />
                </article>
    `;
  };

  const renderizarProductos = (productos, categorias) => {
    const contenedorProductos = document.getElementById("productos");
    contenedorProductos.innerHTML = "";
    const listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];

    productos.forEach((producto) => {
      const productoExistente = listaGuardada.find(
        (prod) => prod.id === producto.id
      );

      const cantidadGuardada = productoExistente
        ? productoExistente.cantidad
        : 0;

      const categoriaProducto = categorias.find(
        (cat) => cat.id === producto.categoria_id
      );

      const cuerpoProducto = `
        <article class="producto-item" data-id="${producto.id}" data-categoria="${categoriaProducto.nombre}">
          <span class="categoria">${categoriaProducto.nombre}</span>
          <img src="${producto.imagen}" alt="${producto.nombre}" />
          <span class="nombre" data-nombre-id="${producto.id}">${producto.nombre}</span>

          <div class="cantidad-controles">
            <button class="menos">
              <span class="material-symbols-outlined">remove</span>
            </button>
            <input id="cantidad-${producto.id}" type="text" min="0" class="inputCantidad" value="${cantidadGuardada}" disabled />
            <button class="mas">
              <span class="material-symbols-outlined">add</span>
            </button>
          </div>
        </article>
      `;
      contenedorProductos.innerHTML += cuerpoProducto;
    });

    setTimeout(() => {
      listaGuardada.forEach((producto) => {
        const input = document.getElementById(`cantidad-${producto.id}`);
      });
    }, 100);
  };

  const agregarProducto = (id, nombre, cantidad) => {
    let listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];
    const productoExistente = listaGuardada.find((prod) => prod.id === id);
    if (productoExistente) {
      productoExistente.cantidad = cantidad;
    } else {
      listaGuardada.push({ id, nombre, cantidad, pendiente: true });
      toast.success("Producto agregado");
    }

    localStorage.setItem("lista", JSON.stringify(listaGuardada));
    cargarLista();
  };

  const actualizarInputsDesdeLocalStorage = () => {
    const listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];

    listaGuardada.forEach((producto) => {
      const input = document.getElementById(`cantidad-${producto.id}`);
      if (input) {
        input.value = producto.cantidad;
      }
    });
  };

  const quitarProducto = async (id) => {
    const confirmacion = await confirmarEliminacion();
    if (!confirmacion) return;
    let listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];

    const idString = String(id);
    listaGuardada = listaGuardada.filter(
      (prod) => String(prod.id) !== idString
    );

    localStorage.setItem("lista", JSON.stringify(listaGuardada));

    const input = document.getElementById(`cantidad-${id}`);
    if (input) input.value = 0;

    cargarLista();
    toast.error("Producto quitado");
  };

  const confirmarEliminacion = () => {
    return new Promise((resolve) => {
      const modal = document.querySelector(".modalEliminar");
      modal.style.display = "flex";

      document.getElementById("confirmar-eliminar").onclick = () => {
        modal.style.display = "none";
        resolve(true);
      };
      document.getElementById("cancelar-eliminar").onclick = () => {
        modal.style.display = "none";
        resolve(false);
      };
    });
  };

  const confirmarLimpiar = () => {
    return new Promise((resolve) => {
      const modal = document.querySelector(".modalLimpiar");
      modal.style.display = "flex";

      document.getElementById("confirmar-limpiar").onclick = () => {
        modal.style.display = "none";
        resolve(true);
      };
      document.getElementById("cancelar-limpiar").onclick = () => {
        modal.style.display = "none";
        resolve(false);
      };
    });
  };

  const buscadorProductos = () => {
    const inputBuscador = document.getElementById("buscador-productos");
    const productos = document.querySelectorAll(".producto-item");

    inputBuscador.addEventListener("input", () => {
      const valorBuscador = inputBuscador.value.toLowerCase().trim();
      const modal = document.querySelector(".modalProductoNuevo");

      if (valorBuscador === "") {
        productos.forEach((producto) => {
          producto.style.display = "block";
        });
        modal.style.display = "none";
        return;
      }

      const productosCoincidentes = Array.from(productos).filter((producto) => {
        const nombreProducto = producto
          .querySelector(".nombre")
          .textContent.toLowerCase();
        return nombreProducto.includes(valorBuscador);
      });

      productos.forEach((producto) => {
        producto.style.display = "none";
      });

      productosCoincidentes.forEach((producto) => {
        producto.style.display = "block";
      });

      if (productosCoincidentes.length === 0) {
        modal.style.display = "flex";
        document.getElementById("nombre-nuevo-producto").value = valorBuscador;
      } else {
        modal.style.display = "none";
      }
    });
  };

  const agregarProductoNuevo = (nombre, cantidad) => {
    const id = Date.now();
    agregarProducto(id, nombre, cantidad);
  };

  document.addEventListener("click", (e) => {
    if (e.target.closest(".mas")) {
      const id = e.target.closest(".producto-item").dataset.id;
      let cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
      cantidad++;
      document.getElementById(`cantidad-${id}`).value = cantidad;

      const nombre = document.querySelector(
        `.nombre[data-nombre-id="${id}"]`
      ).textContent;

      agregarProducto(id, nombre, cantidad);
    }

    if (e.target.closest(".menos")) {
      const id = e.target.closest(".producto-item").dataset.id;
      let cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);

      if (cantidad > 0) {
        cantidad--;
        document.getElementById(`cantidad-${id}`).value = cantidad;

        if (cantidad === 0) {
          quitarProducto(id);
        } else {
          const nombre = document.querySelector(
            `.nombre[data-nombre-id="${id}"]`
          ).textContent;
          agregarProducto(id, nombre, cantidad);
        }
      }
    }

    if (e.target.closest("#limpiar")) {
      const confirmarYLimpiar = async () => {
        const confirmacion = await confirmarLimpiar();
        if (confirmacion) {
          localStorage.removeItem("lista");
          document.querySelectorAll(".inputCantidad").forEach((input) => {
            input.value = 0;
          });
          cargarLista();
          toast.success("Lista limpiada");
        }
      };
      confirmarYLimpiar();
    }

    if (e.target.closest(".eliminar")) {
      const id = e.target.closest("button").dataset.id;
      quitarProducto(id);
    }

    if (e.target.id === "agregar-nuevo-producto") {
      const nombreProducto = document.getElementById(
        "nombre-nuevo-producto"
      ).value;
      const cantidadProducto = document.getElementById("cantidad-nueva").value;
      agregarProductoNuevo(nombreProducto, cantidadProducto);

      const modal = document.querySelector(".modalProductoNuevo");
      modal.style.display = "none";
      document.getElementById("nombre-nuevo-producto").value = "";
      document.getElementById("cantidad-nueva").value = "";

      const inputBuscador = document.getElementById("buscador-productos");
      inputBuscador.value = "";
      document.querySelectorAll(".producto-item").forEach((producto) => {
        producto.style.display = "block";
      });
    }

    if (e.target.classList.contains("close")) {
      const modal = document.querySelector(".modalProductoNuevo");
      modal.style.display = "none";
    }

    if (e.target.classList.contains("modalProductoNuevo")) {
      const modal = document.querySelector(".modalProductoNuevo");
      modal.style.display = "none";
    }
  });

  if (document.querySelector(".aside-toggle")) {
    document.querySelector(".aside-toggle").addEventListener("click", () => {
      const aside = document.querySelector("aside");
      aside.classList.toggle("open");
      document.querySelector(".aside-toggle .derecha").style.display =
        aside.classList.contains("open") ? "flex" : "none";
      document.querySelector(".aside-toggle .izquierda").style.display =
        aside.classList.contains("open") ? "none" : "flex";
    });
  }
});
