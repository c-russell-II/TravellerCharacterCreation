import { CareerSpecialty, ParentCareer } from "../CareerTyping";

export const citizen: ParentCareer = {
	title: "Citizen",
	hasCommission: false,
	qualification: true,
	qualificationStat: "edu",
	qualificationDC: 5,
	description:
		"Individuals serving a corporation, bureaucracy, or industry, or who are making a new life on an untamed planet.",
	eventList: {
		2: {
			type: "redirect",
			destination: "mishap",
			description: "Disaster!",
			noMuster: true,
		},
		3: { type: "special", specialType: "gainRoll" },
		4: {
			type: "reward",
			description:
				"You spend time maintaining and using heavy vehicles, either as part of your job or as a hobby.",
			result: {
				type: "choice",
				choiceType: "increaseSkill",
				choiceList: ["Mechanic", "Drive", "Flyer", "Engineer"],
				specialty: {
					Drive: "any",
					Flyer: "any",
					Engineer: "any",
					Mechanic: null,
				},
			},
		},
		5: {
			type: "reward",
			description:
				"Your business expands, your corporation grows, or your colony thrives.",
			result: { type: "benefit", value: 1 },
		},
		6: {
			type: "check",
			checkType: "stat",
			checkStat: "edu",
			checkDC: 10,
			description:
				"You are offered an opportunity for advanced, specialist training.",
			pass: {
				type: "reward",
				description:
					"Taking full advantage, your skills noticeably increase.",
				result: { type: "choice", choiceType: "setAny", value: 1 },
			},
			fail: {
				description:
					"You do not manage to measure up to your instructors' standards.",
				type: "generic",
			},
		},
		7: { type: "redirect", destination: "life" },
		8: {
			type: "choice",
			description:
				"You learn something you shouldn't have- a corporate secret, a political scandal - which you can profit from illegally, if you choose.",
			choiceList: ["a", "b"],
			choice: {
				a: {
					type: "reward",
					description:
						"You either meet someone capable of helping you, or learn a bit about navigating this sort of backroom dealing, and make a tidy profit.",
					button: "Take advantage.",
					result: {
						type: "choice",
						choiceType: "multiple",
						choiceList: ["multipleA", "multipleB"],
						choiceDetails: {
							multipleA: {
								type: "multiple",
								list: ["benefit", "choice"],
								button: "Benefit and Skill",
								details: {
									benefit: { type: "benefit", value: 1 },
									choice: {
										type: "choice",
										choiceType: "setSkill",
										choiceList: [
											"Streetwise",
											"Investigate",
										],
										specialtyList: {
											Streetwise: null,
											Investigate: null,
										},
										value: 1,
									},
								},
							},
							multipleB: {
								type: "multiple",
								list: ["benefit", "contact"],
								button: "Benefit and Contact",
								details: {
									benefit: { type: "benefit", value: 1 },
									contact: {
										type: "contact",
										value: 1,
										description:
											"Criminal who helped you illegally exploit a scandal or secret you uncovered as a Citizen.",
									},
								},
							},
						},
					},
				},
				b: {
					description:
						"You refuse to take advantage, earning little, but keeping your honor intact.",
					type: "generic",
					button: "Stay away",
				},
			},
		},
		9: {
			type: "reward",
			description: "You are rewarded for your diligence or cunning.",
			result: { type: "advancement", value: 2 },
		},
		10: {
			type: "reward",
			description:
				"You gain experience in a technical field as a computer operator or surveyor.",
			result: {
				type: "choice",
				choiceType: "increaseSkill",
				choiceList: ["Electronics", "Engineer"],
				specialty: { Electronics: "any", Engineer: "any" },
			},
		},
		11: {
			type: "reward",
			description:
				"You befriend a superior in the corporation or colony.",
			result: {
				type: "multiple",
				list: ["choice", "ally"],
				details: {
					choice: {
						type: "choice",
						choiceType: "multiple",
						choiceList: ["Diplomat", "advancement"],
						choiceDetails: {
							Diplomat: {
								type: "setSkill",
								value: 1,
								skill: "Diplomat",
								button: "Diplomat 1",
							},
							advancement: {
								type: "advancement",
								value: 4,
								button: "Advancement + 4",
							},
						},
					},
					ally: {
						type: "ally",
						value: 1,
						description: "Superior from your time as a Citizen.",
					},
				},
			},
		},
		12: {
			type: "reward",
			description:
				"You rise to a position of power in your corporation or colony.",
			result: { type: "promotion" },
		},
	},
	mishapList: [
		{ type: "redirect", destination: "injury", modifier: "disadvantage" },
		{
			type: "reward",
			result: {
				type: "enemy",
				value: 1,
				description:
					"Criminal gang who harassed you during your citizen career",
			},
			description:
				"You are harrased and your life ruined by a criminal gang.",
		},
		{
			type: "reward",
			result: { type: "stat", stat: "soc", value: -1 },
			description:
				"Hard times caused by a lack of interstellar trade cost you your job- and some respect.",
		},
		{
			type: "choice",
			choiceList: ["a", "b"],
			description:
				"Your business or colony is investigated by interplanetary authorities, or interfered with by a special interest group.",
			choice: {
				a: {
					type: "reward",
					description:
						"You cooperate, and the business or colony is shut down.",
					button: "Cooperate",
					result: { type: "qualification", career: "any", value: 2 },
				},
				b: {
					type: "reward",
					description:
						"You refuse to cooperate, and are forced out of this career by the outside group- but your boss knows what you did, and is grateful for it.",
					button: "Refuse",
					result: {
						type: "ally",
						value: 1,
						description:
							"Your boss from Citizen career, who you dealt with an outside force or interference for.",
					},
				},
			},
		},
		{
			type: "check",
			checkType: "skill",
			checkSkill: "Streetwise",
			specialty: null,
			checkDC: 8,
			description:
				"A revolution, attack, or other violent event throws your life into chaos, forcing you to move far away- perhaps even to a new planet.",
			pass: {
				type: "reward",
				description:
					"Navigating the upheaval, you sharpen your skills.",
				result: { type: "choice", choiceType: "increaseAny" },
			},
			fail: {
				type: "generic",
				description:
					"You barely manage to escape the planet unscathed, and start trying to put your life back on track.",
			},
		},
		{ type: "redirect", destination: "injury" },
	],
	skills: {
		personal: [
			{ type: "stat", stat: "edu" },
			{ type: "stat", stat: "int" },
			{ type: "skill", skill: "Carouse", specialty: {Carouse: null} },
			{ type: "skill", skill: "Gambler", specialty: {Gambler: null} },
			{ type: "skill", skill: "Drive", specialty: {Drive: "any"} },
			{ type: "skill", skill: "JackOfAllTrades", specialty: {JackOfAllTrades: null} },
		],
		service: [
			{ type: "skill", skill: "Drive", specialty: {Drive: "any"} },
			{ type: "skill", skill: "Flyer", specialty: {Flyer: "any"} },
			{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
			{ type: "skill", skill: "Melee", specialty: {Melee: "any"} },
			{ type: "skill", skill: "Steward", specialty: {Steward: null} },
			{ type: "skill", skill: "Profession", specialty: {Profession: "any"} },
		],
		advanced: [
			{ type: "skill", skill: "Art", specialty: {Art: "any"} },
			{ type: "skill", skill: "Advocate", specialty: {Advocate: null} },
			{ type: "skill", skill: "Diplomat", specialty: {Diplomat: null} },
			{ type: "skill", skill: "Language", specialty: {Language: "any"} },
			{ type: "skill", skill: "Electronics", specialty: {Electronics: "computers"} },
			{ type: "skill", skill: "Medic", specialty: {Medic: null} },
		],
		specialties: {
			corporate: [
				{ type: "skill", skill: "Advocate", specialty: {Advocate: null} },
				{ type: "skill", skill: "Admin", specialty: {Admin: null} },
				{ type: "skill", skill: "Broker", specialty: {Broker: null} },
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "computers"} },
				{ type: "skill", skill: "Diplomat", specialty: {Diplomat: null} },
				{ type: "skill", skill: "Leadership", specialty: {Leadership: null} },
			],
			worker: [
				{ type: "skill", skill: "Drive", specialty: {Drive: "any"} },
				{ type: "skill", skill: "Mechanic", specialty: {Mechanic: null} },
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
				{ type: "skill", skill: "Engineer", specialty: {Engineer: "any"}},
				{ type: "skill", skill: "Profession", specialty: {Profession: "any"} },
				{ type: "skill", skill: "Science", specialty: {Science: "any"} },
			],
			colonist: [
				{ type: "skill", skill: "Animals", specialty: {Animals: "any"} },
				{ type: "skill", skill: "Athletics", specialty: {Athletics: "any"} },
				{ type: "skill", skill: "JackOfAllTrades", specialty: {JackOfAllTrades: null} },
				{ type: "skill", skill: "Drive", specialty: {Drive: "any"} },
				{ type: "skill", skill: "Survival", specialty: {Survival: null} },
				{ type: "skill", skill: "Recon", specialty: {Recon: null} },
			],
		},
	},
	benefits: [
		{ money: 2000, misc: "ShipShare", miscValue: 1 },
		{ money: 5000, misc: "Ally" },
		{ money: 10000, misc: "int", miscValue: 1 },
		{ money: 10000, misc: "Gun" },
		{ money: 10000, misc: "edu", miscValue: 1 },
		{ money: 50000, misc: "ShipShares", miscValue: 2 },
		{ money: 100000, misc: "TAS" },
	],
	specialtiesList: ["corporate", "worker", "colonist"],
};

