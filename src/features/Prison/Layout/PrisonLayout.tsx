import React from "react";
import { Outlet } from "react-router-dom";

const PrisonLayout = () => {

    return (
        <div className="prison">
            <Outlet/>
        </div>
    )
}

export default PrisonLayout;