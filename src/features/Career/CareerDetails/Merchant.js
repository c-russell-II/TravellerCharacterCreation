export const merchant = {
    title: 'Merchant',
    description: 'Members of a commercial enterprise. Merchants may crew the ships of the huge trading corporations, or they may work for independent freet rades who carry chance cargoes and passengers between worlds.',
    qualification: true,
    qualificationStat: 'int',
    qualificationDC: 4,
    eventList: {
        2: {type: 'redirect', destination: 'mishap', description: 'Disaster!', result: {type: 'noMuster'}},
        3: {type: 'choice', choiceList: ['a', 'b'], description: 'You are offered the opportunity to smuggle illegal goods onto a planet.',
            a: {button: 'Smuggle them', description: "You agree to smuggle the goods, and...", 
                    result: {type: 'check', checkType: 'choice', choiceList:['Deception', 'Persuade'], checkDC: 8, 
                        pass: {description: 'You successfully smuggle them on planet.', 
                            result: {type: 'multiple', list: ['Streetwise', 'benefit'], 
                                Streetwise: {type: 'setSkill', skill: 'Streetwise', value: 1}, 
                                benefit: {type: 'addBenefit', value: 1}
                            }, 
                        fail: {description: "You don't manage to bring the goods onto the planet, but no grudge is held", result: {type: 'none'}}
                        }
                    }
                },
            b: {button: "Refuse.", description: "You refuse, and report the person offering to your superiors.", 
                result: {type: 'enemy', description: 'Someone you turned in to the authorities while working as a merchant.', value: 1}
            }
        },
        4: {type: 'gamble'},
        5: {type: 'reward', description: 'Your time amongst spacers and suppliers has taught you a few things.',
            result: {type: 'choice',
                choiceType: 'setSkill',
                choiceList: ['Profession', 'Electronics', 'Engineer', 'Animals', 'Science'],
                specialtyList: {Profession: 'any', Electronics: 'any', Engineer: 'any', Animals: 'any', Science: 'any'},
                value: 1
            }
        },
        6: {type: 'reward', description: 'You make an unexpected connection outside normal circles.',
            result: {type: 'contact', description: 'An unexpected connection, outside your normal circles, from your time as a Merchant.', value: 1}
        },
        7: {type: 'redirect', destination: 'life'},
        8: {type: 'reward', description: 'You are embroiled in legal trouble.',
            result: {type: 'multiple', list: ['skill', 'prisoner'],
                skill:{type: 'choice', choiceType: 'setSkill',
                    choiceList: ['Admin', 'Advocate', 'Diplomat', 'Investigate'],
                    specialtyList: {Admin: null, Advocate: null, Diplomat: null, Investigate: null}, value: 1
                },
                prisoner: {type: 'random', threshold: 2}
            }
        },
        9: {type: 'check', checkType: 'stat', checkStat: 'edu', checkDC: 8, description: 'You are offered an opportunity for advanced, specialist training.',
            pass: {description: 'Taking full advantage, your skills noticeably increase.', result: {type: 'choice', choiceType: 'increaseAny'}},
            fail: {description: "You do not manage to measure up to your instructors' standards.", result: {type: 'none'}}},
        10: {type: 'reward', description: "A good deal ensures you're living the high life for a few years.", result: {type: 'benefit', value: 1}},
        11: {type: 'reward', description: "You befriend a useful ally in one sphere.", 
            result: {type: 'multiple', list:['ally', 'choice'],
                ally: {type: 'ally', description: 'A friend you made while working as a Merchant...'},
                choice: {type: 'choice', choiceType: 'multiple', choiceList: ['Carouse', 'advancement'],
                    Carouse:{type: 'increaseSkill', skill: 'Carouse'},
                    advancement:{type: 'advancement', value: 4}
                }
            }
        },
        12: {type: 'reward', description: 'Your business or ship thrives.', result: {type: 'promotion'}}
    },
    mishapList: [
        {type: 'redirect', description: 'You are severely injured...', direction: 'injury', modifier: 'disadvantage'},
        {type: 'reward', description: 'You are bankrupted by a rival.',
            result: {type: 'multiple',
                list: ['benefits', 'rival'],
                benefits: {type: 'benefits', value: 'loseAll'},
                rival:{type:'rival', value: 1, description: 'Rival who bankrupted you, ending your Merchant career.'}
            }
        },
        {type: 'reward', description: 'A sudden war destroys your trade routes and contacts, forcing you to flee that region of space.',
            results: {type: 'choice',
                choiceType: 'setSkill',
                choiceList: ['Pilot', 'GunCombat'],
                specialtyList: {Pilot: 'any', GunCombat: 'any'},
                value: 1
            }
        },
        {type: 'reward', description: 'Your ship or spaceport is destroyed by criminals.',
            result: {type: 'enemy', value: 1, description: 'Criminals who destroyed the ship or starport you worked on as a Merchant'}
        },
        {type: 'reward', description: "Imperial trade restrictions force you out of business, but in the process, garner you many newly-criminal contacts...",
            result: {type: 'qualification', career: 'Rogue', value: 'auto'}
        },
        {type: 'reward', description: 'A series of bad deals and decisions force you into bankruptcy, but you salvage as much as you can...', result:{type:'addBenefit', value: 1}}
    ],
    skills: {
        personal: [
            {type: 'stat', stat: 'str'},
            {type: 'stat', stat: 'dex'},
            {type: 'stat', stat: 'end'},
            {type: 'stat', stat: 'int'},
            {type: 'skill', skill:'Language'},
            {type: 'skill', skill:'Streetwise'},
        ],
        service: [
            {type: 'skill', skill:'Drive'},
            {type: 'skill', skill:'VaccSuit'},
            {type: 'skill', skill:'Broker'},
            {type: 'skill', skill:'Steward'},
            {type: 'skill', skill:'Electronics'},
            {type: 'skill', skill:'Persuade'},
        ],
        advanced: [
            {type: 'skill', skill:'Engineer'},
            {type: 'skill', skill:'Astrogation'},
            {type: 'skill', skill:'Electronics'},
            {type: 'skill', skill:'Pilot'},
            {type: 'skill', skill:'Admin'},
            {type: 'skill', skill:'Advocate'},
        ],
        specialties: {
            merchantMarine: [
                {type: 'skill', skill:'Pilot'},
                {type: 'skill', skill:'VaccSuit'},
                {type: 'skill', skill:'Athletics'},
                {type: 'skill', skill:'Mechanic'},
                {type: 'skill', skill:'Engineer'},
                {type: 'skill', skill:'Electronics'},
            ],
            freeTrader: [
                {type: 'skill', skill:'Pilot', specialty: 'spacecraft'},
                {type: 'skill', skill:'VaccSuit'},
                {type: 'skill', skill:'Deception'},
                {type: 'skill', skill:'Mechanic'},
                {type: 'skill', skill:'Streetwise'},
                {type: 'skill', skill:'Gunner'},
            ],
            broker: [
                {type: 'skill', skill:'Admin'},
                {type: 'skill', skill:'Advocate'},
                {type: 'skill', skill:'Broker'},
                {type: 'skill', skill:'Streetwise'},
                {type: 'skill', skill:'Deception'},
                {type: 'skill', skill:'Persuade'},
            ]
        }
    },
    benefits: [
        {money: 1000, misc: 'Blade'},
        {money: 5000, misc: 'int', miscValue: 1},
        {money: 10000, misc: 'edu', miscValue: 1},
        {money: 20000, misc: 'Gun'},
        {money: 20000, misc: 'ShipShare', miscValue: 1},
        {money: 40000, misc: 'Free Trader'},
        {money: 40000, misc: 'Free Trader'},
    ],
    specialtiesList: ['merchantMarine', 'freeTrader', 'broker'],
}

