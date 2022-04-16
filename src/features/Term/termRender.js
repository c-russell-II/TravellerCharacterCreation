import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ageUp } from "../Character/StatsSlice";
import { JobSkills } from "../Skills/JobSkills";
import { Advanced, Failed, Passed } from "./termOutcomes";

export const Term = (props) => {
    const [skillSelect, setSkillSelect] = useState(true);
    const term = useSelector(state => state.term);
    const {career} = useParams();
    const careerState = useSelector(state => state.careers);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const termCount = careerState[career].terms

    useEffect(() => {
        setSkillSelect(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [termCount])

    const continueClickHandler = (event) => {
        event.preventDefault();
        dispatch(ageUp());
    }

    const newCareerClickHandler = (event) => {
        event.preventDefault();
        dispatch(ageUp());
        navigate(`/leave_career/${career}`);
    }

    const cleanup = () => {setSkillSelect(false)}
    return (
        <>
            <h2>{term.jobDetails.title}</h2>
            {term.survived ? term.advanced ? <Advanced /> : <Passed /> : <Failed />}
            {skillSelect && 
                <>
                    <h3>Select a skill table:</h3><br/>
                    <JobSkills cleanup={cleanup} />
                </>
            }

            {careerState[career].muster ? '': <button onClick={continueClickHandler}>Another term...</button>}<br/>
            <button onClick={newCareerClickHandler}>On to greener pastures...</button>
            <Link to="/">Home...</Link>
        </>
    )
}