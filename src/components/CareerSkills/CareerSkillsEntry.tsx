import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import TermRewardEntry from "./TermRewardEntry";
import BasicTraining from "./BasicTraining";


export default function CareerSkillsEntry (props: {cleanup: () => void}) {
    const trained = useSelector((state: RootState) => state.skills.isTrained);
    return (
        <>
            {trained ? 
                <TermRewardEntry cleanup={props.cleanup} />
                :
                <BasicTraining cleanup={props.cleanup} />
            }
        </>
    )
}