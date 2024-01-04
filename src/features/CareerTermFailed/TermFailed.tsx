import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { saveFailedTerm } from "../Career/careerSlice";
import { ageUp } from "../Character/StatsSlice";
import EventContainer from "../../components/Event/EventContainer";
import { RootState } from "../../app/store";

export const TermFailed = () => {
    const event = useSelector((state: RootState) => state.term.event)
    const career = useParams().career as string;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick= (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        dispatch(saveFailedTerm({job: career}));
        dispatch(ageUp());
        navigate(`/leave_career/${career}`)
    }

    const checkForEvent = () => {
        if (!event) {
            return false;
        }
        if (event.resolved) {
            return false;
        }
        return true;
    }

    return (
        <>
            <h2>Failure...</h2>
            <p>You did not live up to the standards expected by your chosen career.</p>
            <br/>
            {checkForEvent() ? <EventContainer/>
            : <button onClick={handleClick}>Move on.</button>
            }
        </>
    )
}