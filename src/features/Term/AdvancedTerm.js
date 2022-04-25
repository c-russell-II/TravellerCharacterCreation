import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import jobObject from "../Career/CareerDetails";
import { ageUp } from "../Character/StatsSlice";
import RankUpBonus from "./RankUpBonus";
import { resolveTerm } from "./TermSlice";

const AdvancedTerm = (props) => {
    const term = useSelector(state => state.term);
    const {career} = useParams();
    const careerState = useSelector(state => state.careers)
    const currentRank = careerState[career].rank;
    const bonus = jobObject[career].ranks[currentRank].bonus;
    const [hasBonus, setHasBonus] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (bonus) {
            setHasBonus(true);
        }else {
            setHasBonus(false);
        }
    }, [bonus])
    const handleContinue = (event) => {
        dispatch(resolveTerm());
        dispatch(ageUp())
        navigate(`/term/${career}/start`);
    };
    const handleNew = (event) => {
        dispatch(resolveTerm());
        dispatch(ageUp())
        navigate(`/leave_career/${career}`)
    };
    return (
        <>
            <h2>You've been promoted!</h2>
            <p>You are now a/an {term.jobDetails.ranks[currentRank].title}, after {careerState[career].terms * 4} years at this job.</p>
            {hasBonus && <RankUpBonus open={hasBonus} cleanup={() => setHasBonus(false)}/>}
            <p>If you'd like to continue in this career, click this button:</p>
            <button onClick={handleContinue}>Continue</button>
            <p>If you'd like to spend the next four years doing something new, click below.</p>
            <button onClick={handleNew}>Something new</button>
        </>
    )
}

export default AdvancedTerm