import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChoiceCheckEvent } from "./ChoiceCheckEvent";
import { CheckEvent } from "./CheckEvent";
import { Reward } from "./Reward";
import { Choice } from "./Choice";
import SpecialEdu from "../education/SpecialEdu";
import { resolveEvent } from "../Term/TermSlice";

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
    const dispatch = useDispatch();

    const eventRender = (event) => {
        switch (event.type) {
            case 'check': 
                return checkHandler(event.checkType);
            case 'reward':
                return <Reward />;
            case 'choice':
                return <Choice/>;
            case 'specialEdu':
                return <SpecialEdu/>
            case 'redirect':
                return;
            default: break;
        }
    }
    return (
        <>
            {!event.resolved && eventRender(event)}
            <p>Event rendering still missing redirects!</p>
            <button onClick={() => dispatch(resolveEvent())}>Override</button>
        </>
    );
}
