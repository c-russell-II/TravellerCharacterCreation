import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {increaseToZero} from './SkillsSlice';

export const BackgroundSkillsChoice = (props) => {
    const [count, setCount] = useState(0);
    const [skills, setSkills] = useState([]);
    const dispatch = useDispatch();
    const stats = useSelector(state => state.stats);
    const options = ['Admin', 'Animals', 'Athletics', 'Art', 'Carouse', 'Drive', 'Electronics', 'Flyer', 'Language', 'Mechanic', 'Medic', 'Profession', 'Science', 'Seafarer', 'Streetwise', 'Survival', 'Vacc Suit']
    const handleChange = (event) => {
        event.preventDefault();
        setSkills([...skills, event.target.value]);
        setCount(count + 1);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        skills.forEach((e) => {
            dispatch(increaseToZero(e));
        })
    }
    return (
        <div className="background_skills_choice">
            <h3>Select Background Skills...</h3>
            <h4>Up to {3 + stats.edu}</h4>
            <form onSubmit={handleSubmit}>
            {options.forEach((e, i) => {
                return (<div key={i}><input type="checkbox" name="skill" value={e} onChange={handleChange}/> <label for={e}>{e}</label></div>)
            })}
            <input type="submit" value="Confirm"/>
            </form>
        </div>
    )
}