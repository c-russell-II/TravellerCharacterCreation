import { useState } from "react";
import { ChoiceTermReward } from "../../../features/CareerDetails/CareerTypes/TermAndRankRewardTypes";
import { getReadableStat } from "../../../features/Career/careerHandler";
import StatUp from "./StatUp";
import SkillUp from "./SkillUp";

export default function TermRewardChoice(props: {
	reward: ChoiceTermReward;
	cleanup: () => void;
}) {
	const [currentChoice, setCurrentChoice] = useState("");
	const [type, setType] = useState<string | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (stats.includes(currentChoice)) {
			setType("stat");
			return;
		}
		setType("skill");
		return;
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setCurrentChoice(event.currentTarget.value);
	};
	return (
		<>
			{type ? (
				<form name="rewardChoice" onSubmit={handleSubmit}>
					{props.reward.list.map((e: string, i: number) => {
						const name = stats.includes(e) ? getReadableStat(e) : e;
						return (
							<label
								htmlFor={e}
								key={`single term reward choice ${e} at index ${i}`}
							>
								{name}
								<input
									type="radio"
									name="rewardChoice"
									id={e}
									value={e}
									onChange={handleChange}
									checked={currentChoice === e}
								/>
							</label>
						);
					})}
				</form>
			) : type === "stat" ? (
				<StatUp
					reward={{ type: "stat", stat: currentChoice }}
					cleanup={props.cleanup}
				/>
			) : (
				<SkillUp
					reward={{
						type: "skill",
						skill: currentChoice,
						specialty: props.reward.specialty,
					}}
					cleanup={props.cleanup}
				/>
			)}
		</>
	);
}

const stats = ["str", "dex", "end", "int", "edu", "soc"];
