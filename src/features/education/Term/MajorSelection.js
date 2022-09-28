import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectSpecialty } from "../../Skills/selectSpecialty";
import {chooseMajor} from '../Utilities/EducationSlice'
import styles from './styles.module.css';

function MajorSelection(props) {
    const [selectedMajor, setSelectedMajor] = useState('');
    const [activeSpecialty, setActiveSpecialty] = useState(false)

    const skills = useSelector(state => state.skills)
    const educationState = useSelector(state => state.education);
    const {allChoices, choiceSpecArray, animalSpec, cleanup} = props;

    const dispatch = useDispatch();

    const passSpecialty = (spec) => {
        dispatch(chooseMajor({skill: selectedMajor, specialty: spec}))
        setActiveSpecialty(false);
        cleanup();
        return;
    }

    const handleChange = (event) => {
        event.preventDefault();
        setSelectedMajor(event.target.value);
        return;
    }

    const majorSubmit = (event) => {
        event.preventDefault();
        if (choiceSpecArray.includes(selectedMajor)) {
            setActiveSpecialty(true);
            return;
        }
        dispatch(chooseMajor({skill: selectedMajor, specialty: false}))
        cleanup();
        return;
    }
    return (
    <div>
        <h5 className={styles.selectionTitle}>Major--</h5>
        {selectedMajor !== '' ? <p>Selected Major: {selectedMajor} {educationState.majorSpecialty ? `Selected Specialty: ${educationState.majorSpecialty}` : ''}</p> : ''}
        <form onSubmit={majorSubmit} className="select_major">
            {allChoices.map((e, i) => {
                return (
                    <div key={i}>
                        <label key={i}>
                        <input key={Math.random()} type="radio" value={e} name={e} checked={selectedMajor === e} onChange={handleChange} />  {e}
                        </label>
                    </div>);
            })}
            <button key={Math.random()} type="submit">Confirm major.</button>
        </form> <br />
        {activeSpecialty &&
            <SelectSpecialty skill={selectedMajor} list={selectedMajor === 'Animals' ? animalSpec : skills[selectedMajor]?.specialtiesList} passSpecialty={passSpecialty} />
        }
    </div>);
}

export default MajorSelection