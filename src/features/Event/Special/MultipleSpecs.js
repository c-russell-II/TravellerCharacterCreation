import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genericIncrease } from "../../Skills/SkillsSlice";

const MultipleSpecs = (props) => {
    const skills = useSelector(state => state.skills);
    const [isChecked, setIsChecked] = useState([]);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        event.preventDefault();

        if (isChecked.includes(event.target.value)) {
            setIsChecked(prev => prev.filter((e) => e !== event.target.value));
            return;
        }
        if (isChecked.length > 2) {
            alert("You've selected too many options! please select two.")
            return;
        }
        setIsChecked(prev => [...prev, event.target.value]);
        return;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        isChecked.forEach((e) => dispatch(genericIncrease({skill: 'Science', specialty: e})))
    }

    return (
        <>
            <form onSubmit={handleSubmit} name="specialties">
                {skills.science.specialtyList.map((e, i) => <input name="specialties" type="checkbox" key={i} value={e} checked={isChecked.includes(e)} onChange={handleChange}>{e}</input>)}
                <input name="specialties" value="submit" type="submit"/>
            </form>
        </>
    )
}

export default MultipleSpecs;