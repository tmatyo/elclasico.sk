import "../css/stats.css";
import { useEffect, useState } from "react";

export default function Stats() {
	const [stats, setStats] = useState({
		matches: 0,
		barca: 0,
		draw: 0,
		real: 0,
		barca_goals: 0,
		real_goals: 0,
		avg_attendance: 0,
	});

	useEffect(() => {
		let v = new Date();
		fetch("/stats.json?v=" + v.getTime())
			.then((res) => res.json())
			.then((res) => setStats(res[0]))
			.catch((error) => console.log("ERROR:", error));
	}, []);

	return (
		<div className="stats">
			<h2>Štatistiky</h2>
			<table>
				<tbody>
					<tr>
						<th>Zápasy</th>
						<th>Barcelona</th>
						<th>Remíza</th>
						<th>Real Madrid</th>
						<th>Na góly</th>
						<th>Priemerná návštevnosť</th>
					</tr>
					<tr>
						<td>{stats.matches}</td>
						<td>{stats.barca}</td>
						<td>{stats.draw}</td>
						<td>{stats.real}</td>
						<td>{`${stats.barca_goals}:${stats.real_goals}`}</td>
						<td>{stats.avg_attendance}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
