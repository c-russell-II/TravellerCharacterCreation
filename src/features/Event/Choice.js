import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../Term/TermSlice";

export const Choice = (props) => {
    const [isReady, setIsReady] = useState(false);
    const dispatch = useDispatch();
    const event = useSelector(state => state.term.event);

    const handleClick = (choice) => {
        setIsReady(true);
        dispatch(updateEvent({...event[choice], description: event.description + ' ' + event[choice].description}));
        return;
    };
    return (
        <>
            {!isReady &&
            <>
                {event.description}<br/>
                {event.choiceList?.map((e, i) => {
                    return (
                        <button key={i} onClick={() => handleClick(e)}>{event[e]?.button}</button>
                    );
                })}
            </>
            }
        </>
    );
};
