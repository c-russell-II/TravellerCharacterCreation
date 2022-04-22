import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckEvent from "./CheckEvent";
import RedirectHandler from "./RedirectHandler";
import RewardContainer from "./Rewards/RewardContainer";

const EventContainer = (props) => {
    const event = useSelector(state=> state.term.event);
    const survived = useSelector(state=> state.term.survived)
    const [body, setBody] = useState();
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
                setBody(<RewardContainer type={event.result.type} isMultiple={false}/>)
                return;
            case 'choice':
                return;
            default:
                return;
        }
    }, [event])
    return (
        <div>
            {survived? <h3>A Remarkable Event...</h3> : <h3>A worrying development...</h3>}
            {body}
        </div>
    )
}

export default EventContainer;