import { CareerSpecialty, ParentCareer } from "../CareerTyping";

export const entertainer: ParentCareer = {
	title: "Entertainer",
	hasCommission: false,
	description:
		"Individuals who are involved with the media, whether as reporters, artists, or celebrities",
	qualification: true,
	qualificationStat: "choice",
	qualificationChoices: ["dex", "int"],
	qualificationDC: 5,
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
			choiceList: ["Art", "Investigate"],
			specialtyList: { Art: "any", Persuade: null },
			checkDC: 8,
			description:
				"You are invited to take part in a controversial exhibition or event.",
			pass: {
				type: "reward",
				description:
					"The event goes over remarkably well, noticeably boosting your status.",
				result: { type: "stat", stat: "soc", value: 1 },
			},
			fail: {
				type: "reward",
				description:
					"The controversy overtakes the art, and your status in society noticeably declines.",
				result: { type: "stat", stat: "soc", value: -1 },
			},
		},
		4: {
			type: "reward",
			description:
				"You are a part of your homeworld's celebrity circles.",
			result: {
				type: "choice",
				choiceType: "multiple",
				choiceList: ["Carouse", "Persuade", "Steward", "contact"],
				choiceDetails: {
					Carouse: {
						type: "setSkill",
						skill: "Carouse",
						value: 1,
						button: "Carouse 1",
					},
					Persuade: {
						type: "setSkill",
						skill: "Persuade",
						value: 1,
						button: "Persuade 1",
					},
					Steward: {
						type: "setSkill",
						skill: "Steward",
						value: 1,
						button: "Steward 1",
					},
					contact: {
						type: "contact",
						value: 1,
						description:
							"Someone you came into contact with after becoming a celebrity on your homeworld.",
						button: "Contact",
					},
				},
			},
		},
		5: {
			type: "reward",
			description:
				"One of your works is especially well received and popular.",
			result: { type: "benefit", value: 1 },
		},
		6: {
			type: "reward",
			description: "You gain a patron in the arts.",
			result: {
				type: "multiple",
				list: ["advancement", "ally"],
				details: {
					advancement: { type: "advancement", value: 1 },
					ally: {
						type: "ally",
						value: 1,
						description: "Patron of the arts.",
					},
				},
			},
		},
		7: { type: "redirect", destination: "life" },
		8: {
			type: "choice",
			choiceList: ["a", "b"],
			description:
				"You have the opportunity to criticize or even bring down a questionable political leader on your homeworld.",
			choice: {
				a: {
					button: "Take them on.",
					type: "check",
					checkType: "choice",
					choiceList: ["Art", "Persuade"],
					specialtyList: { Art: "any", Persuade: null },
					description: "You attempt to bring them down.",
					checkDC: 8,
					pass: {
						type: "reward",
						description:
							"You succeed in bringing down the political leader.",
						result: {
							type: "multiple",
							list: ["enemy", "choice"],
							details: {
								enemy: {
									type: "enemy",
									value: 1,
									description:
										"Political leader you took out while working an entertainer career.",
								},
								choice: {
									type: "choice",
									choiceType: "increaseAny",
								},
							},
						},
					},
					fail: {
						type: "reward",
						description:
							"You fail to bring down the political leader.",
						result: {
							type: "multiple",
							list: ["enemy", "choice", "redirect"],
							details: {
								enemy: {
									type: "enemy",
									description:
										"Political leader you tried- and failed- to take down while working as an entertainer.",
									value: 1,
								},
								choice: {
									type: "choice",
									choiceType: "increaseAny",
								},
								redirect: {
									type: "redirect",
									destination: "mishap",
								},
							},
						},
					},
				},
				b: {
					button: "Support them",
					type: "generic",
					description:
						"You decide to support the questionable political leader...",
				},
			},
		},
		9: {
			type: "reward",
			description:
				"You go on a tour of the sector, visiting several worlds.",
			result: { type: "contact", value: "roll", roll: 2 },
		},
		10: {
			type: "reward",
			description:
				"One of your pieces of art is stolen, and the investigation brings you into the criminal underworld.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				value: 1,
				choiceList: ["Streetwise", "Investigate", "Recon", "Stealth"],
				specialtyList: {
					Streetwise: null,
					Investigate: null,
					Recon: null,
					Stealth: null,
				},
			},
		},
		11: { type: "redirect", destination: "unusual" },
		12: {
			type: "reward",
			description: "You win a prestigious prize.",
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
			type: "generic",
			description:
				"You expose or are involved in a scandal of some description.",
		},
		{
			type: "reward",
			description: "Public opinion turns on you.",
			result: { type: "stat", stat: "soc", value: -1 },
		},
		{ type: "special", specialType: "betrayal" },
		{
			type: "reward",
			description:
				"An investigation, tour, project, or expedition goes wrong.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Survival", "Pilot", "Persuade", "Streetwise"],
				specialtyList: {
					Survival: null,
					Pilot: "any",
					Persuade: null,
					Streetwise: null,
				},
				value: 1,
			},
		},
		{
			type: "reward",
			description:
				"You are forced out due to censorship or controversy. What truth did you get too close to?",
			result: { type: "qualification", career: "any", value: 2 },
		},
	],
	skills: {
		personal: [
			{ type: "stat", stat: "dex" },
			{ type: "stat", stat: "int" },
			{ type: "stat", stat: "soc" },
			{ type: "skill", skill: "Language", specialty: {Language: "any"} },
			{ type: "skill", skill: "Carouse", specialty: {Carouse: null} },
			{ type: "skill", skill: "JackOfAllTrades", specialty: {JackOfAllTrades: null} },
		],
		service: [
			{ type: "skill", skill: "Art", specialty: {Art: "any"} },
			{ type: "skill", skill: "Carouse", specialty: {Carouse: null} },
			{ type: "skill", skill: "Deception", specialty: {Deception: null} },
			{ type: "skill", skill: "Drive", specialty: {Drive: "any"} },
			{ type: "skill", skill: "Persuade", specialty: {Persuade: null} },
			{ type: "skill", skill: "Steward", specialty: {Steward: null} },
		],
		advanced: [
			{ type: "skill", skill: "Advocate", specialty: {Advocate: null} },
			{ type: "skill", skill: "Broker", specialty: {Broker: null} },
			{ type: "skill", skill: "Deception", specialty: {Deception: null} },
			{ type: "skill", skill: "Science", specialty: {Science: "any"} },
			{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
			{ type: "skill", skill: "Diplomat", specialty: {Diplomat: null} },
		],
		specialties: {
			artist: [
				{ type: "skill", skill: "Art", specialty: {Art: "any"} },
				{ type: "skill", skill: "Carouse", specialty: {Carouse: null} },
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "computers"} },
				{ type: "skill", skill: "Gambler", specialty: {Gambler: null} },
				{ type: "skill", skill: "Persuade", specialty: {Persuade: null} },
				{ type: "skill", skill: "Profession", specialty: {Profession: "any"} },
			],
			journalist: [
				{
					type: "skill",
					skill: "Art",
					specialty: {Art: ["holography", "write"]},
				},
				{ type: "skill", skill: "Electronics", specialty:{Electronics: "any"} },
				{ type: "skill", skill: "Drive", specialty: {Drive: "any"} },
				{ type: "skill", skill: "Investigate", specialty: {Investigate: null} },
				{ type: "skill", skill: "Recon", specialty: {Recon: null} },
				{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
			],
			Performer: [
				{
					type: "skill",
					skill: "Art",
					specialty: {Art: ["performer", "instrument"]},
				},
				{ type: "skill", skill: "Athletics", specialty: {Athletics: "any"} },
				{ type: "skill", skill: "Carouse", specialty: {Carouse: null} },
				{ type: "skill", skill: "Deception", specialty: {Deception: null} },
				{ type: "skill", skill: "Stealth", specialty: {Stealth: null} },
				{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
			],
		},
	},
	benefits: [
		{ money: 0, misc: "Contact" },
		{ money: 0, misc: "soc", miscValue: 1 },
		{ money: 10000, misc: "Contact" },
		{ money: 10000, misc: "soc", miscValue: 1 },
		{ money: 40000, misc: "int", miscValue: 1 },
		{ money: 40000, misc: "ShipShare", miscValue: 2 },
	],
	specialtiesList: ["artist", "journalist", "performer"],
};

