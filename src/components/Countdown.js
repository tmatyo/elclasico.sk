import "../css/countdown.css";
import { useEffect, useState } from "react";

export default function Countdown({ time }) {
	const [cdown, setCdown] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	const startCdown = (countDown) => {
		let days = 1000 * 60 * 60 * 24;
		let hours = 1000 * 60 * 60;
		let minutes = 1000 * 60;
		let seconds = 1000;

		setCdown({
			days: Math.floor(countDown / days),
			hours: Math.floor((countDown % days) / hours),
			minutes: Math.floor((countDown % hours) / minutes),
			seconds: Math.floor((countDown % minutes) / seconds),
		});
	};

	useEffect(() => {
		const t = setInterval(() => {
			// there is no el clasico scheduled right now
			if (time.length === 0) {
				return;
			}

			const oneDayInThePast = -86400000;

			// calculate the date of the scheduled el clasico with the actual year
			let now = new Date();
			let matchTime = time.replace(" ", "").replace(":", ".").split(".");
			let deadline = new Date(now.getFullYear(), matchTime[1] - 1, matchTime[0], matchTime[2], matchTime[3]);
			let proposedCountDown = deadline - now;

			// if the date is in the past but not longer than 24h,
			// lets assume it was played in the last 24h and
			// turn off the countdown until the next run of the crawler
			if (proposedCountDown < 0 && proposedCountDown > oneDayInThePast) {
				clearInterval(t);
				return;
			}
			// if the date suppose to be before yesterday,
			// lets assume the date is for next year
			else if (proposedCountDown < oneDayInThePast) {
				deadline.setFullYear(deadline.getFullYear() + 1);
			}

			// otherwise start the countdown as is
			startCdown(deadline - now);
		}, 1000);
	}, [time]);

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
