document.addEventListener("DOMContentLoaded", () => {
  const toast = new Notyf();

  const cargarLista = () => {
    const listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];
    const listadoCompleto = document.getElementById("listado-completo");
    listadoCompleto.innerHTML = "";

    if (listaGuardada.length === 0) {
      listadoCompleto.innerHTML =
        '<li>Aún no hay nada aquí. <a href="index.html">Agregar productos</a></li>';
      return;
    }

    listaGuardada.forEach((producto, index) => {
      const claseFinalizodo = !producto.pendiente ? "finalizado" : "";
      const checked = !producto.pendiente ? "checked" : "";
      const item = `
        <li class="${claseFinalizodo}" data-nombre="${producto.nombre}" data-index="${index}">
        <span class="item-left">
          <input type="checkbox" ${checked} data-pendiente="${producto.pendiente}" data-nombre="${producto.nombre}" />
          ${producto.nombre}: ${producto.cantidad}
          </span>
          <span class="item-right">
            <button class="eliminar" data-nombre="${producto.nombre}">Eliminar</button>
            <button class="editar" data-nombre="${producto.nombre}">Editar</button>
          </span>
        </li>
      `;
      listadoCompleto.innerHTML += item;
    });

    initSortable();
  };

  const eliminarProducto = async (nombre) => {
    const confirmacion = await confirmarEliminacion();
    if (!confirmacion) return;

    const listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];
    const nuevaLista = listaGuardada.filter((item) => item.nombre !== nombre);
    localStorage.setItem("lista", JSON.stringify(nuevaLista));
    cargarLista();
    toast.error("Producto eliminado");
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

  const editarProducto = (nombre) => {
    const listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];
    const producto = listaGuardada.find((item) => item.nombre === nombre);
    if (producto) {
      const modal = document.querySelector(".modalCantidad");
      modal.style.display = "flex";

      document.getElementById("confirmar-cantidad").onclick = () => {
        const nuevaCantidad = document.getElementById("nueva-cantidad").value;
        if (nuevaCantidad) {
          producto.cantidad = nuevaCantidad;
          producto.pendiente = true;
          localStorage.setItem("lista", JSON.stringify(listaGuardada));
          cargarLista();
          modal.style.display = "none";
          document.getElementById("nueva-cantidad").value = "";
          toast.success(
            "Cantidad actualizada - Producto marcado como pendiente"
          );
        }
      };
    }
  };

  const cambiarEstadoPendiente = (nombre) => {
    const listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];
    const producto = listaGuardada.find((item) => item.nombre === nombre);
    if (producto) {
      producto.pendiente = !producto.pendiente;
      localStorage.setItem("lista", JSON.stringify(listaGuardada));
      cargarLista();

      const mensaje = producto.pendiente
        ? "Producto marcado como pendiente"
        : "Producto completado";
      const tipo = producto.pendiente ? "error" : "success";
      toast[tipo](mensaje);
    }
  };

  const initSortable = () => {
    const listadoCompleto = document.getElementById("listado-completo");
    if (
      listadoCompleto &&
      listadoCompleto.children.length > 0 &&
      !listadoCompleto.children[0].textContent.includes("Aún no hay nada")
    ) {
      Sortable.create(listadoCompleto, {
        animation: 150,
        ghostClass: "sortable-ghost",
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        onEnd: function () {
          actualizarOrdenEnLocalStorage();
        },
      });
    }
  };

  const actualizarOrdenEnLocalStorage = () => {
    const listadoCompleto = document.getElementById("listado-completo");
    const items = Array.from(listadoCompleto.children);
    const listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];
    const nuevaLista = [];

    items.forEach((li) => {
      const nombre = li.dataset.nombre;
      const producto = listaGuardada.find((item) => item.nombre === nombre);
      if (producto) {
        nuevaLista.push(producto);
      }
    });

    localStorage.setItem("lista", JSON.stringify(nuevaLista));
    toast.success("Orden actualizado");
  };

  cargarLista();

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
      const nombre = e.target.dataset.nombre;
      eliminarProducto(nombre);
    }

    if (e.target.classList.contains("editar")) {
      const nombre = e.target.dataset.nombre;
      editarProducto(nombre);
    }

    if (e.target.type === "checkbox" && e.target.dataset.nombre) {
      const nombre = e.target.dataset.nombre;
      cambiarEstadoPendiente(nombre);
    }

    if (e.target.closest("#limpiar")) {
      localStorage.removeItem("lista");
      cargarLista();
      toast.success("Lista limpiada");
    }

    if (e.target.classList.contains("close")) {
      const modal = document.querySelector(".modalCantidad");
      modal.style.display = "none";
      document.getElementById("nueva-cantidad").value = "";
    }

    if (e.target.classList.contains("modalCantidad")) {
      const modal = document.querySelector(".modalCantidad");
      modal.style.display = "none";
      document.getElementById("nueva-cantidad").value = "";
    }
  });

  const botonEnviar = document.getElementById("enviar");
  const modal = document.getElementById("enviarPorWhatsapp");
  const botonCerrar = document.querySelector(".modal .close");

  botonEnviar.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  botonCerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const botonEnviarWhatsApp = document.getElementById("confirmar-enviar");
  botonEnviarWhatsApp.addEventListener("click", () => {
    const numeroWhatsApp = document.getElementById("numero-whatsapp").value;
    const listaCompleta = [];
    const listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];

    listaGuardada.forEach((producto) => {
      const estado = producto.pendiente ? "[  ]" : "[✓]";
      listaCompleta.push(`${estado} ${producto.nombre} (${producto.cantidad})`);
    });

    const mensaje = `Lista de Compras:\n\n${listaCompleta.join("\n")}`;
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(urlWhatsApp, "_blank");
    modal.style.display = "none";
  });
});
