import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Term.module.css"

const TermContainer = () => {

    return (
        <div className={styles.term}>
            <Outlet/>
        </div>
    )
}

export default TermContainer;