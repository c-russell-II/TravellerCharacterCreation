import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ChoiceEvent } from "../CareerDetails/CareerTyping";
import { updateEvent } from "../TermSlice/TermSlice";

export const Choice = (props: {event: ChoiceEvent}) => {
    const [isReady, setIsReady] = useState(false);
    const dispatch = useDispatch();
    const event = props.event;
    //TODO: More problems with special events - gotta figure out a better way to handle this, there's a decent chance I'll have to reorganize that entire phase of the project
    const handleClick = (choice: string) => {
        setIsReady(true);
        let description = event.description;
        const choiceEvent = event.choice[choice]
        if (choiceEvent.type !== 'special') {
           description += ' ' + choiceEvent.description; 
        }
        dispatch(updateEvent({...event.choice[choice], description: description}));
        return;
    };
    return (
        <>
            {!isReady &&
            <>
                {event.description}<br/>
                {event.choiceList?.map((e: string, i: number) => {
                    return (
                        <button key={`choice event button for ${e} at ${i}`} onClick={() => handleClick(e)}>{event.choice[e]?.button}</button>
                    );
                })}
            </>
            }
        </>
    );
};