export const merchantMarine = {
    title: 'Merchant Marine',
    description: 'You work on one of the massive cargo haulers run by the Imperium or the megacorporations.',
    survivalSkill: 'edu',
    survivalDC: 5,
    advancementSkill: 'int',
    advancementDC: 7,
    eventList: merchant.eventList,
    mishapList: merchant.mishapList,
    ranks: [
        {title: 'Crewman', bonus: false},
        {title: 'Senior Crewman', bonus: {type: 'skill', skill: 'Mechanic', value: 1}},
        {title: 'Fourth Officer', bonus: false},
        {title: 'Third Officer', bonus: false},
        {title: 'Second Officer', bonus: {type: 'skill', skill: 'Pilot', value: 1}},
        {title: 'First Officer', bonus: {type: 'stat', stat: 'soc', value: 1}},
        {title: 'Captain', bonus: false},
    ],
    skills: merchant.skills,
    benefits: merchant.benefits
}
export const freeTrader = {
    title: 'Free Trader',
    description: 'You are part of the crew of a tramp trader.',
    survivalSkill: 'dex',
    survivalDC: 6,
    advancementSkill: 'int',
    advancementDC: 6,
    eventList: merchant.eventList,
    mishapList: merchant.mishapList,
    ranks: [
        {title: 'Journeyman Trader', bonus: false},
        {title: 'Novice Trader', bonus: {type: 'skill', skill: 'Persuade', value: 1}},
        {title: 'Trader', bonus: false},
        {title: 'Experienced Trader', bonus: {type: 'skill', skill: 'JackOfAllTrades', value: 1}},
        {title: 'Seasoned Trader', bonus: false},
        {title: 'Old Tradehand', bonus: false},
        {title: 'Trade Legend', bonus: false},
    ],
    skills: merchant.skills,
    benefits: merchant.benefits
}
export const broker = {
    title: 'Broker',
    description: 'You work in a planetside brokerage or starport.',
    survivalSkill: 'edu',
    survivalDC: 5,
    advancementSkill: 'int',
    advancementDC: 7,
    eventList: merchant.eventList,
    mishapList: merchant.mishapList,
    ranks: [
        {title: "Ice broker", bonus: false},
        {title: 'Green Broker', bonus: {type: 'skill', skill: 'Broker', value: 1}},
        {title: 'Classic Broker', bonus: false},
        {title: 'Experienced Broker', bonus: {type: 'skill', skill: 'Streetwise', value: 1}},
        {title: 'Seasoned Broker', bonus: false},
        {title: 'Accomplished Broker', bonus: false},
        {title: "Trader's Bane", bonus: false},
    ],
    skills: merchant.skills,
    benefits: merchant.benefits
}