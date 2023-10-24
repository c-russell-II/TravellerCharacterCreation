import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { roll } from "../../features/Career/careerHandler";
import { useEffect, useState } from "react";
import NoAgingEffect from "./AgingSteps/NoAgingEffect";
import MinorPhysDecrease from "./AgingSteps/MinorPhysDecrease";
import DecreaseAllPhys from "./AgingSteps/DecreaseAllPhys";
import MultiStepContainer from "./AgingSteps/MultiStepContainer";
import PhysAndMental from "./AgingSteps/PhysAndMental";


export default function Aging (props: {cleanup: () => void}) {
    const [currentRoll, setCurrentRoll] = useState(0);
    const age = useSelector((state: RootState) => state.stats.age)
    const anagathics = useSelector((state: RootState) => state.chara.anagathics);
    //number of terms (4yr cycles) since character creation started
    const getAgeModifier = () => (age - 18) / 4;
    //2d6 minus the number of terms plus anagathics terms. Rolls don't start until 34, at which point minimum roll is a -2.
    const getRoll = () => (roll() + roll()) - (getAgeModifier() + anagathics.terms) ;

    useEffect(() => {
        setCurrentRoll(getRoll());
    }, [age, anagathics.using, anagathics.terms])

    switch(currentRoll) {
        case -6:
            return <PhysAndMental cleanup={props.cleanup} />
        case -5:
            return <DecreaseAllPhys cleanup={props.cleanup} value={2}/>
        case -4:
            return (
                <MultiStepContainer cleanup={props.cleanup} bad={true}/>
            )
        case -3:
            //TODO: cleanup handlers for less cut-and-dry cases, like the minorphysdecrease stuff!
            return (
                <MultiStepContainer cleanup={props.cleanup} bad={false}/>
            );
        case -2:
                return <DecreaseAllPhys cleanup={props.cleanup} value={1} />
        case -1:
            return <MinorPhysDecrease num={2} cleanup={props.cleanup} value={1}/>
        case 0:
            return <MinorPhysDecrease num={1} cleanup={props.cleanup} value={1}/>
        default:
            return <NoAgingEffect cleanup={props.cleanup}/>
    }
}