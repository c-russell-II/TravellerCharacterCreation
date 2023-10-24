import { QualBonuses } from "../Character/miscBonusSlice";
import { parentJobs } from "../CareerDetails/CareerDetails";
import { ParentCareer } from "../CareerDetails/CareerTyping";

export const roll = (num = 6): number => {
    if (typeof num !== 'number') {
        throw new Error('expected a number!');
    }
    return Math.floor(Math.random() * num);
};

export const skillCheck = (stat = 0, skill = 0): number => {
    return roll() + roll() + stat + skill + 2;
};

export const getQualBonus = (quals: QualBonuses, career: string): number => {
	const permBonus = quals.list.includes(career)
		? quals.details[career].value
		: 0;
	const tempBonus = quals.temp.list.includes(career)
		? quals.temp.details[career].value
		: 0;
	return permBonus + tempBonus;
};

export const getParentCareer = (career: string) => {
		return parentJobs[career] as ParentCareer;
};

export const getReadableStat = (stat: string) => {
	switch (stat) {
		case "str":
			return "Strength";
		case "dex":
			return "Dexterity";
		case "end":
			return "Endurance";
		case "int":
			return "Intellect";
		case "edu":
			return "Education";
		case "soc":
			return "Social Standing";
		default:
			return "";
	}
};