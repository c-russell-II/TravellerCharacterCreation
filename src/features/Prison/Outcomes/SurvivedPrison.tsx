import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { skillCheck } from "../../Career/careerHandler";
import { promotion } from "../../Career/careerSlice";
import EventContainer from "../../Event/EventContainer";
import {resolveTerm} from '../../TermSlice/TermSlice'
import { RootState } from "../../../app/store";
import { AnyEvent, CareerSpecialty } from "../../CareerDetails/CareerTyping";

const SurvivedPrison = () => {
    const term = useSelector((state: RootState) => state.term);
    const prisonState = useSelector((state: RootState) => state.prison)
    const stats = useSelector((state: RootState) => state.stats);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        //TODO: Error boundary!
        const roll = skillCheck(stats[(term.jobDetails as CareerSpecialty).advancementSkill as keyof StatDisplayHolder]) + term.advancementBonus
        const result = (term.jobDetails as CareerSpecialty).advancementDC <= roll;
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
            {!(term.event as AnyEvent & {resolved: boolean}).resolved && <EventContainer/>}
        </>
    )
}

export default SurvivedPrison;