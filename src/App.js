import Countdown from "./components/Countdown";
import Fixtures from "./components/Fixtures";
import "./css/App.css";

export default function App() {
	return (
		<div id="app">
			<Countdown />
			<Fixtures />
		</div>
	);
}
