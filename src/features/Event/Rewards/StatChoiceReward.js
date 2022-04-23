import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeByAmount } from "../../Character/StatsSlice";
import { resolveEvent } from "../../Term/TermSlice";

const StatChoiceReward = (props) => {
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();
    const [choice, setChoice] = useState('');

    const handleChange = (ev) => {
        ev.preventDefault();
        setChoice(ev.target.value);
    }
    const handleSubmit = (ev) => {
        dispatch(changeByAmount({stat: choice, value: event.result.value}))
        dispatch(resolveEvent());
        return;
    }
    return (
        <>
            <form name="stat" onSubmit={handleSubmit}>
                {event.result.choiceList.map((e, i) => <label key={i}><input key={Math.random()} type="radio" name="stat" value={e} checked={choice === e} onChange={handleChange}/>{e}</label>)}
                <input type="submit" value="Choose" name="stat"/>
            </form>
        </>
    )
}

export default StatChoiceReward;