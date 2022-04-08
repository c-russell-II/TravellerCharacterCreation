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
        skills.forEach((e) => {
            dispatch(increaseToZero(e));
        })
        if (skills.length === limit) {
            navigate('/choose_education');
        } else {
            alert(`Please select ${limit - skills.length} more skills.`)
        }
    }

    return (
        <div className="background_skills_choice">
            <h3>Select Background Skills...</h3>
            <h4>Up to {limit}</h4>
            <form onSubmit={handleSubmit}>
                <h5>Points Remaining: {limit - skills.length}</h5>
                {options.map((e, i) => {
                    return (
                        <div key={i}>
                            <label>
                                <input type="checkbox" name="skill" value={e} checked={checked[i]} onChange={(event) => handleChange(event, e, i)} key={Math.random()}/> {e}
                            </label>
                        </div>
                    )
                })}
                <input type="submit" value="Confirm"/>
            </form>
        </div>
    )
}