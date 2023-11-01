import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import { CareerInfo, resolveBenefit } from "../Career/careerSlice";
import { AnyBenefit } from "../CareerDetails/CareerTyping";
import SingleBenefitRender from "./SingleBenefitRender";
import Chooser from "../../components/Chooser";
import BenefitBonusContainer from "./BenefitBonusContainer";
import { roll } from "../Career/careerHandler";
import { addBenefit } from "../Character/charaSlice";

const BenefitsContainer = () => {
	const { career } = useParams();
	const dispatch = useDispatch();

	const careerInfo= useSelector((state: RootState) => state.careers.careerInfo[career as string])
	const {rankBonus, numBenefits, benefitTables} = extractCareerInfo(careerInfo)
	const cashCount = useSelector(
		(state: RootState) => state.chara.numOfCashBenefits
	);
	const bonusInfo = useSelector((state: RootState) => {
		if (!career) {
			console.warn("No careerState in BenefitsContainer!");
			return {};
		}
		return state.misc.benefits[career];
	});
	const gamblerSkill = useSelector(
		(state: RootState) => state.skills.Gambler.value
	);

	const [currentType, setCurrentType] = useState<"cash" | "misc">("misc");
	const [currentMods, setCurrentMods] = useState<ModsState>({
		gambler: 0,
		rank: 0,
		other: 0,
	});

	const totalMod = () => {
		let mod = 0;
		if (currentMods.gambler && currentType === "cash") {
			mod++;
		}
		if (currentMods.rank) {
			mod++;
		}
		mod += currentMods.other;
		return mod;
	};
	//TODO: handle storing the info in a sidebar or something similar!

	useEffect(() => {
		if (cashCount >= 3) {
			setCurrentType("misc");
		}
	}, [cashCount]);

	const hasAnyBonus = () =>
		rankBonus ||
		(gamblerSkill > 0 && currentType === "cash") ||
		totalMod() > 0;

	const handleBonusChange = (
		value: number,
		type: "gambler" | "rank" | "other"
	) => {
		setCurrentMods((prev) => {
			return { ...prev, [type]: value };
		});
	};
	//TODO: add a suite of benefit handlers
	//TODO: inventory handling for item/unlock/etc benefits/bonuses
	//TODO: money tracking
	const handleRoll = (choice: string) => {
		const mod = totalMod();
		let val = roll() + mod;
		if (val > 7) val = 7;
		const item = benefitTables[val];
		//TODO: Benefits need a form that makes sense for being saved to the character state
		dispatch(resolveBenefit(career as string))
		dispatch(addBenefit(item))
		return;
	}
	return (
		<div>
			<h1>
				Mustering Benefits
			</h1>
			<p>
				Choose the type of benefit you want to roll for, then click the
				button to roll the dice.
			</p>
			{/*TODO: set up styles so the sidebar positions itself properly in the box! */}
			<article>
				<p>Number of benefits remaining: {numBenefits}</p>
				{cashCount < 3 && (
					<p>Number of Cash benefits remaining: {3 - cashCount}</p>
				)}
			</article>
			{cashCount < 3 && (
				<article>
					<h3>Choose which table to roll on:</h3>
					<Chooser
						type="single"
						options={["Cash", "Misc"]}
						cleanup={handleRoll}
					/>
				</article>
			)}
			{hasAnyBonus() && (
				<BenefitBonusContainer
					gambler={gamblerSkill > 0 && currentType === "cash"}
					rank={rankBonus}
					other={bonusInfo}
					handler={handleBonusChange}
				/>
			)}
			{/*TODO: finish setting up benefit rolls and resolution!*/}
			<h2>Possible Benefits:</h2>
			{benefitTables.map((benefit: AnyBenefit) => (
				<SingleBenefitRender benefit={benefit} key={Math.random()} />
			))}
		</div>
	);
};

// Extracting the number of benefits, the relevant tables, and whether or not you get a bonus based on rank!
const extractCareerInfo = (
	career: CareerInfo
): { numBenefits: number; rankBonus: boolean; benefitTables: AnyBenefit[] } => {
	const { nonComRank, rank } = career;
	//Checks if you have a seperate, pre-commission rank stored, if so, adds that value to your current rank
	const fullRank = nonComRank ? nonComRank + rank : rank;
	//Checks if the "total" rank is greater than four
	const rankBonus = fullRank > 4

	return {
		numBenefits: career.benefits,
		rankBonus,
		benefitTables: career.details.benefits,
	};
};

interface ModsState {
	gambler: 0 | 1;
	rank: 0 | 1;
	other: number;
}

export default BenefitsContainer;
