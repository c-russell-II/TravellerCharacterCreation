import React, { useState } from "react";
import jobObject from "../../features/CareerDetails/CareerDetails";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { skillCheck, roll } from "../../features/Career/careerHandler";
import { failedTerm, survivedTerm } from "../../features/TermSlice/TermSlice";
import { saveSurvivedTerm } from "../../features/Career/careerSlice";
import { RootState } from "../../app/store";
import CareerSkillsEntry from "../../components/CareerSkills/CareerSkillsEntry";
import AgingAnagathicsEntry from "../../components/AgingAndAnagathics/AgingAnagathicsEntry";

const CareerTerm = () => {
	const { career } = useParams();
	const stats = useSelector((state: RootState) => state.stats);
	const anagathics = useSelector(
		(state: RootState) => state.chara.anagathics
	);
	const [skillsPending, setSkillsPending] = useState(true);
	const [needAging, setNeedAging] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//TODO: error boundary for params
	const jobDetails = jobObject[career as string];
	const { survivalSkill, survivalDC } = jobDetails;

	const handleSurvive = () => {
		dispatch(
			survivedTerm({
				job: career as string,
				event: { ...jobObject[career as string].eventList[roll(12)]},
				jobDetails: jobDetails,
			})
		);
		dispatch(saveSurvivedTerm({ job: career as string }));
		// dispatch(addEvent(jobEvent)); FIXME: need to figure out how i plan on saving events to character state, my current method aint workin
		navigate(`/term/${career}/survived`);
		return;
	}

	const handleFail = () => {
		dispatch(
			failedTerm({
				job: career as string,
				event: jobDetails.mishapList[roll() - 1],
				jobDetails: jobDetails,
			})
		);
		navigate(`/term/${career}/failed`);
		// dispatch(addEvent(mishap)); FIXME: event adding to chara state (again)
		return;
	}

	const handleSurvivalCheck = () => {
		let surviveRoll = skillCheck(
			stats[survivalSkill as keyof StatDisplayHolder]
		);
		if (anagathics.using) {
			const tempRoll = skillCheck(
				stats[survivalSkill as keyof StatDisplayHolder]
			);
			if (tempRoll < surviveRoll) {
				surviveRoll = tempRoll;
			}
		}
		return surviveRoll === 2 ? false : survivalDC <= surviveRoll;
	}

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (handleSurvivalCheck()) {
			handleSurvive();
			return;
		}
		handleFail();
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
	};

	return (
		<>
			<h2>Careers and Years</h2>
			{skillsPending && <CareerSkillsEntry cleanup={skillCleanup} />}
			{needAging && <AgingAnagathicsEntry cleanup={agingCleanup} />}
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
		</>
	);
};
//TODO: Styling for "permanent" options that persist on the page - anagathics, aging (depending on context) etc

export default CareerTerm;
