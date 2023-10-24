import React, {useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { changeByAmount, changeStat } from "../Character/StatsSlice";
import { SelectSpecialty } from "../../components/Skills/SelectSpecialty"
import setSkillHandler from "../Skills/SetSkillHandler";
import { AllSkills, setValue } from "../Skills/SkillsSlice";
import { RootState } from "../../app/store";

//FIXME: NO COMPoNent shoudl be TWO HUNDRED LINES OF MISCELLANEOUS HANDLERS FUCK THIS NOISE
const RankUpBonus = (props: {open: boolean, cleanup: () => void}) => {
  const term = useSelector((state: RootState) => state.term);
  const currentRank = useSelector((state: RootState) => state.careers.careerInfo[term.job].rank)
  const commission = useSelector((state: RootState) => state.careers.careerInfo[term.job].commissioned)
  const stats = useSelector((state: RootState) => state.stats);
  const skills = useSelector((state: RootState) => state.skills);
  const dispatch = useDispatch();
  const [bonusBody, setBonusBody] = useState(<></>);
  const [isReady, setIsReady] = useState(false);
  const [specialtyActive, setSpecialtyActive] = useState(false);
  const [specialtySkill, setSpecialtySkill] = useState<string>('');
  const [specialtyList, setSpecialtyList] = useState<string[]>([]);
  const [specialtyValue, setSpecialtyValue] = useState(0);

  const passSpecialty = (choice: string) => {
      dispatch(setValue({skill: specialtySkill as keyof AllSkills, specialty: choice, value: specialtyValue}))
      setSpecialtyActive(false);
      setSpecialtySkill('');
      setSpecialtyList([]);
      setSpecialtyValue(0);
      setBonusBody(<p>Gained skill: {specialtySkill}({choice}) at rank {specialtyValue}</p>)
      return;
  }

  const singleSkillHandler = useCallback((specObj, bonus) => {
    const lastSkill = specObj.allSkills[0];

    if (typeof specObj.filteredSpecialtyList[lastSkill] === 'string') {
      dispatch(setValue({
        skill: lastSkill,
        specialty: specObj.filteredSpecialtyList[lastSkill],
        value: bonus.value
      }));
      return <p>Gained Skill: {lastSkill}({specObj.filteredSpecialtyList[lastSkill]}) {bonus.value}</p>;
    }

    setSpecialtyActive(true);
    setSpecialtySkill(lastSkill);
    setSpecialtyList(specObj.filteredSpecialtyList[lastSkill]);
    setSpecialtyValue(bonus.value);
    return;
  }, [dispatch]);

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

        if (specObj.allSkills.length === 1) {
          singleSkillHandler(specObj, bonus);
        }
        return (
          <>
            <p>Choose a Skill:</p>
            {specObj.allSkills.map((e, i) => {
              return <button onClick={() => handleClick(specObj, e, bonus.value)} value={e} key={i}>{e}</button>;
            })}
          </>
        );

      case 'skill':
        if (skills[bonus.skill].specialties) {
          if (!bonus.specialty) {
            const filteredSpecialties = skills[bonus.skill].specialtiesList.filter(e => skills[bonus.skill][e] <= bonus.value);

              if (filteredSpecialties.length === 1) {
                dispatch(setValue({
                  skill: bonus.skill,
                  specialty: filteredSpecialties[0],
                  value: bonus.value
                }));

                return <p>Gained Skill: {bonus.skill}({filteredSpecialties[0]}) {bonus.value}</p>
              }

              if (filteredSpecialties.length > 1) {
                setSpecialtyDetails({
                  active: true,
                  skill: bonus.skill,
                  list: filteredSpecialties,
                  value: bonus.value
                });
                return;
              }
          }
          if (typeof bonus.specialty === 'string') {

            dispatch(setValue({
              skill: bonus.skill,
              specialty: bonus.specialty,
              value: bonus.value
            }));
            return <p>Gained skill: {bonus.skill}({bonus.specialty}) {bonus.value}</p>
          }

          const filteredSpecialties = bonus.specialty.filter(e => skills[bonus.skill][e] <= bonus.value);

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
        } else if (skills[bonus.skill].value <= bonus.value) {
          dispatch(setValue({
            skill: bonus.skill,
            value: bonus.value,
            specialty: false
          }));
          return <p>Gained skill: {bonus.skill} {bonus.value}</p>
        }

        return <p>What you learn at the training for your new rank is nothing you didn't already know.</p>;

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
        return <p>Unhandled Rank-up bonus!</p>
    }
  }, [dispatch, singleSkillHandler, skills, stats.displayValues]);
  useEffect(() => {setIsReady(false)}, [stats.age])
   useEffect(() => {
      const bonus = commission ? term.jobDetails.comRanks[currentRank].bonus : term.jobDetails.ranks[currentRank].bonus
       setBonusBody(rankUpHandler(bonus));
       setIsReady(true);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [stats.age])
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