export const manager: CareerSpecialty = {
	title: "Corporate Manager",
	description: "You are an executive or manager in a large organization.",
	survivalSkill: "soc",
	survivalDC: 6,
	advancementSkill: "int",
	advancementDC: 6,
	eventList: citizen.eventList,
	mishapList: citizen.mishapList,
	ranks: [
		{ title: "Team Lead", bonus: false },
		{ title: "Senior Lead", bonus: false },
		{
			title: "Assistant Manager",
			bonus: { type: "skill", skill: "Investigate", specialty: {Investigate: null}, value: 1 },
		},
		{ title: "Manager", bonus: false },
		{
			title: "Senior Manage",
			bonus: { type: "skill", skill: "Advocate", specialty: {Advocate: null}, value: 1 },
		},
		{ title: "Assistant Director", bonus: false },
		{ title: "Director", bonus: false },
	],
	skills: citizen.skills,
	benefits: citizen.benefits,
	parent: "citizen",
};
export const worker: CareerSpecialty = {
	title: "Worker",
	description: "You are a blue collar worker on an industrial world.",
	survivalSkill: "end",
	survivalDC: 4,
	advancementSkill: "edu",
	advancementDC: 8,
	eventList: citizen.eventList,
	mishapList: citizen.mishapList,
	ranks: [
		{ title: "Journeyman", bonus: false },
		{ title: "Novice Technician", bonus: false },
		{
			title: "Technician",
			bonus: {
				type: "skill",
				skill: "Profession",
				specialty: {Profession: "any"},
				value: 1,
			},
		},
		{ title: "Senior Technician", bonus: false },
		{
			title: "Craftsman",
			bonus: { type: "skill", skill: "Mechanic", specialty: {Mechanic: null}, value: 1 },
		},
		{ title: "Senior Craftsman", bonus: false },
		{
			title: "Master Technician",
			bonus: {
				type: "skill",
				skill: "Engineer",
				specialty: {Engineer: "any"},
				value: 1,
			},
		},
	],
	skills: citizen.skills,
	benefits: citizen.benefits,
	parent: "citizen",
};
export const colonist: CareerSpecialty = {
	title: "Colonist",
	description:
		"You are building a new life on a recently settled world that still needs taming.",
	survivalSkill: "int",
	survivalDC: 7,
	advancementSkill: "end",
	advancementDC: 5,
	eventList: citizen.eventList,
	mishapList: citizen.mishapList,
	ranks: [
		{ title: "Greenhorn", bonus: false },
		{ title: "Junior Settler", bonus: false },
		{
			title: "Settler",
			bonus: { type: "skill", skill: "Survival", specialty: {Survival: null}, value: 1 },
		},
		{ title: "Senior Settler", bonus: false },
		{
			title: "Explorer",
			bonus: { type: "skill", skill: "Navigation", specialty: {Navigation: null}, value: 1 },
		},
		{ title: "Senior Explorer", bonus: false },
		{
			title: "Trailblazer",
			bonus: {
				type: "skill",
				skill: "GunCombat",
				specialty: {GunCombat: "any"},
				value: 1,
			},
		},
	],
	skills: citizen.skills,
	benefits: citizen.benefits,
	parent: "citizen",
};
