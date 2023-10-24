import { useDispatch } from "react-redux";
import { RankStatBonus } from "../../../../features/CareerDetails/CareerTypes/TermAndRankRewardTypes";
import { changeByAmount } from "../../../../features/Character/StatsSlice";
import { getReadableStat } from "../../../../features/Career/careerHandler";


export default function StatBonus (props: {bonus: RankStatBonus, cleanup: () => void}) {
    const dispatch = useDispatch();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(changeByAmount({stat: props.bonus.stat, value: props.bonus.value}))
        props.cleanup();
    }
    return (
        <>
            <p>When you were promoted, you find your {getReadableStat(props.bonus.stat)} increasing - due to new training, new responsibilities, or just a natural consequence of your new role.</p>
            <button onClick={handleClick}>Nice! </button>
        </>
    )
}