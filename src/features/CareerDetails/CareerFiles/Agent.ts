import { CareerSpecialty, ParentCareer } from "../CareerTyping";

export const agent: ParentCareer = {
	title: "Agent",
	hasCommission: false,
	qualification: true,
	qualificationStat: "int",
	qualificationDC: 6,
	description:
		"Law enforcement agencies, corporate operatives, spies, and others who work in the shadows.",
	eventList: {
		2: {
			type: "redirect",
			destination: "mishap",
			description: "Disaster!",
			noMuster: true,
		},

		3: {
			type: "check",
			checkType: "choice",
			choiceList: ["Investigate", "Streetwise"],
			specialtyList: { Investigate: null, Streetwise: null },
			checkDC: 8,
			description: "An investigation turns dangerous...",
			pass: {
				type: "reward",
				description:
					"You manage to demonstrate and noticeably improve your tradecraft.",
				result: {
					type: "choice",
					choiceType: "setSkill",
					choiceList: [
						"Deception",
						"Jack-of-All-Trades",
						"Persuade",
						"Tactics",
					],
					specialtyList: {
						Deception: null,
						"Jack-of-All-Trades": null,
						Persuade: null,
						Tactics: "any",
					},
					value: 1,
				},
			},
			fail: {
				type: "redirect",
				description: "You bite off more than you can chew, and ...",
				destination: "mishap",
			},
		},

		4: {
			type: "reward",
			result: { type: "benefit", value: 1 },
			description:
				"You complete a mission for your superiors, and are suitably rewarded.",
		},

		5: {
			type: "reward",
			result: { type: "contact", value: "roll", roll: 2 },
			description: "You establish a network of contacts",
		},

		6: {
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
					"However, you do not manage to measure up to your instructors' standards.",
			},
		},

		7: { type: "redirect", destination: "life" },

		8: {
			type: "check",
			checkType: "skill",
			checkSkill: "Deception",
			specialty: null,
			checkDC: 8,
			description: "You go undercover to investigate an enemy group...",
			pass: {
				type: "special",
				specialType: "redirectChoicePass",
			},
			fail: {
				type: "special",
				specialType: "redirectChoiceFail",
			},
		},

		9: {
			type: "reward",
			result: { type: "advancement", value: 2 },
			description:
				"You go above and beyond the call of duty, and are told in no uncertain terms that your next promotion will come easier, should you stay on another term.",
		},

		10: {
			type: "reward",
			description: "You are given specialist training in vehicles.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Drive", "Flyer", "Pilot", "Gunner"],
				specialtyList: {
					Drive: "any",
					Flyer: "any",
					Pilot: "any",
					Gunner: "any",
				},
				value: 1,
			},
		},

		11: {
			type: "reward",
			description:
				"You are befriended by a senior agent, and they offer you either a friend in high places, or unique training opportunities...",
			result: {
				type: "choice",
				choiceType: "multiple",
				choiceList: ["Investigate", "advancement"],
				choiceDetails: {
					Investigate: {
						type: "setSkill",
						skill: "Investigate",
						value: 1,
						button: "Investigate (1)",
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
			description:
				"Your efforts uncover a massive conspiracy against your employers, you are automatically promoted.",
			result: { type: "promotion" },
		},
	},
	mishapList: [
		{ type: "redirect", destination: "injury", modifier: "disadvantage" },

		{
			type: "choice",
			description: "Someone you are investigating offers you a deal...",
			choiceList: ["a", "b"],
			choice: {
				a: {
					description:
						"You leave the career, sacrificing some honor, but losing little else...",
					button: "Accept the deal...",
					type: "generic",
				},
				b: {
					type: "reward",
					description:
						"You leave the career after being injured by the one whose deal you refused...",
					button: "Decline the deal...",
					result: {
						type: "multiple",
						list: ["redirect", "enemy", "choice"],
						details: {
							redirect: {
								type: "redirect",
								destination: "injury",
								modifier: "disadvantage",
							},
							enemy: {
								type: "enemy",
								value: 1,
								description:
									"Someone you were investigating while working your Agent career, who offered you a deal that you refused.",
							},
							choice: {
								type: "choice",
								choiceType: "increaseAny",
							},
						},
					},
				},
			},
		},
		{
			type: "check",
			checkType: "skill",
			checkSkill: "Advocate",
			specialty: null,
			checkDC: 8,
			description:
				"An investigation goes horribly wrong-- or right-- ending your career.",
			pass: {
				type: "generic",
				description:
					"You manage to defend yourself well enough that you are able to leave amicably...",
			},
			fail: {
				//TODO: ADD SPECIAL PRISONER EVENT FOR AGENT~!
				type: "special",
				specialType: "prisoner",
			},
		},

		{
			type: "reward",
			description:
				"You learn something better left alone, and gain a new enemy, becoming just a little more familiar with deception...",
			result: {
				type: "multiple",
				list: ["enemy", "skill"],
				details: {
					skill: { type: "setSkill", skill: "Deception", value: 1 },
					enemy: {
						type: "enemy",
						value: 1,
						description:
							"Someone you investigated as an Agent, who wants to kill you for what you uncovered.",
					},
				},
			},
		},

		{ type: "special", specialType: "closeHurt" },

		{ type: "redirect", destination: "injury" },
	],
	skills: {
		personal: [
			{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
			{ type: "stat", stat: "dex" },
			{ type: "stat", stat: "end" },
			{ type: "skill", skill: "Melee", specialty: {Melee: "any"} },
			{ type: "stat", stat: "int" },
			{ type: "skill", skill: "Athletics", specialty: {Athletics: "any"} },
		],
		service: [
			{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
			{ type: "skill", skill: "Drive", specialty: {Drive: "any"} },
			{ type: "skill", skill: "Investigate", specialty: {Investigate: null} },
			{ type: "skill", skill: "Flyer", specialty: {Flyer: "any"} },
			{ type: "skill", skill: "Recon", specialty: {Recon: null} },
			{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
		],
		advanced: [
			{ type: "skill", skill: "Advocate", specialty: {Advocate: null} },
			{ type: "skill", skill: "Language", specialty: {Language: "any"} },
			{ type: "skill", skill: "Explosives", specialty: {Explosives: null} },
			{ type: "skill", skill: "Medic", specialty: {Medic: null} },
			{ type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null} },
			{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
		],
		specialties: {
			intelligence: [
				{ type: "skill", skill: "Investigate", specialty: {Investigate: null}},
				{ type: "skill", skill: "Recon", specialty: {Recon: null} },
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "comms"} },
				{ type: "skill", skill: "Stealth", specialty: {Stealth: null} },
				{ type: "skill", skill: "Persuade", specialty: {Persuade: null} },
				{ type: "skill", skill: "Deception", specialty: {Deception: null} },
			],
			lawEnforcement: [
				{ type: "skill", skill: "Investigate", specialty: {Investigate: null}},
				{ type: "skill", skill: "Recon", specialty: {Recon: null} },
				{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
				{ type: "skill", skill: "Stealth", specialty: {Stealth: null} },
				{ type: "skill", skill: "Melee", specialty: {Melee: "any"} },
				{ type: "skill", skill: "Advocate", specialty: {Advocate: null} },
			],
			corporate: [
				{ type: "skill", skill: "Investigate", specialty: {Investigate: null} },
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "computers"} },
				{ type: "skill", skill: "Stealth", specialty: {Stealth: null} },
				{ type: "skill", skill: "Carouse", specialty: {Carouse: null} },
				{ type: "skill", skill: "Deception", specialty: {Deception: null} },
				{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
			],
		},
	},
	benefits: [
		{ money: 1000, misc: "Scientific Equipment" },
		{ money: 2000, misc: "int increase" },
		{ money: 5000, misc: "Ship Share" },
		{ money: 7500, misc: "Weapon Choice" },
		{ money: 10000, misc: "Combat Implant Choice" },
		{
			money: 25000,
			misc: "choice",
			miscList: ["soc", "Combat Implant"],
			miscValue: 1,
		},
		{ money: 50000, misc: "TAS membership" },
	],
	specialtiesList: ["intelligence", "lawEnforcement", "corporate"],
};
export const corporate: CareerSpecialty = {
	title: "Corporate Agent",
	description: "You work for a corporation, spying on rival organizations.",
	survivalSkill: "int",
	survivalDC: 5,
	advancementSkill: "int",
	advancementDC: 8,
	ranks: [
		{ title: "Novice Agent", bonus: false },
		{
			title: "Agent",
			bonus: { type: "skill", skill: "Deception", specialty: {Deception: null}, value: 1 },
		},
		{
			title: "Field Agent",
			bonus: { type: "skill", skill: "Investigate", specialty: {Investigate: null}, value: 1 },
		},
		{ title: "Senior Field Agent", bonus: false },
		{
			title: "Special Agent",
			bonus: { type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"}, value: 1 },
		},
		{ title: "Assistant Director", bonus: false },
		{ title: "Director", bonus: false },
	],
	eventList: agent.eventList,
	mishapList: agent.mishapList,
	benefits: agent.benefits,
	skills: agent.skills,
	parent: "agent",
};
export const lawEnforcement: CareerSpecialty = {
	title: "Law Enforcement Agent",
	description: "You are a police officer or detective.",
	survivalSkill: "end",
	survivalDC: 6,
	advancementSkill: "int",
	advancementDC: 6,
	ranks: [
		{ title: "Rookie", bonus: false },
		{
			title: "Corporal",
			bonus: { type: "skill", skill: "Streetwise", specialty: {Streetwise: null}, value: 1 },
		},
		{ title: "Sergeant", bonus: false },
		{ title: "Detective", bonus: false },
		{
			title: "Lieutenant",
			bonus: { type: "skill", skill: "Investigate", specialty: {Investigate: null}, value: 1 },
		},
		{
			title: "Chief",
			bonus: { type: "skill", skill: "Admin", specialty: {Admin: null}, value: 1 },
		},
		{
			title: "Commisioner",
			bonus: { type: "stat", stat: "soc", value: 1 },
		},
	],
	eventList: agent.eventList,
	mishapList: agent.mishapList,
	benefits: agent.benefits,
	skills: agent.skills,
	parent: "agent",
};
export const intelligence: CareerSpecialty = {
	title: "Intelligence Agent",
	description:
		"You work as a spy or saboteur for a governmental or pseudo-governmental organization.",
	survivalSkill: "int",
	survivalDC: 7,
	advancementSkill: "int",
	advancementDC: 5,
	ranks: [
		{ title: "Novice Agent", bonus: false },
		{
			title: "Agent",
			bonus: { type: "skill", skill: "Deception", specialty: {Deception: null}, value: 1 },
		},
		{
			title: "Field Agent",
			bonus: { type: "skill", skill: "Investigate", specialty: {Investigate: null}, value: 1 },
		},
		{ title: "Senior Field Agent", bonus: false },
		{
			title: "Special Agent",
			bonus: { type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"}, value: 1 },
		},
		{ title: "Assistant Director", bonus: false },
		{ title: "Director", bonus: false },
	],
	eventList: agent.eventList,
	mishapList: agent.mishapList,
	benefits: agent.benefits,
	skills: agent.skills,
	parent: "agent",
};
