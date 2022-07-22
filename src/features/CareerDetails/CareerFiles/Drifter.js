export const drifter = {
    title: 'Drifter',
    description: 'Wanderers, hitchhikers, and travellers, drifters are those who roam the stars without obvious purpose or direction.',
    qualification: false,
    qualificationStat: null,
    qualificationDC: null,
    eventList: {
        2: {type: 'redirect', destination: 'mishap', description: 'Disaster!', noMuster: true},
        3: {type: 'choice', description: "A patron offers you a chance at a job.", choiceList: ['a', 'b'],
            a: {type: 'reward', description: 'You accept, but they hint that they will collect that favor one day.',
                button: 'Accept',
                result: {type: 'multiple', list: ['qual', 'patron'], 
                    qual:{type:'qualification', value: 4, expires: false},
                    patron: {type: 'favor', description: 'Patron who offered you a chance at a job when you were a drifer.'}
                }
            },
            b: {type: 'generic', description: "You don't trust or want the handout, or 'opportunity' and move on with your life.", button: "Refuse"}
        },
        4: {type: 'reward', description: 'You pick up a few useful skills here and there.',
            result: {type: 'choice',
                choiceType: 'increaseSkill',
                choiceList: ['JackOfAllTrades', 'Survival', 'Streetwise', 'Melee'],
                specialtyList: {JackOfAllTrades: null, Survival: null, Streetwise: null, Melee: 'any'}
            }
        },
        5: {type: 'reward', description: 'You manage to scavenge something useful.', result: {type: 'benefit', value: 1}},
        6: {type: 'redirect', destination: 'unusual'},
        7: {type: 'redirect', destination: 'life'},
        8: {type: 'check', checkType: 'choice', choiceList: ['Melee', 'GunCombat', 'Stealth'], specialtyList: {Melee: 'any', GunCombat: 'any', Stealth: null}, checkDC: 8,
            pass: {description: 'You manage to avoid injury.', type: 'generic'},
            fail: {description: 'You fail to avoid injury.', type: 'redirect', destination: 'injury'}},
        9: {type: 'choice', description: 'You are offered the chance to participate in a risky but rewarding venture.', choiceList: ['a', 'b'],
            a:{type: 'special', specialType: 'drifterRandom'},
            b:{description: 'You decide to play it safe.', result: null}},
        10: {type: 'reward', description: 'Life on the edge hones your abilities.', result: {type: 'choice', choiceType: 'increaseAny'}},
        11: {type: 'career', description: 'You are forcible drafted.', career: 'draft'},
        12: {type: 'reward', description: 'You thrive on adversity', result: {type: 'promotion'}}
    },
    mishapList: [
        {type: 'redirect', destination: 'injury table', modifier: 'disadvantage'},
        {type: 'redirect', destination: 'injury table'},
        {type: 'reward', description: 'You run afoul of a criminal gang, corrupt bureaucrat, or other foe.',
            result: {type: 'enemy', value: 1, description:'Enemy who drove you out of your drifter niche.'}
        },
        {type: 'reward', description: 'You suffer from a life threatening illness.', result: {type: 'stat', stat: 'end', value: -1}},
        {type: 'special', specialType: 'betrayal'},
        {description: 'You have no idea what happened to you - there is a gap in your memory.', type: 'generic'}
    ],
    skills: {
        personal: [
            {type: 'stat', stat: 'str'},
            {type: 'stat', stat: 'end'},
            {type: 'stat', stat: 'dex'},
            {type: 'skill', skill:'Language'},
            {type: 'skill', skill:'Profession'},
            {type: 'skill', skill:'JackOfAllTrades'},
        ],
        service: [
            {type: 'skill', skill:'Athletics'},
            {type: 'skill', skill:'Melee', specialty: 'unarmed'},
            {type: 'skill', skill:'Recon'},
            {type: 'skill', skill:'Streetwise'},
            {type: 'skill', skill:'Stealth'},
            {type: 'skill', skill:'Survival'},
        ],
        specialties: {
            barbarian: [
                {type: 'skill', skill:'Animals'},
                {type: 'skill', skill:'Carouse'},
                {type: 'skill', skill:'Melee', specialty: 'blade'},
                {type: 'skill', skill:'Stealth'},
                {type: 'skill', skill:'Seafarer', specialty: ['personal', 'sails']},
                {type: 'skill', skill:'Survival'},
            ],
            wanderer: [
                {type: 'skill', skill:'Drive'},
                {type: 'skill', skill:'Deception'},
                {type: 'skill', skill:'Recon'},
                {type: 'skill', skill:'Stealth'},
                {type: 'skill', skill:'Streetwise'},
                {type: 'skill', skill:'Survival'},
            ],
            scavenger: [
                {type: 'skill', skill:'Pilot', specialty: 'small'},
                {type: 'skill', skill:'Mechanic'},
                {type: 'skill', skill:'Astrogation'},
                {type: 'skill', skill:'VaccSuit'},
                {type: 'skill', skill:'Profession'},
                {type: 'skill', skill:'GunCombat'},
            ]
        }
    },
    benefits: [
        {money: 0, misc: 'Contact'},
        {money: 0, misc: 'Weapon'},
        {money: 1000, misc: 'Ally'},
        {money: 2000, misc: 'Weapon'},
        {money: 3000, misc: 'edu', miscValue: 1},
        {money: 4000, misc: 'ShipShare', miscValue: 1},
        {money: 8000, misc: 'ShipShare', miscValue: 2}
    ],
    specialtiesList: ['barbarian', 'wanderer', 'scavenger'],
}

