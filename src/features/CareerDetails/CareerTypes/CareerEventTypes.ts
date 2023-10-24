import { AnyEventReward } from "./EventRewardTypes";

export type AnyEvent =
	| RedirectEvent
	| anyCheckEvent
	| RewardEvent
	| ChoiceEvent
	| SpecialEvent
	| GenericEvent;
export type anyCheckEvent = ChoiceCheckEvent | SkillCheckEvent | StatCheckEvent;

interface GenericEvent {
	type: "generic";
	description: string;
}
interface RedirectEvent {
	type: "redirect";
	destination: string;
	description?: string | null;
	noMuster?: boolean;
	modifier?: string;
}

interface CheckEvent {
	type: "check";
}

export interface ChoiceCheckEvent extends CheckEvent {
	checkType: "choice";
	choiceList: string[];
	specialtyList: {
		[key: string]: string[] | null | string;
	};
	checkDC: number;
	description: string;
	pass: AnyEvent;
	fail: AnyEvent;
}

export interface SkillCheckEvent extends CheckEvent {
	checkType: "skill";
	checkSkill: string;
	specialty: string | string[] | null;
	checkDC: number;
	description: string;
	pass: AnyEvent;
	fail: AnyEvent;
}

export interface StatCheckEvent extends CheckEvent {
	checkType: "stat";
	checkStat: string;
	checkDC: number;
	description: string;
	pass: AnyEvent;
	fail: AnyEvent;
}

export interface RewardEvent {
	type: "reward";
	description: string;
	result: AnyEventReward;
}

export interface ChoiceEvent {
	type: "choice";
	choiceList: string[];
	description: string;
	choice: {
		[key: string]: AnyEvent & { button?: string };
	};
}

export interface SpecialEvent {
	type: "special";
	specialType: string;
}
