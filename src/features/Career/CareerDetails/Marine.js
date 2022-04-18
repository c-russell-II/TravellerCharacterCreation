export const marine = {
    title: 'Marine',
    description: 'Members of the armed fighting forces carried aboard starships, marines deal with piracy and boarding actions in space, defend the starports and bases belonging to the navy and supplement ground forces such as the army.',
    qualification: true,
    qualificationStat: 'end',
    qualificationDC: 6,
    eventList: {
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {},
        11: {},
        12: {}
    },
    mishapList: [{}, {}, {}, {}, {}, {}],
    skills: {
        personal: [
            {type: 'stat', stat: 'str'},
            {type: 'stat', stat: 'dex'},
            {type: 'stat', stat: 'end'},
            {type: 'skill', skill:'Gambler'},
            {type: 'skill', skill:'Melee', specialty: 'unarmed'},
            {type: 'skill', skill:'Melee', specialty: 'blade'},
        ],
        service: [
            {type: 'skill', skill:'Athletics', specialty: 'any'},
            {type: 'skill', skill:'VaccSuit'},
            {type: 'skill', skill:'Tactics', specialty: 'any'},
            {type: 'skill', skill:'HeavyWeapons', specialty: 'any'},
            {type: 'skill', skill:'GunCombat', specialty: 'any'},
            {type: 'skill', skill:'Stealth'},
        ],
        advanced: [
            {type: 'skill', skill:'Medic'},
            {type: 'skill', skill:'Survival'},
            {type: 'skill', skill:'Explosives'},
            {type: 'skill', skill:'Engineer', specialty: 'any'},
            {type: 'skill', skill:'Pilot', specialty: 'any'},
            {type: 'skill', skill:'Navigation'},
        ],
        officer:  [
            {type: 'skill', skill:'Electronics', specialty: 'any'},
            {type: 'skill', skill:'Tactics', specialty: 'any'},
            {type: 'skill', skill:'Admin'},
            {type: 'skill', skill:'Advocate'},
            {type: 'skill', skill:'VaccSuit'},
            {type: 'skill', skill:'Leadership'},
        ],
        specialties: {
            support: [
                {type: 'skill', skill:'Electronics'},
                {type: 'skill', skill:'Mechanic'},
                {type: 'choice', list: ['Drive', 'Flyer'], specialties: {Drive: null, Flyer: null}},
                {type: 'skill', skill:'Medic'},
                {type: 'skill', skill:'HeavyWeapons'},
                {type: 'skill', skill:'GunCombat'},
            ],
            starMarine: [
                {type: 'skill', skill:'VaccSuit'},
                {type: 'skill', skill:'Athletics'},
                {type: 'skill', skill:'Gunner'},
                {type: 'skill', skill:'Melee', specialty: 'blade'},
                {type: 'skill', skill:'Electronics'},
                {type: 'skill', skill:'GunCombat'},
            ],
            groundAssault: [
                {type: 'skill', skill:'VaccSuit'},
                {type: 'skill', skill:'HeavyWeapons'},
                {type: 'skill', skill:'Recon'},
                {type: 'skill', skill:'Melee', specialty: 'blade'},
                {type: 'skill', skill:'Tactics', specialty: 'military'},
                {type: 'skill', skill:'GunCombat'},
            ]
        }
    },
    benefits: [
        {money: 2000, misc: 'Armour'},
        {money: 5000, misc: 'int', miscValue: 1},
        {money: 5000, misc: 'edu', miscValue: 1},
        {money: 10000, misc: 'Weapon'},
        {money: 20000, misc: 'TAS'},
        {money: 30000, misc: 'choice', list: ['Armour', 'end'], miscValue: 1},
        {money: 40000, misc: 'soc', miscValue: 2},
    ],
    specialtiesList: ['support', 'starMarine', 'groundAssault'],
}

export const support = {
    title: 'Support Marine',
    description: 'You are a quartermaster, engineer, or battlefield medic in the marines.',
    survivalSkill: 'end',
    survivalDC: 5,
    advancementSkill: 'edu',
    advancementDC: 7,
    eventList: marine.eventList,
    mishapList: marine.mishapList,
    ranks: [
        {title: 'Marine', bonus: {type: 'choice', list: ['GunCombat', 'Melee'], specialties: {GunCombat: 'any', Melee:'blade'}, value: 1}},
        {title: 'Lance Corporal', bonus: {type: 'skill', skill: 'GunCombat', specialty: 'any', value: 1}},
        {title: 'Corporal', bonus: false},
        {title: 'Lance Sergeant', bonus: {type: 'skill', skill: 'Leadership', value: 1}},
        {title: 'Sergeant', bonus: false},
        {title: 'Gunnery Sergeant', bonus: {type: 'stat', stat: 'end', value: 1}},
        {title: 'Sergeant Major', bonus: false},
    ],
    skills: marine.skills,
    benefits: marine.benefits
}
export const starMarine = {
    title: 'Star Marine',
    description: 'You are trained to fight boarding actions and capture enemy vessels.',
    survivalSkill: 'end',
    survivalDC: 6,
    advancementSkill: 'edu',
    advancementDC: 6,
    eventList: marine.eventList,
    mishapList: marine.mishapList,
    ranks: [

    ],
    skills: marine.skills,
    benefits: marine.benefits
}
export const groundAssault = {
    title: 'Ground Assault Marine',
    description: 'You are kicked out of a spacecraft in high orbit and told to "capture that planet."',
    survivalSkill: 'end',
    survivalDC: 7,
    advancementSkill: 'edu',
    advancementDC: 5,
    eventList: marine.eventList,
    mishapList: marine.mishapList,
    ranks: [
        {title: 'Marine', bonus: {type: 'choice', list: ['GunCombat', 'Melee'], specialties: {GunCombat: 'any', Melee:'blade'}, value: 1}},
        {title: 'Lance Corporal', bonus: {type: 'skill', skill: 'GunCombat', specialty: 'any', value: 1}},
        {title: 'Corporal', bonus: false},
        {title: 'Lance Sergeant', bonus: {type: 'skill', skill: 'Leadership', value: 1}},
        {title: 'Sergeant', bonus: false},
        {title: 'Gunnery Sergeant', bonus: {type: 'stat', stat: 'end', value: 1}},
        {title: 'Sergeant Major', bonus: false},
    ],
    skills: marine.skills,
    benefits: marine.benefits
}