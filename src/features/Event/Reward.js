import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from '../Character/charaSlice';
import Popup from 'reactjs-popup';
import { resolveEvent } from "../Term/TermSlice";
import { addAdvancementBonus, addBenefitBonus, addContact } from "../Character/miscBonusSlice";
import { increaseStat } from "../Character/StatsSlice";
import { promotion } from "../Career/careerSlice";
import { roll } from "../Career/careerHandler";
import { useParams } from "react-router-dom";
import RewardChoice from "./RewardChoice";
import { SelectSpecialty } from "../Skills/selectSpecialty";
import setSkillHandler from "../Skills/SetSkillHandler";
import { genericIncrease } from "../Skills/SkillsSlice";

export const Reward = (props) => {
    const career = useParams();
    const event = useSelector(state => state.term.event);
    const age = useSelector (state => state.stats.age);
    const skills = useSelector(state=> state.skills);
    const [isOpen, setIsOpen] = useState(true);
    const [isReady, setIsReady] = useState(true);
    const dispatch = useDispatch();


    useEffect(() => { setIsOpen(true); setIsReady(true); }, []);

    const cleanup = () => {setIsReady(true)}



    const rewardHelper = (type) => {
        switch (type) {
            case 'benefit':
                dispatch(addBenefitBonus({career: career, value: event.result.value}))
                return;
            case 'setSkill':
                setSkillHandler(skills, [event.result.skill], [event.result.specialty], event.result.value);
                return;
            case 'increaseSkill':
                if (skills[event.result.skill].specialties) {
                    if (typeof event.result.specialty !== 'string' || event.result.specialty === 'any') {
                        setIsReady(false);
                        const passSpecialty = (choice) => {
                            dispatch(genericIncrease({skill:event.result.skill, specialty:choice}));
                            cleanup();
                        }
                        if (Array.isArray(event.result.specialty)) {
                            return (<>{!isReady && <SelectSpecialty skill={event.result.skill} list={event.result.specialty} passSpecialty={passSpecialty}/>}</>)
                        } else {
                            return <>{!isReady && <SelectSpecialty skill={event.result.skill} list={skills[event.result.skill].specialtyList} passSpecialty={passSpecialty}/>}</>
                        }
                    }
                    dispatch(genericIncrease({skill: event.result.skill, specialty: event.result.specialty}))
                } dispatch(genericIncrease({skill: event.result.skill}))
                return;
            case 'stat':
                dispatch(increaseStat(event.result.stat));
                return;
            case 'contacts':
                if (event.result.value === 'roll') {
                    dispatch(addContact({career: career, value: roll(event.result.roll)}))
                } else {
                    dispatch(addContact({career: career, value: event.result.value}))
                }
                return;
            case 'advancement':
                dispatch(addAdvancementBonus({career: career, age:age, duration: 4, value: event.result.value}))
                return;
            case 'choice':
                setIsReady(false);
                return (<>{!isReady && <RewardChoice cleanup={cleanup}/>}</>);
            case 'promotion':
                dispatch(promotion());
                return;
            case 'redirect':
                return //need a redirect handler!
            default:
                return;
        }
    }
    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{event.description}</p>
            {rewardHelper(event.result.type)}
            {isReady && <button onClick={() => { setIsOpen(false); dispatch(addEvent(event)); dispatch(resolveEvent());}}>Great!</button>}
        </Popup>
    );
};
