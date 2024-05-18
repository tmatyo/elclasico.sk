import "../css/countdown.css";
import { useEffect, useState } from "react";

export default function Countdown({time}) {

	const [cdown, setCdown] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})


	const startCdown = (cd) => {
		let days = 1000 * 60 * 60 * 24;
		let hours = 1000 * 60 * 60;
		let minutes = 1000 * 60;
		let seconds = 1000;

		setCdown({
			days: Math.floor(cd / days),
			hours: Math.floor((cd % days) / hours),
			minutes: Math.floor((cd % hours) / minutes),
			seconds: Math.floor((cd % minutes) / seconds),
		});
	}

	useEffect(() => {

		var t = setInterval(() => {
			if (time.length === 0) {
				return;
			}

			let from = new Date();
			let date = time.replace(" ", "");
			date = date.replace(":", ".");
			date = date.split(".");

			let to = new Date(from.getFullYear(), date[1] - 1, date[0], date[2], date[3]);
			let cd = to - from;

			if (cd < 0) {
				clearInterval(t);
				return;
			}

			startCdown(cd);
		}, 1000);
	}, [time])

		return (
			<div id="countdown">
				<div className="cd-grid">
					<div className="cd-cell">
						<div className="cd-number">{cdown.days}</div>
						<div className="cd-desc">Dní</div>
					</div>
					<div className="cd-cell">
						<div className="cd-number">{cdown.hours}</div>
						<div className="cd-desc">Hodín</div>
					</div>
					<div className="cd-cell">
						<div className="cd-number">{cdown.minutes}</div>
						<div className="cd-desc">Minút</div>
					</div>
					<div className="cd-cell">
						<div className="cd-number">{cdown.seconds}</div>
						<div className="cd-desc">Sekúnd</div>
					</div>
				</div>
			</div>
		);

}
