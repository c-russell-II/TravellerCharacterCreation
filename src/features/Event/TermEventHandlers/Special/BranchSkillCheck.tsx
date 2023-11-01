import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../../../TermSlice/TermSlice";
import { RootState } from "../../../../app/store";
import { ChoiceCheckEvent } from "../../../CareerDetails/CareerTyping";
import { AnySpecialty } from "../../../CareerDetails/CareerTypes/SkillTypes";

const BranchSkillCheck = () => {
	const job = useSelector((state: RootState) => state.term.job);
	const dispatch = useDispatch();

	useEffect(() => {
		let currList: string[] = [];
		let currSpecialties: AnySpecialty = {};
		switch (job) {
			case "lineCrew":
				currList = ["Gunner", "Electronics"];
				currSpecialties = { Gunner: null, Electronics: "sensors" };
				break;
			case "engineerGunner":
				currList = ["Mechanic", "VaccSuit"];
				currSpecialties = { Mechanic: null, VaccSuit: null };
				break;
			case "flight":
				currList = ["Pilot", "Tactics"];
				currSpecialties = {
					Pilot: ["small", "spacecraft"],
					Tactics: "naval",
				};
				break;
			default:
				break;
		}
		const newEvent: ChoiceCheckEvent = {
			type: "check",
			description:
				"During a battle, defeat or victory depend on your actions.",
			checkType: "choice",
			checkDC: 8,
			choiceList: currList,
			specialtyList: currSpecialties,
			pass: {
				type: "reward",
				description:
					"Your actions are instrumental in winning the battle- you are honourably discharged, either due to official whitewashing, or embarassment.",
				result: { type: "addBenefit", value: 1 },
			},
			fail: {
				type: "generic",
				description:
					"You are blamed for the disastrous loss of life, and damage to your vessel, and dishonourably discharged.",
			},
		};
		dispatch(updateEvent(newEvent));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, job]);
	//TODO: check if I need to add text to the branch skill check? I think it's just a container for updating the event in the store but need to do some fine-toothed-combing!
	return <></>;
};

export default BranchSkillCheck;
