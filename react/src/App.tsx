import { useState } from "react";
import Chart from "./components/Chart";
import InfoCard from "./components/InfoCard";
import Statistic from "./components/Statistic";
import TaskList from "./components/TaskList";
import BigTask from "./components/BigTask";
import ProjectInfo from "./components/ProjectInfo";

import type { Project, Task, User } from "./types/data";

const TASKS: Task[] = [
	{
		id: 1,
		summary: "Redactar informe de avance del TP",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quis rem debitis sapiente tempore nam officia ullam quaerat libero assumenda eos ipsa est nemo necessitatibus, soluta, itaque in deserunt accusamus.",
		activity: "bug",
		status: "done",
		priority: "must",
		created_at: new Date(),
		closed_at: undefined,
		sprint_id: 1,
		reporter_id: 2,
		assignee_id: undefined,
	},
	{
		id: 2,
		summary: "Redactar informe de avance del TP",
		description: "",
		activity: "bug",
		status: "done",
		priority: "must",
		created_at: new Date(),
		closed_at: undefined,
		sprint_id: 1,
		reporter_id: 2,
		assignee_id: undefined,
	},
	{
		id: 3,
		summary: "Redactar informe de avance del TP",
		description: "",
		activity: "bug",
		status: "done",
		priority: "must",
		created_at: new Date(),
		closed_at: undefined,
		sprint_id: 1,
		reporter_id: 2,
		assignee_id: undefined,
	},
	{
		id: 4,
		summary: "Redactar informe de avance del TP",
		description: "",
		activity: "bug",
		status: "done",
		priority: "must",
		created_at: new Date(),
		closed_at: undefined,
		sprint_id: 1,
		reporter_id: 2,
		assignee_id: undefined,
	},
	{
		id: 5,
		summary: "Redactar informe de avance del TP",
		description: "",
		activity: "bug",
		status: "done",
		priority: "must",
		created_at: new Date(),
		closed_at: undefined,
		sprint_id: 1,
		reporter_id: 2,
		assignee_id: undefined,
	},
	{
		id: 6,
		summary: "Redactar informe de avance del TP",
		description: "",
		activity: "bug",
		status: "done",
		priority: "must",
		created_at: new Date(),
		closed_at: undefined,
		sprint_id: 1,
		reporter_id: 2,
		assignee_id: undefined,
	},
];

const PROJECTS: Project[] = [
	{
		id: 1,
		name: "Avanzada",
		description: "Me gusta mucho la maria",
		created_at: new Date(),
	},
	{
		id: 2,
		name: "Avanzada",
		description: "Me gusta mucho la maria",
		created_at: new Date(),
	},
];

const USERS: User[] = [
	{
		id: 1,
		name: "Santiago Mout",
		created_at: new Date(),
	},
	{
		id: 2,
		name: "Axel Sandillu",
		created_at: new Date(),
	},
	{
		id: 3,
		name: "Valentino Laiño",
		created_at: new Date(),
	},
	{
		id: 4,
		name: "Ana Lucia Colazo",
		created_at: new Date(),
	},
];

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

	return (
		<>
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
								func={() => console.log("Editar")}
							/>
						) : selected.project ? (
							<ProjectInfo
								project={selected.project}
								func={() => console.log("Editar proyecto")}
							/>
						) : undefined}
					</article>
					<InfoCard
						title="Proyectos"
						projects={PROJECTS}
						func={() => {
							console.log("Proyecto");
						}}
						select={setSelected}
					/>
					<InfoCard
						title="Usuarios"
						users={USERS}
						func={() => {
							console.log("Usuario");
						}}
					/>

					<Statistic
						title="Tareas completadas"
						value={65}
						change="+12%"
						select={setSelected}
					/>
					<Statistic
						title="Tareas pendientes"
						value={23}
						change="-4%"
						increasing={false}
						select={setSelected}
					/>
				</section>
				<TaskList
					title="Tareas"
					tasks={TASKS}
					func={() => {
						console.log("Tarea");
					}}
					select={setSelected}
				/>
			</main>
		</>
	);
}

export default App;
