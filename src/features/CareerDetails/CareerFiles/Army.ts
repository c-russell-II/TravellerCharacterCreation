import { CareerSpecialty, ParentCareer } from "../CareerTyping";

export const army: ParentCareer = {
	title: "Army",
	hasCommission: true,
	qualification: true,
	qualificationStat: "end",
	qualificationAge: 30,
	qualificationDC: 5,
	description:
		"Members of the planetary armed fighting forces. Soldiers deal with planetary surface actions, battles, and campaigns. Such individuals may also be mercenaries for hire.",
	eventList: {
		2: {
			type: "redirect",
			destination: "mishap",
			description: "Disaster!",
			noMuster: true,
		},
		3: {
			type: "reward",
			description:
				"You are assigned to a planet with a hostile or wild environment.",
			result: {
				type: "choice",
				choiceList: ["VaccSuit", "Engineer", "Animals", "Recon"],
				choiceType: "setSkill",
				specialtyList: {
					VaccSuit: null,
					Engineer: "any",
					Animals: ["riding", "training"],
					Recon: null,
				},
				value: 1,
			},
		},
		4: {
			type: "reward",
			description: "You are assigned to an urbanised planet torn by war.",
			result: {
				type: "choice",
				choiceList: ["Stealth", "Streetwise", "Persuade", "Recon"],
				specialtyList: {
					Stealth: null,
					Streetwise: null,
					Persuade: null,
					Recon: null,
				},
				choiceType: "setSkill",
				value: 1,
			},
		},
		5: {
			type: "reward",
			result: { type: "benefit", value: 1 },
			description:
				"You are given a special assignment or duty in your unit.",
		},
		6: {
			type: "check",
			checkType: "stat",
			checkStat: "edu",
			checkDC: 8,
			description: "You are thrown into a brutal ground war.",
			pass: {
				description:
					"You avoid injury through the entire war, and improve your skills.",
				type: "reward",
				result: {
					type: "choice",
					choiceType: "increaseSkill",
					choiceList: ["GunCombat", "Leadership"],
					specialty: { GunCombat: "any", Leadership: null },
				},
			},
			fail: {
				type: "generic",
				description:
					"You are injured early in the fighting, gaining nothing but a scar and a story.",
			},
		},
		7: { type: "redirect", destination: "life" },
		8: {
			type: "check",
			checkType: "stat",
			checkStat: "edu",
			checkDC: 8,
			description:
				"You are offered an opportunity for advanced, specialist training.",
			pass: {
				type: "reward",
				description:
					"Taking full advantage, your skills noticeably increase.",
				result: { type: "choice", choiceType: "increaseAny" },
			},
			fail: {
				type: "generic",
				description:
					"You do not manage to measure up to your instructors' standards.",
			},
		},
		9: {
			type: "reward",
			description:
				"Surrounded and outnumbered by the enemy, you manage to hold out until relief arrives.",
			result: { type: "advancement", value: 2 },
		},
		10: {
			type: "reward",
			description: "You are assigned to a peacekeeping role.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Admin", "Investigate", "Deception", "Recon"],
				specialtyList: {
					Admin: null,
					Investigate: null,
					Deception: null,
					Recon: null,
				},
				value: 1,
			},
		},
		11: {
			type: "reward",
			description:
				"Your commanding officer takes an active interest in your career.",
			result: {
				type: "choice",
				choiceType: "multiple",
				choiceList: ["Tactics", "advancement"],
				choiceDetails: {
					Tactics: {
						type: "setSkill",
						skill: "Tactics",
						value: 1,
						specialty: "military",
						button: "Tactics(military) 1",
					},
					advancement: {
						type: "advancement",
						value: 4,
						button: "Advancement + 4",
					},
				},
			},
		},
		12: {
			type: "reward",
			description: "You display heroism in battle.",
			result: { type: "promotion" },
		},
	},
	mishapList: [
		{
			type: "redirect",
			destination: "injury",
			modifier: "disadvantage",
			description: "You are severely injured...",
		},
		{
			type: "reward",
			description:
				"Your unit is slaughtered in a disastrous battle, for which you blame your commander. In retaliation, said commander has you removed from service.",
			result: {
				type: "enemy",
				value: 1,
				description:
					"A commander who you - rightly or wrongly- blamed for a disastrous battle, who retaliated by getting you discharged from the Army.",
			},
		},
		{
			type: "reward",
			description:
				"You are sent to a very unpleasant region to battle against guerilla fighters and rebels. You are discharged because of stress, injury, or because the government wishes to bury the whole thing.",
			result: {
				type: "multiple",
				list: ["skill", "enemy"],
				details: {
					skill: {
						type: "choice",
						choiceList: ["Recon", "Survival"],
						choiceType: "increaseSkill",
						specialty: { Recon: null, Survival: null },
					},
					enemy: {
						type: "enemy",
						value: 1,
						description:
							"Rebels you fought against while serving in the Army.",
					},
				},
			},
		},
		{
			type: "choice",
			description:
				"You discover that your commanding officer is engaged in some illegal activity, such as weapon smuggling.",
			choiceList: ["a", "b"],
			choice: {
				a: {
					description:
						"You join their ring for a time, until the inevitable investigation sees you discharged.",
					result: {
						type: "ally",
						value: 1,
						description:
							"Commanding officer you commited crimes with.",
					},
					button: "Join them",
					type: "reward",
				},
				b: {
					description:
						"You choose to co-operate with the military police, ",
					result: { type: "addBenefit", value: 1 },
					button: "Cooperate with MPs",
					type: "reward",
				},
			},
		},
		{
			type: "reward",
			description:
				"You are tormented by or quarrel with an officer or fellow soldier. That officer drives you out of the serivce.",
			result: {
				type: "rival",
				value: 1,
				description: "Drove you out of army career",
			},
		},
		{ type: "redirect", destination: "injury" },
	],
	skills: {
		personal: [
			{ type: "stat", stat: "str" },
			{ type: "stat", stat: "dex" },
			{ type: "stat", stat: "end" },
			{ type: "skill", skill: "Gambler", specialty: {Gambler: null} },
			{ type: "skill", skill: "Medic", specialty: {Medic: null} },
			{ type: "skill", skill: "Melee", specialty: {Melee: "any"} },
		],
		service: [
			{
				type: "choice",
				list: ["Drive", "VaccSuit"],
				specialty: { Drive: null, VaccSuit: null },
			},
			{ type: "skill", skill: "Athletics", specialty: {Athletics: "any"} },
			{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
			{ type: "skill", skill: "Recon", specialty: {Recon: null} },
			{ type: "skill", skill: "Melee", specialty: {Melee: "any"} },
			{ type: "skill", skill: "HeavyWeapons", specialty: {HeavyWeapons: "any"} },
		],
		advanced: [
			{ type: "skill", skill: "Tactics", specialty: {Tactics: "military"} },
			{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
			{ type: "skill", skill: "Navigation", specialty: {Navigation: null} },
			{ type: "skill", skill: "Explosives", specialty: {Explosives: null} },
			{ type: "skill", skill: "Engineer", specialty: {Engineer: "any"} },
			{ type: "skill", skill: "Survival", specialty: {Survival: null} },
		],
		officer: [
			{ type: "skill", skill: "Tactics", specialty: {Tactics: "military"} },
			{ type: "skill", skill: "Leadership", specialty: {Leadership: null} },
			{ type: "skill", skill: "Advocate", specialty: {Advocate: null} },
			{ type: "skill", skill: "Diplomat", specialty: {Diplomat: null} },
			{ type: "skill", skill: "Electronics", specialty: {Electronics: null} },
			{ type: "skill", skill: "Admin", specialty: {Admin: null} },
		],
		specialties: {
			support: [
				{
					type: "choice",
					list: ["Drive", "Flyer"],
					specialty: { Drive: null, Flyer: null },
				},
				{ type: "skill", skill: "Mechanic", specialty: {Mechanic: null} },
				{ type: "skill", skill: "Profession", specialty: {Profession: "any"} },
				{ type: "skill", skill: "Explosives", specialty: {Explosives: null } },
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "comms"} },
				{ type: "skill", skill: "Medic", specialty: {Medic: null} },
			],
			infantry: [
				{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
				{ type: "skill", skill: "Melee", specialty: {Melee: "any"} },
				{ type: "skill", skill: "HeavyWeapons", specialty: {HeavyWeapons: "any"} },
				{ type: "skill", skill: "Stealth", specialty: {Stealth: null} },
				{ type: "skill", skill: "Athletics", specialty: {Athletics: "any"} },
				{ type: "skill", skill: "Recon", specialty: {Recon: null} },
			],
			cavalry: [
				{ type: "skill", skill: "Mechanic", specialty: {Mechanic: null} },
				{ type: "skill", skill: "Drive", specialty: {Drive: "any"} },
				{ type: "skill", skill: "Flyer", specialty: {Flyer: "any"} },
				{ type: "skill", skill: "Recon", specialty: {Recon: null} },
				{ type: "skill", skill: "HeavyWeapons", specialty: {HeavyWeapons: "vehicle"} },
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "sensors"} },
			],
		},
	},
	benefits: [
		{ money: 2000, misc: "CombatImplant" },
		{ money: 5000, misc: "int", miscValue: 1 },
		{ money: 10000, misc: "edu", miscValue: 1 },
		{ money: 10000, misc: "Weapon" },
		{ money: 10000, misc: "Armour" },
		{ money: 20000, misc: "choice", miscList: ["end", "CombatImplant"] },
		{ money: 30000, misc: "soc", miscValue: 1 },
	],
	specialtiesList: ["support", "infantry", "cavalry"],
};

