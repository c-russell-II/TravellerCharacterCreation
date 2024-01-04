import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import jobObject from "../../../features/CareerDetails/CareerDetails";
import {
	getQualBonus,
	skillCheck,
} from "../../../features/Career/careerHandler";
import { selectJob } from "../../../features/Career/careerSlice";
import { RootState } from "../../../app/store";

const EntertainerQual = () => {
	const [selection, setSelection] = useState("");

	const stats = useSelector((state: RootState) => state.stats);
	const previousCareers = useSelector(
		(state: RootState) => state.careers.careerCount
	);
	const qualObj = useSelector((state: RootState) => state.misc.qualification);

	const dispatch = useDispatch();
	const { career } = useParams();
	const navigate = useNavigate();

	if (!career) {
		console.warn("Missing career in entertainer qual. this is a problem.");
		return <>how did you get here? go back</>;
	}

	const currentDC = 5 + previousCareers;
	const specialty = jobObject[career];

	const qualBonus = getQualBonus(qualObj, career);

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		setSelection(event. currentTarget.value);
		return;
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const val = skillCheck(stats[selection as keyof StatDisplayHolder]) + qualBonus;
		if (val >= currentDC) {
			dispatch(selectJob({ job: career, details: specialty }));
			navigate(`/term/${career}/start`);
		}
		navigate(`../qualification/${career}/failed`);
	};

	return (
		<>
			<h2>Entertainer Qualification:</h2>
			<p>
				As an entertainer, you can get by on your physical ability- your
				skill in your chosen craft- or by working smart.
			</p>
			<form name="qual_choice" onSubmit={handleSubmit}>
				<label>
					<input
						name="qual_choice"
						value="dex"
						type="radio"
						onChange={handleChange}
						checked={selection === "dex"}
					/>
					Use Dexterity
				</label>
				<label>
					<input
						name="qual_choice"
						value="int"
						type="radio"
						onChange={handleChange}
						checked={selection === "int"}
					/>
					Use Intelligence
				</label>
				<input type="submit" value="submit" name="qual_choice" />
			</form>
		</>
	);
};

//Checks for temp bonuses and permanent qual bonuses and returns the total!

export default EntertainerQual;
