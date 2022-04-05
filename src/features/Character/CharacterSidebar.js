import React, {useState} from "react";
import { useSelector } from "react-redux";

export const CharacterSidebar = (props) => {
    const [isActive, setIsActive] = useState(false);
    const stats = useSelector(state => state.stats);
    const skills = useSelector(state=> state.skills);
    const skillsList = Object.keys(skills);
    const career = useSelector(state=>state.careers);
    return (
        <div className="chara-sidebar">
            <span>Character name</span>
            <ul>
                <li>Str: {stats.str}</li>
                <li>Dex: {stats.dex}</li>
                <li>Con: {stats.con}</li>
                <li>Int: {stats.int}</li>
                <li>Wis: {stats.wis}</li>
                <li>Cha: {stats.cha}</li>
                <li>Age: {stats.age}</li>
            </ul>
            <ul><span onClick={() => setIsActive(!isActive)}>{isActive? '+' : '-'}</span>
            {isActive && 
                <div className="skill_sidebar">
                    {skillsList.forEach((e, i) => {
                        return (
                            <li key="i" className="skill">{e}:{skills.e}</li>
                        )
                    })}
                </div>
            }</ul>
            <p> Current career: {career.currentJob} </p>
        </div>
    )
}