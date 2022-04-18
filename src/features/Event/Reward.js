import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from '../Character/charaSlice';
import { advancementBonus, resolveEvent } from "../Term/TermSlice";
import { addAdvancementBonus, addBenefitBonus, addContact } from "../Character/miscBonusSlice";
import { increaseStat } from "../Character/StatsSlice";
import { promotion } from "../Career/careerSlice";
import { roll } from "../Career/careerHandler";
import { useParams } from "react-router-dom";
import RewardChoice from "./RewardChoice";
import { SelectSpecialty } from "../Skills/selectSpecialty";
import setSkillHandler from "../Skills/SetSkillHandler";
import { genericIncrease, setValue } from "../Skills/SkillsSlice";

export const Reward = (props) => {
    const career = useParams();
    const event = useSelector(state => state.term.event);
    const age = useSelector (state => state.stats.age);
    const skills = useSelector(state=> state.skills);
    const [isReady, setIsReady] = useState(true);
    const {needSpecialty, setNeedSpecialty} = useState({active: false, skill: null})
    const [eventBody, setEventBody] = useState();
    const dispatch = useDispatch();


    useEffect(() => { setIsReady(true); }, []);

    const cleanup = () => {setIsReady(true)}


    const rewardHelper = useCallback(type => {
        const passIncreaseSpecialty = (choice) => {
            dispatch(genericIncrease({skill:needSpecialty.skill, specialty:choice}));
            cleanup();
        }

        const passSetSpecialty = (choice) => {
            dispatch(setValue({skill: needSpecialty.skill, specialty: choice}));
            cleanup();
        }
  switch (type) {
    case 'benefit':
      dispatch(addBenefitBonus({
        career: career,
        value: event.result.value
      }));
      return;

    case 'setSkill':
      const specialty = typeof event.result.specialty === 'string' ? event.result.specialty === 'any' ? skills[event.result.skill].specialtyList : [event.result.specialty] : event.result.specialty;
      const skillObj = setSkillHandler(skills, [event.result.skill], specialty, event.result.value);

      if (typeof skillObj.filteredSpecialtyList[event.result.skill] === 'string') {
        dispatch(setValue({
          skill: event.result.skill,
          specialty: skillObj.filteredSpecialtyList[event.result.skill],
          value: event.result.value
        }));
        return;
      } else {
        setIsReady(false);
        setNeedSpecialty({
          skill: event.result.skill
        });
        return <>{!isReady && <SelectSpecialty skill={event.result.skill} list={skillObj.filteredSpecialtyList[event.result.skill]} passSpecialty={passSetSpecialty} />}</>;
      }

    case 'increaseSkill':
      if (skills[event.result.skill].specialties) {
        if (typeof event.result.specialty !== 'string' || event.result.specialty === 'any') {
          setIsReady(false);
          setNeedSpecialty({
            skill: event.result.skill
          });

          if (Array.isArray(event.result.specialty)) {
            return <>{!isReady && <SelectSpecialty skill={event.result.skill} list={event.result.specialty} passSpecialty={passIncreaseSpecialty} />}</>;
          } else {
            return <>{!isReady && <SelectSpecialty skill={event.result.skill} list={skills[event.result.skill].specialtyList} passSpecialty={passIncreaseSpecialty} />}</>;
          }
        }

        dispatch(genericIncrease({
          skill: event.result.skill,
          specialty: event.result.specialty
        }));
        return;
      }

      dispatch(genericIncrease({
        skill: event.result.skill
      }));
      return;

    case 'stat':
      dispatch(increaseStat(event.result.stat));
      return;

    case 'contacts':
      if (event.result.value === 'roll') {
        dispatch(addContact({
          career: career,
          value: roll(event.result.roll)
        }));
        return;
      } else {
        dispatch(addContact({
          career: career,
          value: event.result.value
        }));
        return;
      }

    case 'advancement':
      dispatch(advancementBonus(event.result.value));
      return;

    case 'choice':
      setIsReady(false);
      return <>{!isReady && <RewardChoice cleanup={cleanup} />}</>;

    case 'promotion':
      dispatch(promotion());
      return;

    case 'redirect':
      return;
    //need a redirect handler!

    default:
      return;
  }
}, [age, career, dispatch, event, isReady, needSpecialty, setNeedSpecialty, skills]);
    useEffect(() => {
        setEventBody(rewardHelper(event.type))
    }, [event.type, rewardHelper])
    
    return (
        <>
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{event.description}</p>
            {eventBody}
            {isReady && <button onClick={() => { props.cleanup(); dispatch(addEvent(event)); dispatch(resolveEvent());}}>Onwards!</button>}
        </>
    );
};
