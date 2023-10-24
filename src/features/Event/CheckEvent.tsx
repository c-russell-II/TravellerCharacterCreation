import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { skillCheck } from "../Career/careerHandler";
import { anyCheckEvent, ChoiceCheckEvent } from "../CareerDetails/CareerTyping";
import { AllSkills, AnySkill } from "../Skills/SkillsSlice";
import { updateEvent } from "../TermSlice/TermSlice";
import ChoiceCheck from "./ChoiceCheck";

const CheckEvent = (props: {event: anyCheckEvent}) => {
    const event = props.event;
    const stats = useSelector((state: RootState) => state.stats);
    const skills = useSelector((state: RootState) => state.skills);
    const [isChoice, setIsChoice] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (event.checkType === "choice") {
            setIsChoice(true);
            return;
        }
        setIsChoice(false);
        return;
    }, [event]);


    const handleCheck = () => {
        const type = event.checkType;
        let mod: number = -3;
        if (type === 'stat') {
            mod = stats[event.checkStat as keyof StatDisplayHolder] as number;
        }

        if (type === 'skill') {
            mod = getSkillMod(skills[event.checkSkill as keyof AllSkills], event.specialty);
            if (mod < 0) {
                mod += skills.JackOfAllTrades.value > 0 ? 3 - skills.JackOfAllTrades.value : 0;
            }
        }
        const outcome = skillCheck(mod) >= event.checkDC;
        return outcome;
    }
    const resolveCheck = (result: boolean, event: anyCheckEvent) => {
        let description = event.description;
        let contents;

        if (result) {
            contents = event.pass;
            if (event.pass.type !== 'special') {
                description += ' ' + event.pass.description;
            }
        } else {
            contents = event.fail;
            if (event.fail.type !== 'special') {
                description += ' ' + event.fail.description;
            }
        }

        const newEvent = { ...contents,
            description: description
        };
        dispatch(updateEvent(newEvent));
        return;
    }

    const handleClick = () => {
        resolveCheck(handleCheck(), event);
        return;
    }
    const cleanupFunc = () => setIsChoice(false);
    return (
        <>
            <p>{event.description}</p>
            { isChoice ? <ChoiceCheck cleanup={cleanupFunc} event={event as ChoiceCheckEvent}/>
            : <button onClick={handleClick}>Next</button>
            }
        </>
    )
}

const getSkillMod = (skill: AnySkill, specialty: string | string[] | null): number => {
    if (!skill.specialties) {
        if (specialty) {
            console.warn("No specialties for skill passed to check handler! In Check Event, returning -3 as default value");
            return -3;
        } else {
            return skill.value;
        }
    }
    let specialtyVal = -3;
    if (specialty === 'any') {
        skill.specialtiesList.forEach((e) => {
            if (skill.specialty[e] > specialtyVal) {
                specialtyVal = skill.specialty[e];
            }
            return;
        });
        return specialtyVal;
    }
    if (Array.isArray(specialty)) {
        specialty.forEach((e: string) => {
            if (skill.specialty[e] > specialtyVal) {
                specialtyVal = skill.specialty[e];
            }
            return;
        });
        return specialtyVal;
    }
    if (!specialty) {
        console.warn("Attempted to run a skill check on a specialty skill without passing specialties! running check at default -3 value.");
    }
    return -3
}

export default CheckEvent;