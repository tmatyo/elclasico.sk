import "../css/fixtures.css";
import { useEffect, useState } from "react";

export default function Fixtures() {
	const [fix, setFix] = useState([]);

	const formatMatchTime = (matchDate) => {
		return new Date(matchDate).toLocaleDateString(window.navigator.language || window.navigator.userLanguage);
	};

	const getTitle = (event, attendance) => {
		return attendance.length > 0 ? `Súťaž: ${event}, ${attendance} divákov` : `Súťaž: ${event}`;
	};

	useEffect(() => {
		let v = new Date();
		fetch("/fixtures.json?v=" + v.getTime())
			.then((res) => res.json())
			.then((res) => setFix(res))
			.catch((error) => console.log("ERROR:", error));
	});

	return (
		<div id="fixtures">
			<h2>Hralo sa</h2>
			<div className="timeline">
				{fix.map((row, index) => {
					return (
						<div
							key={index}
							className={"timeline-item " + row.winner + (index % 2 ? " even" : " odd")}
							title={getTitle(row.event, row.attendance)}
						>
							<div className={index % 2 ? "even-line" : ""}>
								{index % 2 ? <span className="time">{formatMatchTime(row.date)}</span> : ""}
							</div>
							<a
								href={row.link}
								target={"_blank"}
								className={"timeline-fixture " + (index % 2 ? "even" : "odd")}
							>
								<span>{row.home_team}</span> <span>{row.score}</span> <span>{row.away_team}</span>
							</a>
							<div className={index % 2 ? "" : "odd-line"}>
								{index % 2 ? "" : <span className="time">{formatMatchTime(row.date)}</span>}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
