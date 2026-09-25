-- ============================================
-- TASKS
-- ============================================

-- Se insertan tareas de otros 02_seed.sql, referenciando a los sprints,
-- proyectos y usuarios ya cargados para que queden correctamente
-- vinculadas con FK.

-- ============================================
-- Tareas - Sprint 1 · Sistema de Gestión (completed)
-- ============================================

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
    'Relevar los requisitos funcionales del sistema junto a los stakeholders.',
    'task',
    'done',
    'must',
    '2026-09-01',
    '2026-09-06',
    s.id,
    u1.id,
    u2.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u1 ON u1.name = 'Santiago'
JOIN app_user u2 ON u2.name = 'Martín'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 1';

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
    'Diseñar el modelo de datos de proyectos, sprints y tareas.',
    'documentation',
    'done',
    'must',
    '2026-09-02',
    '2026-09-08',
    s.id,
    u1.id,
    u1.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u1 ON u1.name = 'Santiago'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 1';

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
    'Mockups de interfaz',
    'Crear los mockups de las pantallas principales del sistema.',
    'feature',
    'done',
    'should',
    '2026-09-05',
    '2026-09-12',
    s.id,
    u2.id,
    u3.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u2 ON u2.name = 'Martín'
JOIN app_user u3 ON u3.name = 'Lucía'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 1';


-- ============================================
-- Tareas - Sprint 2 · Sistema de Gestión (active)
-- ============================================

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
    'API de autenticación',
    'Implementar el login y el manejo de sesiones en el backend.',
    'feature',
    'in progress',
    'must',
    '2026-09-15',
    s.id,
    u1.id,
    u4.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u1 ON u1.name = 'Santiago'
JOIN app_user u4 ON u4.name = 'Joaquín'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 2';

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
    'CRUD de proyectos',
    'Desarrollar el alta, baja y modificación de proyectos.',
    'feature',
    'in progress',
    'must',
    '2026-09-15',
    s.id,
    u3.id,
    u2.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u3 ON u3.name = 'Lucía'
JOIN app_user u2 ON u2.name = 'Martín'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 2';

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
    'CRUD de tareas',
    'Desarrollar el alta, baja y modificación de tareas con sus estados.',
    'feature',
    'to do',
    'must',
    '2026-09-18',
    s.id,
    u4.id,
    u5.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u4 ON u4.name = 'Joaquín'
JOIN app_user u5 ON u5.name = 'Valentina'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 2';

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
    'Listado de tareas por sprint',
    'Mostrar el tablero de tareas agrupado por sprint.',
    'improvement',
    'to do',
    'should',
    '2026-09-18',
    s.id,
    u2.id,
    u5.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u2 ON u2.name = 'Martín'
JOIN app_user u5 ON u5.name = 'Valentina'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 2';

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
    'Corregir validación de fechas',
    'No permitir sprints con fecha de fin anterior a la de inicio.',
    'bug',
    'review',
    'must',
    '2026-09-17',
    s.id,
    u5.id,
    u4.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u5 ON u5.name = 'Valentina'
JOIN app_user u4 ON u4.name = 'Joaquín'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 2';


-- ============================================
-- Tareas - Sprint 3 · Sistema de Gestión (planned)
-- ============================================

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
    'Construir los gráficos de avance por sprint y por usuario.',
    'feature',
    'backlog',
    'could',
    '2026-09-29',
    s.id,
    u3.id,
    u2.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u3 ON u3.name = 'Lucía'
JOIN app_user u2 ON u2.name = 'Martín'
WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 3';


-- ============================================
-- Tareas - Android · Aplicación Móvil (active)
-- ============================================

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
    'Login de la app',
    'Pantalla de inicio de sesión para usuarios de la app móvil.',
    'feature',
    'in progress',
    'must',
    '2026-09-15',
    s.id,
    u1.id,
    u3.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u1 ON u1.name = 'Santiago'
