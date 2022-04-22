import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { saveFailedTerm } from "../Career/careerSlice";
import EventContainer from "../Event/EventContainer";

export const TermFailed = (props) => {
    const event = useSelector(state => state.term.event)
    const {career} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(saveFailedTerm({job: career}))
    }, [dispatch, career])

    return (
        <>
            <h2>Failure...</h2>
            <p>You did not live up to the standards expected by your chosen career.</p>
            <br/>
            {!event.resolved && <EventContainer/>}
            <Link to="/choose_career/">Move on.</Link>
        </>
    )
}