import "../css/schedule.css";
import Banner from "../components/Banner";
import Countdown from "../components/Countdown";
import { useEffect, useState } from "react";

export default function Schedule() {
	const [data, setData] = useState({
		away_team: "",
		home_team: "",
		time: "",
	});

	const clasicoIsPlanned = () => {
		return data.away_team && data.home_team && data.time;
	};

	useEffect(() => {
		let v = new Date();
		fetch("/schedule.json?v=" + v.getTime())
			.then((res) => res.json())
			.then((res) => setData(res[0]))
			.catch((error) => console.log("ERROR:", error));
	}, []);

	console.log(data);

	return (
		<div id="schedule">
			<div className="container">
				<h1>Nasledujúce El Clasico</h1>
				<Banner awayTeam={data.away_team} homeTeam={data.home_team} isPlanned={clasicoIsPlanned()} />
				<Countdown time={data.time} />
			</div>
		</div>
	);
}
