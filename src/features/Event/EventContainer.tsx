import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resolveEvent, setMuster, updateEvent } from "../TermSlice/TermSlice";
import CheckEvent from "./CheckEvent";
import { Choice } from "./Choice";
// import MedicalHandler from "./MedicalHandler";
import RedirectHandler from "./RedirectHandler";
import RewardContainer from "./Rewards/RewardContainer";
import SpecialEventContainer from './Special/SpecialEventContainer';
// import {skillCheck} from '../Career/careerHandler'
// import { prisoner } from "../Prison/Utilities/Prisoner";
import { RootState } from "../../app/store";

const EventContainer = () => {
    const event = useSelector((state: RootState) => state.term.event);
    const survived = useSelector((state: RootState) => state.term.survived);
    const [body, setBody] = useState<any>();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!event) {
            console.warn("No event in EventContainer");
            return;
        }
        //TODO: deal with muster/nomuster in event typings... 
        // if (event.muster) {
        //     dispatch(setMuster(true))
        // }
        // if (event.noMuster) {
        //     dispatch(setMuster(false));
        // }
        const type = event.type;
        //TODO: Building a system for making a key based on the current term.
        switch (type) {
            case 'redirect':
                setBody(<RedirectHandler key={Math.random()}/>)
                return;
            case 'check':
                setBody(<CheckEvent key={Math.random()} event={event}/>)
                return;
            case 'reward':
                setBody(<RewardContainer key={Math.random()} event={event}/>)
                return;
            case 'choice':
                setBody(<Choice event={event} />)
                return;
            case 'generic':
                setBody(
                <>
                    <p>{event.description}</p>
                    <button onClick={() => dispatch(resolveEvent())}>Neat!</button>
                </>
                )
                return;
            // TODO: Handle Special cases: Medical && Random!
            // case 'medical':
            //     setBody(<MedicalHandler/>);
            //     return;
            case 'special':
                setBody(<SpecialEventContainer key={Math.random()}/>);
                return;
            // case 'random':
            //     if (skillCheck() > 8) {
            //         dispatch(updateEvent(prisoner.eventList[12].pass))
            //     }
            //     dispatch(updateEvent(prisoner.eventList[12].fail));
            //     return;
            default:
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