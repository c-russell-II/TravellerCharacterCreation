import React from "react";
import { useDispatch } from "react-redux";
import { decreaseStat } from "../../Character/StatsSlice";

const MentalChoice = (props) => {
    const {cleanup} = props;
    const dispatch = useDispatch();

    return (
        <>
        <p>Select the mental stat that's noticeably affected by your aging.</p>
        <button onClick={() => {dispatch(decreaseStat('int')); cleanup()}}>Intelligence</button><button onClick={() => {dispatch(decreaseStat('edu')); cleanup();}}>Education</button>
        </>
    )
}

export default MentalChoice;