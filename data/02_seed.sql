-- Usuarios

INSERT INTO app_user (name, created_at)
VALUES
    ('Santiago Mout', CURRENT_DATE - 60),
    ('Martín Gómez', CURRENT_DATE - 60),
    ('Lucía Fernández', CURRENT_DATE - 58),
    ('Joaquín Álvarez', CURRENT_DATE - 55),
    ('Valentina Sosa', CURRENT_DATE - 50);

-- Proyectos

INSERT INTO project (
    name, description, created_at
    ) VALUES (
        'Sistema de Gestión',
        'Aplicación web para planificar y seguir el trabajo del equipo. Concentra los proyectos, los sprints y las tareas en un tablero Kanban, permite bloquear el cierre de una tarea hasta que terminen sus dependencias y muestra métricas de avance por sprint y por responsable.',
        CURRENT_DATE - 45
    ), (
        'Aplicación Móvil',
        'Aplicación móvil para organizar las actividades del día a día, con la agenda de tareas personales, recordatorios locales que avisan cuando vence una actividad y una versión que funciona sin conexión para consultar lo ya sincronizado.',
        CURRENT_DATE - 44
    ), (
        'API Backend',
        'API REST con todos los servicios que consumen la web y la aplicación móvil: autenticación con tokens, gestión de usuarios, proyectos, sprints y tareas, con respuestas consistentes y documentación interactiva de cada endpoint.',
        CURRENT_DATE - 40
    );

-- sprints

INSERT INTO sprint (
    name,
    start_date,
    end_date,
    status,
    project_id
)
SELECT
    'Fundamentos',
    CURRENT_DATE - 42,
    CURRENT_DATE - 14,
    'completed',
    id
FROM project
WHERE name = 'Sistema de Gestión';

INSERT INTO sprint (
    name,
    start_date,
    end_date,
    status,
    project_id
)
SELECT
    'CRUD Completo',
    CURRENT_DATE - 14,
    CURRENT_DATE + 7,
    'active',
    id
FROM project
WHERE name = 'Sistema de Gestión';

INSERT INTO sprint (
    name,
    start_date,
    end_date,
    status,
    project_id
)
SELECT
    'Métricas',
    CURRENT_DATE + 8,
    CURRENT_DATE + 21,
    'planned',
    id
FROM project
WHERE name = 'Sistema de Gestión';

INSERT INTO sprint (
    name,
    start_date,
    end_date,
    status,
    project_id
)
SELECT
    'Prototipo',
    CURRENT_DATE - 42,
    CURRENT_DATE - 14,
    'completed',
    id
FROM project
WHERE name = 'Aplicación Móvil';

INSERT INTO sprint (
    name,
    start_date,
    end_date,
    status,
    project_id
)
SELECT
    'Recordatorios',
    CURRENT_DATE - 14,
    CURRENT_DATE + 7,
    'active',
    id
FROM project
WHERE name = 'Aplicación Móvil';

INSERT INTO sprint (
    name,
    start_date,
    end_date,
    status,
    project_id
)
SELECT
    'Sincronización',
    CURRENT_DATE + 8,
    CURRENT_DATE + 21,
    'planned',
    id
FROM project
WHERE name = 'Aplicación Móvil';

INSERT INTO sprint (
    name,
    start_date,
    end_date,
    status,
    project_id
)
SELECT
    'Usuarios',
    CURRENT_DATE - 35,
    CURRENT_DATE - 15,
    'completed',
    id
FROM project
WHERE name = 'API Backend';

INSERT INTO sprint (
    name,
    start_date,
    end_date,
    status,
    project_id
)
SELECT
    'Autenticación',
    CURRENT_DATE - 14,
    CURRENT_DATE + 7,
    'active',
    id
FROM project
WHERE name = 'API Backend';

INSERT INTO sprint (
    name,
    start_date,
    end_date,
    status,
    project_id
)
SELECT
    'Documentación',
    CURRENT_DATE + 8,
    CURRENT_DATE + 21,
    'planned',
    id
FROM project
WHERE name = 'API Backend';
