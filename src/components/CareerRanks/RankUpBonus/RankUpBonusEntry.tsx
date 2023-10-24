import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { CareerInfo } from "../../../features/Career/careerSlice";
import RankUpBonusSwitchboard from "./RankUpBonusSwitchboard";
import { AnyRankBonus } from "../../../features/CareerDetails/CareerTypes/TermAndRankRewardTypes";


export default function RankUpBonusEntry () {
    const [hasBonus, setHasBonus] = useState(false);
    const jobState = useSelector((state: RootState) => {
        const currentCareer = state.careers.currentJob ? state.careers.currentJob : ''
        return state.careers.careerInfo[currentCareer]
    });

    const getCurrentRankBonus = (job: CareerInfo) => {
        const rank = job.rank;
        if (job.details.comRanks && job.commissioned) {
            return job.details.comRanks[rank].bonus;
        }
        return job.details.ranks[rank].bonus;
    }
    useEffect(() => {
        if (!jobState?.rank) {
            console.error("no career/rank in career state slice! failed to check for rank bonus.");
            return;
        }
        const currBonus = getCurrentRankBonus(jobState);
        if (currBonus) {
            setHasBonus(true);
        }
    }, [jobState.rank]);

    const cleanup = () => {
        setHasBonus(false);
    }
    return (
        <>
        {hasBonus &&
            <>
                <p>Your new rank comes with some form of bonus - either being upskilled or receiving more foundational training...</p>
                <RankUpBonusSwitchboard bonus={getCurrentRankBonus(jobState) as AnyRankBonus} cleanup={cleanup} />
            </>
        }
        </>
    )
}