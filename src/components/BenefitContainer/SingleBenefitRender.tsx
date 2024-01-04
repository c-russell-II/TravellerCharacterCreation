import React from "react";
import { AnyBenefit } from "../../features/CareerDetails/CareerTyping";
import styles from "./styles.module.css";

export default function SingleBenefitRender(props: { benefit: AnyBenefit }) {
	const { benefit } = props;

	//TODO: Gotta get some stuff going on for misc benefits, but this is a good start.
	return (
		<div>
			<p className={styles.singleBenefitText}>Money: {benefit.money}</p>
			{" | "}
			<p className={styles.singleBenefitText}>Misc: {benefit.misc}</p>
		</div>
	);
}
