import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeByAmount } from "../../Character/StatsSlice";
import { resolveEvent } from "../../Term/TermSlice";

const MildInjury = (props) => {
    const [selection, setSelection] = useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
        event.preventDefault();
        setSelection(event.target.value);
        return;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(changeByAmount({stat: event.target.value, value: -1}));
        dispatch(resolveEvent())
        return;
    }
    return (
        <>
            <p>Your injuries, though mild, are still harsh enough to cause meaningful damage to your physical fitness.</p>
            <form name="stat" onSubmit={handleSubmit}>
            <h4>Select which stat will be damaged by this injury:</h4>
                <label><input name="stat" type="radio" value="str" checked={selection === 'str'} onChange={handleChange}/>Strength</label>
                <label><input name="stat" type="radio" value="dex" checked={selection === 'dex'} onChange={handleChange}/>Dexterity</label>
                <label><input name="stat" type="radio" value="end" checked={selection === 'end'} onChange={handleChange}/>Endurance</label>
                <input name="stat" type="submit" value="submit"/>
            </form>
        </>
    )
}

export default MildInjury;