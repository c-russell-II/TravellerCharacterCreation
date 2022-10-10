export const noble = {
	title: "Noble",
	description:
		"Individuals of the upper class who perform little consistent function, but often have large amounts of ready money.",
	qualification: true,
	qualificationStat: "threshold",
	qualificationThreshold: { stat: "soc", value: 10 },
	qualificationDC: 10,
	eventList: {
		2: {
			type: "redirect",
			destination: "mishap",
			description: "Disaster!",
			noMuster: true,
		},
		3: {
			type: "choice",
			choiceList: ["a", "b"],
			description:
				"You get challenged to a duel for your honour and standing.",
			a: {
				button: "Fight the Duel!",
				type: "check",
				checkType: "skill",
				checkSkill: "Melee",
				specialty: "any",
				checkDC: 8,
				pass: {
					type: "reward",
					description:
						"You fight well, and honorably, and win the honour duel.",
					result: {
						type: "multiple",
						list: ["choice", "stat"],
						choice: {
							type: "choice",
							choiceType: "increaseSkill",
							choiceList: [
								"Melee",
								"Leadership",
								"Tactics",
								"Deception",
							],
							specialtyList: {
								Melee: "blade",
								Leadership: null,
								Tactics: "any",
								Deception: null,
							},
						},
						stat: { type: "stat", stat: "soc", value: 1 },
					},
				},
				fail: {
					type: "reward",
					description:
						"You fight well- but not well enough. You lose the honour duel.",
					result: {
						type: "multiple",
						list: ["redirect", "stat", "choice"],
						redirect: { type: "redirect", destination: "injury" },
						stat: { type: "stat", stat: "soc", value: -1 },
						choice: {
							type: "choice",
							choiceType: "increaseSkill",
							choiceList: [
								"Melee",
								"Leadership",
								"Tactics",
								"Deception",
							],
							specialtyList: {
								Melee: "blade",
								Leadership: null,
								Tactics: "any",
								Deception: null,
							},
						},
					},
				},
			},
			b: {
				button: "Play it safe.",
				description:
					"You refuse, guaranteeing your safety- but, perhaps, not all your dignity.",
				type: "generic",
			},
		},
		4: {
			type: "reward",
			description:
				"Your time as a ruler or player gives you a wide range of experiences.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Animals", "Art", "Carouse", "Streetwise"],
				specialtyList: {
					Animals: "riding",
					Art: "any",
					Carouse: null,
					Streetwise: null,
				},
				value: 1,
			},
		},
		5: {
			type: "reward",
			description: "You inherit a gift from a rich relative.",
			result: { type: "benefit", value: 1 },
		},
		6: {
			type: "reward",
			description:
				"You become deeply involved in politics on your world of residence, becoming a player in the political intrigues of government.",
			result: {
				type: "multiple",
				list: ["choice", "rival"],
				choice: {
					type: "choice",
					choiceType: "increaseSkill",
					choiceList: ["Advocate", "Admin", "Diplomacy", "Persuade"],
					specialtyList: {
						Advocate: null,
						Admin: null,
						Diplomacy: null,
						Persuade: null,
					},
				},
				rival: {
					type: "rival",
					value: 1,
					description:
						"Rival from political intruge related to your Noble career.",
				},
			},
		},
		7: { type: "redirect", destination: "life" },
		8: {
			type: "choice",
			choiceList: ["a", "b"],
			description: "A conspiracy of nobles attempt to recruit you.",
			a: {
				button: "Join them.",
				result: {
					type: "check",
					checkType: "choice",
					choiceList: ["Deception", "Persuade"],
					checkDC: 8,
					pass: {
						type: "reward",
						description:
							"You masterfully navigate the difficulties involved in such a conspiracy.",
						result: {
							type: "choice",
							choiceType: "increaseSkill",
							choiceList: [
								"Deception",
								"Persuade",
								"Tactics",
								"Carouse",
							],
							specialtyList: {
								Deception: null,
								Persuade: null,
								Tactics: "any",
								Carouse: null,
							},
						},
					},
					fail: {
						description:
							"The intricacies of this type of conspiracy are too much for you and your fellows, and the conspiracy collapses.",
						type: "redirect",
						destination: "mishap",
					},
				},
			},
			b: {
				button: "Refuse the offer.",
				type: "reward",
				description:
					"You refuse the offer, in the process angering quite a few powerful nobles.",
				result: {
					type: "enemy",
					value: 1,
					description:
						"Conspiracy of nobles whose offer of membership you refused outright.",
				},
			},
		},
		9: {
			type: "reward",
			description:
				"Your reign is acclaimed by all as being fair and wise- or, in the case of a dilettante, you sponge off your family's wealth.",
			result: {
				type: "multiple",
				list: ["enemy", "advancement"],
				enemy: {
					type: "enemy",
					value: 1,
					description:
						"A jealous relative or unhappy subject from your time in the noble career path.",
				},
				advancement: { type: "advancement", value: 2 },
			},
		},
		10: {
			type: "reward",
			description: "You manipulate and charm through high society.",
			result: {
				type: "multiple",
				list: ["skill", "rival", "ally"],
				skill: {
					type: "choice",
					choiceType: "increaseSkill",
					choiceList: ["Carouse", "Diplomat", "Persuade", "Steward"],
				},
				rival: {
					type: "rival",
					value: 1,
					description:
						"Someone who you manipulated for your own gain during your time on the Noble career path.",
				},
				ally: {
					type: "ally",
					value: 1,
					description:
						"Someone who you charmed or helped along the way, during your time on the Noble career path.",
				},
			},
		},
		11: {
			type: "reward",
			description:
				"You make an alliance with a powerful and charismatic noble.",
			result: {
				type: "multiple",
				list: ["ally", "choice"],
				ally: {
					type: "ally",
					value: 1,
					description:
						"A powerful and charismatic noble who supported you during your Noble career,",
				},
				choice: {
					type: "choice",
					choiceType: "multiple",
					choiceList: ["advancement", "Leadership"],
					advancement: {
						type: "advancement",
						value: 4,
						button: "Advancement + 4",
					},
					Leadership: {
						type: "increaseSkill",
						skill: "Leadership",
						button: "Increase Leadership",
					},
				},
			},
		},
		12: {
			type: "reward",
			description: "Your efforts do not go unnoticed by the Imperium.",
			result: { type: "promotion" },
		},
	},
	mishapList: [
		{ type: "redirect", destination: "injury", modifier: "disadvantage" },
		{
			type: "reward",
			description: "A family scandal forces you out of your position.",
			result: { type: "stat", stat: "soc", value: -1 },
		},
		{
			type: "check",
			checkType: "choice",
			choiceList: ["Stealth", "Deception"],
			checkDC: 8,
			description: "A disaster- natural or manmade- strikes.",
			pass: {
				description: "You manage to escape unhurt.",
				type: "generic",
			},
			fail: {
				description: "You are injured while attempting escape.",
				type: "redirect",
				destination: "injury",
			},
		},
		{
			type: "reward",
			description: "Political manoeuvrings usurp your position.",
			result: {
				type: "multiple",
				list: ["choice", "rival"],
				choice: {
					type: "choice",
					choiceType: "increaseSkill",
					choiceList: ["Diplomat", "Advocate"],
				},
				rival: {
					type: "rival",
					value: 1,
					description:
						"Someone who outmanoeuvered you politically, ending your career as a Noble.",
				},
			},
		},
		{
			type: "check",
			checkType: "stat",
			checkStat: "end",
			checkDC: 8,
			description: "An assassin attempts to end your life.",
			pass: {
				description:
					"You manage to survive the attempt with only minor wounds to show for it.",
				type: "generic",
			},
			fail: {
				description: "The assassin manages to injure you.",
				type: "redirect",
				destination: "injury",
			},
		},
		{ type: "redirect", destination: "injury" },
	],
	skills: {
		personal: [
			{ type: "stat", stat: "str" },
			{ type: "stat", stat: "dex" },
			{ type: "stat", stat: "end" },
			{ type: "skill", skill: "Gambler" },
			{ type: "skill", skill: "GunCombat" },
			{ type: "skill", skill: "Melee" },
		],
		service: [
			{ type: "skill", skill: "Admin" },
			{ type: "skill", skill: "Advocate" },
			{ type: "skill", skill: "Electronics" },
			{ type: "skill", skill: "Diplomat" },
			{ type: "skill", skill: "Investigate" },
			{ type: "skill", skill: "Persuade" },
		],
		advanced: [
			{ type: "skill", skill: "Admin" },
			{ type: "skill", skill: "Advocate" },
			{ type: "skill", skill: "Language" },
			{ type: "skill", skill: "Leadership" },
			{ type: "skill", skill: "Diplomat" },
			{ type: "skill", skill: "Art" },
		],
		specialties: {
			administrator: [
				{ type: "skill", skill: "Admin" },
				{ type: "skill", skill: "Advocate" },
				{ type: "skill", skill: "Broker" },
				{ type: "skill", skill: "Diplomat" },
				{ type: "skill", skill: "Leadership" },
				{ type: "skill", skill: "Persuade" },
			],
			diplomat: [
				{ type: "skill", skill: "Advocate" },
				{ type: "skill", skill: "Carouse" },
				{ type: "skill", skill: "Electronics" },
				{ type: "skill", skill: "Steward" },
				{ type: "skill", skill: "Diplomat" },
				{ type: "skill", skill: "Deception" },
			],
			dilettante: [
				{ type: "skill", skill: "Carouse" },
				{ type: "skill", skill: "Deception" },
				{ type: "skill", skill: "Flyer" },
				{ type: "skill", skill: "Streetwise" },
				{ type: "skill", skill: "Gambler" },
				{ type: "skill", skill: "JackOfAllTrades" },
			],
		},
	},
	benefits: [
		{ money: 10000, misc: "ShipShare", miscValue: 1 },
		{ money: 10000, misc: "ShipShare", miscValue: 2 },
		{ money: 50000, misc: "Blade" },
		{ money: 50000, misc: "soc", miscValue: 1 },
		{ money: 100000, misc: "TAS" },
		{ money: 100000, misc: "Yacht" },
		{
			money: 200000,
			misc: "multiple",
			list: ["soc", "Yacht"],
			miscValue: 1,
		},
	],
	specialtiesList: ["administrator", "diplomat", "dilettante"],
};

