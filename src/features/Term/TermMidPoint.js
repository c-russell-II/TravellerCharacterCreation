import React, {useEffect, useMemo, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { survivedTerm, advancedTerm, failedTerm } from '../Career/careerSlice';
import { Term } from "./termRender";
import { useParams } from "react-router-dom";
import { Event } from "../Event/event";
import { increaseToZero } from "../Skills/SkillsSlice";
import { setTrained } from "../Character/charaSlice";
import RankUpBonus from "./RankUpBonus";

export const TermMidPoint = (props) => {
    const age = useSelector(state => state.stats.age)
    const term = useSelector(state=> state.term);
    const trained = useSelector(state=> state.chara.trained);
    const {career} = useParams();
    const currentRank = useSelector( state => state.careers[career].rank);
    const [rankBonus, setRankBonus] = useState(false);
    const dispatch = useDispatch();

    const bonus = term.jobDetails.ranks[currentRank].bonus;
    useEffect(() => {
        if (bonus) {
            setRankBonus(true);
        }
    }, [bonus])

    const cleanup = () => {
        setRankBonus(false);
    }

    useEffect(() => {
        if (!trained) {
            term.jobDetails.skills.service.forEach(e => dispatch(increaseToZero(e.skill)));
            dispatch(setTrained());
        }
    });

    const jobAction = useMemo(() => ({
            job: career
        }), [career]);
    const { survived, advanced } = term;
    useEffect(() => {
        if (survived && advanced) {
            dispatch(advancedTerm(jobAction));
            return;
        } else if (survived) {
            dispatch(survivedTerm(jobAction));
            return;
        } else {
            dispatch(failedTerm(jobAction))
            return;
    }}, [advanced, age, dispatch, jobAction, survived])
    return (
        <>
            <RankUpBonus open={rankBonus} cleanup={cleanup}/> 
            <Term/>
            {term.event && <Event/>}
        </>
    )
}