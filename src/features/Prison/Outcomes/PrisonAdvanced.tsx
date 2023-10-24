import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ageUp } from "../../Character/StatsSlice";
import RankUpBonus from "../../RankUpBonus/RankUpBonus";
import { resolveTerm } from "../../TermSlice/TermSlice";
import { RootState } from "../../../app/store";
import { CareerSpecialty } from "../../CareerDetails/CareerTyping";

const PrisonAdvanced = () => {
    const [hasBonus, setHasBonus] = useState(false);
    const term = useSelector((state: RootState) => state.term)
    const careerState = useSelector((state: RootState) => state.careers)
    const currentRank = careerState.careerInfo[term.job].rank;
    const bonus = (term.jobDetails as CareerSpecialty).ranks[currentRank].bonus;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (bonus) {
            setHasBonus(true);
        } else {
            setHasBonus(false);
        }
    }, [bonus])

    const handleContinue = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(resolveTerm());
        dispatch(ageUp())
        navigate(`../start`);
    };

    return (
        <>
            <h1>You're still here...</h1>
            <p>You've gotten more comfortable, more confident in your ability to survive term to term.</p>
            <p>Even so, you do not manage to earn parole this term - next term for sure.</p>
            {hasBonus && <RankUpBonus open={hasBonus} cleanup={() => setHasBonus(false)}/>}
            {!hasBonus && <button onClick={handleContinue}>Next term.</button>}
        </>
    )
}

export default PrisonAdvanced;