import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { skillCheck } from "../../Career/careerHandler";
import { changeParole } from "../../Prison/prisonSlice";
import { addDeferredEvents, resolveEvent } from "../../Term/TermSlice";
import AddBenefit from "./AddBenefit";
import AdvancementReward from "./AdvancementReward";
import Ally from "./Ally";
import BenefitBonusReward from "./BenefitBonusReward";
import ChoiceReward from "./ChoiceReward";
import Contact from "./Contact";
import Enemy from "./Enemy";
import PromotionReward from "./PromotionReward";
import QualificationReward from "./QualificationReward";
import Rival from "./Rival";
import StatReward from "./StatReward";

const RewardContainer = (props) => {
    const event = useSelector(state => state.term.event);
    const [body, setBody] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        switch (event.result.type) {
            case 'choice':
                setBody(<ChoiceReward/>)
                return;
            case 'multiple':
                dispatch(addDeferredEvents(event.result.list.map((e) => {return {type: 'reward', description: '', result: event.result[e]}})));
                dispatch(resolveEvent());
                return;
            case 'benefit':
                setBody(<BenefitBonusReward />)
                return;
            case 'addBenefit':
                setBody(<AddBenefit  />)
                return;
            case 'promotion':
                setBody(<PromotionReward />)
                return;
            case 'advancement':
                setBody(<AdvancementReward />)
                return;
            case 'stat':
                setBody(<StatReward />)
                return;
            case 'qualification':
                setBody(<QualificationReward />)
                return;
            case 'rival':
                setBody(<Rival />)
                return;
            case 'contact':
                setBody(<Contact />)
                return;
            case 'ally':
                setBody(<Ally />)
                return;
            case 'enemy':
                setBody(<Enemy />)
                return;
            case 'parole':
                if (typeof event.result.value === 'string') {
                    dispatch(changeParole(skillCheck()))
                    dispatch(resolveEvent())
                    return;
                }
                dispatch(changeParole(event.result.value));
                dispatch(resolveEvent())
                return;
            default:
                alert("Unhandled Reward Event! " + event.result.type)
                dispatch(resolveEvent())
                return;
        }
    }, [event, dispatch])

    return (
        <>
            <p>{event?.description}</p>
            {body}
        </>
    )
}

export default RewardContainer;