import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genericIncrease } from "../../../Skills/SkillsSlice";
import { RootState } from "../../../../app/store";

const MultipleSpecs = () => {
	const skills = useSelector((state: RootState) => state.skills);
	const [isChecked, setIsChecked] = useState<string[]>([]);
	const dispatch = useDispatch();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		if (isChecked.includes(event.currentTarget.value)) {
			setIsChecked((prev) =>
				prev.filter((e) => e !== event.target.value)
			);
			return;
		}
		if (isChecked.length > 2) {
			alert("You've selected too many options! please select two.");
			return;
		}
		setIsChecked((prev) => [...prev, event.currentTarget.value]);
		return;
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		isChecked.forEach((e) =>
			dispatch(genericIncrease({ skill: "Science", specialty: e }))
		);
	};

	return (
		<>
			<form onSubmit={handleSubmit} name="specialties">
				{skills.Science.specialtiesList.map((e: string, i: number) => (
					<input
						name="specialties"
						type="checkbox"
						key={i}
						value={e}
						checked={isChecked.includes(e)}
						onChange={handleChange}
					>
						{e}
					</input>
				))}
				<input name="specialties" value="submit" type="submit" />
			</form>
		</>
	);
};

export default MultipleSpecs;
