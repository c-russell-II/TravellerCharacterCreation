import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link, useParams } from "react-router-dom";
import jobObject from "../CareerDetails/CareerDetails";
import { roll } from "../Career/careerHandler";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { removeBenefitBonus } from "../Character/miscBonusSlice";
import { addBenefit } from "../Character/charaSlice";
import { resolveBenefit } from "../Career/careerSlice";


export const BenefitsContainer = (props) => {
    const careers = useSelector(state => state.careers);
    const benefits = useSelector(state => state.misc.benefits);
    const chara = useSelector(state => state.chara);
    const skills = useSelector(state => state.skills);
    const [numCash, setNumCash] = useState(0);
    const [numBenefits, setNumBenefits] = useState(0);
    const [value, setValue] = useState(2);
    const [benefitArray, setBenefitArray] = useState([]);
    const dispatch = useDispatch();
    const {career} = useParams();
    let benefitBonuses = {};
    let bonusList = [];
    if (benefits[career]) {
        benefitBonuses = benefits[career]
        bonusList = Object.keys(benefitBonuses);
    }
    useEffect(() => {
        setNumCash(chara.numOfCashBenefits);
        setNumBenefits(careers[career].benefits);
        if (chara.numOfCashBenefits >= 3) {
            setValue(2);
        }
    }, [career, careers, chara.numOfCashBenefits])

    const noBonusClick = (event) => {
        event.preventDefault();
        setNumBenefits(prev => prev--)
        let mod = 0;
        let type = 'misc'
        if (value === 1) {
            type = 'money'
            if (skills.Gambler.value >= 0) {
                mod++;
            }
        }

        if (careers[career].nonComRank) {
            const realRank = careers[career].nonComRank + careers[career].rank;
            if (realRank > 4) {
                mod ++;
            }
        } else if (careers[career].rank > 4) {
            mod ++;
        }
        const getRoll = () => {
            const tempRoll = roll() + mod;
            if (tempRoll > 6) {
                return 6;
            }
            return tempRoll;
        }
        const rollValue = getRoll()
        const rolledBenefit = jobObject[career].benefits[rollValue][type]
        dispatch(addBenefit({type: type, value: rolledBenefit}))
        dispatch(resolveBenefit(career));
        setBenefitArray(prev => [...prev, {type: type, value:rolledBenefit}]);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let mod = event.target.value;
        let type = 'misc'
        dispatch(removeBenefitBonus({career: career, value: event.target.value}))
        if (benefitBonuses[mod] > 1) {
            benefitBonuses[mod]--;
        } else if (benefitBonuses[mod] === 1) {
            benefitBonuses[mod]--;
            const index = bonusList.indexOf(mod);
            bonusList.splice(index, 1)
        }
        if (value === 1) {
            type="money"
            if (skills.Gambler.value >= 0) {
                mod++;
            }
        }
        if (careers[career].rank > 4) {
            mod ++;
        }
        const getRoll = () => {
            const tempRoll = roll();
            if (tempRoll + mod > 6) {
                return 6;
            } else {
                return tempRoll + mod;
            }
        }
        const roll = getRoll()
        setBenefitArray(prev => [...prev, {type: type, value:jobObject[career].benefits[roll][type]}]);
        return;
    }

    const handleChange = val => setValue(val);
    return (
        <div>
            <h3>{jobObject[career].title} Benefits:</h3>
            {numBenefits > 0 && <> <p>Benefits Remaining: {numBenefits}</p>
                {numCash < 3 &&
                <ToggleButtonGroup type="radio" name="typeSelector" value={value} onChange={handleChange}>
                    <ToggleButton key={Math.random()} id="tbg-btn-1" value={1}>
                        Cash
                    </ToggleButton>
                    <ToggleButton key={Math.random()} id="tbg-btn-2" value={2}>
                        Miscellaneous
                    </ToggleButton>
                </ToggleButtonGroup>}
                {bonusList.length > 0 ?
                    <form onSubmit={handleSubmit} name='selectedBenefit'>
                        {bonusList.map((e, i) => <label for={e} key={i}><input type="radio" id={e} value={e} name='selectedBenefit'/>Use Bonus: +{e}</label>)}
                        <label for='none'><input type="radio" value="none" id='none' name='selectedBenefit'/> No bonus.</label>
                        <label for='submit'><input type="submit" name='selectedBenefit'/>Roll for a benefit!</label>
                    </form>
                : <button onClick={noBonusClick}>Roll for a benefit!</button>} </>
            }
            {benefitArray.length > 0 &&
                <ul>
                    {benefitArray.map((e, i) => {return <li key={i}>{e.type==='money' ? `Cash: ${e.value}` : `Misc: ${e.value}`}</li>})}
                </ul>
            }
            {numBenefits <= 0 &&
                <Link to="/choose_career">New Career!</Link>
            }
        </div>
    )
}