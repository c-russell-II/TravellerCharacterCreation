import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { SelectSpecialty } from "../../Skills/selectSpecialty";
import { genericIncrease } from "../../Skills/SkillsSlice";
import { resolveEvent } from "../../Term/TermSlice";

const SkillIncreaseReward = (props) => {
    const event = useSelector(state => state.term.event);
    const skills = useSelector(state => state.skills);
    const dispatch = useDispatch();
    const [skillList, setSkillList] = useState([]);
    const [choice, setChoice] = useState('');
    const [needSpecialty, setNeedSpecialty] = useState(false);
    const [specList, setSpecList] = useState([]);

    useEffect(() => {
        if (event.result.choiceType === 'increaseAny') {
            setSkillList(skills.trainedSkills);
        } else {
            setSkillList(event.result.choiceList);
        }
    }, [event.result.choiceList, event.result.choiceType, skills.trainedSkills])

    const specialtyHandler = () => {
        if (event.result.specialtyList[choice] === 'any') {
            setNeedSpecialty(true);
            setSpecList(skills[choice].specialtyList);
            return;
        }
        if (typeof event.result.specialtyList[choice] === 'string') {
            dispatch(genericIncrease({skill: choice, value: event.result.value, specialty: event.result.specialtyList[choice]}));
            dispatch(resolveEvent());
            return;
        }
        setNeedSpecialty(true);
        setSpecList(event.result.specialtyList[choice]);
        return;
    }

    const handleChange = (ev) => {
        ev.preventDefault();
        setChoice(ev.target.value);
        return;
    }
    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (skills[choice].specialty) {
            specialtyHandler();
        }
        dispatch(genericIncrease({skill: ev.target.value, value: event.result.value}));
        dispatch(resolveEvent());
        return;
    }

    const passSpecialty = (spec) => {
        dispatch(genericIncrease({skill: choice, value: event.result.value, specialty: spec}))
        setNeedSpecialty(false);
        dispatch(resolveEvent());
        return;
    }

    return (
        <>
            {!needSpecialty &&
                <form name="skill" onSubmit={handleSubmit}>
                    {skillList.map((e, i) => <label key={i}><input type="radio" name="skill" value={e} checked={choice === e} onChange={handleChange}/>{e}</label>)}
                    <input type="submit" value="Choose" name="skill"/>
                </form>
            }

            {needSpecialty && <SelectSpecialty skill={choice} list={specList} passSpecialty={passSpecialty}/>}
        </>
    )
}

export default SkillIncreaseReward;