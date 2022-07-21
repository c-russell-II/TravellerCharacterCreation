import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skillCheck } from "../../Career/careerHandler";
import { addBenefit } from "../../Career/careerSlice";
import { setValue } from "../../Skills/SkillsSlice";
import { resolveEvent } from "../../Term/Utilities/TermSlice";

const GambleEvent = (props) => {
    const term = useSelector(state => state.term);
    const career = useSelector(state=> state.careers[term.job])
    const skills = useSelector(state => state.skills);
    const [selectAmount, setSelectAmount] = useState(false);
    const [amount, setAmount] = useState(0);
    const [intro, setIntro] = useState(true);
    const [refused, setRefused] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [pickCheck, setPickCheck] = useState(false);
    const [skillChoice, setSkillChoice] = useState(false);
    const [checkSkill, setCheckSkill] = useState('Gambler');
    const [result, setResult] = useState(null);
    const dispatch = useDispatch();

    const handleGamble = () => {
        setIntro(false);
        if (term.jobDetails.parent === 'navy') {
            setAmount(1);
            if (skills.Deception.value <= 0 || skills.Gambler.value <= 0) {
                setSkillChoice(true);
                return;
            }
            setIsReady(true);
            return;
        }
        if (term.jobDetails.parent === 'rogue') {
            if (skills.Gambler.value <= 0) {
                dispatch(setValue({skill: 'Gambler', value: 1}))
            }
        }
        setSelectAmount(true);
    }

    const refuseGamble = () => {
        if (term.jobDetails.parent === 'navy') {
            if (skills.Deception.value <= 0 || skills.Gambler.value <= 0) {
                setRefused(true);
                setSkillChoice(true);
                return;
            }
        }
        if (term.jobDetails.parent === 'rogue') {
            dispatch(setValue({skill: 'Gambler', value: 1}))
        }
        dispatch(resolveEvent());
    }

    const decreaseBet = () => {
        if (amount > 0) {
            setAmount(prev => prev - 1)
            return;
        }
        alert("You can't bet a negative number of benefit rolls.")
        return;
    }

    const increaseBet = () => {
        if (amount < career.benefits) {
            setAmount(prev => prev + 1);
            return;
        }
        alert("You can't bet more benefit rolls than you already have- not at this table.")
        return;
    }
    const startGamble = () => {
        setSelectAmount(false);
        if (term.jobDetails.parent === 'merchant') {
            setPickCheck(true);
            return;
        }
        setCheckSkill('Gambler');
        setIsReady(true);
    }
    const runGame = () => {
        setIsReady(false);
        const rollValue = skillCheck(skills[checkSkill].value)
        if (rollValue >= 8) {
            setResult('win')
            return;
        }
        setResult('loss');
    }

    const handleWin = () => {
        dispatch(addBenefit({job: term.job, value: Math.ceil(amount / 2)}));
        dispatch(resolveEvent());
        return;
    }

    const handleLose = () => {
        dispatch(addBenefit({job: term.job, value: -1 * amount}));
        dispatch(resolveEvent());
        return;
    }


    return (
        <>
        <h4>Some Gambling?</h4>
        {intro &&
        <><p>You have the chance to take a risk- be it a volatile investment, venture capital, or a literal game of chance, you have the opportunity to do some gambling.</p>
        <button onClick={handleGamble}>Do it!</button><button onClick={refuseGamble}>Not for me.</button></>}
        {skillChoice &&
            <>
                <p>Select a skill to gain:</p>
                {skills.Gambler.value <= 0  && <button onClick={() => {dispatch(setValue({skill: 'Gambler', value: 1})); if (refused) {dispatch(resolveEvent())}}}>Gambler 1</button>}
                {skills.Deception.value <= 0 && <button onClick={() => {dispatch(setValue({skill: 'Deception', value: 1})); if (refused) {dispatch(resolveEvent())}}}>Deception 1</button>}
            </>
        }
        {selectAmount &&
            <>
                <p>Decide how many of your benefit rolls you will wager...</p>
                <button onClick={decreaseBet}>-</button> <p>{amount}</p> <button onClick={increaseBet}>+</button>
                <button onClick={startGamble}>Roll the dice!</button>
            </>
        }
        {pickCheck &&
            <>
                <p>Select the skill to use for this risky venture:</p>
                <button onClick={() => {setCheckSkill('Broker'); setIsReady(true)}}>Broker</button> <button onClick={() => {setCheckSkill('Gambler'); setIsReady(true);}}>Gambler</button>
            </>
        }
        {isReady &&
            <>
                <p>Having decided on relevant skills, and gotten some friendly games in, it's time to play for real stakes.</p>
                <button onClick={runGame}>See Results!</button>
            </>
        }
        {result &&
            result === 'win' ?
                <>
                    <p>The risk you took - on a business, or at the table- paid off handsomely. You gain back everything you risked, and half that again.</p>
                    <button onClick={handleWin}>Fantastic!</button>
                </>
            :
                <>
                    <p>You lost! Either due to the investment going south, or a run of bad luck at the table, everything you risked was lost.</p>
                    <button onClick={handleLose}>Damn!</button>
                </>
        }
        </>
    )
}

export default GambleEvent;