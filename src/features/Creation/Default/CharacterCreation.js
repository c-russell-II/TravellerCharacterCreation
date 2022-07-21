import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import {changeStat} from '../../Character/StatsSlice';
import {addBenefit, setName} from '../../Character/charaSlice';
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css';
import FinalizePopup from "./FinalizePopup";
import SingleStat from "./SingleStat";

export const CharacterCreation = (props) => {
    const [value, setValue] = useState();
    const [points, setPoints] = useState(12);
    const [ready, setReady] = useState(false);
    const [stats, setStats] = useState({str:7, dex:7, end:7, int:7, edu:7, soc:7})
    const statList = ['str', 'dex', 'end', 'int', 'edu', 'soc'];
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
        <div className={styles.main}>
            <h1 className={styles.title}>Select your Stats and Name</h1><hr className={styles.line}/>
            
            <p>Decide your natural aptitudes and abilities, that will carry you into whatever the future has in store.</p>
            
            <h2 className={styles.subTitle}>Name:</h2>
            
            <form onSubmit={handleSubmit} className={styles.nameChoice}>

                <input className={styles.nameInput} type="text" onChange={handleChange} placeholder="name"/>

                <input  className={styles.nameSubmit} type="submit" value="Submit"/>

            </form>
            
            <h2 className={styles.subTitle}>Points remaining: <span className={styles.remainingPoints}>{points}</span></h2>

            <div className={styles.stats}>

                {statList.map((e) => 
                    <SingleStat
                        key={e}
                        stat={e}
                        val={stats[e]}
                        modVal={getModifiers(stats[e])}
                        increase={increase}
                        decrease={decrease}
                        cost={costCalc(stats[e])}
                    />
                )}

                <button onClick={handleReady} className={styles.statsButton}>Finalize stats.</button>
            </div>
            <FinalizePopup ready={ready} setReady={setReady} handleFinalize={handleFinalize}/>
        </div>
    )
}