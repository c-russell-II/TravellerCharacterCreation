export const citizen = {
    title: 'Citizen',
    qualification: true,
    qualificationStat: 'edu',
    qualificationDC: 5,
    description: 'Individuals serving a corporation, bureaucracy, or industry, or who are making a new life on an untamed planet.',
    eventList: {
        2: {type: 'redirect', destination: 'mishap', description: 'Disaster!', result: {type: 'noMuster'}},
        3: {type: null},
        4: {type: 'reward', description: 'You spend time maintaining and using heavy vehicles, either as part of your job or as a hobby.',
            result: {type: 'choice',
                choiceType: 'increaseSkill',
                choices: ['Mechanic', 'Drive', 'Flyer', 'Engineer'],
                specialtyList: {Drive: 'any', Flyer: 'any', Engineer: 'any', Mechanic: null}
            }
        },
        5: {type: 'reward', description: 'Your business expands, your corporation grows, or your colony thrives.', result: {type: 'benefit', value: 1}},
        6: {type: 'check', checkType: 'stat', checkStat: 'edu', checkDC: 10, description: 'You are offered an opportunity for advanced, specialist training.',
            pass: {description: 'Taking full advantage, your skills noticeably increase.',
                result: {type: 'choice', choiceType: 'setAny', value: 1}
            },
            fail: {description: "You do not manage to measure up to your instructors' standards.", result: {type: null}}},
        7: {type: 'redirect', destionation: 'life'},
        8: {type: 'choice', description: "You learn something you shouldn't have- a corporate secret, a political scandal - which you can profit from illegally, if you choose.", choiceList: ['a', 'b'],
            a: {description: 'You either meet someone capable of helping you, or learn a bit about navigating this sort of backroom dealing, and make a tidy profit.',  button: 'Take advantage.',
                results: {type: 'choice', choiceList:['SkillAndBenefit', 'ContactAndBenefit'],
                    SkillAndBenefit: {type: 'multiple', list: ['benefit', 'choice'],
                        benefit: {type: 'benefit', value: 1}, 
                        choice: {type:'choice', choiceType: 'setSkill', choiceList:['Streetwise', 'Investigate'], specialtyList: {Streetwise: null, Investigate: null}, value: 1}
                    },
                    ContactAndBenefit: {type: 'multiple', list: ['benefit', 'contact'],
                        benefit: {type: 'benefit', value: 1},
                        contact: {type: 'contact', value: 1, description: 'Criminal who helped you illegally exploit a scandal or secret you uncovered as a Citizen.'}
                    }
                },
            },
            b: {description: 'You refuse to take advantage, earning little, but keeping your honor intact.', results: {type: 'none'}, button: "Stay away"},
        },
        9: {type: 'reward', description: 'You are rewarded for your diligence or cunning.', results: {type: 'advancement', value: 2}},
        10: {type: 'reward', description: 'You gain experience in a technical field as a computer operator or surveyor.',
            result: {type: 'choice',
                choiceType: 'increaseSkill',
                choiceList:['Electronics', 'Engineer'],
                specialty: {Electronics: 'any', Engineer: 'any'}
            }
        },
        11: {type: 'reward', description: 'You befriend a superior in the corporation or colony.',
            result: {type: 'multiple',
                list: ['choice', 'ally'],
                choice: {type: 'choice',
                    choiceList: ['Diplomat', 'advancement'],
                    Diplomat: {type: 'setSkill', value: 1, skill: 'Diplomat'},
                    advancement: {type: 'advancement', value: 4}
                },
                ally: {type: 'ally', value: 1, description: 'Superior from your time as a Citizen.'}
            },
        },
        12: {type: 'reward', description: 'You rise to a position of power in your corporation or colony.', result: {type: 'promotion'} }
    },
    mishapList: [
        {type: 'redirect', destination:'injury', modifier: 'disadvantage'},
        {type: 'reward',
            result: {type: 'enemy', description: 'Criminal gang who harassed you during your citizen career'},
            description: 'You are harrased and your life ruined by a criminal gang.'
        },
        {type: 'reward', result: {type: 'stat', stat: 'soc', value: -1}, description: 'Hard times caused by a lack of interstellar trade cost you your job- and some respect.'},
        {type: 'choice', choiceList: ['a', 'b'], description: 'Your business or colony is investigated by interplanetary authorities, or interfered with by a special interest group.',
            a:{type: 'reward',
                description: 'You cooperate, and the business or colony is shut down.',
                button: 'Cooperate',
                result: {type: 'qualification', value: 2}
            },
            b:{type: 'reward',
                description: 'You refuse to cooperate, and are forced out of this career by the outside group- but your boss knows what you did, and is grateful for it.',
                button: 'Refuse',
                result: {type: 'ally', value: 1, description: 'Your boss from Citizen career, who you dealt with an outside force or interference for.'}
            }
        },
        {type: 'check', checkType: 'skill', checkSkill: 'Streetwise', checkDC: 8,
            description: 'A revolution, attack, or other violent event throws your life into chaos, forcing you to move far away- perhaps even to a new planet.',
            pass: {type: 'reward', description: 'Navigating the upheaval, you sharpen your skills.', result: {type: 'choice', choiceType: 'increaseAny'}},
            fail: {type: null}},
        {type: 'redirect', destination: 'injury'}
    ],
    skills: {
        personal: [
            {type: 'stat', stat:'edu'},
            {type: 'stat', stat:'int'},
            {type: 'skill', skill:'Carouse'},
            {type: 'skill', skill:'Gambler'},
            {type: 'skill', skill:'Drive'},
            {type: 'skill', skill:'JackOfAllTrades'},
        ],
        service: [
            {type: 'skill', skill:'Drive'},
            {type: 'skill', skill:'Flyer'},
            {type: 'skill', skill:'Streetwise'},
            {type: 'skill', skill:'Melee'},
            {type: 'skill', skill:'Steward'},
            {type: 'skill', skill:'Profession'},
        ],
        advanced: [
            {type: 'skill', skill:'Art'},
            {type: 'skill', skill:'Advocate'},
            {type: 'skill', skill:'Diplomat'},
            {type: 'skill', skill:'Language'},
            {type: 'skill', skill:'Electronics', specialty: 'computers'},
            {type: 'skill', skill:'Medic',},
        ],
        specialties: {
            corporate: [
                {type: 'skill', skill:'Advocate'},
                {type: 'skill', skill:'Admin'},
                {type: 'skill', skill:'Broker'},
                {type: 'skill', skill:'Electronics', specialty: 'computers'},
                {type: 'skill', skill:'Diplomat'},
                {type: 'skill', skill:'Leadership'},
            ],
            worker: [
                {type: 'skill', skill:'Drive'},
                {type: 'skill', skill:'Mechanic'},
                {type: 'skill', skill:'Electronics'},
                {type: 'skill', skill:'Engineer'},
                {type: 'skill', skill:'Profession'},
                {type: 'skill', skill:'Science'},
            ],
            colonist: [
                {type: 'skill', skill:'Animals'},
                {type: 'skill', skill:'Athletics'},
                {type: 'skill', skill:'JackOfAllTrades'},
                {type: 'skill', skill:'Drive'},
                {type: 'skill', skill:'Survival'},
                {type: 'skill', skill:'Recon'},
            ]
        }
    },
    benefits: [
        {money: 2000, misc: 'ShipShare', miscValue: 1},
        {money: 5000, misc: 'Ally'},
        {money: 10000, misc: 'int', miscValue: 1},
        {money: 10000, misc: 'Gun'},
        {money: 10000, misc: 'edu', miscValue: 1},
        {money: 50000, misc: 'ShipShares', miscValue: 2},
        {money: 100000, misc: 'TAS'}
    ],
    specialtiesList: ['corporate', 'worker', 'colonist'],
}

