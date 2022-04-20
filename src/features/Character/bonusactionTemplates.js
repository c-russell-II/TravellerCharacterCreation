

const qualificationBonusTemplate = {
    parentCareers:["if it's not specialty specific, just put the parent career here and don't repeat "],
    careers:['qualifying sub-careers go here'],
    value: 'amount the qualification bonus is good for',
    age: 'age you were when you received this bonus.',
    duration: "how many terms it lasts, null if indefinite",
    source: "choices for this are career, university, or life events. Then we put the age on to tie it together."
}

// export const  = {
//     title: ,
//     description: '',
//     qualification: ,
//     qualificationStat: ,
//     qualificationDC: ,
//     eventList: {2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}, 9: {}, 10: {}, 11: {}, 12: {}},
//     mishapList: [{}, {}, {}, {}, {}, {}],
//     skills: {
//         personal: [],
//         service: [
//             {type: 'skill', skill:''},
//             {type: 'skill', skill:''},
//             {type: 'skill', skill:''},
//             {type: 'skill', skill:''},
//             {type: 'skill', skill:''},
//             {type: 'skill', skill:''},
//         ],
//         advanced: [
//             {type: 'skill', skill:''},
//             {type: 'skill', skill:''},
//             {type: 'skill', skill:''},
//             {type: 'skill', skill:''},
//             {type: 'skill', skill:''},
//             {type: 'skill', skill:''},
//         ],
//         specialties: {
//             1: [
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//             ],
//             2: [
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//             ],
//             3: [
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//                 {type: 'skill', skill:''},
//             ]
//         }
//     },
//     benefits: [
//         {money: , misc: ''},
//         {money: , misc: ''},
//         {money: , misc: ''},
//         {money: , misc: ''},
//         {money: , misc: ''},
//         {money: , misc: ''},
//         {money: , misc: ''},
//     ],
//     specialtiesList: [],
// }

// export const = {
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
//         {title: '', bonus: false},
//     ],
//     skills,
//     benefits
// }
// export const = {
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
//         {title: '', bonus: false},
//     ],
//     skills,
//     benefits
// }
// export const = {
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
//         {title: '', bonus: false},
//     ],
//     skills,
//     benefits
// }

// const rewardDetails = {
//     rewardType: ['skill', 'stat', 'benefit', 'qualification', 'advancement', ]
// }

// so the goal here is to outline a format and default structure for Events...

const eventTypes = ['choice', 'check', 'choice-check', 'stat-check', 'reward', 'redirect'];

const rewardEvent = {
    type: 'reward',
    roll: 9,
    description: 'placeholder',
    result: {type: 'what does the reward give', value: 'how much does it give'},
}
const rewardTypes = ['skill', 'skill-choice', 'stat', 'stat-choice', 'contacts, allies, enemies', 'advancement', 'promotion'];


const redirectEvent = {
    type: 'redirect',
    roll: 9,
    destination: ['life', 'mishap', 'class', 'unique//rare'],
    modifier: ['disadvantage', 'twice', 'no-job-loss'],
}

const choiceCheck = {
    type: 'check',
    checkType: 'choice',
    roll: 7,
    choiceList: ['multiple skills//stats go here'],
    checkDC: 8,
    pass: {description: 'describe outcome', result: ['skills, stats, etc', 'might redirect']},
    fail: {description: 'describe outcome', result: ['probably none', 'maybe consolation prize', 'maybe punishment']},
    description: 'describe set-up',
}

const check = {
    type: 'check',
    checkType: 'skill//stat',
    roll: 8,
    skill: 'skill',
    checkDC: 8,
    pass: {description: 'describe outcome', bonus: ['skills, stats, etc', 'might redirect']},
    fail: {description: 'describe outcome', bonus: ['probably none', 'maybe consolation prize', 'maybe punishment']},
    description: 'describe setup',
}

const statCheck = {
    type: 'statcheck',
    roll: 9,
    stat: 'stat',
    checkDC: 8,
    pass: {describe, bonus: null},
    fail: {describe, bonus: null},
    description: 'describe setup'
}

const choice = {
    type: 'choice',
    roll: 10,
    choiceList: ['a', 'b'],
    a: {description: 'describe', outcome: 'outcome, could be skill checks, could be reward'},
    b: {description: 'describe', outcome: 'outcome, blah blah blah'},
    description: 'describe setup',
}
