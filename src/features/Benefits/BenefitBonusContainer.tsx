import React, { useState, useEffect } from "react";

interface BenefitBonusContainerProps {
	gambler: boolean;
	rank: boolean;
	other: {
		[key: number]: number;
	};
	handler: (arg0: number, arg1: "rank" | "gambler" | "other") => void;
}
export default function BenefitBonusContainer(
	props: BenefitBonusContainerProps
) {
	const { gambler, rank, other, handler } = props;
	const [gamblerActive, setGamblerActive] = useState(false);
	const [rankActive, setRankActive] = useState(false);

	const otherState: boolean[] = [];
	const [otherActive, setOtherActive] = useState<boolean[]>([]);

	useEffect(() => {
		for (let key in other) {
			const currentVal = otherActive[Number(key)];
			if (currentVal) {
				continue;
			}
			otherState[Number(key)] = false;
		}
	}, [other, otherActive]);
	//FIXME: this function does too much, clean it up!
	const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		if (value === "gambler") {
			setGamblerActive((prev) => !prev);
			if (gambler) {
				handler(1, "gambler");
			} else {
				handler(-1, "gambler");
			}
		} else if (value === "rank") {
			setRankActive((prev) => !prev);
			if (rank) {
				handler(1, "rank");
			} else {
				handler(-1, "rank");
			}
		} else {
			if (otherActive.some((e) => e)) {
				alert("You can only use one event bonus at a time!");
				return;
			}
			const index = Number(value);
			setOtherActive((prev) => {
				const newState = [...prev];
				newState[index] = !newState[index];
				return newState;
			});
			if (otherActive[index]) {
				handler(index, "other");
			} else {
				handler(-1 * index, "other");
			}
		}
	};
	//TODO: Style the article here, also - might want to do something to set apart the "other" bonus section from the rest.
	return (
		<article>
			<h3>Benefit Roll Bonuses</h3>
			<p>Select whether to apply available bonuses to your next roll.</p>
			<p>Available Bonuses:</p>
			{gambler && (
				<div>
					<input
						type="checkbox"
						id="gambler"
						value="gambler"
						checked={gamblerActive}
						onChange={handleChanges}
					/>
					<label htmlFor="gambler">Gambler Bonus</label>{" "}
				</div>
			)}
			{rank && (
				<div>
					<input
						type="checkbox"
						id="rank"
						value="rank"
						checked={rankActive}
						onChange={handleChanges}
					/>
					<label htmlFor="rank">Rank Bonus</label>{" "}
				</div>
			)}
			{Object.keys(other).length > 0 &&
				Object.keys(other).map((key) => {
					return (
						<div key={key}>
							<input
								key={key}
								id={`${key}checkbox`}
								type="checkbox"
								checked={otherActive[Number(key)]}
								value={key}
								onChange={handleChanges}
							/>
							<label htmlFor={`${key}checkbox`} key={key}>
								Event Bonus: + {key}
							</label>{" "}
						</div>
					);
				})}
		</article>
	);
}
