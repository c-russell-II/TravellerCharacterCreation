import React, {useState} from "react";
import { useSelector } from "react-redux";
import SpecialtySkillDisplay from "./SpecialtySkillDisplay";
import { RootState } from "../../../app/store";
import { JobState } from "../../../features/Career/careerSlice";
import {
	AllSkills,
	noSpecSkill,
	specSkill,
} from "../../../features/Skills/SkillsSlice";



export const CharacterSidebar = () => {
    const [isActive, setIsActive] = useState(false);
    const stats = useSelector((state: RootState) => state.stats);
    const skills = useSelector((state: RootState)=> state.skills);
    const career = useSelector((state: RootState)=>state.careers);
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
                { career.currentJob ?
                    <>
                        <p> Current career:</p>
                        <p>{career.careerInfo[career.currentJob].details.title}</p>
                    </>
                    :
                    <p>Not yet employed!</p>
                }
            </div>
            <div>
            <ul><span onClick={() => setIsActive(!isActive)}>Skills:{isActive? '-' : '+'}</span>
            {isActive && 
            <>
                    {skills.trainedSkills.length > 0 ?
                    skills.trainedSkills.map((e, i) => {
                        if (!skills.specialtySkills.includes(e)) {
                            return (
                                <li key={`Skills-${e}`}><strong>{e}</strong>: {(skills[e as keyof AllSkills] as noSpecSkill).value}</li>
                            )
                        } else if (skills.specialtySkills.includes(e)) {
                            return <SpecialtySkillDisplay key={`Skills-${e}`} skill={e} skillObj={skills[e as keyof AllSkills] as specSkill}/>
                        } else {
                            return <p>Something went wrong!</p>
                        }
                    }):
                    <p>No Skills Trained!</p>
                    }

            </>}</ul>
            </div>
        </div>
    )
}