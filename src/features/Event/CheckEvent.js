import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skillCheck } from "../Career/careerHandler";
import { updateEvent } from "../TermSlice/TermSlice";
import ChoiceCheck from "./ChoiceCheck";

const CheckEvent = (props) => {
    const event = useSelector(state => state.term.event);
    const stats = useSelector(state=> state.stats);
    const skills = useSelector(state => state.skills);
    const [isChoice, setIsChoice] = useState();
    const dispatch = useDispatch();

    const getFinalMod = (skill) => {
        if (skills[skill].specialties) {
            let specialtyVal = -3;
            if (event.result.specialtyList[skill] === 'any') {
                skills[skill].specialtiesList.forEach((e) => {
                    if (skills[skill][e] > specialtyVal) {
                        specialtyVal = skills[skill][e];
                    };
                    return;
                })
                return specialtyVal;
            }
            if (Array.isArray(event.result.specialtyList[skill])) {
                event.result.specialtyList[skill].forEach((e) => {
                    if (skills[skill][e] > specialtyVal) {
                        specialtyVal = skills[skill][e];
                    }
                })
                return specialtyVal;
            }
            specialtyVal = skills[skill][event.result.specialtyList[skill]];
            return specialtyVal;
        }
        return skills[skill].value;
    }

    const handleCheck = () => {
        const type = event.checkType;
        let mod;

        if (type === 'stat') {
            mod = stats[event.checkStat];
        }

        if (type === 'skill') {
            mod = getFinalMod(event.checkSkill);
            if (mod < 0) {
                mod += skills.JackOfAllTrades.value > 0 ? skills.JackOfAllTrades.value : 0;
            }
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

    useEffect(() => {
        if (event.checkType === 'choice') {
            setIsChoice(true);
            return;
        }
        setIsChoice(false);
        return;
    }, [event.checkType])

    const handleClick = () => {
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