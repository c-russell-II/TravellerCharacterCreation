import React, {useState} from 'react';
const SpecialtySkillDisplay = (props) => {
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
          <span style={{display: "block", marginLeft:"2%"}} key={`${skill} specialty: ${e}`}>{e}: {skillObj[e]}</span>
        )}
      </div>}
  </>
  )
}

export default SpecialtySkillDisplay;
