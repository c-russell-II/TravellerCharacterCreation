import {AnyTermReward} from '../CareerTyping';

interface BaseBenefit {
	money: number;
	misc: string;
}
interface ValuedBenefit extends BaseBenefit {
	miscValue: number;
}

interface RolledBenefit extends BaseBenefit {
	miscValue: "roll";
	miscRoll: number | string;
}
interface ChoiceBenefit extends BaseBenefit {
	misc: "choice";
	miscList: string[];
}

interface MultiValueChoiceBenefit extends BaseBenefit {
	misc: "choice";
	miscList: string[];
	miscValues: {
		[key: string]: AnyTermReward;
	};
}

interface ValuedChoiceBenefit extends ChoiceBenefit {
	miscValue: number;
}

export type AnyBenefit =
	| BaseBenefit
	| ValuedBenefit
	| ChoiceBenefit
	| ValuedChoiceBenefit
	| MultiValueChoiceBenefit
	| RolledBenefit;
