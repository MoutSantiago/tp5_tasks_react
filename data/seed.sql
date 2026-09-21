-- ============================================
-- SEED
-- ============================================

-- Usuarios
INSERT INTO app_user (name)
VALUES
    ('Santiago'),
    ('Martín'),
    ('Lucía'),
    ('Joaquín'),
    ('Valentina');


-- Proyectos
INSERT INTO project (name, description)
VALUES
    (
        'Sistema de Gestión',
        'Sistema web para la gestión de proyectos, tareas y sprints.'
    ),
    (
        'Aplicación Móvil',
        'Aplicación móvil para la gestión de actividades personales.'
    ),
    (
        'API Backend',
        'API REST para los servicios backend de la organización.'
    );


-- ============================================
-- Sprints - Sistema de Gestión
-- ============================================

INSERT INTO sprint (
    name,
    start_date,
    end_date,
    status,
    project_id
)
SELECT
    'Sprint 1',
    '2026-09-01',
    '2026-09-14',
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
    'Sprint 2',
    '2026-09-15',
    '2026-09-28',
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
    'Sprint 3',
    '2026-09-29',
    '2026-10-12',
    'planned',
    id
FROM project
WHERE name = 'Sistema de Gestión';


-- ============================================
-- Sprints - Aplicación Móvil
-- ============================================

INSERT INTO sprint (
    name,
    start_date,
    end_date,
    status,
    project_id
)
SELECT
    'Sprint 1',
    '2026-09-01',
    '2026-09-14',
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
    'Sprint 2',
    '2026-09-15',
    '2026-09-28',
    'active',
    id
FROM project
WHERE name = 'Aplicación Móvil';


-- ============================================
-- Sprints - API Backend
-- ============================================

INSERT INTO sprint (
    name,
    start_date,
    end_date,
    status,
    project_id
)
SELECT
    'Sprint 1',
    '2026-09-10',
    '2026-09-23',
    'active',
    id
FROM project
WHERE name = 'API Backend';