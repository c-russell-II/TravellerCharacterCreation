import React from "react";
import { Link } from "react-router-dom";
import { Event } from "../Event/event";
import { Advanced, Failed, Passed } from "./termOutcomes";

export const Term = (props) => {
    const {survive, advance, job, event} = props;
    return (
        <div className="term">
            <h2>{job.title}</h2>
            {advance ? <Advanced job={job}/> : survive ? <Passed job={job}/> : <Failed job={job}/>}
            <Event event={event} isMishap={!survive}/>
            <button onClick={() => {}}>Another term...</button> <br/>
            <button>Choose a new career...</button>
            <Link to="/">Home...</Link>
        </div>
    )
}