import React from "react";
import { Outlet } from "react-router-dom";

const EducationLayout = () => {

    return (
        <div className="education">
            <Outlet/>
        </div>
    )
}

export default EducationLayout;