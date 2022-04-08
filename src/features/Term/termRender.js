import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ageUp } from "../Character/StatsSlice";
import { Event } from "../Event/event";
import { JobSkills } from "../Skills/JobSkills";
import { Advanced, Failed, Passed } from "./termOutcomes";

export const Term = (props) => {
    const [skillSelect, setSkillSelect] = useState(true);
    const { currentTerm, job } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const termCount = job[currentTerm.job.id].terms
    let didAdvance;
    let didSurvive;
    useEffect(() => {
        setSkillSelect(true);
        didAdvance = currentTerm.advance;
        didSurvive = currentTerm.survive;
    }, [termCount])

    const continueClickHandler = (event) => {
        event.preventDefault();
        dispatch(ageUp());
    }

    const newCareerClickHandler = (event) => {
        event.preventDefault();
        dispatch(ageUp());
        navigate('/choose_career');
    }

    const cleanup = () => {setSkillSelect(false)}
    return (
        <div className="term">
            <h2>{currentTerm.job.title}</h2>
            {didAdvance ? <Advanced job={job} currentTerm={currentTerm} /> : didSurvive ? <Passed job={job} rank={job.rank} currentTerm={currentTerm} /> : <Failed job={job} rank={job.rank} currentTerm={currentTerm} />}
            {skillSelect && 
                <>
                    <h3>Select a skill table:</h3><br/>
                    <JobSkills currentTerm={currentTerm} cleanup={cleanup} />
                </>
            }
            <Event event={currentTerm.newEvent} isMishap={!currentTerm.survive}/>
            {job[currentTerm.job.id].muster ? '': <button onClick={continueClickHandler}>Another term...</button>}<br/>
            <button onClick={newCareerClickHandler}>Choose a new career...</button>
            <Link to="/">Home...</Link>
        </div>
    )
}