import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { roll, skillCheck } from "../../../Career/careerHandler";
import { changeParole } from "../../../Prison/Utilities/prisonSlice";
import { resolveEvent } from "../../../TermSlice/TermSlice";

const NewLawyerEvent = () => {
	const dispatch = useDispatch();
	const [isChecked, setIsChecked] = useState<number>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setIsChecked(Number(event.currentTarget.value));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (skillCheck(isChecked) >= 8) {
			dispatch(changeParole(roll() + 1));
		}
		dispatch(resolveEvent());
	};
	return (
		<>
			<p>
				You have the opportunity to hire a new lawyer - a good one might
				help ease your walk out of prison, but will be proportionally
				expensive.
			</p>
			<p>How much would you like to spend on the lawyer?</p>
			<form onSubmit={handleSubmit} name="price">
				<input
					type="radio"
					value="1"
					checked={isChecked === 1}
					onChange={handleChange}
					name="price"
				>
					1000cr
				</input>
				<input
					type="radio"
					value="2"
					checked={isChecked === 2}
					onChange={handleChange}
					name="price"
				>
					4000cr
				</input>
				<input
					type="radio"
					value="3"
					checked={isChecked === 3}
					onChange={handleChange}
					name="price"
				>
					9000cr
				</input>
				<input
					type="radio"
					value="4"
					checked={isChecked === 4}
					onChange={handleChange}
					name="price"
				>
					16.000cr
				</input>
				<input
					type="radio"
					value="5"
					checked={isChecked === 5}
					onChange={handleChange}
					name="price"
				>
					25.000cr
				</input>
				<input type="submit" value="submit" name="price" />
			</form>
		</>
	);
};

export default NewLawyerEvent;
