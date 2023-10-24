import { AnyTermReward } from "./TermAndRankRewardTypes";
import { AnyBenefit } from "./CareerBenefitTypes";
import { AnyEvent } from "./CareerEventTypes";
import { CareerRank } from "./TermAndRankRewardTypes";

export type ParentCareer = CareerQualification &
	CareerEvents &
	CareerDescription &
	CareerTables;

export interface CareerSkillTables {
	personal: AnyTermReward[];
	service: AnyTermReward[];
	advanced?: AnyTermReward[];
	officer?: AnyTermReward[];
	specialties: {
		[key: string]: AnyTermReward[];
	};
}
type CareerQualification = NoQualification | AnyQualification;

interface NoQualification {
	qualification: false;
	qualificationStat: null;
	qualificationDC: null;
}

type AnyQualification =
	| DefaultQualification
	| QualificationChoice
	| QualificationThreshold
	| QualificationAge;

interface DefaultQualification {
	qualification: true;
	qualificationStat: string;
	qualificationDC: number;
}
interface QualificationThreshold extends DefaultQualification {
	qualificationStat: "threshold";
	qualificationThreshold: { stat: string; value: number };
}

interface QualificationAge extends DefaultQualification {
	qualificationAge: number;
}

interface QualificationChoice extends DefaultQualification {
	qualificationStat: "choice";
	qualificationChoices: string[];
}

interface CareerEvents {
	eventList: {
		[key: number]: AnyEvent;
	};
	mishapList: {
		[key: number]: AnyEvent;
	};
}
interface CareerDescription {
	title: string;
	hasCommission: boolean;
	description: string;
	specialtiesList: string[];
}

interface CareerTables {
	skills: CareerSkillTables;
	benefits: AnyBenefit[];
}

interface SpecialtyChecks {
	survivalSkill: string;
	survivalDC: number;
	advancementSkill: string;
	advancementDC: number;
}
interface CareerRanks {
	ranks: CareerRank[];
	comRanks?: CareerRank[];
}
interface SpecialtyDescription {
	title: string;
	description: string;
	parent: string;
}
export type CareerSpecialty = SpecialtyChecks &
	CareerEvents &
	CareerTables &
	CareerRanks &
	SpecialtyDescription;
