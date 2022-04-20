import React, {useState} from "react";
import { useSelector } from "react-redux";
import "./Character.module.css"



export const CharacterSidebar = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [open, setOpen] = useState(true);
    const stats = useSelector(state => state.stats);
    const skills = useSelector(state=> state.skills);
    const skillsList = Object.keys(skills).slice(0, -3);
    const trainedSkillsList = skillsList.filter(e => skills.trainedSkills.includes(e))
    const career = useSelector(state=>state.careers);
    return (
        <div>
            <div>
                <ul >
                    <li>Str: {stats.displayValues.str}</li>
                    <li>Dex: {stats.displayValues.dex}</li>
                    <li>End: {stats.displayValues.end}</li>
                    <li>Int: {stats.displayValues.int}</li>
                    <li>Edu: {stats.displayValues.edu}</li>
                    <li>Soc: {stats.displayValues.soc}</li>
                    <li>Age: {stats.age}</li>
                </ul>
                <p> Current career:</p>
                <p>{career.currentJob}</p>
            </div>
            <div onClick={() => setIsActive(!isActive)}>
            <ul><span >Skills:{isActive? '-' : '+'}</span>
            {isActive && 
            <>
                
                    {trainedSkillsList.map((e, i) => {
                        return (
                            <>
                            <li key="i"><strong>{e}</strong>: {skills[e].value}</li>
                            {skills[e].specialties && skills[e].specialtiesList?.map((f, i) => {return <div><span key={i}>-{f}: {skills[e][f]}</span></div>})}
                            </>
                        )
                    })}

            </>}</ul>
            </div>
        </div>
    )
}