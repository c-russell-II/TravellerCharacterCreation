import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { roll } from "../../../Career/careerHandler";
import { changeByAmount } from "../../../Character/StatsSlice";
import { resolveEvent } from "../../../TermSlice/TermSlice";
const WorstInjury = () => {
	const dispatch = useDispatch();
	const [selection, setSelection] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const val = roll() + 1;
		const array = ["str", "dex", "end"];
		const final = array.filter((e) => e !== selection);
		const stat = selection as keyof StatDisplayHolder;
		dispatch(changeByAmount({ stat: stat, value: -val }));
		final.forEach((e) =>
			dispatch(
				changeByAmount({
					stat: e as keyof StatDisplayHolder,
					value: -2,
				})
			)
		);
		dispatch(resolveEvent());
	};

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		setSelection(event.currentTarget.value);
	};
	return (
		<>
			<p>
				The injuries you sustain are nearly enough to kill you, and
				though they don't, your body has the scars to show it.
			</p>
			<form name="stat" onSubmit={handleSubmit}>
				<h4>
					Select which of your physical stats will be most harmed by
					this:
				</h4>
				<label>
					<input
						name="stat"
						type="radio"
						value="str"
						checked={selection === "str"}
						onChange={handleChange}
					/>
					Strength
				</label>
				<label>
					<input
						name="stat"
						type="radio"
						value="dex"
						checked={selection === "dex"}
						onChange={handleChange}
					/>
					Dexterity
				</label>
				<label>
					<input
						name="stat"
						type="radio"
						value="end"
						checked={selection === "end"}
						onChange={handleChange}
					/>
					Endurance
				</label>
				<input type="submit" value="submit" name="stat" />
			</form>
		</>
	);
};

export default WorstInjury;
