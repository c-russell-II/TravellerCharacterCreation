import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ageUp } from "../Character/StatsSlice";
import { resolveTerm } from "../TermSlice/TermSlice";

const TermNoPromotion = (props) => {
    const {career} = useParams();
    const terms = useSelector(state => state.careers[career].terms)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleContinue = (event) => {
        dispatch(resolveTerm());
        dispatch(ageUp())
        navigate(`/term/${career}/start`);
    };
    const handleNew = (event) => {
        dispatch(ageUp())
        dispatch(resolveTerm());
        navigate(`/leave_career/${career}`)
    };

    return (
        <>
            <h2>You failed to get a promotion.</h2>
            <p>You performed well enough to avoid any major problems- as far as your day to day duties are concerned- but you did not stand out from your peers enough to earn a promotion.</p>
            <p>You have been on this particular career path for {terms * 4} years.</p>
            <p>If you'd like to continue in this career, click this button:</p>
            <button onClick={handleContinue}>Continue</button>
            <p>If you'd like to spend the next four years doing something new, click below.</p>
            <button onClick={handleNew}>Something new</button>
        </>
    )
}

export default TermNoPromotion;