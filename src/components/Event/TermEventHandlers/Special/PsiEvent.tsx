import React from "react";
import { useDispatch } from "react-redux";
import { skillCheck } from "../../../../features/Career/careerHandler";
import { addPsi } from "../../../../features/Character/StatsSlice";

const PsiEvent = () => {
	const dispatch = useDispatch();

	// const psi = skillCheck();
	// dispatch(addPsi(psi))
	//TODO: do some updating for saving that the psi event happened at all, and a "reroll event" button as well!
	//TODO: add real psi checking and careers much, much later ; -;
	return (
		<>
			<p>
				You have had a psionic awakening! Please check with your GM if
				this is allowed in your game!
			</p>
			<p>If so, handle it with them personally!</p>
		</>
	);
};

export default PsiEvent;
