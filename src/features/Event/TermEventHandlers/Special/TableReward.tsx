import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { JobSkills } from "../../Skills/JobSkills";
import { resolveEvent } from "../../../TermSlice/TermSlice";
import { RootState } from "../../../../app/store";

const TableReward = () => {
	const term = useSelector((state: RootState) => state.term);
	const dispatch = useDispatch();
	//TODO: check for event, error boundaries, blah etc etc
	return (
		<>
			<p>{term.event.description}</p>
			<p>Select which variety of skills you will focus on in response:</p>
			<JobSkills cleanup={() => dispatch(resolveEvent())} />
		</>
	);
};

export default TableReward;
