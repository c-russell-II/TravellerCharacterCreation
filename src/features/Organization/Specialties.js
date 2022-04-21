import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { selectJob } from '../Career/careerSlice';

export const Specialties = (props) => {
    const [isActive, setIsActive] = useState(false);
    const { parent, job, specialty } = props;
    const {title, description} = specialty;
    const jobState = useSelector(state => state.careers);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clickHandler = (job) => {
        if (jobState.previousJob === job && jobState[job].muster) {
            alert("Spend a term elsewhere!");
            return;
        }
        if (parent.qualification) {
            navigate('qualification/' + job)
        } else {
            dispatch(selectJob({job: job, details: specialty}))
            navigate('/term/' + job + '/')
        }
    };
    return (
        <div
            className="jobSpecialties"
            onClick={() => setIsActive(!isActive)}
        >
            <h4>{title}  {isActive ? '-' : '+'}</h4>

            {isActive &&
                <div className="specialtyContent">
                    <p>{description}</p>
                    <button onClick={() => { clickHandler(job); }} className="jobSelectButton">Select Job.</button>
                </div>
            }

        </div>
    );
};
