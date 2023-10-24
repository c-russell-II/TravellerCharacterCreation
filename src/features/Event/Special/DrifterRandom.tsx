import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roll } from "../../Career/careerHandler";
import { addBenefitBonus } from "../../Character/miscBonusSlice";
import { resolveEvent, updateEvent } from "../../TermSlice/TermSlice";
import { RootState } from "../../../app/store";

const DrifterRandom = () => {
    const term = useSelector((state: RootState) => state.term);
    const [intro, setIntro] = useState(true);
    const [badChoice, setBadChoice] = useState(false);
    const [nothing, setNothing] = useState(false);
    const dispatch = useDispatch();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIntro(false);
        const val = roll() + 1
        if (val < 3) {
            setBadChoice(true);
            return;
        }
        if (val < 5) {
            setNothing(true);
        }
        dispatch(addBenefitBonus({career: term.job, value: 4}));
        dispatch(resolveEvent());
        return;
    }

    return (
        <>
            {intro &&
                <>
                    <p>You are offered the chance to participate in a risky, but rewarding venture- and accept...</p>
                    <button onClick={handleClick}>Let's do it...</button>
                </>
            }
            {badChoice && 
                <>
                    <p>The venture goes sideways- choose between injury, or prison, as you struggle to deal with the consequences...</p>
                    <button onClick={() => dispatch(updateEvent({type: 'redirect', destination: 'injury'}))}>Take the Injury</button>
                    <button onClick={() => dispatch(updateEvent({type: 'special', specialType: "prisoner"}))}>Go to Prison</button>
                </>
            }
            {nothing && 
                <>
                    <p>Nothing goes especially wrong - but you don't get much out of the venture, either.</p>
                    <button onClick={() => dispatch(resolveEvent())}>Could be worse</button>
                </>
            }
        </>
    )
}

export default DrifterRandom;