import React from "react";
import { Outlet } from "react-router-dom";

const EducationLayout = (props) => {

    return (
        <div className="education">
            <Outlet/>
        </div>
    )
}

export default EducationLayout;