import React from "react";
import styles from "./styles.module.css";

interface SingleStatProps {
	stat: string
	val: number
	modVal: number
	decrease: (val: string) => void
	increase: (val: string) => void
	cost: number
}
const SingleStat = (props: SingleStatProps) => {
	const { stat, val, modVal, decrease, increase, cost } = props;

	const display = stat.charAt(0).toUpperCase() + stat.slice(1);
	return (
		<div className={styles.singleStat}>
			<button
				onClick={() => decrease(stat)}
				className={styles.statsButton}
			>
				-
			</button>
			<span className={styles.statsText} id={`${stat}controller`}>
				{display}: {val} || Mod: {modVal}{" "}
			</span>
			{val < 15 && (
				<>
					<button
						onClick={() => increase(stat)}
						className={styles.statsButton}
					>
						+
					</button>
					Next Point: {cost}
				</>
			)}
		</div>
	);
};

export default SingleStat;
