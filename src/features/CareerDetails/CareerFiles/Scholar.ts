import { CareerSpecialty, ParentCareer } from "../CareerTyping";

export const scholar: ParentCareer = {
	title: "Scholar",
	description:
		"Individuals trained in technological or research sciences who conduct scientific investigations into materials, situations and phenomena, or who practise medicine.",
	qualification: true,
	qualificationStat: "int",
	qualificationDC: 6,
	eventList: {
		2: {
			type: "redirect",
			destination: "mishap",
			description: "Disaster!",
			noMuster: true,
		},
		3: {
			type: "choice",
			description:
				"You are called upon to perform work that goes against your conscience.",
			choiceList: ["a", "b"],
			choice: {
				a: {
					type: "reward",
					button: "Do it anyway",
					description:
						"You choose to ignore your conscience in the name of your science, your career, or the greater good...",
					result: {
						type: "multiple",
						list: ["benefit", "skill", "enemy"],
						details: {
							benefit: { type: "addBenefit", value: 1 },
							skill: {
								type: "special",
								specialType: "multipleSpecs",
							},
							enemy: {
								type: "enemy",
								value: "roll",
								roll: 2,
								description:
									"People who were and are morally opposed to questionable research you were involved in as a Scholar.",
							},
						}
					},
				},
				b: {
					button: "This is wrong.",
					description:
						"You choose to follow your conscience, and stay out of it.",
					type: "generic",
				},
			},
		},
		4: {
			type: "reward",
			description:
				"You are assigned to work on a secret project for a patron or organization.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: [
					"Medic",
					"Science",
					"Engineer",
					"Electronics",
					"Investigate",
				],
				specialtyList: {
					Medic: null,
					Science: "any",
					Engineer: "any",
					Electronics: "any",
					Investigate: null,
				},
				value: 1,
			},
		},
		5: {
			type: "reward",
			description:
				"You win a prestigious prize for your work, garnering both the praise and envy of your peers.",
			result: { type: "benefit", value: 1 },
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
			choiceList: ["a", "b"],
			description:
				"You have an opportunity to cheat in some fashion, advancing your own causes by stealing another's work, using an alien device, taking an unethical shortcut, etc.",
			choice: {
				a: {
					button: "Do it.",
					description:
						"You choose to take advantage of the opportunity.",
					type: "check",
					checkType: "choice",
					choiceList: ["Deception", "Admin"],
					specialtyList: { Deception: null, Admin: null },
					checkDC: 8,
					pass: {
						type: "reward",
						description:
							"You exploit the opportunity to the fullest.",
						result: {
							type: "multiple",
							list: ["benefit", "skill", "enemy"],
							details: {
								benefit: { type: "benefit", value: 2 },
								skill: {
									type: "choice",
									choiceType: "increaseAny",
								},
								enemy: {
									type: "enemy",
									value: 1,
									description:
										"Someone who was harmed by your choice to cheat in some form or fashion while working as a Scholar.",
								},
							}
						},
					},
					fail: {
						type: "reward",
						description:
							"You fail to gain any significant advantage, at cost to yourself.",
						result: {
							type: "multiple",
							list: ["enemy", "addBenefit"],
							details: {
								enemy: {
									type: "enemy",
									value: 1,
									description:
										"Someone who your tried unsuccessfully to cheat out of their hard-earned credit and money.",
								},
								addBenefit: { type: "addBenefit", value: -1 },
							}
						},
					},
				},
				b: {
					button: "It'd be Wrong.",
					description:
						"You follow your conscience, keeping your heart clear, but at what cost...?",
					type: "generic",
				},
			},
		},
		9: {
			type: "reward",
			description: "You make a breakthrough in your field.",
			result: { type: "advancement", value: 2 },
		},
		10: {
			type: "reward",
			description:
				"You become entangled in a bureaucratic or legal morass that distracts you from your work.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Admin", "Advocate", "Persuade", "Diplomat"],
				specialtyList: {
					Admin: null,
					Advocate: null,
					Persuade: null,
					Diplomat: null,
				},
				value: 1,
			},
		},
		11: {
			type: "reward",
			description: "You work for an eccentric but brilliant mentor.",
			result: {
				type: "multiple",
				list: ["ally", "choice"],
				details: {
					ally: {
						type: "ally",
						value: 1,
						description:
							"An eccentric but brilliant person who mentored you during your time as a Scholar.",
					},
					choice: {
						type: "choice",
						choiceType: "multiple",
						choiceList: ["advancement", "Science"],
						choiceDetails: {
							advancement: {
								type: "advancement",
								value: 4,
								button: "Advancement + 4",
							},
							Science: {
								type: "increaseSkill",
								skill: "Science",
								specialty: "any",
								value: 1,
								button: "Increase Science(any)",
							},
						}
					},
				}
			},
		},
		12: {
			type: "reward",
			description: "Your work leads to a considerable breakthrough.",
			result: { type: "promotion" },
		},
	},
	mishapList: [
		{
			type: "redirect",
			destination: "injury table",
			modifier: "disadvantage",
		},
		{
			type: "reward",
			description:
				"A disaster leaves several injured, and others blame you- fairly or not.",
			result: {
				type: "multiple",
				list: ["rival", "redirect"],
				details: {
					rival: {
						type: "rival",
						value: 1,
						description:
							"Someone who blames you for a disaster that injured several people, during your stint as a Scholar.",
					},
					redirect: {
						type: "redirect",
						destination: "injury",
						modifier: "advantage",
					},
				}
			},
		},
		{
			type: "choice",
			choiceList: ["a", "b"],
			description:
				"The planetary government interferes with your work for religious or political reasons.",
			choice: {
				a: {
					type: "reward",
					button: "Continue openly.",
					description:
						"You continue with your work without regard for the government, making few friends.",
					//TODO: NOMUSTER in Scholar mishap list
					// noMuster: true,
					result: {
						type: "multiple",
						list: ["Science", "enemy"],
						details: {
							Science: {
								type: "increaseSkill",
								skill: "Science",
								specialty: "any",
								value: 1,
							},
							enemy: {
								type: "enemy",
								value: 1,
								description:
									"Religious or political figure whose interference in your work as a Scholar you openly flaunted.",
							},
						}
					},
				},
				b: {
					type: "reward",
					button: "Continue secretly.",
					description:
						"You choose to be significantly quieter about your work from now on.",
					//TODO: NOMuSTER in SCHOLAR MishaPList
					// noMuster: true,
					result: {
						type: "multiple",
						list: ["Science", "stat"],
						details: {
							Science: {
								type: "increaseSkill",
								skill: "Science",
								specialty: "any",
								value: 1,
							},
							stat: { type: "stat", stat: "soc", value: -2 },
						}
					},
				},
			},
		},
		{
			type: "reward",
			description:
				"An expedition or voyage goes wrong, leaving you stranded in the wilderness... and by the time you find your way home, your job is gone.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Survival", "Athletics"],
				specialtyList: {
					Survival: null,
					Athletics: ["dexterity", "endurance"],
				},
				value: 1,
			},
		},
		{
			type: "choice",
			choiceList: ["a", "b"],
			description:
				"Your work is sabotaged by unknown parties, leaving you with a choice.",
			choice: {
				a: {
					type: "reward",
					button: "Salvage what you can",
					description:
						"You decide to salvage what you can, and move on to greener pastures.",
					result: { type: "addBenefit", value: 1 },
				},
				b: {
					type: "reward",
					button: "Begin again",
					description:
						"You decide to accept the losses, and just begin again without all that.",
					//TODO: NO Muster in sCHOLAR MISHAP LISt
					// noMuster: true,

					//TODO: lose benefits in scholar mishap reward!!
					result: { type: "addBenefit", value: 1 },
				},
			},
		},
		{
			type: "reward",
			description:
				"A rival researcher blackens your name, or steals your research.",
			//TODO: NO Muster in sCHOLAR MISHAP LISt
			// noMuster: true,
			result: {
				type: "rival",
				description:
					"Someone who stole your research or blackened your name as a Scholar.",
				value: 1,
			},
		},
	],
	skills: {
		personal: [
			{ type: "stat", stat: "int" },
			{ type: "stat", stat: "edu" },
			{ type: "stat", stat: "soc" },
			{ type: "stat", stat: "dex" },
			{ type: "stat", stat: "end" },
			{ type: "skill", skill: "Language" },
		],
		service: [
			{ type: "skill", skill: "Drive" },
			{ type: "skill", skill: "Electronics" },
			{ type: "skill", skill: "Diplomat" },
			{ type: "skill", skill: "Medic" },
			{ type: "skill", skill: "Investigate" },
			{ type: "skill", skill: "Science" },
		],
		advanced: [
			{ type: "skill", skill: "Art" },
			{ type: "skill", skill: "Advocate" },
			{ type: "skill", skill: "Electronics" },
			{ type: "skill", skill: "Language" },
			{ type: "skill", skill: "Engineer" },
			{ type: "skill", skill: "Science" },
		],
		specialties: {
			fieldResearcher: [
				{ type: "skill", skill: "Electronics" },
				{ type: "skill", skill: "VaccSuit" },
				{ type: "skill", skill: "Navigation" },
				{ type: "skill", skill: "Survival" },
				{ type: "skill", skill: "Investigate" },
				{ type: "skill", skill: "Science" },
			],
			scientist: [
				{ type: "skill", skill: "Admin" },
				{ type: "skill", skill: "Engineer" },
				{ type: "skill", skill: "Science" },
				{ type: "skill", skill: "Science" },
				{ type: "skill", skill: "Electronics" },
				{ type: "skill", skill: "Science" },
			],
			physician: [
				{ type: "skill", skill: "Medic" },
				{ type: "skill", skill: "Electronics" },
				{ type: "skill", skill: "Investigate" },
				{ type: "skill", skill: "Medic" },
				{ type: "skill", skill: "Persuade" },
				{ type: "skill", skill: "Science" },
			],
		},
	},
	benefits: [
		{ money: 5000, misc: "int", miscValue: 1 },
		{ money: 10000, misc: "edu", miscValue: 1 },
		{ money: 20000, misc: "ShipShare", miscValue: 2 },
		{ money: 30000, misc: "soc", miscValue: 1 },
		{ money: 40000, misc: "Scientific Equipment" },
		{ money: 60000, misc: "Lab Ship" },
		{ money: 100000, misc: "Lab Ship" },
	],
	specialtiesList: ["fieldResearcher", "scientist", "physician"],
};

