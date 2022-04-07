import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { increaseToZero, setValue } from "../Character/SkillsSlice";
import { increaseStat } from "../Character/StatsSlice";
import { GraduationDialogue } from "./GraduateDialogue";


export const UniversityTerm = (props) => {
    const dispatch = useDispatch();
    const stats = useSelector(state => state.stats);
    const skills = useSelector(state=> state.skills);
    const [terms, setTerms] = useState(0);
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [majorIsActive, setMajorIsActive] = useState(true);
    const [minorIsActive, setMinorIsActive] = useState(false);
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
        const skill = event.target.value;
        setSelectedMajor(skill);
        if (choiceSpecArray.includes(skill)) {
            setActiveSpecialty(skill);
        } else {
            setActiveSpecialty('');
        }
        return;
    }

    const minorChange = (event) => {
        event.preventDefault();
        setSelectedMinor(event.target.value);
        return;
    }

    const handleSpecialty = (event) => {
        event.preventDefault();
        setSelectedSpecialty(event.target.value);
    }

    const majorSubmit = (event) => {
        event.preventDefault();
        setMajorIsActive(false);
        setMinorIsActive(true);
        const index = allChoices.indexOf(selectedMajor);
        allChoices.splice(index, 1);
        return;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedMajor !== '' && selectedMinor !== '') {
            if (selectedSpecialty) {
                dispatch(setValue({skill: selectedMajor, value: 1, specialty: selectedSpecialty}))
            } else {
                dispatch(setValue({skill: selectedMajor, value: 1}));
            }
            dispatch(increaseToZero(selectedMinor));
            dispatch(increaseStat('edu'));
            setGraduateDialogue(true);
            return;
        } else if (selectedMajor !== '' && selectedMinor === '') {
            alert('Select a minor!');
            return;
        } else if (selectedMajor === '' && selectedMinor !== '') {
            alert ('Select a major!');
            return;
        } else {
            alert ('Please select your major and minor!');
            return;
        }
    }
    
    const specialtySubmit = (event) => {
        event.preventDefault();
        setActiveSpecialty('');
    }

    const showSpecialties = (skill) => {
        const list = skills[skill].specialtiesList;
        if (list.length && skill !== 'Animals') {
            return list.map((e, i) => {
                return (<label key={i}><input key={Math.random()} type="radio" value={e} name={e} checked={selectedSpecialty === e} onChange={handleSpecialty}/>{e}<br/></label>)
            })
        } else if (skill === 'Animals') {
            return animalSpec.map((e, i) => {
                return (<label key={i}><input key={Math.random()} type="radio" value={e} name={e} checked={selectedSpecialty === e} onChange={handleSpecialty}/>{e}</label>)
            })
        } else {return (<div></div>)}
    }


    
    return (
        <div className="university_term">
            <h1>EVENTS ARE NOT FINISHED. CONDITIONAL INTERWOVEN EVENTS SUCK</h1>
            <h3>School years, year: {terms}</h3>
            <h4>Select your major and minor for this year- the two skills you set out to focus your studies on.</h4>
            <h5>Major  {majorIsActive ? '-' : '+'}</h5> 
            {majorIsActive &&
                <div>
                    {selectedMajor !== '' ? <p>Selected Major: {selectedMajor} {selectedSpecialty !== '' ? `Selected Specialty: ${selectedSpecialty}` : ''}</p> : <></>}
                    <form onSubmit={majorSubmit}>
                        {allChoices.map((e, i) => {
                            if (choicesNoSpec.includes(e)) {
                                return (<div key={i}><label key={i}><input key={Math.random()} type="radio" value={e} name={e} checked={selectedMajor === e} onChange={handleChange}/>{e}</label></div>)
                            }
                            return (
                                <div key={i}>
                                    <label key={i}>
                                        <input key={Math.random()} type="radio" value={e} name={e} checked={selectedMajor === e} onChange={handleChange}/>  {e}
                                    </label>
                                </div>
                                )
                        })}
                        {selectedSpecialty !== '' || choicesNoSpec.includes(selectedMajor) ? <button key={Math.random()} type="submit">Confirm major.</button> : <></>}
                    </form> <br/>
                    {activeSpecialty !== '' &&
                        <form onSubmit={specialtySubmit}>
                            {showSpecialties(selectedMajor)}
                            <button type="submit">Confirm Specialty</button>
                        </form>
                    }
                </div>
            }
            {minorIsActive  &&
                <div>
                    <form onSubmit={handleSubmit}>
                        {allChoices.map((e, i) => {
                            return (<div key={i}><label key={i}><input key={Math.random()} type="radio" value={e} name={e} checked={selectedMinor === e} onChange={minorChange}/>{e}</label></div>)
                        })}
                        {selectedSpecialty &&
                            <button type="submit">Confirm Minor.</button>
                        }
                    </form>
                </div>
            }
            {graduateDialogue &&
                <GraduationDialogue/>
            }
        </div>
    )
}