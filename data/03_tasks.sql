-- Tareas
INSERT INTO task (
    summary,
    description,
    activity,
    status,
    priority,
    created_at,
    closed_at,
    sprint_id,
    reporter_id,
    assignee_id
)
SELECT
    'Relevamiento de requisitos',
    'Entrevistas con los responsables de cada área para relevar los flujos de trabajo, las reglas del negocio y los reportes que necesita el equipo. Queda todo volcado en un documento de requisitos que se revisa y aprueba antes de empezar a desarrollar.',
    'task',
    'done',
    'must',
    CURRENT_DATE - 42,
    CURRENT_DATE - 21,
    s.id,
    u1.id,
    u2.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u1 ON u1.name = 'Santiago Mout'
JOIN app_user u2 ON u2.name = 'Martín Gómez'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'Fundamentos';

INSERT INTO task (
    summary,
    description,
    activity,
    status,
    priority,
    created_at,
    closed_at,
    sprint_id,
    reporter_id,
    assignee_id
)
SELECT
    'Modelo de datos',
    'Diseño del modelo de datos de la aplicación (proyectos, sprints, tareas, usuarios y dependencias) con las relaciones, las restricciones y los tipos de cada columna, más el script de creación de las tablas y las consultas base que usa la API.',
    'documentation',
    'done',
    'must',
    CURRENT_DATE - 40,
    CURRENT_DATE - 21,
    s.id,
    u1.id,
    u1.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u1 ON u1.name = 'Santiago Mout'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'Fundamentos';

INSERT INTO task (
    summary,
    description,
    activity,
    status,
    priority,
    created_at,
    closed_at,
    sprint_id,
    reporter_id,
    assignee_id
)
SELECT
    'CRUD de proyectos',
    'Alta, listado, edición y baja de proyectos con su nombre, su descripción y los sprints asociados. Incluye las validaciones del formulario, el mensaje de error cuando el nombre ya existe y la actualización automática del tablero al terminar cada operación.',
    'feature',
    'done',
    'must',
    CURRENT_DATE - 14,
    CURRENT_DATE - 7,
    s.id,
    u3.id,
    u2.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u3 ON u3.name = 'Lucía Fernández'
JOIN app_user u2 ON u2.name = 'Martín Gómez'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'CRUD Completo';

INSERT INTO task (
    summary,
    description,
    activity,
    status,
    priority,
    created_at,
    closed_at,
    sprint_id,
    reporter_id,
    assignee_id
)
SELECT
    'Tablero de tareas',
    'Tablero Kanban con una columna por estado de tarea y arrastrar y soltar para mover una tarjeta entre columnas. Suma los filtros por sprint, responsable, prioridad y tipo de actividad, y el contador de tareas que hay en cada columna del sprint activo.',
    'feature',
    'done',
    'must',
    CURRENT_DATE - 13,
    CURRENT_DATE,
    s.id,
    u1.id,
    u4.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u1 ON u1.name = 'Santiago Mout'
JOIN app_user u4 ON u4.name = 'Joaquín Álvarez'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'CRUD Completo';

INSERT INTO task (
    summary,
    description,
    activity,
    status,
    priority,
    created_at,
    sprint_id,
    reporter_id,
    assignee_id
)
SELECT
    'Validación de fechas',
    'Corregir el error que dejaba guardar un sprint con fecha de fin anterior a la de inicio. El mensaje de error tiene que aparecer en el formulario, marcar el campo inválido y el caso queda cubierto con pruebas para no volver a romperlo.',
    'bug',
    'review',
    'must',
    CURRENT_DATE - 10,
    s.id,
    u5.id,
    u4.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u5 ON u5.name = 'Valentina Sosa'
JOIN app_user u4 ON u4.name = 'Joaquín Álvarez'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'CRUD Completo';

INSERT INTO task (
    summary,
    description,
    activity,
    status,
    priority,
    created_at,
    sprint_id,
    reporter_id,
    assignee_id
)
SELECT
    'Dependencias entre tareas',
    'Permitir marcar una tarea como prerrequisito de otra, bloquear el cierre de la dependiente mientras la independiente siga abierta y mostrar el grafo de dependencias en el detalle de la tarea, avisando cuando una tarea no se puede cerrar.',
    'feature',
    'to do',
    'should',
    CURRENT_DATE - 9,
    s.id,
    u2.id,
    u5.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u2 ON u2.name = 'Martín Gómez'
JOIN app_user u5 ON u5.name = 'Valentina Sosa'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'CRUD Completo';

INSERT INTO task (
    summary,
    description,
    activity,
    status,
    priority,
    created_at,
    sprint_id,
    reporter_id,
    assignee_id
)
SELECT
    'Panel de métricas',
    'Gráficos de avance por sprint y por responsable, con el porcentaje de tareas cerradas, la cantidad de tareas por estado y el tiempo promedio entre la creación y el cierre. Se calculan a partir de las tareas ya finalizadas del sistema.',
    'improvement',
    'backlog',
    'could',
    CURRENT_DATE - 3,
    s.id,
    u3.id,
    u2.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u3 ON u3.name = 'Lucía Fernández'
JOIN app_user u2 ON u2.name = 'Martín Gómez'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'Métricas';

INSERT INTO task (
    summary,
    description,
    activity,
    status,
    priority,
    created_at,
    closed_at,
    sprint_id,
    reporter_id,
    assignee_id
)
SELECT
    'Diseño de pantallas',
    'Wireframes de las pantallas de la aplicación móvil (hoy, agenda y detalle de actividad) respetando la guía de estilos del proyecto. Se validan con los usuarios la navegación y la cantidad de información por pantalla antes de maquetar.',
    'documentation',
    'done',
    'should',
    CURRENT_DATE - 38,
    CURRENT_DATE - 14,
    s.id,
    u3.id,
    u5.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u3 ON u3.name = 'Lucía Fernández'
