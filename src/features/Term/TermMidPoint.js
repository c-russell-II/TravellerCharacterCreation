import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Event } from "../Event/event";
import { skillCheck } from "../Career/careerHandler";
import { promotion } from "../Career/careerSlice";

export const TermMidPoint = (props) => {
    const stats = useSelector(state => state.stats)
    const term = useSelector(state=> state.term);
    const {career} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();

        const result = term.jobDetails.advancementDC <= skillCheck(stats[term.jobDetails.advancementSkill]) + term.advancementBonus;
        if (result) {
            dispatch(promotion());
            navigate(`/term/${career}/advanced`)
        }
    }

    return (
        <>
            <h2>You survived- but is that all?</h2>
            {term.event.resolved ? <Event /> :
                <>
                    <p>And after that, a promotion ... ?</p>
                    <button onClick={handleClick}>Try for it</button>
                </>}
        </>
    )
}