# noteOlvides - Proyecto Final CoderHouse JavaScript

Aplicación web interactiva para gestionar listas de compras con categorización de productos, desarrollada como proyecto final del curso de JavaScript en CoderHouse.

## Características Principales

### 🛒 Gestión de Productos

- **Catálogo por categorías**: 10 categorías organizadas (Limpieza, Despensa, Bebidas, Lácteos, etc.)
- **Base de datos**: 50+ productos preconfigurados con imágenes
- **Búsqueda inteligente**: Filtro de productos en tiempo real
- **Productos personalizados**: Agregar productos no incluidos en el catálogo
- **Control de cantidades**: Incrementar/decrementar con botones + y -

### 📱 Interfaz de Usuario

- **Diseño responsive**: Compatible con móviles y escritorio
- **Material Icons**: Iconografía moderna de Google
- **Notificaciones**: Sistema de toasts con Notyf
- **Navegación fluida**: Scroll suave entre secciones
- **Panel lateral**: Vista previa de la lista con toggle

### ✨ Funcionalidades Avanzadas

- **Drag & Drop**: Reordenar productos con SortableJS
- **Estados de productos**: Marcar como completado/pendiente
- **Edición en línea**: Modificar cantidades desde la vista de lista
- **Exportación WhatsApp**: Envío directo con formato estructurado
- **Impresión optimizada**: Vista para imprimir lista
- **Persistencia**: LocalStorage mantiene datos entre sesiones

## Estructura del Proyecto

```
listaCompras/
├── index.html          # Página principal - selección de productos
├── listado.html        # Vista de lista completa
├── css/
│   └── style.css       # Estilos personalizados
├── js/
│   ├── index.js        # Lógica principal de la app
│   └── listado.js      # Funcionalidad de la lista
├── data/
│   └── data.json       # Base de datos de productos y categorías
└── img/
    ├── categorias/     # Imágenes de categorías (11 archivos)
    └── productos/      # Imágenes de productos (50 archivos)
```

## Tecnologías y Librerías

### Core

- **JavaScript ES6+**: Vanilla JavaScript moderno
- **HTML5 Semántico**: Estructura accesible
- **CSS3**: Estilos personalizados y responsive

### Librerías Externas

- **Axios**: Peticiones HTTP para cargar datos JSON
- **Notyf**: Sistema de notificaciones toast
- **SortableJS**: Funcionalidad drag & drop
- **Material Symbols**: Iconografía de Google
- **LocalStorage API**: Persistencia de datos

## Instalación y Uso

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/matiascano/listaComparas.git
   cd listaCompras
   ```

2. **Ejecutar la aplicación**:

   - Abrir `index.html` en cualquier navegador moderno
   - No requiere servidor web (funciona con file://)

3. **Uso de la aplicación**:
   - Seleccionar categoría en la página principal
   - Agregar productos con botones + y -
   - Ver lista completa en panel lateral o `listado.html`
   - Enviar por WhatsApp o imprimir desde la vista de lista

## Próximas mejoras (TODO)

- Manejar modales dinamicamente
- reestructurar JS para no duplicar funciones
- crear landing page
