import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { api } from "./api/axios";
import Chart from "./components/Chart";
import InfoCard from "./components/InfoCard";
import Statistic from "./components/Statistic";
import TaskList from "./components/TaskList";
import BigTask from "./components/BigTask";
import ProjectInfo from "./components/ProjectInfo";
import { bindSelection, type Selection } from "./types/selection";

import type { Project, Sprint, Task, User } from "./types/data";

function getClosedTasksByWeek(tasks: Task[]): number[] {
  const now = new Date();

  const currentMonday = new Date(now);
  const day = currentMonday.getDay();
  const diff = day === 0 ? 6 : day - 1;

  currentMonday.setDate(currentMonday.getDate() - diff);
  currentMonday.setHours(0, 0, 0, 0);

  const result: number[] = [];

  for (let week = 0; week < 6; week++) {
    const start = new Date(currentMonday);
    start.setDate(start.getDate() - week * 7);

    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    const count = tasks.filter((task) => {
      if (!task.closed_at) return false;

      const closedAt = new Date(task.closed_at);

      return closedAt >= start && closedAt < end;
    }).length;

    result.push(count);
  }

  // Eliminar semanas vacías del final
  while (result.length > 0 && result[result.length - 1] === 0) {
    result.pop();
  }

  return result;
}

function transformIntoPercentage(numbers: number[]): number[] {
  const max: number = Math.max(...numbers);

  // Ejecutamos una regla de 3 simple por cada valor del array, siendo max == 100
  return numbers.map((num: number): number => (num * 100) / max);
}

/**
 * Componente raíz del dashboard: arma el resumen, las estadísticas
 * y la lista de tareas, y mantiene el elemento seleccionado.
 */
function App() {
  const [selection, setSelection] = useState<Selection>({ type: "chart" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    bindSelection(setSelection);
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      const response = await api.get("/task");
      setTasks(
        response.data.map((task: Task) => ({
          ...task,
          created_at: new Date(task.created_at),
          closed_at: task.closed_at ? new Date(task.closed_at) : null,
        })),
      );
    };

    const loadProjects = async () => {
      const response = await api.get("/project");
      setProjects(
        response.data.map((project: Project) => ({
          ...project,
          created_at: new Date(project.created_at),
          sprints: project.sprints.map((sprint: Sprint) => ({
            ...sprint,
            start_date: new Date(sprint.start_date),
            end_date: sprint.end_date ? new Date(sprint.end_date) : undefined,
          })),
        })),
      );
    };

    const loadUsers = async () => {
      const response = await api.get("/user");
      setUsers(response.data);
    };

    loadTasks();
    loadProjects();
    loadUsers();
  }, []);

  const taskDone: number = tasks.filter(
    (task) => task.status === "done",
  ).length;
  const taskDonePercentage: number = (taskDone * 100) / tasks.length;

  const taskPending: number = tasks.length - taskDone;
  const taskPendingPercentage: number = (taskPending * 100) / tasks.length;

  const selectedTask: Task | undefined =
    selection.type === "task"
      ? tasks.find((task) => task.id === selection.taskId)
      : undefined;

  const selectedProject: Project | undefined =
    selection.type === "project"
      ? projects.find((project) => project.id === selection.projectId)
      : selection.type === "sprint"
        ? projects.find((project) =>
            project.sprints.some(
              (sprint: Sprint): boolean => sprint.id === selection.sprintId,
            ),
          )
        : undefined;

  const tasksClosedForWeek = getClosedTasksByWeek(tasks);
  const chart = (
    <Chart
      title="Actividad"
      subtitle="Avance de las tareas competadas en las ultimas semanas"
      values={tasksClosedForWeek}
      bars={transformIntoPercentage(tasksClosedForWeek)}
    />
  );

  return (
    <>
      <Toaster />
      <div className="ambient" aria-hidden="true">
        <div className="ambient__orb ambient__orb--one" />
        <div className="ambient__orb ambient__orb--two" />
        <div className="ambient__orb ambient__orb--three" />
      </div>
      <main className="dashboard">
        <section
          className="dashboard__row dashboard__row--overview"
          aria-label="Resumen de actividad"
        >
          <article className="card card--large surface radius-lg shadow-card hover-lift">
            {selectedTask ? (
              <BigTask
                task={selectedTask}
                func={() => toast.info("Editar tarea")}
              />
            ) : selectedProject ? (
              <ProjectInfo
                project={selectedProject}
                func={() => toast.info("Editar proyecto")}
              />
            ) : (
              chart
            )}
          </article>
          <InfoCard
            title="Proyectos"
            projects={projects}
            func={() => {
              toast.info("Añadir proyecto");
            }}
          />
          <InfoCard
            title="Usuarios"
            users={users}
            func={() => {
              toast.info("Añadir usuario");
            }}
          />

          <Statistic
            title="Tareas completadas"
            value={taskDone}
            change={`${taskDonePercentage}%`}
            increasing={taskDone >= taskPending}
          />
          <Statistic
            title="Tareas pendientes"
            value={taskPending}
            change={`${taskPendingPercentage}%`}
            increasing={taskDone < taskPending}
          />
        </section>
        <TaskList
          title="Tareas"
          tasks={tasks}
          func={() => {
            toast.info("Añadir tarea");
          }}
        />
      </main>
    </>
  );
}

export default App;
