import MinorSelection from './MinorSelection';
import MajorSelection from './MajorSelection';
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseToZero, setValue } from "../../Skills/SkillsSlice";
import { ageUp, increaseStat } from "../../Character/StatsSlice";
import { Graduation } from "../Graduation/GraduationContainer";
import { skillCheck } from "../../Career/careerHandler";
import { setGraduated, setHonors } from '../Utilities/EducationSlice';
import styles from './styles.module.css'

export const UniversityTerm = (props) => {
    const dispatch = useDispatch();
    const stats = useSelector(state => state.stats);
    const educationState = useSelector(state => state.education);
    const [majorIsActive, setMajorIsActive] = useState(true);
    const [minorIsActive, setMinorIsActive] = useState(false);
    const [graduateDialogue, setGraduateDialogue] = useState(false);

    const allChoices = ['Admin', 'Advocate', 'Animals', 'Art', 'Astrogation', 'Electronics', 'Engineer', 'Language', 'Medic', 'Navigation', 'Profession', 'Science']
    const choiceSpecArray = ['Animals', 'Art', 'Electronics', 'Engineer', 'Language', 'Profession', 'Science']
    const animalSpec = ['training', 'veterinary']

    const majorCleanup = () => {
        setMajorIsActive(false);
        setMinorIsActive(true);
    }

    const minorCleanup = (event) => {
        event.preventDefault();
        if (educationState.majorSpecialty) {
            dispatch(setValue({skill: educationState.major, value: 1, specialty: educationState.majorSpecialty}))
        } else {
            dispatch(setValue({skill: educationState.major, value: 1}));
        }
        dispatch(ageUp());
        dispatch(increaseToZero(educationState.minor));
        dispatch(increaseStat('edu'));
        setMinorIsActive(false);
        setGraduateDialogue(true);
        const graduateCheck = skillCheck(stats.edu);
        const didGraduate = graduateCheck >= 7;
        const hasHonors = graduateCheck >= 11;
        if (didGraduate && hasHonors) {
            dispatch(setHonors());
        } else if (didGraduate) {
            dispatch(setGraduated());
        }
        return;
    }



    return (
        <div className="university_term">
            <h3 className={styles.termHeader}>Back to School. . .</h3>
            {!graduateDialogue && <h4>Select your major and minor for this year- the two skills you set out to focus your studies on.</h4>}
            {majorIsActive &&
                <MajorSelection cleanup={majorCleanup} allChoices={allChoices} choiceSpecArray={choiceSpecArray} animalSpec={animalSpec}/>
            }
            {minorIsActive &&
                <MinorSelection allChoices={allChoices} cleanup={minorCleanup}/>
            }
            {graduateDialogue &&
                <Graduation />
            }
        </div>
    )
}
