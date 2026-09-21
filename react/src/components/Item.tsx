import type { JSX } from "react";

export default function Item(): JSX.Element {
	return (
		<div className="item">
			<div className="item--top">
				<span className="title">Titulo</span>
				<button>Edit</button>
			</div>
			<span className="subtitle">Subtitulo</span>
		</div>
	);
}
