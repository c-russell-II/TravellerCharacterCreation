import { AnySpecialty } from "./SkillTypes";

export interface SkillTermReward {
	type: "skill";
	skill: string;
	specialty: AnySpecialty;
}

export interface StatTermReward {
	type: "stat";
	stat: string;
}

export interface ChoiceTermReward {
	type: "choice";
	list: string[];
	specialty: AnySpecialty;
}

interface MiscBenefit {
	type: "misc";
	misc: string;
	value: number;
}

export type AnyTermReward =
	| SkillTermReward
	| StatTermReward
	| ChoiceTermReward
	| MiscBenefit;

export type CareerRank = CareerRankNoBonus | CareerRankWithBonus;

interface CareerRankNoBonus {
	title: string;
	bonus: false;
}

interface CareerRankWithBonus {
	title: string;
	bonus:
		| RankSkillBonus
		| RankStatBonus
		| RankSetStatBonus
		| RankSkillChoiceBonus;
}

export type AnyRankBonus = RankSkillBonus | RankSkillChoiceBonus | RankStatBonus | RankSetStatBonus;

export interface RankSkillChoiceBonus {
	type: "skill";
	skill: "choice";
	choiceList: string[];
	specialty: AnySpecialty;
}

export interface RankSkillBonus {
	type: "skill";
	skill: string;
	specialty: AnySpecialty;
	value: number;
}
export interface RankStatBonus {
	type: "stat";
	stat: 'str' | 'dex' | 'end' | 'int' | 'edu' | 'soc';
	value: number;
}

export interface RankSetStatBonus {
	type: "setStat";
	stat: string;
	threshold: number;
	value: number;
}
