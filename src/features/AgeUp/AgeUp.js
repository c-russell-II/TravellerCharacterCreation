import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skillCheck } from "../Career/careerHandler";
import { changeByAmount } from "../Character/StatsSlice";
import MentalChoice from "./AgeHandlers/MentChoice";
import PhysicalChoice from "./AgeHandlers/PhysChoice";

const AgeUp = (props) => {
    const {cleanup} = props;
    const age = useSelector(state => state.stats.age);
    const anagathics = useSelector(state => state.chara.anagathics);
    const [val, setVal] = useState(1);
    const [body, setBody] = useState(null);
    const [physChoice, setPhysChoice] = useState({active: false, two: 0, one: 0})
    const [mentChoice, setMentChoice] = useState(false)
    const dispatch = useDispatch();

    const mod = (age - 18) / 4;
    const agingClick = (event) => {
        event.preventDefault();

        const tempVal = skillCheck(-1 * mod) + anagathics.terms;
        if (tempVal > 0) {
            setVal(1);
        } else if (tempVal < -6) {
            setVal(-6)
        } else {
            setVal(tempVal)
        };
        switch (val) {
            case -6:
                setMentChoice(true)
                dispatch(changeByAmount({stat: 'str', value: -2}));
                dispatch(changeByAmount({stat: 'dex', value: -2}))
                dispatch(changeByAmount({stat: 'end', value: -2}))
                setBody(
                    <p>Your age is strongly affecting you - slightly affecting your mind, and strongly hurting your physical abilities.</p>
                )
                return;
            case -5:
                dispatch(changeByAmount({stat: 'str', value: -2}))
                dispatch(changeByAmount({stat: 'dex', value: -2}))
                dispatch(changeByAmount({stat: 'end', value: -2}))
                setBody(
                    <>
                        <p>Regardless of if it's the years, or the mileage, you're feeling your age this term. Your physical skills strongly degrade.</p>
                        <button onClick={cleanup}>Damn...</button>
                    </>
                )
                return;
            case -4:
                setPhysChoice({active: true, two: 2, one: 1});
                return;
            case -3:
                setPhysChoice({active: true, two: 1, one: 2})
                return;
            case -2:
                dispatch(changeByAmount({stat: 'str', value: -1}));
                dispatch(changeByAmount({stat: 'dex', value: -1}));
                dispatch(changeByAmount({stat: 'end', value: -1}));
                setBody(
                    <>
                        <p>You're feeling your age, this term- your body responds less readily, and less well, across the board.</p>
                        <button onClick={cleanup}>A shame...</button>
                    </>
                )
                return;
            case -1:
                setPhysChoice({active: true, two: 0, one: 0})
                return;
            case 0:
                setPhysChoice({active: true, two: 0, one: 1})
                return;
            case 1:
                setBody(
                    <>
                        <p>These past four years have left barely a mark on your body - you've avoided any further negative effects of aging, so far.</p>
                        <button onClick={cleanup}>Great!</button>
                    </>
                )
                return;
            default:
                alert('Aging value error!')
                return;
        }
    }

    return(
        <>
            <p>You are starting to age - and as such, will have to see how well your body holds up, as you get older.</p>
            {body ? body : <button onClick={agingClick}>Find out</button>}
            {physChoice.active && <PhysicalChoice two={physChoice.two} one={physChoice.one} cleanup={cleanup}/>}
            {mentChoice && <MentalChoice cleanup={cleanup}/>}
        </>
    )
}

export default AgeUp;