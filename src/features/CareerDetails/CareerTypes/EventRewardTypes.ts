import { AnyEvent } from "./CareerEventTypes";

export type AnyEventReward =
	| StatEventReward
	| AnyChoiceEventReward
	| AdditionalBenefitEventReward
	| BenefitBonusEventReward
	| ContactEventReward
	| AdvancementEventReward
	| PromotionEventReward
	| MultipleEventReward
	| SingleSetSkillEventReward
	| EnemyEventReward
	| AllyEventReward
	| RivalEventReward
	| QualificationEventReward
	| FavorEventReward
	| SingleSkillIncreaseEventReward;

export type AnyConnectionReward = ContactEventReward | EnemyEventReward | AllyEventReward | RivalEventReward;

interface SingleSkillIncreaseEventReward {
	type: "increaseSkill";
	skill: string;
	value: number;
	specialty?: string | string[] | null;
}

interface FavorEventReward {
	type: "favor";
	description: string;
}

export interface QualificationEventReward {
	type: "qualification";
	career: string | string[];
	value: number;
	expires?: boolean;
}

interface StatEventReward {
	type: "stat";
	stat: string;
	value: number;
}

export interface AllyEventReward {
	type: "ally";
	value: number;
	description: string;
}

export interface RivalEventReward {
	type: "rival";
	value: number;
	description: string;
}

export type AnyChoiceEventReward =
	| SetSkillChoiceEventReward
	| IncreaseAnyEventReward
	| MultipleChoiceEventReward
	| IncreaseSkillEventReward
	| SetAnyEventReward
	| StatChoiceEventReward;

interface ChoiceEventReward {
	type: "choice";
}

export interface StatChoiceEventReward extends ChoiceEventReward {
	choiceType: "stat";
	choiceList: string[];
	value: number;
}

export interface SetAnyEventReward extends ChoiceEventReward {
	choiceType: "setAny";
	value: number;
}
export interface IncreaseAnyEventReward extends ChoiceEventReward {
	choiceType: "increaseAny";
}
export interface IncreaseSkillEventReward extends ChoiceEventReward {
	choiceType: "increaseSkill";
	choiceList: string[];
	specialty: { [key: string]: string | string[] | null };
}

export interface SetSkillChoiceEventReward extends ChoiceEventReward {
	choiceType: "setSkill";
	choiceList: string[];
	specialtyList: { [key: string]: string[] | null | string };
	value: number;
}

export interface MultipleChoiceEventReward extends ChoiceEventReward {
	choiceType: "multiple";
	choiceList: string[];
	choiceDetails: {
		[key: string]: AnyEventReward & { button?: string };
	};
}

export interface AdditionalBenefitEventReward {
	type: "addBenefit";
	value: number;
}

export interface BenefitBonusEventReward {
	type: "benefit";
	value: number;
}

export interface ContactEventReward {
	type: "contact";
	value: "roll" | number;
	roll?: number;
	description?: string;
}

export interface AdvancementEventReward {
	type: "advancement";
	value: number;
}

interface PromotionEventReward {
	type: "promotion";
}

interface MultipleEventReward {
	type: "multiple";
	list: string[];
	details: {
		[key: string]: (AnyEventReward | AnyEvent) & { button?: string };
	};
}

interface SingleSetSkillEventReward {
	type: "setSkill";
	skill: string;
	value: number;
	specialty?: string | string[] | null;
}

export interface EnemyEventReward {
	type: "enemy";
	value?: number | "roll";
	roll?: number | string;
	description: string;
}
