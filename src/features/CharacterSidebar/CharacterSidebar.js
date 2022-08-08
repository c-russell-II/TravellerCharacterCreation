import React, {useState} from "react";
import { useSelector } from "react-redux";



export const CharacterSidebar = (props) => {
    const [isActive, setIsActive] = useState(false);
    const stats = useSelector(state => state.stats);
    const skills = useSelector(state=> state.skills);
    const skillsList = Object.keys(skills).slice(0, -3);
    const trainedSkillsList = skillsList.filter(e => skills.trainedSkills.includes(e))
    const career = useSelector(state=>state.careers);
    return (
        <div>
            <div>
                <ul >
                    <li>Str: {stats.displayValues.str} ({stats.str})</li>
                    <li>Dex: {stats.displayValues.dex} ({stats.dex})</li>
                    <li>End: {stats.displayValues.end} ({stats.end})</li>
                    <li>Int: {stats.displayValues.int} ({stats.int})</li>
                    <li>Edu: {stats.displayValues.edu} ({stats.edu})</li>
                    <li>Soc: {stats.displayValues.soc} ({stats.soc})</li>
                    <li>Age: {stats.age}</li>
                </ul>
                <p> Current career:</p>
                <p>{career[career.currentJob].details.title}</p>
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