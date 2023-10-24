import { useState, useEffect } from "react";
import { RankSetStatBonus } from "../../../../features/CareerDetails/CareerTypes/TermAndRankRewardTypes"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { getReadableStat } from "../../../../features/Career/careerHandler";
import { changeByAmount, changeStat } from "../../../../features/Character/StatsSlice";


export default function SetStatBonus (props: {cleanup: () => void, bonus: RankSetStatBonus}) {
    const {stat, threshold, value} = props.bonus;
    const stats = useSelector((state: RootState) => state.stats);
    const [isThreshold, setIsThreshold] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const statValue = stats.displayValues[stat as keyof StatDisplayHolder]
        if (!statValue) {
            console.error("Why is this undefined? In set stat bonus in rankup bonus handler. Logging state to console.")
            console.table(stats);
            return;
        }
        if (statValue < threshold) {
            setIsThreshold(true);
        } else {
            setIsThreshold(false);
        }
    }, [stat, threshold])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (isThreshold) {
            dispatch(changeStat({stat: stat as keyof StatDisplayHolder, value: threshold}))
            props.cleanup();
            return;
        }
        dispatch(changeByAmount({stat: stat as keyof StatDisplayHolder, value}));
        props.cleanup();
        return;
    }
    
    return (
        <>
            {isThreshold ? 
                <>
                    <p>Your new rank comes with a specific requirement that you're automatically raised to meet - your {getReadableStat(stat)} is raised to {threshold}as a consequence.</p>
                    <button onClick={handleClick}>Confirm</button>
                </>
             :
                <>
                    <p>Your new rank comes with a specific requirement that you already meet - the training or benefits, however, still raise your {getReadableStat(stat)} by {value}.</p>
                    <button onClick={handleClick}>Confirm</button>
                </>
             }
        </>
    )
}