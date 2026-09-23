import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { api } from "./api/axios";
import Chart from "./components/Chart";
import InfoCard from "./components/InfoCard";
import Statistic from "./components/Statistic";
import TaskList from "./components/TaskList";
import BigTask from "./components/BigTask";
import ProjectInfo from "./components/ProjectInfo";

import type { Project, Task, User } from "./types/data";

type Select = {
	type: "chart" | "task" | "project";
	task?: Task;
	project?: Project;
};

/**
 * Componente raíz del dashboard: arma el resumen, las estadísticas
 * y la lista de tareas, y mantiene el elemento seleccionado.
 */
function App() {
	const [selected, setSelected] = useState<Select>({ type: "chart" });
	const [tasks, setTasks] = useState<Task[]>([]);
	const [projects, setProjects] = useState<Project[]>([]);
	const [users, setUsers] = useState<User[]>([]);

	const taskDone: number = tasks.filter(
		(task) => task.status === "done",
	).length;
	const taskDonePercentage: number = (taskDone * 100) / tasks.length;

	const taskPending: number = tasks.length - taskDone;
	const taskPendingPercentage: number = (taskPending * 100) / tasks.length;

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
					<article className="card card--large">
						{selected.type === "chart" ? (
							<Chart
								title="Grafico fachero"
								subtitle="Avance de las taeras competadas por semana"
								bars={[80, 40, 60, 50, 40, 78]}
							/>
						) : selected.task ? (
							<BigTask
								task={selected.task}
								func={() => toast.info("Editar tarea")}
							/>
						) : selected.project ? (
							<ProjectInfo
								project={selected.project}
								func={() => toast.info("Editar proyecto")}
							/>
						) : undefined}
					</article>
					<InfoCard
						title="Proyectos"
						projects={projects}
						func={() => {
							toast.info("Añadir proyecto");
						}}
						select={setSelected}
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
						select={setSelected}
					/>
					<Statistic
						title="Tareas pendientes"
						value={taskPending}
						change={`${taskPendingPercentage}%`}
						increasing={taskDone < taskPending}
						select={setSelected}
					/>
				</section>
				<TaskList
					title="Tareas"
					tasks={tasks}
					func={() => {
						toast.info("Añadir tarea");
					}}
					select={setSelected}
				/>
			</main>
		</>
	);
}

export default App;
