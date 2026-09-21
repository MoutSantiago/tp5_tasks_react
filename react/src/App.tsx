import Graphic from "./components/Graphic";
import InfoCard from "./components/InfoCard";
import Stadistic from "./components/Stadistic";
import TaskList from "./components/TaskList";

function App() {
	return (
		<main>
			<section>
				<Graphic />
				<InfoCard />
				<InfoCard />
			</section>
			<section>
				<Stadistic />
				<Stadistic />
				<Stadistic />
				<Stadistic />
			</section>
			<TaskList />
		</main>
	);
}

export default App;
