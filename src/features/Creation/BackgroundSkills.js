import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {increaseToZero} from '../Skills/SkillsSlice';
import styles from './styles.module.css';

export const BackgroundSkillsChoice = (props) => {
    const [skills, setSkills] = useState([]);
    const [checked, setChecked] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const stats = useSelector(state => state.stats);
    const options = ['Admin', 'Animals', 'Athletics', 'Art', 'Carouse', 'Drive', 'Electronics', 'Flyer', 'Language', 'Mechanic', 'Medic', 'Profession', 'Science', 'Seafarer', 'Streetwise', 'Survival', 'VaccSuit'];
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
        navigate('/education/');
        return;
    }

    return (
        <div className={styles.main}>
            <h3 className={styles.title}>Select Background Skills...</h3>
            <h4 className={styles.subTitle}>Up to {limit}</h4> <h5 className={styles.pointTracker}>Points Remaining: {limit - skills.length}</h5>
            <form onSubmit={handleSubmit} className={styles.form}>
                {options.map((e, i) => {
                    return (
                            <label key={i} className={styles.singleSkill}>
                                <input
                                    type="checkbox"
                                    name="skill"
                                    value={e}
                                    checked={checked[i]}
                                    onChange={(event) => handleChange(event, e, i)}
                                    key={Math.random()}
                                    className={styles.checkBox}
                                /> 
                                    {e}
                            </label>
                    )
                })}
                <input type="submit" value="Confirm" className={styles.confirm}/>
            </form><br/>
            <h4 className={styles.subTitle}>Current Skills:</h4>
            <div className={styles.selectedSkills}>
                {skills?.map((e, i) => {return <span key={i} className={styles.chosenSkill}>{e}</span>})}
            </div>
        </div>
    )
}