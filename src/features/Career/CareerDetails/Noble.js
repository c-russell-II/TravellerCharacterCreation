export const noble = {
    title: 'Noble',
    description: 'Individuals of the upper class who perform little consistent function, but often have large amounts of ready money.',
    qualification: true,
    qualificationStat: 'Threshold',
    qualificationThreshold: {stat: 'soc', value: 10},
    qualificationDC: 10,
    eventList: {2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}, 9: {}, 10: {}, 11: {}, 12: {}},
    mishapList: [{}, {}, {}, {}, {}, {}],
    skills: {
        personal: [
            {type: 'stat', stat: 'str'},
            {type: 'stat', stat: 'dex'},
            {type: 'stat', stat: 'end'},
            {type: 'skill', skill:'Gambler'},
            {type: 'skill', skill:'GunCombat'},
            {type: 'skill', skill:'Melee'},
        ],
        service: [
            {type: 'skill', skill:'Admin'},
            {type: 'skill', skill:'Advocate'},
            {type: 'skill', skill:'Electronics'},
            {type: 'skill', skill:'Diplomat'},
            {type: 'skill', skill:'Investigate'},
            {type: 'skill', skill:'Persuade'},
        ],
        advanced: [
            {type: 'skill', skill:'Admin'},
            {type: 'skill', skill:'Advocate'},
            {type: 'skill', skill:'Language'},
            {type: 'skill', skill:'Leadership'},
            {type: 'skill', skill:'Diplomat'},
            {type: 'skill', skill:'Art'},
        ],
        specialties: {
            administrator: [
                {type: 'skill', skill:'Admin'},
                {type: 'skill', skill:'Advocate'},
                {type: 'skill', skill:'Broker'},
                {type: 'skill', skill:'Diplomat'},
                {type: 'skill', skill:'Leadership'},
                {type: 'skill', skill:'Persuade'},
            ],
            diplomat: [
                {type: 'skill', skill:'Advocate'},
                {type: 'skill', skill:'Carouse'},
                {type: 'skill', skill:'Electronics'},
                {type: 'skill', skill:'Steward'},
                {type: 'skill', skill:'Diplomat'},
                {type: 'skill', skill:'Deception'},
            ],
            dilettante: [
                {type: 'skill', skill:'Carouse'},
                {type: 'skill', skill:'Deception'},
                {type: 'skill', skill:'Flyer'},
                {type: 'skill', skill:'Streetwise'},
                {type: 'skill', skill:'Gambler'},
                {type: 'skill', skill:'JackOfAllTrades'},
            ]
        }
    },
    benefits: [
        {money: 10000, misc: 'ShipShare', miscValue: 1},
        {money: 10000, misc: 'ShipShare', miscValue: 2},
        {money: 50000, misc: 'Blade'},
        {money: 50000, misc: 'soc', miscValue: 1},
        {money: 100000, misc: 'TAS'},
        {money: 100000, misc: 'Yacht'},
        {money: 200000, misc: 'multiple', list:['soc', 'Yacht'], miscValue: 1},
    ],
    specialtiesList: ['administrator', 'diplomat', 'dilettante'],
}

export const administrator = {
    title: 'Administrator',
    description: 'You serve in the planetary government or even rule over a fiefdom or other domain.',
    survivalSkill: 'int',
    survivalDC: 4,
    advancementSkill: 'edu',
    advancementDC: 6,
    eventList: noble.eventList,
    mishapList: noble.mishapList,
    ranks: [
        {title: 'Assistant', bonus: false},
        {title: 'Clerk', bonus: {type: 'skill', skill: 'Admin', value: 1}},
        {title: 'Supervisor', bonus: false},
        {title: 'Manager', bonus: {type: 'skill', skill: 'Advocate', value: 1}},
        {title: 'Chief', bonus: false},
        {title: 'Director', bonus: {type: 'skill', skill: 'Leadership', value: 1}},
        {title: 'Minister', bonus: false},
    ],
    skills: noble.skills,
    benefits: noble.benefits
}
export const diplomat = {
    title: 'Diplomat',
    description: 'You are a diplomat or other state official.',
    survivalSkill: 'int',
    survivalDC: 5,
    advancementSkill: 'soc',
    advancementDC: 7,
    eventList: noble.eventList,
    mishapList: noble.mishapList,
    ranks: [
        {title: 'Intern', bonus: false},
        {title: 'Third Secretary', bonus: {type: 'skill', skill: 'Admin', value: 1}},
        {title: 'Second Secretary', bonus: false},
        {title: 'First Secretary', bonus: {type: 'skill', skill: 'Advocate', value: 1}},
        {title: 'Counsellor', bonus: false},
        {title: 'Minister', bonus: {type: 'skill', skill: 'Diplomat', value: 1}},
        {title: 'Ambassador', bonus: false},
    ],
    skills: noble.skills,
    benefits: noble.benefits
}
export const dilettante = {
    title: "Dilettante",
    description: 'You are known for being known and have absolutely no useful function in society.',
    survivalSkill: 'soc',
    survivalDC: 3,
    advancementSkill: 'int',
    advancementDC: 8,
    eventList: noble.eventList,
    mishapList: noble.mishapList,
    ranks: [
        {title: 'Wastrel', bonus: false},
        {title: 'Layabout', bonus: false},
        {title: 'Ingrate', bonus: {type: 'skill', skill: 'Carouse', value: 1}},
        {title: 'Malingerer', bonus: false},
        {title: 'Black Sheep', bonus: {type: 'skill', skill: 'Persuade', value: 1}},
        {title: 'Profligate', bonus: false},
        {title: 'Scoundrel', bonus: {type: 'skill', skill: 'JackOfAllTrades', value: 1}},
    ],
    skills: noble.skills,
    benefits: noble.benefits
}