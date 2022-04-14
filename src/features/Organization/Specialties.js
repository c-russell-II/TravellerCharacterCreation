import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { selectJob } from '../Career/careerSlice';
import { skillCheck } from "../Career/careerHandler";

export const Specialties = (props) => {
    const [isActive, setIsActive] = useState(false);
    const stats = useSelector(state => state.stats);
    const { title, description } = props.specialty;
    const { parent } = props;
    const jobState = useSelector(state => state.careers);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clickHandler = (job) => {
        if (jobState.previousJob === job && jobState[job].muster) {
            alert("Spend a term elsewhere!");
            return;
        }
        if (parent.qualification) {
            const result = parent.qualificationDC <= skillCheck(stats[parent.qualificationStat]);
            if (result) {
                dispatch(selectJob({ job: job }));
                navigate('/term/' + job);
                return;
            } else {
                alert('failed to qualify');
                return;
            }
        } else {
            dispatch(selectJob({ job: job, details: [props.specialty] }));
            navigate('/term/' + job);
            return;
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
                    <button onClick={() => { clickHandler(props.job); }} className="jobSelectButton">Select Job.</button>
                </div>}

        </div>
    );
};
