import React from "react";
import { useSelector } from "react-redux";

export const CharacterSidebar = (props) => {
    const stats = useSelector(state => state.stats)
    const career = useSelector(state=>state.careers)
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
            <p> Current career: {career.currentJob} </p>
        </div>
    )
}