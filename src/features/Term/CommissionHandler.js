import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import jobObject from "../Career/CareerDetails";
import { skillCheck } from "../Career/careerHandler";
import { setCommissioned } from "../Career/careerSlice";

const CommissionHandler = (props) => {
    const education = useSelector(state => state.education);
    const soc = useSelector(state => state.stats.soc);
    const age = useSelector(state => state.stats.age);
    const {career} = useParams();
    const {cleanup} = props;
    const dispatch = useDispatch();
    const [result, setResult] = useState('');

    const handleCommission = () => {
        let rollVal = skillCheck(soc);
        if (education.school === jobObject[career].parent && education.honors && age - 4 === education.ageEntered) {
            setResult('pass');
            return;
        }
        if (education.school === jobObject[career].parent && education.graduated && age - 4 === education.ageEntered) {
            rollVal+= 2;
        }
        if (rollVal >= 8) {
            setResult('pass');
            return;
        }
        setResult('fail');
        return;
    }

    const handlePass = () => {
        dispatch(setCommissioned());
        cleanup();
    }

    return (
        <>
            <h3>Commission?</h3>
            <p>Rather than a promotion, you may also choose to attempt to gain a commission.</p>
            <p>For those not part of the upper crust- in social standing, at least - this can only be done at the end of a successful first term.</p>
            <button onClick={handleCommission}>Try for Commission</button>
            {result === 'pass' ?
                <>
                    <p>You have earned a commission! New training opportunities are now available to you, along with your new ranks.</p>
                    <button onClick={handlePass}>Great!</button>
                </>
            :
                <>
                    <p>You did not commission this term. If you have the social clout for it, you may be allowed to try again in the future...</p>
                    <button onClick={cleanup()}>Damn...</button>
                </>
            }
        </>
    )
}

export default CommissionHandler;