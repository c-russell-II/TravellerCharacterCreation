import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import {changeStat} from './StatsSlice';
import {addBenefit, setName} from './charaSlice';
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";

export const CharacterCreation = (props) => {
    const [value, setValue] = useState();
    const [points, setPoints] = useState(12);
    const [ready, setReady] = useState(false);
    const [stats, setStats] = useState({str:7, dex:7, end:7, int:7, edu:7, soc:7})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const costCalc = (val) => {
        if (val < 3) {
            return 1
        } else if (val < 6) {
            return 2
        } else if (val < 9) {
            return 3
        } else if (val < 12) {
            return 4
        } else if (val < 15) {
            return 5
        } else {
            return 6
        }
    }
    const decrease = (val) => {
        const currentStat = stats[val]
        if (stats[val] > 0) {
            setPoints(prevPoints => prevPoints + costCalc(currentStat - 1))
            setStats(prevStats => {return {...prevStats, [val]:currentStat - 1}})
            return;
        } else {
            alert("You can't lower that stat any further at this time.");
            return;
        }
    };
    const increase = (val) => {
        const currentStat = stats[val]
        const pointCost = costCalc(currentStat);
        if (currentStat < 15 && pointCost <= points) {
            setPoints(prevPoints => prevPoints - pointCost);
            setStats(prevStats => {return {...prevStats, [val]:currentStat + 1}})
            return;
        } else if (currentStat < 15 && pointCost > points) {
            alert("You don't have enough stat points available!");
            return;
        } else {
            alert("You can't raise that stat any further at this time.")
        }
    };
    const handleReady = () => {
        if (points > 5) {
            alert('Please spend more of your stat points before attempting to proceed.')
            return;
        } else {
            setReady(true);
            return;
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setName(value));
    };
    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const getModifiers = (num) => {
        if (num === 0) {
            return -3
        } else if (num === 1 || num === 2) {
            return (-2);
        } else if (num >= 3 && num < 6) {
            return (-1);
        } else if (num > 5 && num < 9) {
            return 0
        }else if (num > 8 && num < 12) {
            return 1
        } else if (num > 11 && num < 15) {
            return 2
        } else if (num >= 15) {
            return 3
        }
    }
    const handleFinalize = () => {
        Object.keys(stats).forEach((e) => {dispatch(changeStat({stat: e, value: stats[e]}));})
        if (points > 0) {
        dispatch(addBenefit({type: 'cash', amount:points * 2000}));}
        navigate('/background_skills');
    }
    return (
        <div className="character_creation">
            <h2>Select your Stats and Name</h2><br/>
            <p>Decide your natural aptitudes and abilities, that will carry you into whatever the future has in store.</p>
            <h3>Name:</h3><form onSubmit={handleSubmit}><input type="text" onChange={handleChange} placeholder="name"/><input type="submit" value="Submit"/></form>
            <h3>Points remaining: <span>{points}</span></h3>
            <div className="stats">
            <button onClick={() => decrease('str')}>-</button><span>Str: {stats.str} Mod: {getModifiers(stats.str)} </span><button onClick={() => increase('str')}>+</button>  Next Point: {costCalc(stats.str)}<br/>
            <button onClick={() => decrease('dex')}>-</button><span>Dex: {stats.dex} Mod: {getModifiers(stats.dex)} </span><button onClick={() => increase('dex')}>+</button>  Next Point: {costCalc(stats.dex)}<br/>
            <button onClick={() => decrease('end')}>-</button><span>End: {stats.end} Mod: {getModifiers(stats.end)} </span><button onClick={() => increase('end')}>+</button>  Next Point: {costCalc(stats.end)}<br/>
            <button onClick={() => decrease('int')}>-</button><span>Int: {stats.int} Mod: {getModifiers(stats.int)} </span><button onClick={() => increase('int')}>+</button>  Next Point: {costCalc(stats.int)}<br/>
            <button onClick={() => decrease('edu')}>-</button><span>Edu: {stats.edu} Mod: {getModifiers(stats.edu)} </span><button onClick={() => increase('edu')}>+</button>  Next Point: {costCalc(stats.edu)}<br/>
            <button onClick={() => decrease('soc')}>-</button><span>Soc: {stats.soc} Mod: {getModifiers(stats.soc)} </span><button onClick={() => increase('soc')}>+</button>  Next Point: {costCalc(stats.soc)}<br/>
            <button onClick={handleReady}>Finalize stats.</button>
            </div>
            <Popup
                open={ready}
                modal
                closeOnDocumentClick={false}
            >
                <h3>Finalize Stats?</h3>
                <p>When you move on to careers or higher education, any unspent points will be lost, and your stats will be finalized until you create a new character.</p>
                <button onClick={handleFinalize}>Let's continue.</button> <button onClick={() => {setReady(false)}}>Not Ready</button>
            </Popup>
        </div>
    )
}