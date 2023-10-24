import React from "react";
import { Outlet, useParams } from "react-router-dom";
import jobObject from "../CareerDetails/CareerDetails";


const TermContainer = () => {
    const { career } = useParams();
    if (!career) {
        //TODO: Error Boundary!
        console.error("No career in params!")
        return <p>how did you get here?</p>
    }
    const title = jobObject[career].title;

    return (
        <div className="term">
            <h1>{title}</h1>
            <Outlet/>
        </div>
    )
}

export default TermContainer;