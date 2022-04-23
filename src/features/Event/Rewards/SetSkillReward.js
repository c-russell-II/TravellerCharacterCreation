import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectSpecialty } from "../../Skills/selectSpecialty";
import { setValue } from "../../Skills/SkillsSlice";
import { resolveEvent } from "../../Term/TermSlice";

const SetSkillReward = (props) => {
    const event = useSelector(state => state.term.event);
    const skills = useSelector(state => state.skills);
    const dispatch = useDispatch();
    const [skillList, setSkillList] = useState([]);
    const [choice, setChoice] = useState('');
    const [needSpecialty, setNeedSpecialty] = useState(false);
    const [specList, setSpecList] = useState([]);

    useEffect(() => {
        if (event.result.choiceType === 'setAny') {
            setSkillList(Object.keys(skills).slice(0, -3))
        } else {
            setSkillList(event.result.choiceList);
        }
    }, [skills, event.result.choiceList, event.result.choiceType])

    const specialtyHandler = () => {
        if (event.result.specialtyList[choice] === 'any') {
            setNeedSpecialty(true);
            setSpecList(skills[choice].specialtyList);
            return;
        }
        if (typeof event.result.specialtyList[choice] === 'string') {
            dispatch(setValue({skill: choice, value: event.result.value, specialty: event.result.specialtyList[choice]}));
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
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (skills[choice].specialty) {
            specialtyHandler();
            return;
        }
        dispatch(setValue({skill: choice, value: event.result.value}))
        dispatch(resolveEvent());
        return;
    }

    const passSpecialty = (spec) => {
        dispatch(setValue({skill: choice, value: event.result.value, specialty: spec}))
        setNeedSpecialty(false);
        dispatch(resolveEvent());
        return;
    }

    return (
        <>
            {!needSpecialty&&
                <form name="skills" onSubmit={handleSubmit}>
                    {skillList.map((e, i) => <label key={i}><input key={Math.random()} type="radio" name="skills" value={e} onChange={handleChange} checked={choice === e}/>{e}</label>)}
                    <input type="submit" value="Choose" name="skills"/>
                </form>
            }
            {needSpecialty && <SelectSpecialty skill={choice} list={specList} passSpecialty={passSpecialty}/>}
        </>
    )
}

export default SetSkillReward;