JOIN app_user u3 ON u3.name = 'Lucía'
WHERE p.name = 'Aplicación Móvil' AND s.name = 'Sprint 2';

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
    'Recordatorios locales',
    'Implementar notificaciones locales para recordar actividades.',
    'feature',
    'to do',
    'should',
    '2026-09-20',
    s.id,
    u3.id,
    u5.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u3 ON u3.name = 'Lucía'
JOIN app_user u5 ON u5.name = 'Valentina'
WHERE p.name = 'Aplicación Móvil' AND s.name = 'Sprint 2';

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
    'Sincronización con planillas',
    'Exportar las actividades a una hoja de cálculo.',
    'improvement',
    'backlog',
    'could',
    '2026-09-22',
    s.id,
    u5.id,
    u3.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u5 ON u5.name = 'Valentina'
JOIN app_user u3 ON u3.name = 'Lucía'
WHERE p.name = 'Aplicación Móvil' AND s.name = 'Sprint 2';


-- ============================================
-- Tareas - API Backend (active)
-- ============================================

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
    'Endpoints de usuarios',
    'Exponer los endpoints de usuarios para los distintos clientes.',
    'feature',
    'in progress',
    'must',
    '2026-09-10',
    s.id,
    u1.id,
    u4.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u1 ON u1.name = 'Santiago'
JOIN app_user u4 ON u4.name = 'Joaquín'
WHERE p.name = 'API Backend' AND s.name = 'Sprint 1';

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
    'Proteger los endpoints con tokens JWT.',
    'feature',
    'review',
    'must',
    '2026-09-12',
    s.id,
    u4.id,
    u2.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u4 ON u4.name = 'Joaquín'
JOIN app_user u2 ON u2.name = 'Martín'
WHERE p.name = 'API Backend' AND s.name = 'Sprint 1';

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
    'Documentación Swagger',
    'Publicar la documentación interactiva de la API.',
    'documentation',
    'to do',
    'should',
    '2026-09-14',
    s.id,
    u2.id,
    u1.id
FROM sprint s
JOIN project p ON p.id = s.project_id
JOIN app_user u2 ON u2.name = 'Martín'
JOIN app_user u1 ON u1.name = 'Santiago'
WHERE p.name = 'API Backend' AND s.name = 'Sprint 1';


-- ============================================
-- DEPENDENCIAS (precondition)
-- ============================================

-- La dependencia se resuelve por summary y por sprint/proyecto, de modo
-- que este script se pueda re-ejecutar sin depender de ids hardcodeados.

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
    WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 1'
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
JOIN task i ON i.summary = 'Modelo de datos'
        AND i.sprint_id = d.sprint_id
WHERE d.summary = 'Mockups de interfaz'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 1'
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
JOIN task i ON i.summary = 'API de autenticación'
        AND i.sprint_id = d.sprint_id
WHERE d.summary = 'CRUD de tareas'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 2'
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
WHERE d.summary = 'CRUD de tareas'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 2'
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
JOIN task i ON i.summary = 'CRUD de tareas'
        AND i.sprint_id = d.sprint_id
WHERE d.summary = 'Listado de tareas por sprint'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 2'
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
JOIN task i ON i.summary = 'CRUD de tareas'
        AND i.sprint_id = d.sprint_id
WHERE d.summary = 'Panel de métricas'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'Sistema de Gestión' AND s.name = 'Sprint 3'
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
JOIN task i ON i.summary = 'Login de la app'
        AND i.sprint_id = d.sprint_id
WHERE d.summary = 'Recordatorios locales'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'Aplicación Móvil' AND s.name = 'Sprint 2'
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
JOIN task i ON i.summary = 'Endpoints de usuarios'
        AND i.sprint_id = d.sprint_id
WHERE d.summary = 'Autenticación JWT'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'API Backend' AND s.name = 'Sprint 1'
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
JOIN task i ON i.summary = 'Autenticación JWT'
        AND i.sprint_id = d.sprint_id
WHERE d.summary = 'Documentación Swagger'
AND d.sprint_id = (
    SELECT s.id FROM sprint s
    JOIN project p ON p.id = s.project_id
    WHERE p.name = 'API Backend' AND s.name = 'Sprint 1'
)
ON CONFLICT DO NOTHING;