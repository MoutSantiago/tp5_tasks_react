import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Chart from "./components/Chart";
import InfoCard from "./components/InfoCard";
import Statistic from "./components/Statistic";
import TaskList from "./components/TaskList";
import BigTask from "./components/BigTask";
import ProjectInfo from "./components/ProjectInfo";
import { changeTaskState, loadTasks } from "./api/task";
import { loadProjects } from "./api/project";
import { loadUsers } from "./api/user";

import { bindSelection, type Selection } from "./types/selection";
import type { Project, Sprint, Task, TaskStatus, User } from "./types/data";

/**
 * Función que dado un array de tareas calcula la cantidad de tareas que fueron
 * cerradas en cada una de las ultimas semanas.
 *
 * @param {Task[]} tasks Array de tareas
 * @returns {number[]} Array con la cantidad de tareas cerradas en las ultimas semanas
 */
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

  return result.reverse();
}

/**
 * Dado un array de numeros, retorna un array con los valores escalados
 * Primero busca el valor mayor, el cual se toma como 100, luego a cada valor
 * se le aplica una regla de 3 simple en base al mayor
 *
 * @param {number[]} numbers Array de numeros
 * @returns {number[]} Array de porcentajes
 */
function transformIntoPercentage(numbers: number[]): number[] {
  const max: number = Math.max(...numbers);
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
    (async () => {
      setTasks(await loadTasks());
      setProjects(await loadProjects());
      setUsers(await loadUsers());
    })();
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

  const reloadTasks = async (): Promise<void> => {
    setTasks(await loadTasks());
  };

  const reloadProjects = async (): Promise<void> => {
    setProjects(await loadProjects());
  };

  const reloadUsers = async (): Promise<void> => {
    setUsers(await loadUsers());
  };

  const changeStatus = (id: number, status: TaskStatus): void => {
    const previous: Task | undefined = tasks.find((task) => task.id === id);

    if (!previous || previous.status === status) return;

    (async (): Promise<void> => {
      try {
        await changeTaskState(id, status);
        setTasks((current) =>
          current.map(
            (task: Task): Task =>
              task.id === id
                ? {
                    ...task,
                    status,
                    closed_at: status === "done" ? new Date() : undefined,
                  }
                : task,
          ),
        );
      } catch {
        setTasks((current) =>
          current.map((task: Task): Task => (task.id === id ? previous : task)),
        );
      }
    })();
  };

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
                onExecute={reloadTasks}
                onChangeStatus={changeStatus}
              />
            ) : selectedProject ? (
              <ProjectInfo
                project={selectedProject}
                onExecute={() => reloadProjects()}
              />
            ) : (
              chart
            )}
          </article>
          <InfoCard
            title="Proyectos"
            projects={projects}
            onExecute={reloadProjects}
          />
          <InfoCard title="Usuarios" users={users} onExecute={reloadUsers} />

          <Statistic
            title="Tareas completadas"
            value={taskDone}
            change={`${Number.isInteger(taskDonePercentage) ? taskDonePercentage : taskDonePercentage.toFixed(2)}%`}
            increasing={taskDone >= taskPending}
          />
          <Statistic
            title="Tareas pendientes"
            value={taskPending}
            change={`${Number.isInteger(taskPendingPercentage) ? taskPendingPercentage : taskPendingPercentage.toFixed(2)}%`}
            increasing={taskDone < taskPending}
          />
        </section>
        <TaskList title="Tareas" tasks={tasks} onExecute={reloadTasks} />
      </main>
    </>
  );
}

export default App;
