import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { selectJob } from '../Career/careerSlice';
import jobObject, {parentJobs} from "../Career/CareerDetails";
import { skillCheck } from "../Career/careerHandler";



export const CareerChooser = (props) => {
    const parentList = parentJobs.list;
    const name = useSelector(state => state.chara.charaName);
    return (
        <div className="jobBoard">
            <h2>Select Your Career, {name}!</h2>
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
    const [bleh, setBleh] = useState();
    const stats = useSelector(state => state.stats);
    const {title, description} = props.specialty;
    const {parent} = props;
    const jobState = useSelector(state=> state.careers);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clickHandler = (job) => {
        if (jobState.previousJob === job && jobState[job].muster) {
            alert("Spend a term elsewhere!");
            return;
        }
        if (parent.qualification) {
            const result = parent.qualificationDC <= skillCheck(stats[parent.qualificationStat])
            setBleh(result);
            if (result) {
                dispatch(selectJob({job: job}))
                navigate('/term/' + job);
                return;
            } else {
                alert('failed to qualify');
                return;
            }
        } else {
            dispatch(selectJob({job: job}))
            navigate('/term/' + job);
            return;
        }


    }
    return (
        <div 
            className="jobSpecialties"
            onClick={() => setIsActive(!isActive)}
        >
            <h4>{title}  {isActive ? '-' : '+'}</h4>

                <div className="specialtyContent">
                    <p>{description}</p>
                    <button onClick={() => {clickHandler(props.job)}} className="jobSelectButton">Select Job.</button>
                </div>
            
        </div>
    )
}