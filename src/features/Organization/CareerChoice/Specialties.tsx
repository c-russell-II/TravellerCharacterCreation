import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { RootState } from "../../../app/store";
import { selectJob } from '../../Career/careerSlice';
import { CareerSpecialty, ParentCareer } from "../../CareerDetails/CareerTyping";

interface SpecialtiesProps {
    parent: ParentCareer;
    job: string;
    specialty: CareerSpecialty
}

export const Specialties = (props: SpecialtiesProps) => {

    const [isActive, setIsActive] = useState(false);
    const jobState = useSelector((state: RootState) => state.careers);

    const { parent, job, specialty } = props;
    const {title, description} = specialty;


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clickHandler = (job: string) => {
        if (jobState.previousJob === job && jobState.careerInfo[job].muster) {
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
