import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { AnyTermReward, CareerSkillTables } from "../../features/CareerDetails/CareerTyping";
import SingleTable from "./TermRewardHandlers/SingleTable";
import SkillUp from "./TermRewardHandlers/SkillUp";
import StatUp from "./TermRewardHandlers/StatUp";
import TermRewardChoice from "./TermRewardHandlers/TermRewardChoice";


export default function TermRewardEntry (props: {cleanup: () => void}) {
    const { career } = useParams();
    const [skillChosen, setSkillChosen] = useState(false);
    const [reward, setReward] = useState<AnyTermReward>();
    const skills = useSelector((state: RootState) => state.careers.careerInfo[career as string].details.skills);
    
    //Iterate over the career skills object and return an array of tuples, with the keys at index 0 for rendering, and the table at index 1 to pass to SingleTable
    const getTableArray = () => {
        const final: [string, AnyTermReward[]][] = [];
        for (const key in skills) {
            //Check if it's a career-specialty-specific table, because those are indexed by the name of the specialty under the key "specialty"
            if (key === 'specialties') {
                //Iterate over those, and push the tuple into the final array
                for (const specialty in skills.specialties) {
                    final.push([specialty, skills.specialties[specialty as keyof CareerSkillTables]])
                }
            } else {
                //If it isn't specialties, then at that key you'll directly have access to the table, so it can go in the tuple with its key and get put into the return array.
                final.push([key, skills[key as keyof CareerSkillTables] as AnyTermReward[]])
            }
        }
        return final;
    }

    const cleanupReward = () => {
        props.cleanup();
    }
    //Handler for selecting which component the rolled reward gets passed to
    const getNext = () => {
        if (!reward) {
            //TODO: this might need an error boundary? Check the rendering methods to see if there's a cleaner way to do type narrowing here!
            return <p> no reward selected! not sure how you got here, and this may disappear on its own...</p>
        }
        switch (reward.type) {
            case 'skill':
                return <SkillUp reward={reward} cleanup={cleanupReward}/>
            case 'choice':
                return <TermRewardChoice reward={reward} cleanup={cleanupReward}/>
            case 'stat':
                return <StatUp reward={reward} cleanup={cleanupReward}/>
            default:
                console.table(reward);
                console.log('Fell through to default in switch statement selecting "next" in term reward handler? Object above was passed term reward.')
                return <p>This shouldn't be here? Check console.</p>
        }
    }
    
    //Handler passed as prop to single tables, for passing back the reward rolled for on that table!
    const handleCleanup = (reward: AnyTermReward) => {
        setReward(reward);
        setSkillChosen(true);
    }
    return (
		<>
			{skillChosen ? getNext() :
            <>
				{getTableArray().map(
					(e: [string, AnyTermReward[]], i: number) => {
						return (
							<SingleTable
								key={`single table at index ${i}`}
								table={e[1]}
								title={e[0]}
								cleanup={handleCleanup}
							/>
						);
					}
				)}
			</>}
		</>
	);
}