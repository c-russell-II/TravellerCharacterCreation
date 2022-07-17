import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skillCheck } from "../../Career/careerHandler";
import { addEnemy, removeFriend } from "../../Character/miscBonusSlice";
import { addDeferredEvents, resolveEvent } from "../../Term/Utilities/TermSlice";

const BetrayalEvent = (props) => {
    const misc = useSelector(state=> state.misc);
    const job = useSelector(state => state.term.job);
    const jobDetails = useSelector(state => state.term.jobDetails)
    const {contacts, allies} = misc;
    const [blindside, setBlindside] = useState(false);
    const [traitor, setTraitor] = useState({})
    const dispatch = useDispatch();
    useEffect(() => {
        if (contacts.length + allies.length === 0) {
            setBlindside(true);
            return;
        }
        let num = Math.floor(Math.random() * (contacts.length + allies.length))
        if (contacts.length > num) {
            setTraitor(contacts[num]);
            dispatch(removeFriend({type: 'contact', index: num}));
            return;
        }
        num -= contacts.length;
        setTraitor(allies[num]);
        dispatch(removeFriend({type: 'ally', index: num}))
        return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleClick = () => {
        const roll = skillCheck();
        if (roll === 2 && (jobDetails.parent === 'drifter' || jobDetails.parent === 'rogue')) {
            dispatch(addDeferredEvents([{type: 'prisoner'}]))
        }
        if (blindside) {
            dispatch(addEnemy({value: 1, description: "Someone who worked very hard to end your career, who blindsided you out of the blue during your time as a " + job}))
            dispatch(resolveEvent());
            return;
        }
        dispatch(addEnemy({value: 1, description: traitor.description + 'They went on to betray you, for reasons as yet unknown.'}))
        dispatch(resolveEvent());
        return;
    }

    return (
        <>
            {blindside ?
                <>
                    <p>Someone you've never seen hide nor hair of neatly arranges a startling mishap, very likely resulting in the loss of your career- and if not, they certainly gave it their all.</p>
                    <button onClick={handleClick}>Okay...</button>
                </>
            :
                <>
                    <p>Someone you trusted betrays you - and tries very hard to get you ousted from your career.</p>
                    <p>What you can recall of why you trusted them: {traitor.description}</p>
                    <button onClick={handleClick}>Why?!</button>
                </>
            }
        </>
    )
}

export default BetrayalEvent;