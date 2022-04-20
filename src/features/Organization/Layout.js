import React from "react";
import { Outlet } from "react-router-dom";
import SidebarController from './SidebarController.js'
import styles from "./Organization.module.css"

const Layout = (props) => {
    return (
        <div className="inner">
            <SidebarController/>
                <Outlet/>
        </div>
    )
}

export default Layout;