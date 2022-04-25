import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resolveEvent } from "../Term/TermSlice";
import CheckEvent from "./CheckEvent";
import { Choice } from "./Choice";
import RedirectHandler from "./RedirectHandler";
import RewardContainer from "./Rewards/RewardContainer";

const EventContainer = (props) => {
    const event = useSelector(state=> state.term.event);
    const survived = useSelector(state=> state.term.survived)
    const [body, setBody] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        const {type} = event;
        switch (type) {
            case 'redirect':
                setBody(<RedirectHandler/>)
                return;
            case 'check':
                setBody(<CheckEvent/>)
                return;
            case 'reward':
                setBody(<RewardContainer/>)
                return;
            case 'choice':
                setBody(<Choice/>)
                return;
            case 'generic':
                setBody(<button onClick={dispatch(resolveEvent())}>Neat!</button>)
                return;
            case 'medical':
                setBody();
                return;
            default:
                alert("Unhandled Event! " + type)
                dispatch(resolveEvent())
                return;
        }
    }, [dispatch, event])
    return (
        <div>
            {survived? <h3>A Remarkable Event...</h3> : <h3>A worrying development...</h3>}
            {body}
        </div>
    )
}

export default EventContainer;