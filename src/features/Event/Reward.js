import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from '../Character/charaSlice';
import Popup from 'reactjs-popup';

export const Reward = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const dispatch = useDispatch();
    const { event, handler } = props;
    useEffect(() => { setIsOpen(true); setIsReady(false); }, []);
    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{event.description}</p>
            {isReady ? <button onClick={() => { setIsOpen(false); dispatch(addEvent(event)); }}>Great!</button> : handler(event.result.type, setIsReady)}
        </Popup>
    );
};
