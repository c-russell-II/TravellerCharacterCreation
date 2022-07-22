import React, { useState } from "react";
import {Specialties} from './Specialties';
import jobObject from "../../CareerDetails/CareerDetails";
import { Card } from "react-bootstrap";

export function ParentCareers(props) {
  const [isActive, setIsActive] = useState();
  const {e} = props;
  return (
    <Card.Body>
      <Card.Title as="h3" onClick={() => setIsActive(!isActive)}>Career Path: {e.title} {isActive ? '-' : '+'}</Card.Title>
      {isActive && 
        <Card.Body>
        <p>{e.description}</p>
        {e.specialtiesList.map((f, j) => {
        return (
          <div className="specialty" key={j}>
            <Specialties specialty={jobObject[f]} parent={e} job={f} />
          </div>
        )})}
        </Card.Body>
      }
    </Card.Body>);
}
  