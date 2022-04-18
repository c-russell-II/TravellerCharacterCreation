export const drifter = {
    title: 'Drifter',
    description: 'Wanderers, hitchhikers, and travellers, drifters are those who roam the stars without obvious purpose or direction.',
    qualification: false,
    qualificationStat: null,
    qualificationDC: null,
    eventList: {
        2: {type: 'redirect', destination: 'injury', description: 'You are severely injured...'},
        3: {type: 'choice', description: "A patron offers you a chance at a job.", choiceList: ['a', 'b'],
        a: {description: 'You accept, but they hint that they will collect that favor one day.', button: 'Accept', result: {type: 'multiple', list: ['qual', 'patron'], 
            qual:{type:'qual', value: 4, expires: false}, patron: {type: 'favor', description: 'Patron who offered you a chance at a job when you were a drifer.'}}},
        b: {description: "You don't trust or want the handout, or 'opportunity' and move on with your life."}
        },
        4: {type: 'reward', description: 'You pick up a few useful skills here and there.', result: {type: 'choice', choiceType: 'increase', choiceList: ['JackOfAllTrades', 'Survival', 'Streetwise', 'Melee'], choiceDetails: {JackOfAllTrades: 'skill', Survival: 'skill', Streetwise: 'skill', Melee:'skill'}, specialty: {Melee: 'any'}}},
        5: {type: 'reward', description: 'You manage to scavenge something useful.', result: {type: 'benefit', value: 1}},
        6: {type: 'redirect', destination: 'unusual'},
        7: {type: 'redirect', destination: 'life'},
        8: {type: 'check', checkType: 'choice', choiceList: ['Melee', 'GunCombat', 'Stealth'], checkDC: 8,
            pass: {description: 'You manage to avoid injury.', result: null},
            fail: {description: 'You fail to avoid injury.', result: {type: 'redirect', destination: 'injury'}}},
        9: {type: 'choice', description: 'You are offered the chance to participate in a risky but rewarding venture.', choiceList: ['a', 'b'],
            a:{description: 'You agree, and...', result: {type: 'random'}},
            b:{description: 'You decide to play it safe.', result: null}},
        10: {},
        11: {},
        12: {type: 'reward', description: 'You thrive on adversity', result: {type: 'promotion'}}
    },
    mishapList: [{}, {}, {}, {}, {}, {}],
    skills: {
        personal: [
            {type: 'stat', stat: 'str'},
            {type: 'stat', stat: 'end'},
            {type: 'stat', stat: 'dex'},
            {type: 'skill', skill:'Language', specialty: 'any'},
            {type: 'skill', skill:'Profession', specialty: 'any'},
            {type: 'skill', skill:'JackOfAllTrades'},
        ],
        service: [
            {type: 'skill', skill:'Athletics', specialty: 'any'},
            {type: 'skill', skill:'Melee', specialty: 'unarmed'},
            {type: 'skill', skill:'Recon'},
            {type: 'skill', skill:'Streetwise'},
            {type: 'skill', skill:'Stealth'},
            {type: 'skill', skill:'Survival'},
        ],
        specialties: {
            barbarian: [
                {type: 'skill', skill:'Animals', specialty: 'any'},
                {type: 'skill', skill:'Carouse'},
                {type: 'skill', skill:'Melee', specialty: 'blade'},
                {type: 'skill', skill:'Stealth'},
                {type: 'skill', skill:'Seafarer', specialty: ['personal', 'sails']},
                {type: 'skill', skill:'Survival'},
            ],
            wanderer: [
                {type: 'skill', skill:'Drive', specialty: 'any'},
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
                {type: 'skill', skill:'Profession', specialty: 'any'},
                {type: 'skill', skill:'GunCombat', specialty: 'any'},
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

// const = {
//     title:,
//     description: '',
//     survivalSkill,
//     survivalDC,
//     advancementSkill,
//     advancementDC,
//     eventList,
//     mishapList,
//     ranks: [
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//     ],
//     skills,
//     benefits
// }
// const = {
//     title:,
//     description: '',
//     survivalSkill,
//     survivalDC,
//     advancementSkill,
//     advancementDC,
//     eventList,
//     mishapList,
//     ranks: [
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//     ],
//     skills,
//     benefits
// }
// const = {
//     title:,
//     description: '',
//     survivalSkill,
//     survivalDC,
//     advancementSkill,
//     advancementDC,
//     eventList,
//     mishapList,
//     ranks: [
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//         {title: '', bonus: false},
//     ],
//     skills,
//     benefits
// }