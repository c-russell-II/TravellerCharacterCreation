import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { JobSkills } from "../../Skills/JobSkills";
import { resolveEvent } from "../../../../features/TermSlice/TermSlice";
import { RootState } from "../../../../app/store";

const TableReward = () => {
	const term = useSelector((state: RootState) => state.term);
	const dispatch = useDispatch();
	//FIXME: CURRENTLY COMPLETELY NON-FUNCTIONAL, NEED TO FIND ORIGINAL EVENT AND RENDER APPROPRIATELY!
	return (
		<>
			<p>{term.event.description}</p>
			<p>Select which variety of skills you will focus on in response:</p>
			<JobSkills cleanup={() => dispatch(resolveEvent())} />
		</>
	);
};

export default TableReward;
