import React, {useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { changeByAmount, changeStat } from "../Character/StatsSlice";
import { SelectSpecialty } from "../Skills/selectSpecialty";
import setSkillHandler from "../Skills/SetSkillHandler";
import { setValue } from "../Skills/SkillsSlice";

const RankUpBonus = (props) => {
    const term = useSelector(state => state.term);
    const currentRank = useSelector(state => state.careers[term.job].rank)
    const stats = useSelector(state => state.stats);
    const skills = useSelector(state => state.skills);
    const dispatch = useDispatch();
    const [bonusBody, setBonusBody] = useState();
    const [isReady, setIsReady] = useState(false);
    const [specialtyDetails, setSpecialtyDetails] = useState(
        {
            active: false,
            skill: null,
            list: null,
            value: null,
        }
    )

    const passSpecialty = (choice) => {
        dispatch(setValue({skill: specialtyDetails.skill, specialty: choice, value: specialtyDetails.value}))
        setSpecialtyDetails({active: false, skill: null, list: null, value: null})
        return;
    }



const rankUpHandler = useCallback((bonus) => {
    const handleClick = (listObj, skill, value) => {
        const spec = listObj.filteredSpecialtyList[skill];
        if (typeof spec === 'string') {
            dispatch(setValue({skill: skill, specialty: spec, value: value}));
            return <p>Gained skill: {skill}({spec}) {bonus.value}</p>
        } else {
            setSpecialtyDetails({active: true, skill: skill, list: spec, value: value})
        }
    }

  switch (bonus.type) {
    case 'choice':
      const specObj = setSkillHandler(skills, bonus.choiceList, bonus.specialties, bonus.value);

      if (specObj.finalArray.length > 1) {
        return <><p>Choose a Skill:</p>{specObj.finalArray.map((e, i) => {
            return <button onClick={() => handleClick(specObj, e, bonus.value)} value={e} key={i}>{e}</button>;
          })}</>;
      } else if (specObj.finalArray.length === 1) {
        const lastSkill = specObj.finalArray[0];
        if (typeof specObj.filteredSpecialtyList[lastSkill] === 'string') {
          dispatch(setValue({
            skill: lastSkill,
            specialty: specObj.filteredSpecialtyList[lastSkill],
            value: bonus.value
          }));
          return <p>Gained Skill: {lastSkill}({specObj.filteredSpecialtyList[lastSkill]}) {bonus.value}</p>
        } else if (specObj.filteredSpecialtyList[lastSkill].length > 1) {
          setSpecialtyDetails({
            active: true,
            skill: lastSkill,
            list: specObj.filteredSpecialtyList[lastSkill],
            value: bonus.value
          });
          return;
        }
        return;
      }
      return;

    case 'skill':
      if (skills[bonus.skill].specialties) {
        if (typeof bonus.specialty === 'string') {
          if (bonus.specialty === 'any') {
            const filteredSpecialties = skills[bonus.skill].specialtiesList.filter(e => skills[bonus.skill][e] < bonus.value);

            if (filteredSpecialties.length > 1) {
              setSpecialtyDetails({
                active: true,
                skill: bonus.skill,
                list: filteredSpecialties,
                value: bonus.value
              });
              return;
            } else if (filteredSpecialties.length === 1) {
              dispatch(setValue({
                skill: bonus.skill,
                specialty: filteredSpecialties[0],
                value: bonus.value
              }));
              return <p>Gained Skill: {bonus.skill}({filteredSpecialties[0]}) {bonus.value}</p>
            }
            return;
          }

          dispatch(setValue({
            skill: bonus.skill,
            specialty: bonus.specialty,
            value: bonus.value
          }));
          return <p>Gained skill: {bonus.skill}({bonus.specialty}) {bonus.value}</p>
        }

        const filteredSpecialties = bonus.specialty.filter(e => skills[bonus.skill][e] < bonus.value);

        if (filteredSpecialties.length > 1) {
          setSpecialtyDetails({
            active: true,
            skill: bonus.skill,
            list: filteredSpecialties,
            value: bonus.value
          });
          return;
        } else if (filteredSpecialties.length === 1) {
          dispatch(setValue({
            skill: bonus.skill,
            specialty: filteredSpecialties[0],
            value: bonus.value
          }));
          return <p>Gained skill: {bonus.skill}({filteredSpecialties[0]}) {bonus.value}</p>
        }

        return;
      } else if (skills[bonus.skill].value < bonus.value) {
        dispatch(setValue({
          skill: bonus.skill,
          value: bonus.value,
          specialty: false
        }));
        return <p>Gained skill: {bonus.skill} {bonus.value}</p>
      }

      return;

    case 'setStat':
      if (bonus.value + stats.displayValues[bonus.stat] < bonus.threshold) {
        dispatch(changeStat({
          stat: bonus.stat,
          value: bonus.threshold
        }));
        return <p>{bonus.stat} set to {bonus.threshold}</p>
      }

      dispatch(changeByAmount({
        stat: bonus.stat,
        value: bonus.value
      }));
      return <p>{bonus.stat} increased by {bonus.value}</p>

    case 'increaseStat':
      dispatch(changeByAmount({
        stat: bonus.stat,
        value: bonus.value
      }));
      return <p>{bonus.stat} increased by {bonus.value}</p>;

    default:
      return;
  }
}, [dispatch, skills, stats.displayValues]);
  useEffect(() => {setIsReady(false)}, [stats.age])
   useEffect(() => {
      const bonus = term.jobDetails.ranks[currentRank].bonus
       setBonusBody(rankUpHandler(bonus));
       setIsReady(true);
   }, [currentRank, rankUpHandler, term.jobDetails.ranks])
    return (
        <Popup open={props.open} modal closeOnDocumentClick={false}>
            <h4>A recent promotion grants a bonus!</h4>
            <p>Confirm or choose your bonus.</p>
            {bonusBody}
            {specialtyDetails.active && <SelectSpecialty skill={specialtyDetails.skill} list={specialtyDetails.list} passSpecialty={passSpecialty}/>}
            {isReady && <button onClick={() => props.cleanup()}>close</button>}
        </Popup>
    )
}

export default RankUpBonus;