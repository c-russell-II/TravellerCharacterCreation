import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resolveEvent } from "../../Term/TermSlice";
import BetrayalEvent from "./BetrayalEvent";
import BranchSkillCheck from "./BranchSkillCheck";
import CloseHurt from "./CloseHurt";
import DrifterRandom from "./DrifterRandom";
import GainRoll from "./GainRoll";
import GambleEvent from "./GambleEvent";
import MultipleSpecs from "./MultipleSpecs";
import NewLawyerEvent from "./NewLawyerEvent";
import PsiEvent from "./PsiEvent";
import RiotEvent from "./RiotEvent";
import SpecialRedirectChoiceEvent from "./SpecialRedirectChoiceEvent";
import TableReward from "./TableReward";

const SpecialEventContainer = (props) => {
    const event = useSelector(state=> state.term.event);
    const [body, setBody] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        switch (event.specialType) {
            case 'gamble':
                setBody(<GambleEvent/>)
                return;
            case 'betrayal':
                setBody(<BetrayalEvent/>);
                return;
            case 'redirectChoice':
                setBody(<SpecialRedirectChoiceEvent/>);
                return;
            case 'closeHurt':
                setBody(<CloseHurt/>);
                return;
            case 'gainRoll':
                setBody(<GainRoll/>);
                return;
            case 'drifterRandom':
                setBody(<DrifterRandom/>);
                return;
            case 'branchSkillCheck':
                setBody(<BranchSkillCheck/>);
                return;
            case 'table':
                setBody(<TableReward/>);
                return;
            case 'multipleSpecs':
                setBody(<MultipleSpecs/>);
                return;
            case 'muster':
                navigate('/choose_career')
                return;
            case 'psi':
                setBody(<PsiEvent/>);
                return;
            case 'riot':
                setBody(<RiotEvent/>)
                return;
            case 'newLawyer':
                setBody(<NewLawyerEvent/>)
                return;
            default:
                return;
        }
    }, [event.specialType, navigate])

    return (
        <>
            {body}
        </>
    )
}

export default SpecialEventContainer;