export const supportArmy: CareerSpecialty = {
	title: "Support",
	description:
		"You are an engineer, cook, or in some other role behind the front lines.",
	survivalSkill: "end",
	survivalDC: 5,
	advancementSkill: "edu",
	advancementDC: 7,
	eventList: army.eventList,
	mishapList: army.mishapList,
	ranks: [
		{
			title: "Private",
			bonus: {
				type: "skill",
				skill: "GunCombat",
				specialty: {GunCombat: "any"},
				value: 1,
			},
		},
		{
			title: "Lance Corporal",
			bonus: { type: "skill", skill: "Recon", specialty: {Recon: null}, value: 1 },
		},
		{ title: "Corporal", bonus: false },
		{
			title: "Lance Sergeant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Sergeant", bonus: false },
		{ title: "Gunnery Sergeant", bonus: false },
		{ title: "Sergeant Major", bonus: false },
	],
	comRanks: [
		{
			title: "Lieutenant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Captain", bonus: false },
		{
			title: "Major",
			bonus: {
				type: "skill",
				skill: "Tactics",
				specialty: {Tactics: "military"},
				value: 1,
			},
		},
		{ title: "Lieutenant Colonel", bonus: false },
		{ title: "Colonel", bonus: false },
		{
			title: "General",
			bonus: { type: "setStat", stat: "soc", threshold: 10, value: 1 },
		},
	],
	skills: army.skills,
	benefits: army.benefits,
	parent: "army",
};
export const infantry: CareerSpecialty = {
	title: "Infantry",
	description: "You are one of the Poor Bloody Infantry on the ground.",
	survivalSkill: "str",
	survivalDC: 6,
	advancementSkill: "edu",
	advancementDC: 6,
	eventList: army.eventList,
	mishapList: army.mishapList,
	ranks: [
		{
			title: "Private",
			bonus: {
				type: "skill",
				skill: "GunCombat",
				specialty: {GunCombat: "any"},
				value: 1,
			},
		},
		{
			title: "Lance Corporal",
			bonus: { type: "skill", skill: "Recon", specialty: {Recon: null}, value: 1 },
		},
		{ title: "Corporal", bonus: false },
		{
			title: "Lance Sergeant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Sergeant", bonus: false },
		{ title: "Gunnery Sergeant", bonus: false },
		{ title: "Sergeant Major", bonus: false },
	],
	comRanks: [
		{
			title: "Lieutenant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Captain", bonus: false },
		{
			title: "Major",
			bonus: {
				type: "skill",
				skill: "Tactics",
				specialty: {Tactics: "military"},
				value: 1,
			},
		},
		{ title: "Lieutenant Colonel", bonus: false },
		{ title: "Colonel", bonus: false },
		{
			title: "General",
			bonus: { type: "setStat", stat: "soc", threshold: 10, value: 1 },
		},
	],
	skills: army.skills,
	benefits: army.benefits,
	parent: "army",
};

