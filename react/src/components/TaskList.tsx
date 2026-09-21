import type { JSX } from "react";
import Task from "./Task";

export default function TaskList(): JSX.Element {
	return (
		<section className="task--container">
			<div className="header">
				<div className="header--first">
					<span className="title">Titulo</span>
					<span className="title title--second">6</span>
				</div>
				<button>+</button>
			</div>
			<Task />
			<Task />
			<Task />
			<Task />
			<Task />
		</section>
	);
}