export const manager = {
    title: 'Corporate Manager',
    description: 'You are an executive or manager in a large organization.',
    survivalSkill: 'soc',
    survivalDC: 6,
    advancementSkill: 'int',
    advancementDC: 6,
    eventList: citizen.eventList,
    mishapList: citizen.mishapList,
    ranks: [
        {title: 'Team Lead', bonus: false},
        {title: 'Senior Lead', bonus: false},
        {title: 'Assistant Manager', bonus: {type: 'skill', skill:'Investigate', value: 1}},
        {title: 'Manager', bonus: false},
        {title: 'Senior Manage', bonus: {type: 'skill', skill:'Advocate', value: 1}},
        {title: 'Assistant Director', bonus: false},
        {title: 'Director', bonus: false}
    ],
    skills: citizen.skills,
    benefits: citizen.benefits
}
export const worker = {
    title: 'Worker Citizen',
    description: 'You are a blue collar worker on an industrial world.',
    survivalSkill: 'end',
    survivalDC: 4,
    advancementSkill: 'edu',
    advancementDC: 8,
    eventList: citizen.eventList,
    mishapList: citizen.mishapList,
    ranks: [
        {title: 'Journeyman', bonus: false},
        {title: 'Novice Technician', bonus: false},
        {title: 'Technician', bonus: {type: 'skill', skill: 'Profession', specialty: 'any', value: 1}},
        {title: 'Senior Technician', bonus: false},
        {title: 'Craftsman', bonus: {type: 'skill', skill: 'Mechanic', value: 1}},
        {title: 'Senior Craftsman', bonus: false},
        {title: 'Master Technician', bonus: {type: 'skill', skill: 'Engineer', specialty: 'any', value: 1}},
    ],
    skills: citizen.skills,
    benefits: citizen.benefits
}
export const colonist = {
    title: 'Colonist',
    description: 'You are building a new life on a recently settled world that still needs taming.',
    survivalSkill: 'int',
    survivalDC: 7,
    advancementSkill: 'end',
    advancementDC: 5,
    eventList: citizen.eventList,
    mishapList: citizen.mishapList,
    ranks: [
        {title: 'Greenhorn', bonus: false},
        {title: 'Junior Settler', bonus: false},
        {title: 'Settler', bonus: {type: 'skill', skill: 'Survival', value: 1}},
        {title: 'Senior Settler', bonus: false},
        {title: 'Explorer', bonus: {type: 'skill', skill: 'Navigation', value: 1}},
        {title: 'Senior Explorer', bonus: false},
        {title: 'Trailblazer', bonus: {type: 'skill', skill: 'GunCombat', specialty: 'any', value: 1}}
    ],
    skills: citizen.skills,
    benefits: citizen.benefits
}