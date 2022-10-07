import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import {changeStat} from '../../Character/StatsSlice';
import { addBenefit } from '../../Character/charaSlice';
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css';
import FinalizePopup from "./FinalizePopup";
import NameChoice from "../NameChoice/NameChoice";
import StatChoice from "../ChooseStats/StatChoice";

export const CharacterCreation = (props) => {
    const [points, setPoints] = useState(12);
    const [ready, setReady] = useState(false);
    const [stats, setStats] = useState({str:7, dex:7, end:7, int:7, edu:7, soc:7})
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleFinalize = () => {
        Object.keys(stats).forEach((e) => {dispatch(changeStat({stat: e, value: stats[e]}));})
        if (points > 0) {
			dispatch(addBenefit({ type: "cash", amount: points * 2000 }));
		}
		navigate("/creation/background_skills");
    }
    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Select your Stats and Name</h1><hr className={styles.line}/>
            
            <p>Decide your natural aptitudes and abilities, that will carry you into whatever the future has in store.</p>
            
            <h2 className={styles.subTitle}>Name:</h2>
            
            <NameChoice/>

            <StatChoice
                stats={stats}
                setStats={setStats}
                points={points}
                setPoints={setPoints}
                setReady={setReady}
            />

            <FinalizePopup ready={ready} setReady={setReady} handleFinalize={handleFinalize}/>
        </div>
    )
}