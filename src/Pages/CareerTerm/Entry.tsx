import React, { useState } from "react";
import jobObject from "../../features/CareerDetails/CareerDetails";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { skillCheck, roll } from "../../features/Career/careerHandler";
import { failedTerm, survivedTerm } from "../../features/TermSlice/TermSlice";
import { saveSurvivedTerm } from "../../features/Career/careerSlice";
import { RootState } from "../../app/store";
import Aging from "../../components/Aging/Aging";
import BeginAnagathicChoice from "../../components/Anagathics/BeginAnagathicChoice";
import StopAnagathicOption from "../../components/Anagathics/StopAnagthicOption";
import BasicTraining from "../../components/CareerSkills/BasicTraining";
import TermRewardEntry from "../../components/CareerSkills/TermRewardEntry";
import Accordian from "../../components/Accordian";

const CareerTerm = () => {
	const { career } = useParams();
	const stats = useSelector((state: RootState) => state.stats);
	const anagathics = useSelector(
		(state: RootState) => state.chara.anagathics
	);
	const trained = useSelector((state: RootState) => state.skills.isTrained);
	const [skillsPending, setSkillsPending] = useState(true);
	const [needAging, setNeedAging] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//TODO: Weird type safety problem on 
	const jobDetails = jobObject[career as string];
	const { survivalSkill, survivalDC } = jobDetails;

	//TODO: Split this up into ~~3-4 handlers! Maybe a whole other component!
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		let surviveRoll = skillCheck(stats[survivalSkill as keyof StatDisplayHolder]);
		if (anagathics.using) {
			const tempRoll = skillCheck(stats[survivalSkill as keyof StatDisplayHolder]);
			if (tempRoll < surviveRoll) {
				surviveRoll = tempRoll;
			}
		}
		const surviveCheck =
			surviveRoll === 2 ? false : survivalDC <= surviveRoll;
		const mishap = jobDetails.mishapList[roll()];
		const jobEvent = jobObject[career as string].eventList[roll() + roll() + 2];

		if (surviveCheck) {
			dispatch(
				survivedTerm({
					job: career as string,
					event: {...jobEvent},
					jobDetails: jobDetails,
				})
			);
			dispatch(saveSurvivedTerm({ job: career as string }));
			// dispatch(addEvent(jobEvent)); FIXME: need to figure out how i plan on saving events to character state, my current method aint workin
			navigate(`/term/${career}/survived`);
			return;
		} else {
			dispatch(
				failedTerm({
					job: career as string,
					event: mishap,
					jobDetails: jobDetails,
				})
			);
			navigate(`/term/${career}/failed`);
			// dispatch(addEvent(mishap)); FIXME: event adding to chara state (again)
			return;
		}
	};
	const skillCleanup = () => {
		setSkillsPending(false);
		if (!needAging) {
			setIsReady(true);
		}
	};

	const agingCleanup = () => {
		setNeedAging(false);
		if (!skillsPending) {
			setIsReady(true);
		}
	}

	return (
		<>
			<h2>Careers and Years</h2>
			<br />
			{skillsPending && (
				<>
					{trained ? (
						<TermRewardEntry cleanup={() => skillCleanup()} />
					) : (
						<BasicTraining cleanup={() => skillCleanup()} />
					)}
				</>
			)}
			{stats.age > 34 && needAging && (
				<Aging cleanup={() => agingCleanup()} />
			)}

			{isReady && (
				<>
					<p>
						Having gone over the effects that come with the passing
						of years, it's time to see how your career progresses
						over this term.
					</p>
					<button onClick={handleClick}>Onwards!</button>
				</>
			)}
			<Accordian title="Anagathics" tier={3} stopProp={true}>
				{!anagathics.using ? (
					<BeginAnagathicChoice />
				) : (
					<StopAnagathicOption />
				)}
			</Accordian>
		</>
	);
};
//TODO: Styling for "permanent" options that persist on the page - anagathics, aging (depending on context) etc

export default CareerTerm;
