# Task Tracker - TP5 (React + NestJS)

Sistema de gestión ágil de proyectos, sprints y tareas con dependencias, métricas y asignación de usuarios.

---

## Características

- **Gestión de Proyectos:** Creación, edición, listado y eliminación de proyectos.
- **Gestión de Sprints:** Planificación, avance de estados (`planned`, `active`, `completed`, `cancelled`) y eliminación.
- **Gestión de Tareas:**
  - Ciclo de vida por estados: `backlog`, `to do`, `in progress`, `review`, `done`.
  - Priorización (MoSCoW): `must`, `should`, `could`, `wont`.
  - Tipos de actividad: `bug`, `feature`, `improvement`, `task`, `documentation`.
  - Dependencias y precondiciones entre tareas (vincular / desvincular tareas bloqueantes).
- **Asignación de Usuarios:** Asignación de responsables (`assignee`) y creadores (`reporter`).
- **Métricas y Estadísticas:** Gráficos semanales de velocidad de cierre de tareas y conteo por estados/prioridades.
- **Notificaciones y Feedback:** Toasts interactivos (Sonner) e interceptores en Axios para gestión unificada de errores del servidor.

---

## Requisitos Previos

- **[Docker](https://docs.docker.com/get-docker/)** (versión 24 o superior) y **[Docker Compose](https://docs.docker.com/compose/)** (versión v2.20+ recomendada).

---

## Configuración de Variables de Entorno

Antes de iniciar la aplicación, crea el archivo `.env` a partir de `.env.template`:

```bash
cp .env.template .env
```

Configura los valores requeridos en `.env`:

| Variable          | Descripción                         | Valor por Defecto / Ejemplo                                               |
| :---------------- | :---------------------------------- | :------------------------------------------------------------------------ |
| `DB_PORT`         | Puerto expuesto para PostgreSQL     | `5432`                                                                    |
| `DB_USER`         | Usuario de PostgreSQL               | `postgres`                                                                |
| `DB_PASSWORD`     | Contraseña de PostgreSQL            | `tu_password`                                                             |
| `DB_NAME`         | Nombre de la base de datos          | `tasks`                                                                   |
| `DB_HOST`         | Host de base de datos para la API   | `task_db` (Docker) o `localhost` (local)                                  |
| `DATABASE_URL`    | URL de conexión de Prisma           | `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}` |
| `API_PORT`        | Puerto donde escucha el backend     | `3000`                                                                    |
| `VITE_API_URL`    | URL base de la API para el frontend | `http://localhost:3000`                                                   |
| `MODE`            | Perfil de ejecución                 | `development`                                                             |
| `REACT_PORT`      | Puerto de React en desarrollo       | `5173`                                                                    |
| `REACT_PROD_PORT` | Puerto de Nginx en producción       | `8080`                                                                    |

---

## Ejecución con Docker Compose

### 1. Modo Desarrollo

Levanta los contenedores con recarga automática en caliente (Hot Reloading en frontend y backend):

```bash
docker compose up --build
```

- **Frontend (Vite):** [http://localhost:5173](http://localhost:5173)
- **Backend (NestJS API):** [http://localhost:3000](http://localhost:3000)
- **Base de datos (PostgreSQL):** `localhost:5432`

### 2. Modo Producción

Compila el frontend estático servido por Nginx y el bundle optimizado del backend:

```bash
BUILD_TARGET=production docker compose up --build
```

- **Frontend (Nginx):** [http://localhost:5173](http://localhost:5173) (o según el mapeo configurado)
- **Backend (Node.js Prod):** [http://localhost:3000](http://localhost:3000)

### 3. Detener los Contenedores

```bash
docker compose down
```

Para eliminar volúmenes (base de datos persistida):

```bash
docker compose down -v
```

---

## Tecnologías y Librerías Utilizadas

### Frontend (`/react`)

- **[React 19](https://react.dev/):** Biblioteca principal para la interfaz de usuario.
- **[Vite 8](https://vitejs.dev/):** Entorno de compilación y servidor de desarrollo ultrarrápido.
- **[TypeScript](https://www.typescriptlang.org/):** Tipado estático para robustez y mantenibilidad.
- **[Axios](https://axios-http.com/):** Cliente HTTP para comunicación con la API, configurado con interceptores globales de error y notificaciones.
- **[Sonner](https://sonner.emilkowal.ski/):** Sistema moderno y estilizado de notificaciones toast.

### Backend (`/api`)

- **[NestJS 12](https://nestjs.com/):** Framework progresivo de Node.js para arquitecturas modulares, escalables y orientadas a controladores/servicios.
- **[Prisma ORM 6](https://www.prisma.io/):** ORM declarativo para modelado y consultas seguras a la base de datos.
- **[PostgreSQL 16](https://www.postgresql.org/):** Base de datos relacional para persistencia de datos y enums tipados.

### Infraestructura y DevOps

- **[Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/):** Orquestación de múltiples contenedores para desarrollo y producción.
- **[Nginx](https://nginx.org/):** Servidor web estático optimizado para servir el frontend compilado en el contenedor de producción.

---

## Endpoints Principales de la API

| Módulo        | Método   | Endpoint              | Descripción                                                |
| :------------ | :------- | :-------------------- | :--------------------------------------------------------- |
| **Proyectos** | `GET`    | `/project`            | Obtener todos los proyectos con sus sprints y tareas       |
|               | `POST`   | `/project`            | Crear un nuevo proyecto                                    |
|               | `PUT`    | `/project/:id`        | Editar nombre o descripción de un proyecto                 |
|               | `DELETE` | `/project/:id`        | Eliminar un proyecto                                       |
| **Sprints**   | `GET`    | `/sprint`             | Listar todos los sprints                                   |
|               | `POST`   | `/sprint`             | Crear un nuevo sprint en un proyecto                       |
|               | `PUT`    | `/sprint/:id`         | Modificar datos de un sprint                               |
|               | `PUT`    | `/sprint/advance/:id` | Avanzar el estado del sprint                               |
|               | `PUT`    | `/sprint/cancel/:id`  | Cancelar un sprint                                         |
|               | `DELETE` | `/sprint/:id`         | Eliminar un sprint                                         |
| **Tareas**    | `GET`    | `/task`               | Listar todas las tareas (con dependencias y asignados)     |
|               | `POST`   | `/task`               | Crear una nueva tarea                                      |
|               | `PUT`    | `/task/:id`           | Modificar información de una tarea                         |
|               | `PUT`    | `/task/state/:id`     | Actualizar el estado de la tarea (`backlog`, `done`, etc.) |
|               | `POST`   | `/task/attach`        | Vincular dependencia/precondición entre tareas             |
|               | `DELETE` | `/task/detach`        | Desvincular dependencia entre tareas                       |
|               | `DELETE` | `/task/:id`           | Eliminar una tarea                                         |
| **Usuarios**  | `GET`    | `/user`               | Listar todos los usuarios                                  |
|               | `POST`   | `/user`               | Crear un usuario                                           |
|               | `PUT`    | `/user/:id`           | Actualizar nombre de usuario                               |

---

## Estructura del Repositorio

```text
tp5_tasks_react/
├── api/                      # Backend en NestJS
│   ├── prisma/               # Esquema de Prisma y cliente ORM
│   ├── src/
│   │   ├── filters/          # Filtros globales de excepciones HTTP
│   │   ├── project/          # Módulo, controlador y servicios de proyectos
│   │   ├── sprint/           # Módulo, controlador y servicios de sprints
│   │   ├── task/             # Módulo, controlador y servicios de tareas
│   │   ├── user/             # Módulo, controlador y servicios de usuarios
│   │   └── main.ts           # Punto de entrada de la aplicación
│   └── Dockerfile            # Dockerfile multi-stage (development / production)
│
├── react/                    # Frontend en React + Vite
│   ├── src/
│   │   ├── api/              # Conexión Axios y endpoints del backend
│   │   ├── components/       # Componentes de UI (modales, tareas, gráficos, tarjetas)
│   │   ├── styles/           # Hojas de estilo y tokens de diseño
│   │   ├── types/            # Definiciones de TypeScript
│   │   └── App.tsx           # Vista principal del tablero
│   ├── nginx.conf            # Configuración de Nginx para producción
│   └── Dockerfile            # Dockerfile multi-stage (development / production)
│
├── data/                     # Scripts SQL de inicialización de PostgreSQL
│   ├── 01_init.sql           # Creación de tablas, enums e índices
│   ├── 02_seed.sql           # Carga de usuarios y datos base
│   └── 03_tasks.sql          # Carga de tareas y sprints iniciales
│
├── docker-compose.yml        # Configuración base de Docker Compose
├── docker-compose.development.yml # Servicios para entorno de desarrollo
├── docker-compose.production.yml  # Servicios para entorno de producción
├── .env.template             # Plantilla de variables de entorno
└── README.md
```