export const artist: CareerSpecialty = {
	title: "Artist",
	description: "You are a writer, holographer, or other creative.",
	survivalSkill: "soc",
	survivalDC: 6,
	advancementSkill: "int",
	advancementDC: 6,
	eventList: entertainer.eventList,
	mishapList: entertainer.mishapList,
	ranks: [
		{ title: "Starving Artist", bonus: false },
		{
			title: "Freelance Artist",
			bonus: { type: "skill", skill: "art", specialty: {Art: "any"}, value: 1 },
		},
		{ title: "Working Artist", bonus: false },
		{
			title: "Known Artist",
			bonus: { type: "skill", skill: "Investigate", specialty: {Investigate: null}, value: 1 },
		},
		{ title: "Artist", bonus: false },
		{
			title: "Famous Artist",
			bonus: { type: "stat", stat: "soc", value: 1 },
		},
		{ title: "Acclaimed Artist", bonus: false },
	],
	skills: entertainer.skills,
	benefits: entertainer.benefits,
	parent: "entertainer",
};
export const journalist: CareerSpecialty = {
	title: "Journalist",
	description:
		"You report on local or galactic events for a news feed, the TAS or other organization.",
	survivalSkill: "edu",
	survivalDC: 7,
	advancementSkill: "int",
	advancementDC: 5,
	eventList: entertainer.eventList,
	mishapList: entertainer.mishapList,
	ranks: [
		{ title: "Novice", bonus: false },
		{
			title: "Freelancer",
			bonus: {
				type: "skill",
				skill: "Electronics",
				specialty: {Electronics: "comms"},
				value: 1,
			},
		},
		{
			title: "Staff Writer",
			bonus: { type: "skill", skill: "Investigate", specialty: {Investigate: null}, value: 1 },
		},
		{ title: "Senior Staff Writer", bonus: false },
		{
			title: "Correspondent",
			bonus: { type: "skill", skill: "Persuade", specialty: {Persuade: null}, value: 1 },
		},
		{ title: "Experienced Correspondent", bonus: false },
		{
			title: "Senior Correspondent",
			bonus: { type: "stat", stat: "soc", value: 1 },
		},
	],
	skills: entertainer.skills,
	benefits: entertainer.benefits,
	parent: "entertainer",
};
export const performer: CareerSpecialty = {
	title: "Performer",
	description:
		"You are an actor, dancer, acrobat, professional athlete, or other public performer.",
	survivalSkill: "int",
	survivalDC: 5,
	advancementSkill: "dex",
	advancementDC: 7,
	eventList: entertainer.eventList,
	mishapList: entertainer.mishapList,
	ranks: [
		{ title: "Rookie", bonus: false },
		{ title: "Sophomore", bonus: { type: "stat", stat: "dex", value: 1 } },
		{ title: "Mainstay", bonus: false },
		{ title: "Veteran", bonus: { type: "stat", stat: "str", value: 1 } },
		{ title: "Proficient Performer", bonus: false },
		{
			title: "Famous Performer",
			bonus: { type: "stat", stat: "soc", value: 1 },
		},
		{ title: "All-Star Performer", bonus: false },
	],
	skills: entertainer.skills,
	benefits: entertainer.benefits,
	parent: "entertainer",
};
