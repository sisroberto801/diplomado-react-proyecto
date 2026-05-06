# 📝 Proyecto Final: Gestión de Tareas con React

## 👤 Datos del Estudiante
**Nombre:** Roberto Carlos Olguin Ledezma  
**Fecha:** Mayo 2026

---

Aplicación web de "Lista de Tareas" (To-Do List) desarrollada con React, TypeScript y Material-UI, que permite gestionar el ciclo de vida completo de tareas mediante una API REST externa.

## 🚀 Funcionalidades Implementadas

### ✅ CRUD Completo
- **Visualización**: Listado dinámico de todas las tareas con opciones de edición y eliminación
- **Creación**: Formulario para añadir nuevas tareas mediante `POST /api/tasks`
- **Edición**: Modificación del contenido de tareas existentes mediante `PUT /api/tasks/:id`
- **Eliminación**: Borrado de tareas individuales mediante `DELETE /api/tasks/:id`

### 🔄 Gestión de Estados
- Alternancia entre estados "Pendiente" y "Finalizada" mediante `PATCH /api/tasks/:id`
- Diferenciación visual con estilos y colores distintos
- Contadores separados para tareas pendientes y completadas

### 🎨 Interfaz de Usuario
- Diseño moderno con Material-UI
- Tarjetas interactivas para cada tarea
- Botones flotantes y diálogos modales
- Notificaciones con Snackbar para feedback de acciones
- Estados de carga y manejo de errores

## 🛠️ Stack Tecnológico

- **Frontend**: React 19.2.5 + TypeScript
- **UI Framework**: Material-UI (MUI) v9.0.0
- **HTTP Client**: Axios con interceptores de autenticación
- **Validación**: Zod para tipado y validación de datos
- **Build Tool**: Vite
- **Testing**: Playwright
- **Despliegue**: GitHub Pages

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── task/
│   │   ├── task-header/       # Componentes del header
│   │   │   ├── TaskHeader.tsx        # Header con título y botón Nueva Tarea
│   │   │   └── TaskFilterButtons.tsx  # Botones de filtro (Todas, Pendiente, Completado)
│   │   ├── task-body/         # Componentes del cuerpo
│   │   │   ├── TaskItem.tsx          # Componente individual de tarea
│   │   │   └── TaskList.tsx          # Listado de tareas
│   │   └── task-modal/        # Componentes del modal
│   │       ├── TaskForm.tsx          # Formulario de creación/edición
│   │       └── TaskModal.tsx         # Modal contenedor
│   └── index.ts              # Exportación de componentes
├── hooks/
│   └── useTask.ts            # Hook personalizado para API
├── lib/
│   └── axiosCliente.ts       # Configuración de Axios
├── models/
│   └── task.model.ts         # Tipos y validaciones
├── pages/
│   └── private/
│       └── TaskPage.tsx      # Página principal de tareas
└── config/
    └── env.ts                # Variables de entorno
```

## 🔗 Integración con API

La aplicación se integra con la API externa [TaskDone](https://taskdone-node.onrender.com/api-docs/) mediante los siguientes endpoints:

- `GET /api/tasks` - Obtener todas las tareas
- `POST /api/tasks` - Crear nueva tarea
- `PUT /api/tasks/:id` - Actualizar tarea completa
- `PATCH /api/tasks/:id` - Actualizar estado de tarea
- `DELETE /api/tasks/:id` - Eliminar tarea

### 🔐 Autenticación
- Auto-login con credenciales de prueba
- Token JWT almacenado en localStorage
- Interceptor Axios para incluir token en requests

## 🚀 Instalación y Ejecución

### Prerequisites
- Node.js 18+
- npm o yarn

### Pasos
1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/sisroberto801/diplomado-react-proyecto.git
   cd diplomado-react-proyecto
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.sample .env
   # Editar .env con la URL de la API si es necesario
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Construir para producción**
   ```bash
   npm run build
   ```

6. **Previsualizar producción**
   ```bash
   npm run preview
   ```

## 🌐 Despliegue

### GitHub Pages
El proyecto está configurado para desplegarse automáticamente en GitHub Pages:

```bash
npm run deploy
```

### Variables de Entorno en Producción
- `VITE_API_URL`: URL de la API (configurada para producción)

## 🧪 Testing

El proyecto incluye configuración para Playwright:

```bash
npm run test
npm run test:ui
```

## ✅ Requisitos Cumplidos

- [x] **Visualización**: Listado dinámico con opciones de gestión
- [x] **Creación**: Formulario funcional para nuevas tareas
- [x] **Edición**: Modificación de tareas existentes
- [x] **Eliminación**: Borrado de tareas individuales
- [x] **Gestión de Estados**: Alternancia Pendiente/Finalizada
- [x] **API REST**: Integración completa con endpoints especificados
- [x] **Repositorio GitHub**: Código fuente completo
- [x] **Despliegue**: Configuración para GitHub Pages

## 📝 Licencia

Proyecto educativo desarrollado como parte del Diplomado de React.

---

**Enlaces del Proyecto:**
- 📁 **Repositorio**: https://github.com/sisroberto801/diplomado-react-proyecto
- 🌐 **Aplicación en vivo**: https://sisroberto801.github.io/diplomado-react-proyecto