JOIN app_user u5 ON u5.name = 'Valentina Sosa'
WHERE p.name = 'Aplicación Móvil' AND s.name = 'Prototipo';

INSERT INTO task (
    summary,
    description,
    activity,
    status,
    priority,
    created_at,
    closed_at,
    sprint_id,
    reporter_id,
    assignee_id
)
SELECT
    'Login de la app',
    'Pantalla de inicio de sesión de la aplicación móvil contra la API de autenticación, con sesión persistente entre cierres de la app y mensajes de error amigables ante credenciales inválidas o sin conexión a la red.',
    'feature',
    'done',
    'must',
    CURRENT_DATE - 14,
    CURRENT_DATE - 7,
    s.id,
    u1.id,
    u3.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u1 ON u1.name = 'Santiago Mout'
JOIN app_user u3 ON u3.name = 'Lucía Fernández'
WHERE p.name = 'Aplicación Móvil' AND s.name = 'Recordatorios';

INSERT INTO task (
    summary,
    description,
    activity,
    status,
    priority,
    created_at,
    closed_at,
    sprint_id,
    reporter_id,
    assignee_id
)
SELECT
    'Endpoints de usuarios',
    'Endpoints REST de alta, consulta, edición y baja de usuarios, con validación de los datos de entrada, códigos de estado HTTP correctos en cada caso y la documentación de cada ruta en el README del servicio para que la consuman la web y la aplicación móvil.',
    'feature',
    'done',
    'must',
    CURRENT_DATE - 35,
    CURRENT_DATE - 21,
    s.id,
    u1.id,
    u4.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u1 ON u1.name = 'Santiago Mout'
JOIN app_user u4 ON u4.name = 'Joaquín Álvarez'
WHERE p.name = 'API Backend' AND s.name = 'Usuarios';

INSERT INTO task (
    summary,
    description,
    activity,
    status,
    priority,
    created_at,
    sprint_id,
    reporter_id,
    assignee_id
)
SELECT
    'Autenticación JWT',
    'Emisión y validación de tokens JWT para proteger los endpoints privados, controlando la expiración de la sesión y con un guard que rechace las peticiones sin un token válido o con un token vencido.',
    'feature',
    'in progress',
    'must',
    CURRENT_DATE - 12,
    s.id,
    u4.id,
    u2.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u4 ON u4.name = 'Joaquín Álvarez'
JOIN app_user u2 ON u2.name = 'Martín Gómez'
WHERE p.name = 'API Backend' AND s.name = 'Autenticación';

-- Precondiciones
INSERT INTO precondition (
    dependent_task_id,
    independent_task_id
)
SELECT
    d.id AS dependent_task_id,
    i.id AS independent_task_id
FROM task d
JOIN task i ON i.summary = 'Relevamiento de requisitos'
        AND i.sprint_id = d.sprint_id
WHERE d.summary = 'Modelo de datos'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'Sistema de Gestión' AND s.name = 'Fundamentos'
)
ON CONFLICT DO NOTHING;

INSERT INTO precondition (
    dependent_task_id,
    independent_task_id
)
SELECT
    d.id AS dependent_task_id,
    i.id AS independent_task_id
FROM task d
JOIN task i ON i.summary = 'CRUD de proyectos'
        AND i.sprint_id = d.sprint_id
WHERE d.summary = 'Tablero de tareas'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'Sistema de Gestión' AND s.name = 'CRUD Completo'
)
ON CONFLICT DO NOTHING;

INSERT INTO precondition (
    dependent_task_id,
    independent_task_id
)
SELECT
    d.id AS dependent_task_id,
    i.id AS independent_task_id
FROM task d
JOIN task i ON i.summary = 'Validación de fechas'
        AND i.sprint_id = d.sprint_id
WHERE d.summary = 'Dependencias entre tareas'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'Sistema de Gestión' AND s.name = 'CRUD Completo'
)
ON CONFLICT DO NOTHING;

INSERT INTO precondition (
    dependent_task_id,
    independent_task_id
)
SELECT
    d.id AS dependent_task_id,
    i.id AS independent_task_id
FROM task d
CROSS JOIN task i
WHERE d.summary = 'CRUD de proyectos'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'Sistema de Gestión' AND s.name = 'CRUD Completo'
)
AND i.summary = 'Modelo de datos'
AND i.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'Sistema de Gestión' AND s.name = 'Fundamentos'
)
ON CONFLICT DO NOTHING;

INSERT INTO precondition (
    dependent_task_id,
    independent_task_id
)
SELECT
    d.id AS dependent_task_id,
    i.id AS independent_task_id
FROM task d
CROSS JOIN task i
WHERE d.summary = 'Panel de métricas'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'Sistema de Gestión' AND s.name = 'Métricas'
)
AND i.summary = 'CRUD de proyectos'
AND i.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'Sistema de Gestión' AND s.name = 'CRUD Completo'
)
ON CONFLICT DO NOTHING;

INSERT INTO precondition (
    dependent_task_id,
    independent_task_id
)
SELECT
    d.id AS dependent_task_id,
    i.id AS independent_task_id
FROM task d
CROSS JOIN task i
WHERE d.summary = 'Autenticación JWT'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'API Backend' AND s.name = 'Autenticación'
)
AND i.summary = 'Endpoints de usuarios'
AND i.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'API Backend' AND s.name = 'Usuarios'
)
ON CONFLICT DO NOTHING;
