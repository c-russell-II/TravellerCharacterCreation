import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import { AnyTermReward } from "../../features/CareerDetails/CareerTyping";
import React from "react";
import { AllSkills, basicTraining } from "../../features/Skills/SkillsSlice";


export default function BasicTraining (props: {cleanup: (arg0: boolean) => void}) {
    const { career } = useParams();
    const dispatch = useDispatch();
    const skills = useSelector((state: RootState) => state.careers.careerInfo[career as string].details.skills.service);
    if (!career) {
        //TODO: Error boundary!
        return <></>
    }

    const flattenChoice = (item: AnyTermReward) => {
        if (item.type === "choice") {
            return item.list;
        } else if (item.type === 'skill') {
            return item.skill;
        }
        return;
    }
    const skillList = skills.map(flattenChoice).flat();

    const handleReady = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(basicTraining(skillList as (keyof AllSkills)[]))
        props.cleanup(false);
    }
    return (
		<>
            <p>
                Having chosen a career, now you go through basic training,
                to prepare for your first term.
            </p>
            <button onClick={handleReady}>Move on</button>
        </>
	);
}