import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { selectJob } from '../Career/careerSlice';
import jobObject, {parentJobs} from "../Career/CareerDetails";



export const CareerChooser = (props) => {
    const parentList = parentJobs.list;
    return (
        <div className="jobBoard">
            <h2>Select Career!</h2>
            {parentList.map((e, i) => {
                return ( 
                    <div className="jobListing" key={i}> 
                        <h3>Job title: {e}</h3>
                        <p>{parentJobs[e].description}</p>
                        {parentJobs[e].specialtiesList.map((f, j) => {
                            return (
                                <div className="specialty" key={j}>
                                    <Specialties key={j} specialty={jobObject[f]} parent={e} job={f}/>
                                </div>
                            )
                        })}
                    </div>)
            })}
        </div>
    )
}

const Specialties = (props) => {
    const [isActive, setIsActive] = useState(false);
    const {title, description} = props.specialty;
    const jobState = useSelector(state=> state.careers);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clickHandler = (job, specialty) => {
        if (jobState.previousJob === job && jobState[job].muster) {
            alert("Spend a term elsewhere!");
            return;
        }
        dispatch(selectJob({job: job}))
        navigate('/term/' + job);
        return;
    }
    return (
        <div 
            className="jobSpecialties"
            onClick={() => setIsActive(!isActive)}
        >
            <h4>{title}  {isActive ? '-' : '+'}</h4>
            {isActive && 
                <div className="specialtyContent">
                    <p>{description}</p>
                    <button onClick={() => {clickHandler(props.job)}} className="jobSelectButton">Select Job.</button>
                </div>
            }
        </div>
    )
}