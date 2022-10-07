import React from "react";
import {Link} from 'react-router-dom';
import styles from './styles.module.css';
export const LandingPage = (props) => {
    return (
		<>
			<h1 className={styles.homeTitle}>
				CGR II - Traveller Character Generator
			</h1>
			<p className={styles.description}>
				Choose either classic or default character creation.
				<br /> Classic is the "roll dice, assign stats" system, and
				default is point-buy. need to balance that point buy.
			</p>
			<div className={styles.linkSection}>
				<Link to="creation/character_creation" className={styles.link}>
					Default Character Creation
				</Link>
				<Link
					to="creation/classic_character_creation"
					className={styles.link}
				>
					Classic Character Creation
				</Link>
			</div>
		</>
	);
}