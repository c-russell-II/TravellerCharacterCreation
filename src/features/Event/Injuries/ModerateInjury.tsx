import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeByAmount } from "../../Character/StatsSlice";
import { resolveEvent } from "../../TermSlice/TermSlice";

const ModerateInjury = () => {
    const [selection, setSelection] = useState('');
    const dispatch = useDispatch();

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSelection(event.currentTarget.value)
        return;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const stat = selection as keyof StatDisplayHolder
        dispatch(changeByAmount({stat: stat, value: -2}))
        dispatch(resolveEvent())
        return;
    }

    return (
        <>
            <p>Your injuries aren't as severe as they could be, but this isn't pleasant- perhaps an eye or a limb missing, or you've suffered severe damage to your torso.</p>
            <form name="stat" onSubmit={handleSubmit}>
                <h4>Select which of these stats will decrease as a result:</h4>
                <label><input name="stat" value="str" type="radio" checked={selection==='str'} onChange={handleChange}/>Strength</label>
                <label><input name="stat" value="dex" type="radio" checked={selection==='dex'} onChange={handleChange}/>Dexterity</label>
                <input name="stat" type="submit" value="submit"/>
            </form>
        </>
    )
}

export default ModerateInjury;