import React, {useState} from 'react';
import { specSkill } from '../Skills/SkillsSlice';
const SpecialtySkillDisplay = (props: {skill: string, skillObj: specSkill}) => {
  const [active, setActive] = useState(true)
  const {skill, skillObj} = props;
  return (
  <>
    {active ?
      <div onClick={e => setActive(prev => !prev)}>
        <li>{skill}: Click to View Specialties</li>
      </div>
      :
      <div onClick={e => setActive(prev => !prev)}>
        <li>{skill}</li>
        {skillObj.specialtiesList.map(e => 
          <span style={{display: "block", marginLeft:"2%"}} key={`${skill} specialty: ${e}`}>{e}: {skillObj.specialty[e]}</span>
        )}
      </div>}
  </>
  )
}

export default SpecialtySkillDisplay;
