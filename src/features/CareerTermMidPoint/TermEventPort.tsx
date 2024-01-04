import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import jobObject from "../CareerDetails/CareerDetails";
import { skillCheck } from "../Career/careerHandler";
import { promotion } from "../Career/careerSlice";
import EventContainer from "../../components/Event/EventContainer";
import CommissionHandler from "../ComissionHandler/CommissionHandler";
import { RootState } from "../../app/store";

export const TermEventPort = () => {
	const stats = useSelector((state: RootState) => state.stats);
	const term = useSelector((state: RootState) => state.term);
	const career = useParams().career as string;
	const jobDetails = jobObject[career];
	const currentCareerState = useSelector(
		(state: RootState) => state.careers.careerInfo[career]
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [commission, setCommission] = useState(false);

	const isMilitary =
		jobObject[career].parent === "army" ||
		jobObject[career].parent === "navy" ||
		jobObject[career].parent === "marine";
	const canCommission =
		isMilitary &&
		!currentCareerState.commissioned &&
		(currentCareerState.terms === 1 || stats.soc >= 9);

	useEffect(() => {
		setCommission(canCommission);
	}, [canCommission]);

	const cleanup = () => setCommission(false);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const result =
			jobDetails.advancementDC <=
			skillCheck(
				stats[jobDetails.advancementSkill as keyof StatDisplayHolder]
			) +
				term.advancementBonus;
		if (result) {
			dispatch(promotion());
			navigate(`/term/${career}/advanced`);
			return;
		}
		navigate(`/term/${career}/passed`);
	};

	    const checkForEvent = () => {
			if (!term.event) {
				return false;
			}
			if (term.event.resolved) {
				return false;
			}
			return true;
		};

	return (
		<>
			<h2>You survived- but is that all?</h2>
			{checkForEvent() ? (
				<EventContainer key={Math.random()} />
			) : (
				<>
					<p>And after that, a promotion ... ?</p>
					<button onClick={handleClick}>Try for it</button>
					{commission && <CommissionHandler cleanup={cleanup} />}
				</>
			)}
		</>
	);
};
