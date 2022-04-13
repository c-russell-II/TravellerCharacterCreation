import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ageUp } from "../Character/StatsSlice";
import { JobSkills } from "../Skills/JobSkills";
import { Advanced, Failed, Passed } from "./termOutcomes";

export const Term = (props) => {
    const [skillSelect, setSkillSelect] = useState(true);
    const [survived, setSurvived] = useState(false);
    const [advanced, setAdvanced] = useState(false);
    const { currentTerm, job } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const termCount = job[currentTerm.job.id].terms

    useEffect(() => {
        setSkillSelect(true);
        setSurvived(currentTerm.survive);
        setAdvanced(currentTerm.advance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [termCount])

    const continueClickHandler = (event) => {
        event.preventDefault();
        dispatch(ageUp());
    }

    const newCareerClickHandler = (event) => {
        event.preventDefault();
        dispatch(ageUp());
        navigate(`/leave_career/${currentTerm.job.id}`);
    }

    const cleanup = () => {setSkillSelect(false)}
    return (
        <div className="term">
            <h2>{currentTerm.job.title}</h2>
            {survived ? advanced ? <Advanced job={job} currentTerm={currentTerm} /> : <Passed job={job} rank={job.rank} currentTerm={currentTerm} /> : <Failed job={job} rank={job.rank} currentTerm={currentTerm} />}
            {skillSelect && 
                <>
                    <h3>Select a skill table:</h3><br/>
                    <JobSkills currentTerm={currentTerm} cleanup={cleanup} />
                </>
            }

            {job[currentTerm.job.id].muster ? '': <button onClick={continueClickHandler}>Another term...</button>}<br/>
            <button onClick={newCareerClickHandler}>On to greener pastures...</button>
            <Link to="/">Home...</Link>
        </div>
    )
}