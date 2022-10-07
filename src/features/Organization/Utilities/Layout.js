import React from "react";
import { Outlet } from "react-router-dom";
import SidebarController from './SidebarController.js'
import styles from "./Organization.module.css"
import { useSelector } from "react-redux";

const Layout = (props) => {
    const stats = useSelector(state => state.stats.displayValues);
    const isNonZero = (e) => stats[e] !== 0
    return (
        <div className={styles.outer}>
            {Object.keys(stats).every(isNonZero) && <SidebarController/>}
            <div className={styles.app}>
                <div className={styles.inner}>
                    
                    <Outlet/>
                    {/* <div className={styles.deadspace}>
                        <p style={{color: "#FFFFFF"}}>to do: put something here (maybe character/history tracker?)</p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Layout;