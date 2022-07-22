import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../../TermSlice/TermSlice";

const BranchSkillCheck = (props) => {
    const job = useSelector(state => state.term.job);
    const [list, setList] = useState([]);
    const [specialties, setSpecialties] = useState({})
    const dispatch = useDispatch();

    useEffect(() => {
        switch (job) {
            case 'lineCrew':
                setList([{skill: 'Gunner'}, {skill: 'Electronics', specialty: 'sensors'}])
                setSpecialties({Gunner: null, Electronics: 'sensors'})
                break;
            case 'engineerGunner':
                setList([{skill: 'Mechanic'}, {skill: 'VaccSuit'}]);
                setSpecialties({Mechanic: null, VaccSuit: null})
                break;
            case 'flight':
                setList(['Pilot', 'Tactics'])
                setSpecialties({Pilot: ['small', 'spacecraft'], Tactics: 'naval'})
                break;
            default:
                break;
        }
        const newEvent = {
            type: 'check',
            description: "During a battle, defeat or victory depend on your actions.",
            checkType: 'choice',
            choiceList: list,
            specialtyList: specialties,
            pass: { type: 'reward',
                description: "Your actions are instrumental in winning the battle- you are honourably discharged, either due to official whitewashing, or embarassment.",
                result: {type: 'addBenefit', value: 1}
            },
            fail: { type: 'generic', description: "You are blamed for the disastrous loss of life, and damage to your vessel, and dishonourably discharged."}
        }
        dispatch(updateEvent(newEvent))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, job])
    return (
        <>
        </>
    )
}

export default BranchSkillCheck;