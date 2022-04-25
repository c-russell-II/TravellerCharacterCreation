import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ageUp } from "../Character/StatsSlice";
import { resolveTerm } from "../Term/TermSlice";

const PrisonPassed = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleContinue = (event) => {
        dispatch(resolveTerm());
        dispatch(ageUp());
        navigate(`../start`);
    };

    return (
        <>
            <h1>No Parole...</h1>
            <p>You've managed to survive the term, but made little headway in securing your position in the prison.</p>
            <p>If you can hold out for one more term, you're sure you'll manage to get your parole.</p>
            <button onClick={handleContinue}>One more term</button>
        </>
    )
}

export default PrisonPassed;