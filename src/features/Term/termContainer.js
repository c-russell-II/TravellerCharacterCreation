import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import jobObject from "../Career/CareerDetails";
import { careerTermHandler } from "../Career/careerHandler";
import { setTrained } from "../Character/charaSlice";
import { increaseToZero } from "../Skills/SkillsSlice";
import { TermMidPoint } from "./TermMidPoint";

export const TermContainer = (props) => {
    const dispatch = useDispatch();

    const [currentTerm, setCurrentTerm] = useState()

    const stats = useSelector(state => state.stats);
    const chara = useSelector(state => state.chara);
    const job = useSelector (state => state.careers);

    useEffect(() => {
        const term = careerTermHandler(jobObject[job.currentJob], stats)
        setCurrentTerm(term)
        if(!chara.trained) {
            term.jobDetails.skills.service.forEach((e) => dispatch(increaseToZero(e.skill)))
            dispatch(setTrained())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stats.age])


    return (
        <div>
            {currentTerm ? <TermMidPoint currentTerm={currentTerm} stats={stats} job={job}/> : <h3>Loading...</h3>}
        </div>
    )
}