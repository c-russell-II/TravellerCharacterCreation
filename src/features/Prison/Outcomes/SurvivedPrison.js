import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { skillCheck } from "../../Career/careerHandler";
import { promotion } from "../../Career/careerSlice";
import EventContainer from "../../Event/EventContainer";
import {resolveTerm} from '../../TermSlice/TermSlice'

const SurvivedPrison = (props) => {
    const term = useSelector(state => state.term);
    const prisonState = useSelector(state => state.prison)
    const stats = useSelector(state=> state.stats);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        const roll = skillCheck(stats[term.jobDetails.advancementSkill]) + term.advancementBonus
        const result = term.jobDetails.advancementDC <= roll;
        if (roll >= prisonState.parole) {
            dispatch(resolveTerm());
            navigate('../freedom');
            return;
        }
        if (result) {
            dispatch(promotion());
            navigate(`../advanced`);
            return;
        }
        navigate(`../passed`)
    }

    return (
        <>
            <h1>You've avoided serious mishaps!</h1>
            <p>Despite your harsh situation, you've managed to get through this term without causing any mishaps yourself, directly.</p>
            <p>Next up is a parole hearing, along with any interesting goings-on form this term.</p>
            <button onClick={handleClick}>Continue.</button>
            {!term.event.resolved && <EventContainer/>}
        </>
    )
}

export default SurvivedPrison;