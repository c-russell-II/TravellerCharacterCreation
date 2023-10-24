import { useDispatch } from "react-redux";
import { StatTermReward } from "../../../features/CareerDetails/CareerTypes/TermAndRankRewardTypes";
import { increaseStat } from "../../../features/Character/StatsSlice";
import { getReadableStat } from "../../../features/Career/careerHandler";


export default function StatUp (props: {reward: StatTermReward, cleanup: () => void}) {
    const stat = props.reward.stat;
    const dispatch = useDispatch();



    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(increaseStat(stat as keyof StatDisplayHolder));
        props.cleanup();
    }

    return (
        <>
            <p>Whether due to training, life experience, or career hardships, your {getReadableStat(stat)} statistic has improved. </p>
            <button onClick={handleClick}>Confirm</button>
        </>
    )
}

