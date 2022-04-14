import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from '../Character/charaSlice';
import Popup from 'reactjs-popup';
import { resolveEvent } from "../Term/TermSlice";

export const Reward = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const dispatch = useDispatch();
    const { handler } = props;
    const event = useSelector(state => state.term.event);
    useEffect(() => { setIsOpen(true); setIsReady(false); }, []);
    const realHandler = () => {
        const handlerVal = handler(event.result.type);
        if (handlerVal) {
            return handlerVal
        }
    }
    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{event.description}</p>
            {isReady ? <button onClick={() => { setIsOpen(false); dispatch(addEvent(event)); dispatch(resolveEvent());}}>Great!</button> : realHandler()}
        </Popup>
    );
};
