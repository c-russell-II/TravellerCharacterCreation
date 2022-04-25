import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roll } from "../../Career/careerHandler";
import { addBenefit } from "../../Career/careerSlice";
import { resolveEvent, updateEvent } from "../../Term/TermSlice";

const RiotEvent = (props) => {
    const job = useSelector(state => state.term.job)
    const dispatch = useDispatch();
    const [body, setBody] = useState();

    useEffect(() => {
        const val = roll() + 1;

        if (val > 4) {
            dispatch(addBenefit({job: job, value: 1}));
            setBody(<p>You find something useful during the riot, and hide it away.</p>)
        }
        if (val < 3) {
            dispatch(updateEvent({type: 'redirect', destination: 'injury'}))
        }
    }, [dispatch, job])

    return (
        <>
            {body}
            <button onClick={dispatch(resolveEvent())}> Continue... </button>
        </>
    )
}

export default RiotEvent