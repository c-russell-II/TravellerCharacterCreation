import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {increaseToZero} from './SkillsSlice';

export const BackgroundSkillsChoice = (props) => {
    const [skills, setSkills] = useState([]);
    const [checked, setChecked] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const stats = useSelector(state => state.stats);
    const options = ['Admin', 'Animals', 'Athletics', 'Art', 'Carouse', 'Drive', 'Electronics', 'Flyer', 'Language', 'Mechanic', 'Medic', 'Profession', 'Science', 'Seafarer', 'Streetwise', 'Survival', 'Vacc Suit'];
    const limit = stats.edu + 3

    const handleChange = (event, e, i) => {
        event.preventDefault();

        if (checked[i]) {
            const temp = skills.filter((f) => f !== e)
            setSkills(temp);

            const tempCheck = checked;
            tempCheck[i] = false;
            setChecked(tempCheck);
            return;
        }
        if (skills.length < limit) {
            const temp = checked;
            temp[i] = true;
            setChecked(temp);

            setSkills([...skills, e]);
            return
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!skills.length === limit) {
            alert(`Please select ${limit - skills.length} more skills.`)
            return;
        }
        skills.forEach((e) => {
            dispatch(increaseToZero(e));
        })
        navigate('/choose_education');
        return;
    }

    return (
        <div className="background_skills_choice">
            <h3>Select Background Skills...</h3>
            <h4>Up to {limit}</h4> <h5>Points Remaining: {limit - skills.length}</h5>
            <form onSubmit={handleSubmit} className="background_skills">
                {options.map((e, i) => {
                    return (
                            <label key={i}>
                                <input type="checkbox" name="skill" value={e} checked={checked[i]} onChange={(event) => handleChange(event, e, i)} key={Math.random()}/> {e}
                            </label>
                    )
                })}
                <input type="submit" value="Confirm"/>
            </form><br/>
            <h4>Current Skills:</h4>
            {skills?.map((e) => {return <span>{e}</span>})}
        </div>
    )
}