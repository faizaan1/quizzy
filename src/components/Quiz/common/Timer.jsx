import React, { forwardRef, useImperativeHandle } from 'react'
import { useTimer } from 'react-timer-hook';

const Timer = forwardRef(({ timerSeconds, onTimerExpire}, ref ) => {
	const time = new Date();
	time.setSeconds(time.getSeconds() + timerSeconds);
	const { seconds, restart, start } = useTimer({
		expiryTimestamp: time,
		autoStart: true,
		onExpire: () => {
			setTimeout(() => {
				onTimerExpire();
			}, 500);
		}
	});

	useImperativeHandle(ref, () => ({
		startTimer() {
			start();
		},

		resetTimer() {
			const time = new Date();
			time.setSeconds(time.getSeconds() + timerSeconds);
			restart(time);
		},
	}));

	return (
		<div className="coinsdata">
			<div>
				<h1 className={`inner-coins__data ${seconds<10?'main-color':'text-white'}`}>{seconds}</h1>
			</div>
		</div>
	)
});

export default Timer