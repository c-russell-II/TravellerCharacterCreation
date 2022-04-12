import React, { useState } from "react";
import {useSelector} from 'react-redux';
import jobObject from "./CareerDetails";
import { roll } from "./careerHandler";

export const BenefitsContainer = (props) => {
    const careers = useSelector(state => state.careers);
    const benefits = useSelector(state => state.misc.benefits);
    const [index, setIndex] = useState(0);
    const [numCash, setNumCash] = useState(0);

    const getBenefit = (career) => {
        const numRolls = career.terms;
        const rollArray = [];
        for (let i = 0; i < numRolls; i++) {
            rollArray.push(jobObject[career.title].benefits[roll()]);
        }
        return rollArray;
    }
    return (
        <div><p>... benefits ...</p></div>
    )
}