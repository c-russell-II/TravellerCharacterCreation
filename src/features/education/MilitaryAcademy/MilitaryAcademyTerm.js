import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { parentJobs } from "../../Career/CareerDetails";
import { useDispatch, useSelector} from "react-redux";
import {setGraduated, setHonors} from '../EducationSlice'
import {basicTraining} from '../../Skills/SkillsSlice';
import { skillCheck } from "../../Career/careerHandler";
import { ageUp } from "../../Character/StatsSlice";

export const MilitaryAcademyTerm = (props) => {
    const dispatch = useDispatch();
    const {branch} = useParams();
    const stats = useSelector(state => state.stats)
    const [selectSkill, setSelectSkill] = useState(false);
    const [ready, setReady] = useState(false);
    const navigate = useNavigate();

    const getMod = () => {
        let mod = stats.int;
        if (stats.end >= 8) {
            mod++;
        }
        if (stats.soc >= 8) {
            mod++;
        }
        return mod;
    }

    const handleGraduate = (event) => {
        event.preventDefault();

        dispatch(ageUp())
        const graduateRoll = skillCheck(getMod());

        if (graduateRoll >= 11) {
            dispatch(setHonors());
            navigate('/mil_academy/' + branch + '/graduated')
            return;
        }
        if (graduateRoll >= 8) {
            dispatch(setGraduated())
            navigate('/mil_academy/' + branch + '/graduated')
            return;
        }
        navigate('/mil_academy/' + branch + '/no_graduate')
    }
    const basicTrainingArray = parentJobs[branch].skills.service;
    const handleStart = () => {
        if (basicTrainingArray.some((e) => e.type !== 'skill')) {
            setSelectSkill(true);
            return;
        }
        const basicSkills = basicTrainingArray.map((e) => {return e.skill})
        dispatch(basicTraining(basicSkills));
        setReady(true);
    }
    const isChoice = basicTrainingArray.filter((e, i) => e.type === 'choice')
    const handleSelect = (event) => {
        const index = basicTrainingArray.findIndex((e) => e.type === 'choice')
        basicTrainingArray[index] = {type: 'skill', skill: event.target.value};
        const basicSkills = basicTrainingArray.map((e) => {return e.skill})
        dispatch(basicTraining(basicSkills));
        setSelectSkill(false);
        setReady(true);
    }

    return (
        <div className="military_academy">
            <h3>Ooyah, Hoorah, Hooah!</h3>
            {ready &&
                <>
                    <p>Your term's training is complete - now for final exams.</p>
                    <button onClick={handleGraduate}>Take the tests!</button>
                </>
            }
            {!selectSkill && !ready && <button onClick={handleStart}>Let's get started!</button>}
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