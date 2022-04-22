import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skillCheck } from "../Career/careerHandler";
import { updateEvent } from "../Term/TermSlice";
import ChoiceCheck from "./ChoiceCheck";

const CheckEvent = (props) => {
    const event = useSelector(state => state.term.event);
    const stats = useSelector(state=> state.stats);
    const skills = useSelector(state => state.skill);
    const [isChoice, setIsChoice] = useState();
    const dispatch = useDispatch();

    const handleCheck = () => {
        const type = event.checkType;
        let mod;

        if (type === 'stat') {
            mod = stats[event.checkStat];
        }

        if (type === 'skill') {
            mod = skills[event.checkSkill];
        }
        const outcome = skillCheck(mod) >= event.checkDC;
        return outcome;
    }

    const resolveCheck = (result, event) => {
        let description = event.description;
        let contents;

        if (result) {
            contents = event.pass;
            description += ' ' + event.pass.description;
        } else {
            contents = event.fail;
            description += ' ' + event.fail.description;
        }

        const newEvent = { ...contents,
            description: description
        };
        dispatch(updateEvent(newEvent));
        return;
    }

    const handleClick = () => {
        if (event.checkType === 'choice') {
            setIsChoice(true);
            return;
        }
        resolveCheck(handleCheck(), event);
        return;
    }

    return (
        <>
            <p>{event.description}</p>
            {isChoice ? <ChoiceCheck cleanup={() => setIsChoice(false)}/>
            : <button onClick={handleClick}>Next</button>
            }
        </>
    )
}

export default CheckEvent;