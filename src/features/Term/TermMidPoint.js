import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import jobObject from "../Career/CareerDetails";
import { skillCheck } from "../Career/careerHandler";
import { promotion } from "../Career/careerSlice";
import EventContainer from "../Event/EventContainer";
import CommissionHandler from "./Utilities/CommissionHandler";

export const TermMidPoint = (props) => {
    const stats = useSelector(state => state.stats);
    const term = useSelector(state=> state.term);
    const {career} = useParams();
    const currentCareerState = useSelector(state => state.careers[career]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [commission, setCommission] = useState(false);

    const isMilitary = jobObject[career].parent === 'army' || jobObject[career].parent === 'navy' || jobObject[career].parent === 'marine';
    const canCommission = isMilitary && !currentCareerState.commissioned && (currentCareerState.terms === 1 || stats.soc >= 9)

    useEffect(() => {
        setCommission(canCommission);
    }, [canCommission])

    const cleanup = () => setCommission(false);
    const handleClick = (event) => {
        event.preventDefault();

        const result = term.jobDetails.advancementDC <= skillCheck(stats[term.jobDetails.advancementSkill]) + term.advancementBonus;
        if (result) {
            dispatch(promotion());
            navigate(`/term/${career}/advanced`);
            return;
        }
        navigate(`/term/${career}/passed`)
    }

    return (
        <>
            <h2>You survived- but is that all?</h2>
            {!term.event.resolved ? <EventContainer key={Math.random()}/> :
                <>
                    <p>And after that, a promotion ... ?</p>
                    <button onClick={handleClick}>Try for it</button>
                    {commission && <CommissionHandler cleanup={cleanup}/>}
                </>}
        </>
    )
}