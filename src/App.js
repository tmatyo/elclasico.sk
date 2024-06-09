import Schedule from "./templates/Schedule";
import HistoricData from "./templates/HistoricData";
import "./css/app.css";

export default function App() {
	return (
		<div id="app">
			<Schedule />
			<HistoricData />
		</div>
	);
}
