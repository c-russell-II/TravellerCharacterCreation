import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChoiceCheckEvent } from "./ChoiceCheckEvent";
import { CheckEvent } from "./CheckEvent";
import { Reward } from "./Reward";
import { Choice } from "./Choice";

const checkHandler = (checkType) => {
    switch (checkType) {
        case 'choice':
            return <ChoiceCheckEvent/>;
        default:
            return <CheckEvent/>;
    }
}

export const Event = (props) => {
    const event = useSelector(state => state.term.event);
    const [isOpen, setIsOpen] = useState(true);
    
    const cleanup = () => setIsOpen(false); props.cleanup();

    const eventRender = (event, cleanup) => {
        switch (event.type) {
            case 'check': 
                return checkHandler(event.checkType);
            case 'reward':
                return <Reward cleanup={cleanup} />;
            case 'choice':
                return <Choice/>
            case 'redirect':
                switch (event.destination) {
                    case 'injury':
                        return <blah></blah>;
                    case 'life':
                        return <blah></blah>;
                    case 'mishap': 
                        return <blah></blah>;
                    case 'rare': 
                        return <blah></blah>;
                    default: 
                        return;
                }
            default: break;
        }
    }
    return (
        <>
            {isOpen && eventRender(event, cleanup)}
            <p>Event rendering still missing redirects!</p>
            <button onClick={() => cleanup()}>Override</button>
        </>
    );
}
