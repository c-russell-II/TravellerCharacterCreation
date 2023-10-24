import { useState } from "react";
import DecreaseAllPhys from "./DecreaseAllPhys";
import { useDispatch } from "react-redux";
import { decreaseStat } from "../../../features/Character/StatsSlice";


export default function PhysAndMental (props: {cleanup: () => void}) {
    const [isMentalReady, setIsMentalReady] = useState(false);
    const [isPhysReady, setIsPhysReady] = useState(false);
    const dispatch = useDispatch();

    const handleCleanup = () => {
        setIsPhysReady(true);
        if (isMentalReady) {
            props.cleanup();
        }
    }
    const mentalCleanup = () => {
        setIsMentalReady(true);
        if (isPhysReady) {
            props.cleanup();
        }
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const choice = event.currentTarget.value;
        if (choice === 'int') {
            dispatch(decreaseStat('int'))
            mentalCleanup()
        }
        if (choice === 'edu') {
            dispatch(decreaseStat('edu'))
            mentalCleanup();
        }
        if (choice === 'soc') {
            dispatch(decreaseStat('soc'))
            mentalCleanup();
        }
    }
    return (
        <>
            {!isMentalReady && 
                <form name="mentalDec" onSubmit={handleSubmit}>
                    <label htmlFor="int">Intellect</label>
                    <input id="int" name="mentalDec" value="int" type="radio"/>
                    <label htmlFor="edu">Education</label>
                    <input id="edu" name="mentalDec" value="edu" type="radio"/>
                    <label htmlFor="soc">Social Standing</label>
                    <input id="soc" name="mentalDec" value="soc" type="radio"/>
                    <input type="submit" name="mentalDec"/>
                </form>
            }
            {!isPhysReady && <DecreaseAllPhys cleanup={handleCleanup} value={2}/>}
        </>
    )
}