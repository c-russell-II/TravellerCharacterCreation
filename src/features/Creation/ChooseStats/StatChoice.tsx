import React from "react";
import styles from "./styles.module.css";
import SingleStat from "./SingleStat";
interface StatChoiceProps {
	stats: StatDisplayHolder;
	setStats: React.Dispatch<React.SetStateAction<StatDisplayHolder>>;
	points: number;
	setPoints: React.Dispatch<React.SetStateAction<number>>;
	setReady: React.Dispatch<React.SetStateAction<boolean>>;
}
const StatChoice = (props: StatChoiceProps) => {
	const { stats, setStats, points, setPoints, setReady } = props;
	const statList = Object.keys(stats);
	// Cost for increasing stats, also used for decreasing stats, from mongoose 2e core rulebook!
	const costCalc = (val: number) => {
		if (val < 3) {
			return 1;
		} else if (val < 6) {
			return 2;
		} else if (val < 9) {
			return 3;
		} else if (val < 12) {
			return 4;
		} else if (val < 15) {
			return 5;
		} else {
			return 6;
		}
	};
	// Checks the stat's current value, and passes back your increased available points and your new decreased stats;
	const decrease = (val: string) => {
		const currentStat = stats[val];
		if (stats[val] > 1) {
			setPoints((prevPoints) => prevPoints + costCalc(currentStat - 1));
			setStats((prevStats) => {
				return { ...prevStats, [val]: currentStat - 1 };
			});
			return;
		} else {
			alert("You can't lower that stat any further at this time.");
			return;
		}
	};
	// Checks the stat's current value, if you have enough points, passes increases to your current stats and your current points!
	const increase = (val: string) => {
		const currentStat = stats[val];
		const pointCost = costCalc(currentStat);
		if (currentStat < 15 && pointCost <= points) {
			setPoints((prevPoints) => prevPoints - pointCost);
			setStats((prevStats) => {
				return { ...prevStats, [val]: currentStat + 1 };
			});
			return;
		} else if (currentStat < 15 && pointCost > points) {
			alert("You don't have enough stat points available!");
			return;
		}
	};
	// Checks how many points you have remaining, and if it's low enough passes to parent component that we're good to go.
	const handleReady = () => {
		if (points > 5) {
			alert(
				"Please spend more of your stat points before attempting to proceed."
			);
			return;
		} else {
			setReady(true);
			return;
		}
	};
	// Thresholds for stat modifiers from Mongoose 2e Core rulebook
	const getModifiers = (num: number): number => {
		if (num === 0) {
			return -3;
		} else if (num === 1 || num === 2) {
			return -2;
		} else if (num >= 3 && num < 6) {
			return -1;
		} else if (num > 5 && num < 9) {
			return 0;
		} else if (num > 8 && num < 12) {
			return 1;
		} else if (num > 11 && num < 15) {
			return 2;
		} else {
			return 3;
		}
	};

	return (
		<>
			<h2 className={styles.subTitle}>
				Points remaining:{" "}
				<span className={styles.remainingPoints}>{points}</span>
			</h2>

			<div className={styles.stats}>
				{statList.map((e) => {
					if (e === "psi") {
						return <></>;
					} else {
						return (
							<SingleStat
								key={e}
								stat={e}
								val={stats[e]}
								modVal={getModifiers(stats[e])}
								increase={increase}
								decrease={decrease}
								cost={costCalc(stats[e])}
							/>
						)
					}
				})}

				<button onClick={handleReady} className={styles.statsButton}>
					Finalize stats.
				</button>
			</div>
		</>
	);
};

export default StatChoice;
