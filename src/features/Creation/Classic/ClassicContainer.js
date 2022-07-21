import React, { useState } from "react";
import { skillCheck } from "../../Career/careerHandler";
import { ClassicCharacterCreation } from "./ClassicCharacterCreation";
import { Link } from "react-router-dom";

export const ClassicContainer = (props) => {
    const statRolls = Array.from({length: 6}, () => skillCheck());
    const [availableStats, setAvailableStats] = useState(['Strength', 'Dexterity', 'Endurance', 'Intelligence', 'Education', 'Social Standing'])
    const [statArray, setStatArray] = useState(statRolls);
    const [currentStats, setCurrentStats] = useState({Strength: 0, Dexterity: 0, Endurance: 0, Intelligence: 0, Education: 0, 'Social Standing': 0});

    const handleClick = (eventKey, num) => {
        setAvailableStats(availableStats.filter((e) => e !== eventKey))
        const temp = statArray;
        const index = statArray.indexOf(num)
        temp.splice(index, 1);
        setStatArray(temp)
        setCurrentStats(prevStats =>{return {...prevStats, [eventKey]: num}});
        return;
    }
    const currentStatArray = Object.keys(currentStats);
    const getModifiers = (num) => {
        if (num === 0) {
            return -3
        } else if (num === 1 || num === 2) {
            return (-2);
        } else if (num >= 3 && num < 6) {
            return (-1);
        } else if (num > 5 && num < 9) {
            return 0
        }else if (num > 8 && num < 12) {
            return 1
        } else if (num > 11 && num < 15) {
            return 2
        } else if (num >= 15) {
            return 3
        }
    }
    return (
        <div>
            <ClassicCharacterCreation statArray={statArray} availableStats={availableStats} clickHandler={handleClick} modifier={getModifiers}/>
            {currentStatArray.map((e, i) => {
                return (<p key={i}>{e}: {currentStats[e]} ({getModifiers(currentStats[e])})</p>)
            })}
            <Link to='/background_skills'>Next</Link>
        </div>
    )
}