import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { saveFailedTerm } from "../Career/careerSlice";
import { Event } from "../Event/event";

export const TermFailed = (props) => {
    const [mishap, hasMishap] = useState(true);
    const term = useSelector(state => state.term);
    const navigate = useNavigate();
    const {career} = useParams();
    const dispatch = useDispatch();

    const cleanup = () => {
        hasMishap(false);
        if (term.muster) {
            dispatch(saveFailedTerm({job: career}))
            navigate(`/leave_career/${career}`)
        } else {
            navigate(`/term/${career}/start`)
        }
    }

    return (
        <>
            <h2>Failure...</h2>
            <p>You did not live up to the standards expected by your chosen career.</p>
            <br/>
            {mishap && <Event cleanup={cleanup}/>}
        </>
    )
}