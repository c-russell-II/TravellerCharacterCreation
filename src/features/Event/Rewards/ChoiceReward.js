import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addDeferredEvents, resolveEvent } from '../../Term/Utilities/TermSlice';
import SetSkillReward from './SetSkillReward';
import SkillIncreaseReward from './SkillIncreaseReward';
import StatChoiceReward from './StatChoiceReward';

const ChoiceReward = (props) => {
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();
    const [body, setBody] = useState();

    useEffect(() => {
        switch(event.result.choiceType) {
            case 'increaseAny':
                setBody(<SkillIncreaseReward/>);
                return;
            case 'increaseSkill':
                setBody(<SkillIncreaseReward/>);
                return;
            case 'multiple':
                const deferredArray = event.result.list?.map((e) => {return {type: 'reward', description: event.result.description, result: event.result[e]}})
                dispatch(addDeferredEvents(deferredArray));
                dispatch(resolveEvent())
                return;
            case 'setSkill':
                setBody(<SetSkillReward/>)
                return;
            case 'setAny':
                setBody(<SetSkillReward/>)
                return;
            case 'redirect':
                return;
            case 'stat':
                setBody(<StatChoiceReward/>)
                return;
            default:
                alert("Unhandled Reward Choice Event! " + event.result.choiceType)
                dispatch(resolveEvent())
                return;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {body}
        </>
    )
}

export default ChoiceReward;