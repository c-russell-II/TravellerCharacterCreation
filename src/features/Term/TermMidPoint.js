import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { survivedTerm, advancedTerm, failedTerm } from '../Career/careerSlice';
import { Term } from "./termRender";
import { Event } from "../Event/event";
import { setValue } from "../Skills/SkillsSlice";
import { SelectSpecialty } from "../Skills/selectSpecialty";
import { changeByAmount, changeStat } from "../Character/StatsSlice";
import Popup from "reactjs-popup";

export const TermMidPoint = (props) => {
    const {stats, currentTerm, skills, job} = props;
    const age = stats.age;
    const dispatch = useDispatch();
    const [chooseSkill, setChooseSkill] = useState({open: false, value: 0, list: [], rawList: [], specialties: []});
    const [needSpecialty, setNeedSpecialty] = useState(false);
    const [specialtyDetails, setSpecialtyDetails] = useState(
        {
            skill: null,
            list: null,
            value: null,
            passSpecialty: (choice) => {
                dispatch(setValue({skill: specialtyDetails.skill, specialty: choice, value: specialtyDetails.value}));
                setNeedSpecialty(false);
            }
        })

    const specialtyHandler = (bonus, relevantSkill) => {
        if (bonus.specialty === 'any') {
            const editedList = relevantSkill.specialtiesList.map((e) => relevantSkill[e] < bonus.value);
            if (editedList.length < 1) {
                return;
            } 
            if (editedList.length > 1) {
                setSpecialtyDetails(prev => {return {...prev, skill: bonus.skill, list: editedList, value: bonus.value}})
                setNeedSpecialty(true);
            }
            if (editedList.length === 1) {
                dispatch(setValue({skill: bonus.skill, value: bonus.value, specialty: editedList[0]}))
            }
            return;
        } else if (bonus.specialty === 'list') {
            const editedList = bonus.specialtiesList.map((e) => relevantSkill[e] < bonus.value);
            if (editedList.length > 1) {
                setSpecialtyDetails(prev => {return {...prev, skill: bonus.skill, list: editedList, value: bonus.value}})
                setNeedSpecialty(true);
                return;
            }
            if (editedList.length === 1) {
                dispatch(setValue({skill: bonus.skill, value: bonus.value, specialty: editedList[0]}))
            }
            return;
        }
        if (relevantSkill[bonus.specialty] < bonus.value) {
            dispatch(setValue({skill: bonus.skill, specialty: bonus.specialty, value: bonus.value}))
        }
        return;
    }

    const choiceHandler = (bonus) => {
        if (bonus.specialty === 'both') {
            if (skills[bonus.choiceList[0]][bonus.specialtiesList[0]] > bonus.value && skills[bonus.choiceList[1]][bonus.specialtiesList[1]] > bonus.value) {
                return;
            } else if (skills[bonus.choiceList[0]][bonus.specialtiesList[0]] > bonus.value) {
                dispatch(setValue({skill: bonus.choiceList[1], value: bonus.value, specialty: [bonus.specialtiesList[1]]}))
                return;
            } else if (skills[bonus.choiceList[1]][bonus.specialtiesList[1]]) {
                dispatch(setValue({skill: bonus.choiceList[0], value: bonus.value, specialty: [bonus.specialtiesList[0]]}))
                return;
            }
            setChooseSkill({open: true, value: bonus.value, list: bonus.choiceList.map((e, i) => {return `${e} specialty: ${bonus.specialtiesList[i]}`}), rawList: bonus.choiceList, specialties: bonus.specialtiesList})
        } else if (bonus.specialty) {
            if (skills[bonus.choiceList[1]] > bonus.value) {
                specialtyHandler(bonus, skills[bonus.choiceList[0]])
                return;
            }
            setChooseSkill({open:true, value: bonus.value, list: [`${bonus.choiceList[0]} specialty: ${bonus.specialty}`, bonus.choiceList[1]], rawList: bonus.choiceList, specialties: [bonus.specialty]})
            return;
        }
        if (skills[bonus.choiceList[0]].value < bonus.value && skills[bonus.choiceList[1]].value < bonus.value) {
            setChooseSkill({open: true, value: bonus.value, list: bonus.choiceList, rawList: bonus.choiceList, specialties: []})
            return;
        } else if (skills[bonus.choiceList[0]].value < bonus.value) {
            dispatch(setValue({skill: bonus.choiceList[0], value: bonus.value}))
            return;
        } else if (skills[bonus.choiceList[1]].value < bonus.value) {
            dispatch(setValue({skill: bonus.choiceList[1], value: bonus.value}))
            return;
        }
        return;
    }
    const rankUpHandler = (bonus) => {
        if (bonus.type === 'skill') {
            if (skills[bonus.skill].specialties) {
                specialtyHandler(bonus, skills[bonus.skill]);
                return;
            }
            if (skills[bonus.skill.value] < bonus.value) {
                dispatch(setValue({skill: bonus.skill, value: bonus.value}))
                return;
            }
        }
        if (bonus.type === 'stat') {
            if (bonus.value === 'conditional') {
                if (stats[bonus.stat] + bonus.value < bonus.threshold) {
                    dispatch(changeStat({stat: bonus.stat, value: bonus.threshold}));
                    return;
                }
            }
            dispatch(changeByAmount({stat: bonus.stat, value: bonus.value}))
            return;
        };
        if (bonus.type === 'choice') {
            choiceHandler(bonus);
            return;
        }
        return;
    }

    const clickHandler = (details, index) => {
        dispatch(setValue({skill: details.rawList[index], value: details.value, specialty: details.specialtyList[index]}))
        setChooseSkill({open: false, value: 0, list: [], rawList: [], specialties: []});
        return;
    }

    useEffect(() => {
        const jobAction = {job: currentTerm.job.id, event: currentTerm.newEvent};

        if (currentTerm.survive && currentTerm.advance) {
            if (currentTerm.jobDetails.ranks[job.rank].bonus) {
                rankUpHandler(currentTerm.jobDetails.ranks[job.rank].bonus);
            }
            dispatch(advancedTerm(jobAction))
        } else if (currentTerm.survive) {
            dispatch(survivedTerm(jobAction));
        } else {
            dispatch(failedTerm(jobAction))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, [age])
    return (
        <div>
            <Term currentTerm={currentTerm} job={job} />
            {needSpecialty && <SelectSpecialty {...specialtyDetails}/>}
            <Popup open={chooseSkill.open} modal><><h4>Choose a skill</h4>{chooseSkill.list.map((e, i) => <button onClick={() => clickHandler(chooseSkill, i)}>{e}</button>)}</></Popup>
            <Event career={currentTerm.job.id} event={currentTerm.newEvent} stats={stats} skills={skills} isMishap={!currentTerm.survive}/>
        </div>
    )
}