import React, { useState } from "react";
import {Specialties} from './Specialties';
import jobObject from "../Career/CareerDetails";

export function ParentCareers(props) {
  const [isActive, setIsActive] = useState();
  const {e} = props;
  return (
    <div className="jobListing"> 
      <h3 onClick={() => setIsActive(!isActive)}>Career Path: {e.title} {isActive ? '-' : '+'}</h3>
      {isActive && 
        <div>
        <p>{e.description}</p>
        {e.specialtiesList.map((f, j) => {
        return (
          <div className="specialty" key={j}>
            <Specialties specialty={jobObject[f]} parent={e} job={f} />
          </div>
        )})}
        </div>
      }
    </div>);
}
  