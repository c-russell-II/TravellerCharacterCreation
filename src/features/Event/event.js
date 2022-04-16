import React from "react";
import { useSelector } from "react-redux";
import { ChoiceCheckEvent } from "./ChoiceCheckEvent";
import { CheckEvent } from "./CheckEvent";
import { Reward } from "./Reward";
import { Choice } from "./Choice";

const checkHandler = (event) => {
    switch (event.checkType) {
        case 'choice':
            return <ChoiceCheckEvent />;
        default:
            return <CheckEvent />;
    }
}

export const Event = (props) => {
    const event = useSelector(state => state.term.event);

    const eventRender = (type) => {
        switch (type) {
            case 'check': 
                return checkHandler();
            case 'reward':
                return <Reward/>;
            case 'choice':
                return <Choice/>
            case 'redirect':
                switch (props.event.destination) {
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
        <div className="general_events">
            {eventRender(event.type)}
            <p>Event rendering still missing redirects!</p>
        </div>
    );
}
