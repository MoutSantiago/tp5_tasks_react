-- ============================================
-- INIT
-- ============================================

-- Enums

CREATE TYPE activity AS ENUM (
    'bug',
    'feature',
    'improvement',
    'task',
    'documentation'
);

CREATE TYPE task_state AS ENUM (
    'backlog',
    'to do',
    'in progress',
    'review',
    'done'
);

CREATE TYPE priority AS ENUM (
    'must',
    'should',
    'could',
    'wont'
);

CREATE TYPE sprint_state AS ENUM (
    'planned',
    'active',
    'completed',
    'cancelled'
);


-- Tablas

CREATE TABLE IF NOT EXISTS project (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description TEXT,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);


CREATE TABLE IF NOT EXISTS app_user (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);


CREATE TABLE IF NOT EXISTS sprint (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    status sprint_state NOT NULL DEFAULT 'planned',
    project_id INT NOT NULL,

    FOREIGN KEY (project_id)
        REFERENCES project(id)
);


CREATE TABLE IF NOT EXISTS task (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    summary VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    activity activity NOT NULL,
    status task_state NOT NULL DEFAULT 'backlog',
    priority priority NOT NULL DEFAULT 'should',
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    closed_at DATE,
    sprint_id INT NOT NULL,
    reporter_id INT NOT NULL,
    assignee_id INT,

    FOREIGN KEY (sprint_id)
        REFERENCES sprint(id),

    FOREIGN KEY (reporter_id)
        REFERENCES app_user(id),

    FOREIGN KEY (assignee_id)
        REFERENCES app_user(id)
);


CREATE TABLE IF NOT EXISTS precondition (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    dependent_task_id INT NOT NULL,
    independent_task_id INT NOT NULL,

    FOREIGN KEY (dependent_task_id)
        REFERENCES task(id),

    FOREIGN KEY (independent_task_id)
        REFERENCES task(id),

    CHECK (dependent_task_id <> independent_task_id),

    UNIQUE (dependent_task_id, independent_task_id)
);
