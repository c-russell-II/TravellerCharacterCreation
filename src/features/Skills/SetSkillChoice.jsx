import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectSpecialty } from "./selectSpecialty";
import SkillChoiceRender from "./SkillChoiceRender";
import { setValue } from "./SkillsSlice";
import setSkillHandler from "./SetSkillHandler";

const SetSkillChoice = (props) => {
    const skills = useSelector(state => state.skills);
    const [chooseSpecialty, setChooseSpecialty] = useState();
    const [chosenSkill, setChosenSkill] = useState({skill: null, list: null});
    const dispatch = useDispatch();
    const {skillList, specialtyList, value, cleanup} = props;

    const {filteredSpecialties, filteredSpecialtyList, allSkills} = setSkillHandler(skills, skillList, specialtyList, value)

    const finalize = (choice) => {
        if (!filteredSpecialties.includes(choice)) {
            dispatch(setValue({skill: choice, specialty: false, value: value}))
            cleanup();
            return;
        }
        if (typeof filteredSpecialtyList[choice] === 'string') {
            dispatch(setValue({skill: choice, specialty: filteredSpecialtyList[choice], value: value}))
            cleanup();
            return;
        }
        setChosenSkill({skill: choice, list: filteredSpecialtyList[choice]});
        setChooseSpecialty(true);
        cleanup();
        return;

    }
    const passSpecialty = (choice) => {
        dispatch(setValue({skill:chosenSkill.skill, specialty:choice, value: value}));
        setChooseSpecialty(false);
        setChosenSkill({});
        cleanup();
    }
    return (
        <>
            <SkillChoiceRender skills={allSkills} cleanup={finalize}/>
            {chooseSpecialty && <SelectSpecialty {... chosenSkill} passSpecialty={passSpecialty}/>}
        </>
    )
}

export default SetSkillChoice;