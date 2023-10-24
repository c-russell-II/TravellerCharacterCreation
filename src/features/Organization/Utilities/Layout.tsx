import React from "react";
import { Outlet } from "react-router-dom";
import SidebarController from "./SidebarController.jsx";
import styles from "./Organization.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store.js";
// import TrackerContainer from "../../Tracker/TrackerContainer";

//TODO: Replace all "alert" calls with a customized modal.
const Layout = () => {
	const stats = useSelector((state: RootState) => state.stats.displayValues);
	const isNonZero = (e: string) => stats[e as keyof StatDisplayHolder] !== 0;
	return (
		<div className={styles.outer}>
			{/* <TrackerContainer /> */}
			{Object.keys(stats).every(isNonZero) && <SidebarController />}
			<div className={styles.app}>
				<div className={styles.inner}>
					<Outlet />
					{/* TODO: Character history tracker? Otherwise just options, home, and dice roll trackers */}
				</div>
			</div>
		</div>
	);
};

export default Layout;
