import React, { useEffect, useState } from "react";
import { careerTermHandler } from "../Career/careerHandler";
import jobObject from "../Career/CareerDetails";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { survivedTerm, advancedTerm, failedTerm } from '../Career/careerSlice';
import { Term } from "./termRender";
import { JobSkills } from "../Skills/JobSkills";

export const TermContainer = (props) => {
    const [survive, setSurvive] = useState();
    const [advance, setAdvance] = useState();
    const [isFirstTerm, setIsFirstTerm] = useState(true);
    const dispatch = useDispatch();

    const params = useParams();
    const job = jobObject[params.career];

    const stats = useSelector(state => state.stats);
    const age = useSelector(state => state.stats.age);

    const termResults = careerTermHandler(job, stats);
    setSurvive(termResults.survive);
    setAdvance(termResults.advance);

    useEffect(() => {  
        const jobAction = {job: job.id, event: termResults.newEvent};

        if (termResults.survive && termResults.advance) {
            dispatch(advancedTerm(jobAction))
        } else if (termResults.survive) {
            dispatch(survivedTerm(jobAction));
        } else {
            dispatch(failedTerm(jobAction))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, [age])

    const careers = useSelector(state => state.careers);
    const skillLists = Object.keys(careers[job.id].skills);

    return (
        <div>
            <Term survive={survive} advance={advance} job={job}/>
            <JobSkills skillTables={careers[job.id].skills} isFirstTerm={isFirstTerm}/>
        </div>
    )
}