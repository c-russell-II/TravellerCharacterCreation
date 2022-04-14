import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import jobObject from "../Career/CareerDetails";
import { careerTermHandler } from "../Career/careerHandler";
import { setTrained } from "../Character/charaSlice";
import { increaseToZero } from "../Skills/SkillsSlice";
import { TermMidPoint } from "./TermMidPoint";
import { Event } from "../Event/event";
import { useParams } from "react-router-dom";
import { setCurrentTerm } from "./TermSlice";

export const TermContainer = (props) => {
    const dispatch = useDispatch();

    const [ready, setReady] = useState(false);

    const stats = useSelector(state => state.stats);
    const chara = useSelector(state => state.chara);
    const term = useSelector(state => state.term);
    const {career} = useParams()

    useEffect(() => {
        const currentTerm = careerTermHandler(jobObject[career], stats)
        dispatch(setCurrentTerm(currentTerm))
        if(!chara.trained) {
            currentTerm.jobDetails.skills.service.forEach((e) => dispatch(increaseToZero(e.skill)))
            dispatch(setTrained())
        }
        setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stats.age])


    return (
        <div>
            {ready ? <><TermMidPoint />{term.event && <Event />}</> : <h3>Loading...</h3>}
        </div>
    )
}