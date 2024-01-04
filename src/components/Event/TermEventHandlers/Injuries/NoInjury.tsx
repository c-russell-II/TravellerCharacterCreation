import React from "react";
import { useDispatch } from "react-redux";
import { resolveEvent } from "../../../../features/TermSlice/TermSlice";

const NoInjury = () => {
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(resolveEvent());
	};
	return (
		<>
			<h4>Good fortune...?</h4>
			<p>
				Despite your injuries warranting medical attention, through
				essentially blind luck, you manage to avoid any long-term
				effects. By the time your treatment is complete, you're
				essentially back to perfect health.
			</p>
			<button onClick={handleClick}>Great!</button>
		</>
	);
};

export default NoInjury;
