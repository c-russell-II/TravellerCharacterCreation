import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {increaseStat, decreaseStat} from './StatsSlice';
import {setName} from './charaSlice';
export const CharacterCreation = (props) => {
    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const stats = useSelector((state) => state.stats);
    const decrease = (val) => {
        if (stats[val] > -3) {
            dispatch(decreaseStat(val));
            return;
        }
    };
    const increase = (val) => {
        if (stats.freePoints > 0) {
            dispatch(increaseStat(val));
            return;
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setName(value));
    };
    const handleChange = (event) => {
        setValue(event.target.value);
    }
    return (
        <div className="CharacterCreation">
            <h2>This is where character creation will actually occur</h2>
            <ul>
                <li>So: Careers, data tracking from careers, and maybe backgrounds and races?</li>
            </ul>
            <h3>Name:</h3><form onSubmit={handleSubmit}><input type="text" onChange={handleChange} placeholder="name"/><input type="submit" value="Submit"/></form>
            <h3>Points remaining: {stats.freePoints}</h3>
            <button onClick={() => decrease('str')}>-</button><span>Str: {stats.str}</span><button onClick={() => increase('str')}>+</button><br/>
            <button onClick={() => decrease('dex')}>-</button><span>Dex: {stats.dex}</span><button onClick={() => increase('dex')}>+</button><br/>
            <button onClick={() => decrease('end')}>-</button><span>End: {stats.end}</span><button onClick={() => increase('end')}>+</button><br/>
            <button onClick={() => decrease('int')}>-</button><span>Int: {stats.int}</span><button onClick={() => increase('int')}>+</button><br/>
            <button onClick={() => decrease('edu')}>-</button><span>Edu: {stats.edu}</span><button onClick={() => increase('edu')}>+</button><br/>
            <button onClick={() => decrease('soc')}>-</button><span>Soc: {stats.soc}</span><button onClick={() => increase('soc')}>+</button><br/>
            <Link to="/choose_career">Select career...</Link>
        </div>
    )
}