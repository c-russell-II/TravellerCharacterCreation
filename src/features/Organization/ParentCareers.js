import React, { useState } from "react";
import {Specialties} from './Specialties';
import jobObject, { parentJobs } from "../Career/CareerDetails";

export function ParentCareers(props) {
  const [isActive, setIsActive] = useState();
  const {e} = props;
  return (
    <div className="jobListing"> 
      <h3 onClick={() => setIsActive(!isActive)}>Career Path: {e} {isActive ? '-' : '+'}</h3>
      {isActive && 
        <div>
        <p>{parentJobs[e].description}</p>
        {parentJobs[e].specialtiesList.map((f, j) => {
        return (
          <div className="specialty" key={j}>
            <Specialties key={j} specialty={jobObject[f]} parent={e} job={f} />
          </div>
        )})}
        </div>
      }
    </div>);
}
  