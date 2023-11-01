import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import jobObject from "../../CareerDetails/CareerDetails";
import { skillCheck } from "../../Career/careerHandler";
import { addDebt } from "../../Character/charaSlice";
import { resolveEvent } from "../../TermSlice/TermSlice";
import { RootState } from "../../../app/store";

const MedicalHandler = () => {
    const injuries = useSelector((state: RootState) => state.stats.injuryHolder);
    const dispatch = useDispatch();
    const prevJob = useSelector((state: RootState) => state.careers.previousJob);
    //TODO: career error handling! I actually don't have a smooth way to handle errors other than to say "fuck it" and let the damn thing break. gotta work on that.
    let {career} = useParams();
    career = checkCareer(career, prevJob);
    const currentCareer = useSelector((state: RootState) => state.careers.careerInfo[career as string])
    const [isActive, setIsActive] = useState(false);
    const [choice, setChoice] = useState(false);
    const [cost, setCost] = useState(0);

    const best = ['army', 'navy', 'marine'];
    const middle = ['agent', 'noble', 'scholar', 'entertainer', 'merchant', 'citizen'];
    const worst = ['scout', 'drifter', 'rogue'];
    const handleYes = () => {
        setChoice(true);
    };

    const handleNo = () => {
        dispatch(resolveEvent());
    }

    const costCalculator = (percent: number) => {
        let numStats = 0;
        Object.keys(injuries).forEach((e) => numStats  += injuries[e as keyof InjuryHolder]);
        const initialCost = numStats * 5000;
        return initialCost * (1 - percent);
    }

    const bestInsurance = (val: number): number => {
        if (val >= 8) {
            return costCalculator(1);
        }
        if (val >= 4) {
            return costCalculator(0.75)
        }
        return costCalculator(0);
    }

    const midInsurance = (val: number): number => {
        if (val >= 12) {
            return costCalculator(1)
        }
        if (val >= 8) {
            return costCalculator(0.75)
        }
        if (val >= 4) {
            return costCalculator(0.5)
        }
        return costCalculator(0)
    }

    const worstInsurance = (val: number): number => {
        if (val >= 12) {
            return costCalculator(0.75)
        }
        if (val >= 8) {
            return costCalculator(0.5)
        }
        return costCalculator(0)
    }
    const handleInsurance = () => {
        if (typeof career !== 'string') {
            alert('Something went wrong, handling insurance!');
            return;
        }
        const value = skillCheck(currentCareer.rank);
        if (!(career in jobObject)) {
            alert('Something went wrong, handling insurance!');
            return;
        }
        if (best.includes(jobObject[career].parent)) {
            setCost(bestInsurance(value))
            return;
        }
        if (middle.includes(jobObject[career].parent)) {
            setCost(midInsurance(value));
            return;
        }
        if (worst.includes(jobObject[career].parent)) {
            setCost(worstInsurance(value));
            return;
        }
        alert('Something went wrong, handling insurance!')
        return;
    }

    const handleFinish = () => {
        dispatch(addDebt(cost));
        dispatch(resolveEvent());
        return;
    }
    return (
        <>
            <h3>You've been injured!</h3>

            {cost === 0 &&
            <>{choice ?
                <>
                    <p>As a first step, find out how much is covered by your employer.</p>
                    <button onClick={handleInsurance}>Insurance Claim</button>
                </>
            :
                <>
                    <p>If you would like to pay for medical care, now is the time.</p>
                    <button onClick={handleYes}>Get medical care</button><button onClick={handleNo}>Go on without it.</button>
                </>
            }</>}
            {cost !== 0 &&
                <>
                    <p>After your insurance claim is processed, you still owe: {cost} - however, you are not expected to pay that now.</p>
                    <p>The cost will come out of your cash benefits when you retire- and any remaining debt will follow you into future adventures.</p>
                    <button onClick={handleFinish}>Wonderful...</button>
                </>
            }
            {/*TODO: COST DETAILS In medical handler */}
            <h4 onClick={() => setIsActive(!isActive)}>Cost details:  {isActive ? '-' : '+'}</h4> 
            {isActive && <p></p>}
        </>
    )
}

const checkCareer = (currCareer: string | undefined, prevCareer: string | null): string => {
    if (typeof currCareer !== 'string' && typeof prevCareer !== 'string') {
        return 'drifter'
    }
    if (typeof currCareer !== 'string') {
        return prevCareer as string;
    }
    return currCareer;
}
export default MedicalHandler;