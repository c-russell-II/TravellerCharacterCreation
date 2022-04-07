import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseToZero, setValue } from "../Character/SkillsSlice";
import { increaseStat } from "../Character/StatsSlice";
import {useParams} from 'react-router-dom'
import { Graduation } from "./GraduationContainer";
import { skillCheck } from "../Career/careerHandler";
import { SelectSpecialty } from "../Skills/selectSpecialty";

export const UniversityTerm = (props) => {
    const dispatch = useDispatch();
    const stats = useSelector(state => state.stats);
    const skills = useSelector(state=> state.skills);
    const {term} = useParams();
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [majorIsActive, setMajorIsActive] = useState(true);
    const [selectedMajor, setSelectedMajor] = useState('');
    const [selectedMinor, setSelectedMinor] = useState('');
    const [activeSpecialty, setActiveSpecialty] = useState('')
    const [graduateDialogue, setGraduateDialogue] = useState(false);

    const allChoices = ['Admin', 'Advocate', 'Animals', 'Art', 'Astrogation', 'Electronics', 'Engineer', 'Language', 'Medic', 'Navigation', 'Profession', 'Science']
    const choicesNoSpec = ['Admin', 'Advocate', 'Astrogation', 'Medic', 'Navigation']
    const choiceSpecArray = ['Animals', 'Art', 'Electronics', 'Engineer', 'Language', 'Profession', 'Science']
    const animalSpec = ['training', 'veterinary']


    const handleChange = (event) => {
        event.preventDefault();
        setSelectedMajor(event.target.value);
        return;
    }

    const minorChange = (event) => {
        event.preventDefault();
        setSelectedMinor(event.target.value);
        return;
    }

    const majorSubmit = (event) => {
        event.preventDefault();
        if (choiceSpecArray.includes(selectedMajor)) {
            setActiveSpecialty(selectedMajor);
        } else {
            setMajorIsActive(false);
        }
        return;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedSpecialty) {
            dispatch(setValue({skill: selectedMajor, value: 1, specialty: selectedSpecialty}))
        } else {
            dispatch(setValue({skill: selectedMajor, value: 1}));
        }
        dispatch(increaseToZero(selectedMinor));
        dispatch(increaseStat('edu'));
        setGraduateDialogue(true);
        return;
    }

    const passSpecialty = (spec) => {
        setSelectedSpecialty(spec);
        setActiveSpecialty('');
        setMajorIsActive(false);
    }

    const graduateCheck = skillCheck(stats.edu);
    const didGraduate = graduateCheck >= 7;
    const hasHonors = graduateCheck >= 11;

    return (
        <div className="university_term">
            <h1>EVENTS ARE NOT FINISHED. CONDITIONAL INTERWOVEN EVENTS SUCK</h1>
            <h3>School years, year: {term}</h3>
            <h4>Select your major and minor for this year- the two skills you set out to focus your studies on.</h4>
            {majorIsActive &&
                <div>
                    <h5>Major--</h5>
                    {selectedMajor !== '' ? <p>Selected Major: {selectedMajor} {selectedSpecialty !== '' ? `Selected Specialty: ${selectedSpecialty}` : ''}</p> : ''}
                    <form onSubmit={majorSubmit}>
                        {allChoices.map((e, i) => {
                            return (
                                <div key={i}>
                                    <label key={i}>
                                        <input key={Math.random()} type="radio" value={e} name={e} checked={selectedMajor === e} onChange={handleChange}/>  {e}
                                    </label>
                                </div>
                                )
                        })}
                        <button key={Math.random()} type="submit">Confirm major.</button>
                    </form> <br/>
                    {activeSpecialty !== '' &&
                        <SelectSpecialty skill={selectedMajor} list={selectedMajor === 'Animals' ? animalSpec : skills[selectedMajor].specialtiesList} passSpecialty={passSpecialty}/>
                    }
                </div>
            }
            {!majorIsActive  &&
                <div>
                    <h5>Minor: --</h5>
                    <form onSubmit={handleSubmit}>
                        {allChoices.map((e, i) => {
                            if (e === selectedMajor) {
                                return <div key={i}></div>
                            }
                            return (<div key={i}><label key={i}><input key={Math.random()} type="radio" value={e} name={e} checked={selectedMinor === e} onChange={minorChange}/>{e}</label></div>)
                        })}
                        <button type="submit">Confirm Minor.</button>
                    </form>
                </div>
            }
            {graduateDialogue &&
                <Graduation major={selectedMajor} minor={selectedMinor} specialty={selectedSpecialty ? selectedSpecialty : null} graduate={didGraduate} honors={hasHonors}/>
            }
        </div>
    )
}