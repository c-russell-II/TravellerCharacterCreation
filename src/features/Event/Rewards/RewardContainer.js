import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddBenefit from "./AddBenefit";
import AdvancementReward from "./AdvancementReward";
import BenefitBonusReward from "./BenefitBonusReward";
import PromotionReward from "./PromotionReward";
import QualificationReward from "./QualificationReward";
import StatReward from "./StatReward";

const RewardContainer = (props) => {
    const {isMultiple, type} = props;
    const event = useSelector(state => state.term.event);
    const [body, setBody] = useState();

    useEffect(() => {
        switch (type) {
            case 'choice':
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
                return;
            case 'contact':
                return;
            case 'ally':
                return;
            case 'enemy':
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