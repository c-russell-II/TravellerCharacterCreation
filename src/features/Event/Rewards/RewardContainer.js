import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
    const {isMultiple, type} = props;
    const event = useSelector(state => state.term.event);
    const [body, setBody] = useState();

    useEffect(() => {
        switch (type) {
            case 'choice':
                setBody(<ChoiceReward/>)
                return;
            case 'multiple':
                return;
            case 'benefit':
                setBody(<BenefitBonusReward isMultiple={isMultiple}/>)
                return;
            case 'addBenefit':
                setBody(<AddBenefit isMultiple={isMultiple}/>)
                return;
            case 'promotion':
                setBody(<PromotionReward isMultiple={isMultiple}/>)
                return;
            case 'advancement':
                setBody(<AdvancementReward isMultiple={isMultiple}/>)
                return;
            case 'stat':
                setBody(<StatReward isMultiple={isMultiple}/>)
                return;
            case 'qualification':
                setBody(<QualificationReward isMultiple={isMultiple}/>)
                return;
            case 'rival':
                setBody(<Rival isMultiple={isMultiple}/>)
                return;
            case 'contact':
                setBody(<Contact isMultiple={isMultiple}/>)
                return;
            case 'ally':
                setBody(<Ally isMultiple={isMultiple}/>)
                return;
            case 'enemy':
                setBody(<Enemy isMultiple={isMultiple}/>)
                return;
            default:
                return;
        }
    }, [isMultiple, type])

    return (
        <>
            <p>{event?.description}</p>
            {body}
        </>
    )
}

export default RewardContainer;