export const fieldResearcher: CareerSpecialty = {
	title: "Field Researcher",
	description:
		"You are an explorer or field researcher, equally at home in the laboratory or wilderness.",
	survivalSkill: "end",
	survivalDC: 6,
	advancementSkill: "int",
	advancementDC: 6,
	eventList: scholar.eventList,
	mishapList: scholar.mishapList,
	ranks: [
		{ title: "Field Intern", bonus: false },
		{
			title: "Field Assistant",
			bonus: {
				type: "skill",
				skill: "Science",
				specialty: "any",
				value: 1,
			},
		},
		{
			title: "Inquirer",
			bonus: {
				type: "skill",
				skill: "Electronics",
				specialty: "computers",
				value: 1,
			},
		},
		{
			title: "Junior Investigator",
			bonus: { type: "skill", skill: "Investigate", value: 1 },
		},
		{ title: "Investigator", bonus: false },
		{
			title: "Principal Investigator",
			bonus: {
				type: "skill",
				skill: "Science",
				specialty: "any",
				value: 2,
			},
		},
		{ title: "Renowned Investigator", bonus: false },
	],
	skills: scholar.skills,
	benefits: scholar.benefits,
	parent: "scholar",
};
export const scientist: CareerSpecialty = {
	title: "Scientist",
	description:
		"You are a researcher in some corporation or research institution, or a mad scientist in an orbiting laboratory.",
	survivalSkill: "edu",
	survivalDC: 4,
	advancementSkill: "int",
	advancementDC: 8,
	eventList: scholar.eventList,
	mishapList: scholar.mishapList,
	ranks: [
		{ title: "Junior Intern", bonus: false },
		{
			title: "Intern",
			bonus: {
				type: "skill",
				skill: "Science",
				specialty: "any",
				value: 1,
			},
		},
		{
			title: "Junior Assistant",
			bonus: {
				type: "skill",
				skill: "Electronics",
				specialty: "computers",
				value: 1,
			},
		},
		{
			title: "Lab Assistant",
			bonus: { type: "skill", skill: "Investigate", value: 1 },
		},
		{ title: "Research Fellow", bonus: false },
		{
			title: "Head Researcher",
			bonus: {
				type: "skill",
				skill: "Science",
				specialty: "any",
				value: 2,
			},
		},
		{ title: "Titan of Research", bonus: false },
	],
	skills: scholar.skills,
	benefits: scholar.benefits,
	parent: "scholar",
};
export const physician: CareerSpecialty = {
	title: "Physician",
	description: "You are a doctor, healer, or medical researcher.",
	survivalSkill: "edu",
	survivalDC: 4,
	advancementSkill: "edu",
	advancementDC: 8,
	eventList: scholar.eventList,
	mishapList: scholar.mishapList,
	ranks: [
		{ title: "Moonlighter", bonus: false },
		{
			title: "Resident Physician",
			bonus: { type: "skill", skill: "Medic", value: 1 },
		},
		{ title: "Senior Resident", bonus: false },
		{
			title: "Licensed Physician",
			bonus: {
				type: "skill",
				skill: "Science",
				specialty: "any",
				value: 1,
			},
		},
		{ title: "Attending Physician", bonus: false },
		{
			title: "Senior Physician",
			bonus: {
				type: "skill",
				skill: "Science",
				specialty: "any",
				value: 2,
			},
		},
		{ title: "Head Doctor", bonus: false },
	],
	skills: scholar.skills,
	benefits: scholar.benefits,
	parent: "scholar",
};
