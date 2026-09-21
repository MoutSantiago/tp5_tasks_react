import type { JSX } from "react";
import Item from "./Item";

export default function InfoCard(): JSX.Element {
	return (
		<article className="card">
			<div className="header">
				<div className="header--first">
					<span className="title">Titulo</span>
					<span className="title title--second">6</span>
				</div>
				<button>+</button>
			</div>
			<div className="item__container">
				<Item />
				<Item />
				<Item />
				<Item />
			</div>
		</article>
	);
}