export const cavalry: CareerSpecialty = {
	title: "Cavalry",
	description: "You are one of the crew of a gunship or tank.",
	survivalSkill: "int",
	survivalDC: 7,
	advancementSkill: "int",
	advancementDC: 5,
	eventList: army.eventList,
	mishapList: army.mishapList,
	ranks: [
		{
			title: "Private",
			bonus: {
				type: "skill",
				skill: "GunCombat",
				specialty: {GunCombat: "any"},
				value: 1,
			},
		},
		{
			title: "Lance Corporal",
			bonus: { type: "skill", skill: "Recon", specialty: {Recon: null}, value: 1 },
		},
		{ title: "Corporal", bonus: false },
		{
			title: "Lance Sergeant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Sergeant", bonus: false },
		{ title: "Gunnery Sergeant", bonus: false },
		{ title: "Sergeant Major", bonus: false },
	],
	comRanks: [
		{
			title: "Lieutenant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Captain", bonus: false },
		{
			title: "Major",
			bonus: {
				type: "skill",
				skill: "Tactics",
				specialty: {Tactics: "military"},
				value: 1,
			},
		},
		{ title: "Lieutenant Colonel", bonus: false },
		{ title: "Colonel", bonus: false },
		{
			title: "General",
			bonus: { type: "setStat", stat: "soc", threshold: 10, value: 1 },
		},
	],
	skills: army.skills,
	benefits: army.benefits,
	parent: "army",
};
