import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SetSkillReward from './SetSkillReward';
import SkillIncreaseReward from './SkillIncreaseReward';
import StatChoiceReward from './StatChoiceReward';

const ChoiceReward = (props) => {
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();
    const [body, setBody] = useState();

    useEffect(() => {
        switch(event.choiceType) {
            case 'increaseAny':
                setBody(<SkillIncreaseReward/>);
                return;
            case 'increaseSkill':
                setBody(<SkillIncreaseReward/>);
                return;
            case 'multiple':
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
                return;
        }
    }, [event.choiceType])

    return (
        <>
            {body}
        </>
    )
}

export default ChoiceReward;