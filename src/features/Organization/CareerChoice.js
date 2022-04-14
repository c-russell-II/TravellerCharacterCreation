import { ParentCareers } from './ParentCareers';
import React from "react";
import { useSelector } from "react-redux";
import {parentJobs} from "../Career/CareerDetails";

export const CareerChooser = (props) => {
    const parentList = parentJobs.list;
    const name = useSelector(state => state.chara.charaName);
    return (
        <div className="jobBoard">
            <h2>Select Your Career, {name}!</h2>
            {parentList.map((e, i) => {
                return ( 
                    <ParentCareers key={i} e={e}/>)
            })}
        </div>
    )
}