export const barbarian = {
    title: 'Barbarian',
    description: 'You live on a primitive world, without the benefits of technology.',
    survivalSkill: 'end',
    survivalDC: 7,
    advancementSkill: 'str',
    advancementDC: 7,
    eventList: drifter.eventList,
    mishapList: drifter.mishapList,
    ranks: [
        {title: 'Lout', bonus: false},
        {title: 'Brute', bonus: {type: 'skill', skill: 'Survival', value: 1}},
        {title: 'Warrior', bonus: {type: 'skill', skill: 'Melee', specialty: 'blade', value: 1}},
        {title: 'Champion', bonus: false},
        {title: 'Chieftain', bonus: {type: 'skill', skill: 'Leadership', value: 1}},
        {title: 'High Chieftain', bonus: false},
        {title: 'Warlord', bonus: false}
    ],
    skills: drifter.skills,
    benefits: drifter.benefits,
    parent: 'drifter'
}
export const wanderer = {
    title: 'Wanderer',
    description: 'You are a space bum, living hand-to-mouth in slums and spaceports across the galaxy.',
    survivalSkill: 'end',
    survivalDC: 7,
    advancementSkill: 'int',
    advancementDC: 7,
    eventList: drifter.eventList,
    mishapList: drifter.mishapList,
    ranks: [
        {title: 'Stray', bonus: false},
        {title: 'Vagrant', bonus: {type: 'skill', skill: 'Streetwise', value: 1}},
        {title: 'Floater', bonus: false},
        {title: 'Vagabond', bonus: {type: 'skill', skill: 'Deception', value: 1}},
        {title: 'Roamer', bonus: false},
        {title: 'Explorer', bonus: false},
        {title: 'Nomad', bonus: false}
    ],
    skills: drifter.skills,
    benefits: drifter.benefits,
    parent: 'drifter'
}
export const scavenger = {
    title: 'Scavenger',
    description: 'You work as a belter (an asteroid miner) or on a salvage crew.',
    survivalSkill: 'dex',
    survivalDC: 7,
    advancementSkill: 'end',
    advancementDC: 7,
    eventList: drifter.eventList,
    mishapList: drifter.mishapList,
    ranks: [
        {title: 'Greenhorn', bonus: false},
        {title: 'Fungie', bonus: {type: 'skill', skill: 'VaccSuit', value: 1}},
        {title: 'Scavver', bonus: false},
        {title: 'Hauler', bonus: {type: 'skill', skill: 'choice', choiceList: ['Profession', 'Mechanic'], specialties: {Profession: 'belter', mechanic: null}}},
        {title: 'Heavy Hauler', bonus: false},
        {title: 'Scav Boss', bonus: false},
        {title: 'Scav Head', bonus: false}
    ],
    skills: drifter.skills,
    benefits: drifter.benefits,
    parent: 'drifter'
}