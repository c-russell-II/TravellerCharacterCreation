import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { survivedTerm, advancedTerm, failedTerm } from '../Career/careerSlice';
import { Term } from "./termRender";
import { useParams } from "react-router-dom";
import RankUpBonus from "./RankUpBonus";

export const TermMidPoint = (props) => {
    const stats = useSelector(state => state.stats);
    const age = stats.age;
    const term = useSelector(state=> state.term);
    const {career} = useParams();
    const currentRank = useSelector(state => state.careers[career].rank);
    const dispatch = useDispatch();
    const [rankBonus, setRankBonus] = useState(false);

    const cleanup = () => setRankBonus(false);

    useEffect(() => {
        const jobAction = {job: career, event: term.event};
        if (term.survived && term.advanced) {
            if (typeof term.jobDetails.ranks[currentRank].bonus === 'object') {
                setRankBonus(true);
            }
            dispatch(advancedTerm(jobAction))
        } else if (term.survived) {
            dispatch(survivedTerm(jobAction));
        } else {
            dispatch(failedTerm(jobAction))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, [age])
    return (
        <>
            <Term/>
           {rankBonus && <RankUpBonus cleanup={cleanup}/>}
        </>
    )
}