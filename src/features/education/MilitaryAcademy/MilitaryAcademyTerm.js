import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { parentJobs } from "../../Career/CareerDetails";
import { useDispatch} from "react-redux";
import {basicTraining} from '../../Skills/SkillsSlice';

export const MilitaryAcademyTerm = (props) => {
    const dispatch = useDispatch();
    const {branch} = useParams();
    const [selectSkill, setSelectSkill] = useState(false);
    const basicTrainingArray = parentJobs[branch].skills.service;
    const handleStart = () => {
        if (basicTrainingArray.some((e) => e.type !== 'skill')) {
            setSelectSkill(true);
            return;
        }
        const basicSkills = basicTrainingArray.map((e) => {return e.skill})
        dispatch(basicTraining(basicSkills))
    }
    const isChoice = basicTrainingArray.filter((e, i) => e.type === 'choice')
    const handleSelect = (event) => {
        const index = basicTrainingArray.findIndex((e) => e.type === 'choice')
        basicTrainingArray[index] = {type: 'skill', skill: event.target.value};
        const basicSkills = basicTrainingArray.map((e) => {return e.skill})
        dispatch(basicTraining(basicSkills));
        setSelectSkill(false);
    }

    return (
        <div className="military_academy">
            <h3>Ooyah, Hoorah, Hooah!</h3>
            <button onClick={handleStart}>Let's get started!</button>
            {selectSkill &&
                <>
                    <p>Select a skill to add to your basic training curriculum:</p>
                    {isChoice.map((f) => {
                        return (
                            <>
                                {f.list.map((e, i) => {
                                    return (
                                            <button key={i} onClick={(event) => {handleSelect(event, i)}} value={e}>{e}</button>
                                    )
                                })}
                            </>
                        )
                    })}
                </>
            }
        </div>
    )
}