import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ageUp } from "../../Character/StatsSlice";
import { resolveTerm } from "../../Term/Utilities/TermSlice";

const Freedom = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const gainFreedom = () => {
        dispatch(resolveTerm());
        dispatch(ageUp())
        navigate('/choose_career')
    }

    return (
        <>
            <h1>Freedom at last!</h1>
            <p>Whether due to you carefully toeing the line, or something far less... polite, you have managed to regain your freedom.</p>
            <p>Now your life can continue, down whatever roads you choose.</p>
            <button onClick={gainFreedom}>Onwards!</button>
        </>
    )
}

export default Freedom;