import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import jobObject from "../CareerDetails/CareerDetails";
import { ageUp } from "../Character/StatsSlice";
import { resolveTerm } from "../TermSlice/TermSlice";
import { RootState } from "../../app/store";
import RankUpBonusEntry from "../../components/CareerRanks/RankUpBonus/RankUpBonusEntry";

const AdvancedTerm = () => {
    const career = useParams().career as string;
    const careerState = useSelector((state: RootState) => state.careers)
    const currentRank = careerState.careerInfo[career].rank;
    const rankTitle = careerState.careerInfo[career].commissioned ? jobObject[career].comRanks?.[currentRank].title : jobObject[career].ranks[currentRank].title
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleContinue = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(resolveTerm());
        dispatch(ageUp())
        navigate(`/term/${career}/start`);
    };
    const handleNew = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(resolveTerm());
        dispatch(ageUp())
        navigate(`/leave_career/${career}`)
    };
    return (
        <>
            <h2>You've been promoted!</h2>
            <p>You are now a/an {rankTitle}, after {careerState.careerInfo[career].terms * 4} years at this job.</p>
            <RankUpBonusEntry />
            <p>If you'd like to continue in this career, click this button:</p>
            <button onClick={handleContinue}>Continue</button>
            <p>If you'd like to spend the next four years doing something new, click below.</p>
            <button onClick={handleNew}>Something new</button>
        </>
    )
}

export default AdvancedTerm