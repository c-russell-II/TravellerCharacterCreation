import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { saveFailedTerm } from "../Career/careerSlice";
import { ageUp } from "../Character/StatsSlice";
import EventContainer from "../Event/EventContainer";

export const TermFailed = (props) => {
    const event = useSelector(state => state.term.event)
    const {career} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick= (event) => {
        event.preventDefault();

        dispatch(saveFailedTerm({job: career}));
        dispatch(ageUp());
        navigate(`/leave_career/${career}`)
    }

    return (
        <>
            <h2>Failure...</h2>
            <p>You did not live up to the standards expected by your chosen career.</p>
            <br/>
            {!event.resolved ? <EventContainer/>
            : <button onClick={handleClick}>Move on.</button>
            }
        </>
    )
}