export const administrator = {
	title: "Administrator",
	description:
		"You serve in the planetary government or even rule over a fiefdom or other domain.",
	survivalSkill: "int",
	survivalDC: 4,
	advancementSkill: "edu",
	advancementDC: 6,
	eventList: noble.eventList,
	mishapList: noble.mishapList,
	ranks: [
		{ title: "Assistant", bonus: false },
		{ title: "Clerk", bonus: { type: "skill", skill: "Admin", value: 1 } },
		{ title: "Supervisor", bonus: false },
		{
			title: "Manager",
			bonus: { type: "skill", skill: "Advocate", value: 1 },
		},
		{ title: "Chief", bonus: false },
		{
			title: "Director",
			bonus: { type: "skill", skill: "Leadership", value: 1 },
		},
		{ title: "Minister", bonus: false },
	],
	skills: noble.skills,
	benefits: noble.benefits,
	parent: "noble",
};
export const diplomat = {
	title: "Diplomat",
	description: "You are a diplomat or other state official.",
	survivalSkill: "int",
	survivalDC: 5,
	advancementSkill: "soc",
	advancementDC: 7,
	eventList: noble.eventList,
	mishapList: noble.mishapList,
	ranks: [
		{ title: "Intern", bonus: false },
		{
			title: "Third Secretary",
			bonus: { type: "skill", skill: "Admin", value: 1 },
		},
		{ title: "Second Secretary", bonus: false },
		{
			title: "First Secretary",
			bonus: { type: "skill", skill: "Advocate", value: 1 },
		},
		{ title: "Counsellor", bonus: false },
		{
			title: "Minister",
			bonus: { type: "skill", skill: "Diplomat", value: 1 },
		},
		{ title: "Ambassador", bonus: false },
	],
	skills: noble.skills,
	benefits: noble.benefits,
	parent: "noble",
};
export const dilettante = {
	title: "Dilettante",
	description:
		"You are known for being known and have absolutely no useful function in society.",
	survivalSkill: "soc",
	survivalDC: 3,
	advancementSkill: "int",
	advancementDC: 8,
	eventList: noble.eventList,
	mishapList: noble.mishapList,
	ranks: [
		{ title: "Wastrel", bonus: false },
		{ title: "Layabout", bonus: false },
		{
			title: "Ingrate",
			bonus: { type: "skill", skill: "Carouse", value: 1 },
		},
		{ title: "Malingerer", bonus: false },
		{
			title: "Black Sheep",
			bonus: { type: "skill", skill: "Persuade", value: 1 },
		},
		{ title: "Profligate", bonus: false },
		{
			title: "Scoundrel",
			bonus: { type: "skill", skill: "JackOfAllTrades", value: 1 },
		},
	],
	skills: noble.skills,
	benefits: noble.benefits,
	parent: "noble",
};
