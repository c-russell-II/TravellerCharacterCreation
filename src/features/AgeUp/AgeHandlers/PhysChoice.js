import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeByAmount } from "../../Character/StatsSlice";

const PhysicalChoice = (props) => {
    const {two, one, cleanup} = props;
    const [currentTwo, setCurrentTwo] = useState(two)
    const [currentOne, setCurrentOne] = useState(one)
    const [isChecked, setIsChecked] = useState([]);
    const dispatch = useDispatch();
    

    const twoChange = (event) => {
        event.preventDefault();
        if (isChecked.includes(event.target.value)) {
            setIsChecked(prev => prev.filter(e => e !== event.target.value));
            return;
        }
        if (isChecked.length < currentTwo) {
            setIsChecked(prev => prev.push(event.target.value));
            return;
        }
        alert("You've selected too many!")
        return;
    }
    const submitTwo=(event) => {
        event.preventDefault();
        if (isChecked.length < currentTwo) {
            alert("You selected too few!")
            return;
        }
        isChecked.forEach((e) => {
            dispatch(changeByAmount({stat: e, value: -2}))
        })
        setCurrentTwo(0);
        setIsChecked([]);
        return;
    }
    const oneChange = (event) => {
        event.preventDefault();
        if (isChecked.includes(event.target.value)) {
            setIsChecked(prev => prev.filter(e => e !== event.target.value))
            return;
        }
        if (isChecked.length < currentOne) {
            setIsChecked(prev=> prev.push(event.target.value))
        }
        alert("You've selected too many!")
        return;
    }
    const submitOne = (event) => {
        event.preventDefault();
        if (isChecked.length < currentOne) {
            alert("You selected too few!")
            return;
        }
        isChecked.forEach((e) => {
            dispatch(changeByAmount({stat: e, value: -1}))
        })
        setCurrentOne(0);
        setIsChecked([]);
        return;
    }
    return (
        <>
        {currentTwo > 0 ?
            <form name="twoChoice" onSubmit={submitTwo}>
                <h3>These stats will be lowered by two- choose {two}.</h3>
                <input name='twoChoice' type="checkbox" value="str" checked={isChecked.includes('str')} onChange={twoChange}>Strength</input>
                <input name="twoChoice" type="checkbox" value="dex" checked={isChecked.includes('dex')} onChange={twoChange}>Dexterity</input>
                <input name="twoChoice" type="checkbox" value="end" checked={isChecked.includes('end')} onChange={twoChange}>Endurance</input>
                <input name="twoChoice" type="submit" value="submit"/>
            </form>
        : currentOne > 0 ?
            <form name="oneChoice" onSubmit={submitOne}>
                <h3>These stats will be lowered by one - choose {one}.</h3>
                <input name="oneChoice" type="checkbox" value="str" checked={isChecked.includes('str')} onChange={oneChange}>Strength</input>
                <input name="oneChoice" type="checkbox" value="dex" checked={isChecked.includes('dex')} onChange={oneChange}>Dexterity</input>
                <input name="oneChoice" type="checkbox" value="end" checked={isChecked.includes('end')} onChange={oneChange}>Endurance</input>
                <input name="oneChoice" type="submit" value="submit"/>
            </form>
            : <button onClick={cleanup}>Ouch.</button>
        }
        </>
    )
}

export default PhysicalChoice;