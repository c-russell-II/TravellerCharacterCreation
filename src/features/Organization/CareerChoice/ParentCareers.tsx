import React, { useState } from "react";
import {Specialties} from './Specialties';
import jobObject from "../../CareerDetails/CareerDetails";
import { Card } from "react-bootstrap";
import { ParentCareer } from "../../CareerDetails/CareerTyping";

export function ParentCareers(props: {parentCareer: ParentCareer}) {
  const [isActive, setIsActive] = useState(false);
  const {parentCareer} = props;
  return (
    <Card.Body>
      <Card.Title as="h3" onClick={() => setIsActive(!isActive)}>Career Path: {parentCareer.title} {isActive ? '-' : '+'}</Card.Title>
      {isActive && 
        <Card.Body>
        <p>{parentCareer.description}</p>
        {parentCareer.specialtiesList.map((f, j) => {
        return (
          <div className="specialty" key={j}>
            <Specialties specialty={jobObject[f]} parent={parentCareer} job={f} />
          </div>
        )})}
        </Card.Body>
      }
    </Card.Body>);
}
  