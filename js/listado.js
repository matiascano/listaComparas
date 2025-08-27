document.addEventListener("DOMContentLoaded", () => {
  const toast = new Notyf();

  const cargarLista = () => {
    const listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];
    const listadoCompleto = document.getElementById("listado-completo");
    listadoCompleto.innerHTML = "";

    if (listaGuardada.length === 0) {
      listadoCompleto.innerHTML = '<li>Aún no hay nada aquí. <a href="index.html">Agregar productos</a></li>';
      return;
    }

    listaGuardada.forEach((producto) => {
      const claseFinalizodo = !producto.pendiente ? "finalizado" : "";
      const checked = !producto.pendiente ? "checked" : "";
      const item = `
        <li class="${claseFinalizodo}">
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
  };

  const eliminarProducto = (nombre) => {
    const listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];
    const nuevaLista = listaGuardada.filter((item) => item.nombre !== nombre);
    localStorage.setItem("lista", JSON.stringify(nuevaLista));
    cargarLista();
    toast.error("Producto eliminado");
  };

  const editarProducto = (nombre) => {
    const listaGuardada = JSON.parse(localStorage.getItem("lista")) || [];
    const producto = listaGuardada.find((item) => item.nombre === nombre);
    if (producto) {
      // abrimos el modal nuevaCantidad
      const modal = document.querySelector(".modalCantidad");
      modal.style.display = "flex";

      document.getElementById("confirmar-cantidad").onclick = () => {
        const nuevaCantidad = document.getElementById("nueva-cantidad").value;
        if (nuevaCantidad) {
          producto.cantidad = nuevaCantidad;
          producto.pendiente = true; // Marcar como pendiente al actualizar cantidad
          localStorage.setItem("lista", JSON.stringify(listaGuardada));
          cargarLista();
          modal.style.display = "none";
          document.getElementById("nueva-cantidad").value = "";
          toast.success("Cantidad actualizada - Producto marcado como pendiente");
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
      
      const mensaje = producto.pendiente ? "Producto marcado como pendiente" : "Producto completado";
      const tipo = producto.pendiente ? "error" : "success";
      toast[tipo](mensaje);
    }
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

    // Manejar click en checkbox para cambiar estado pendiente
    if (e.target.type === "checkbox" && e.target.dataset.nombre) {
      const nombre = e.target.dataset.nombre;
      cambiarEstadoPendiente(nombre);
    }

    // Limpiar lista completa
    if (e.target.closest("#limpiar")) {
      localStorage.removeItem("lista");
      cargarLista();
      toast.success("Lista limpiada");
    }

    // Cerrar modal con la X
    if (e.target.classList.contains("close")) {
      const modal = document.querySelector(".modalCantidad");
      modal.style.display = "none";
      document.getElementById("nueva-cantidad").value = "";
    }

    // Cerrar modal haciendo clic fuera del contenido
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

  // Enviar la lista por WhatsApp
  const botonEnviarWhatsApp = document.getElementById("confirmar-enviar");
  botonEnviarWhatsApp.addEventListener("click", () => {
    const numeroWhatsApp = document.getElementById("numero-whatsapp").value;
    const listaCompleta = [];
    // obtenemos el listado de productos del localStorage
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
