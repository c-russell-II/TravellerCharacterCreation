import {agent, intelligence, lawEnforcement, corporate} from './CareerDetails/Agent'
import { cavalry, infantry, support, army } from './CareerDetails/Army'
// const eventArray = ['one', 'two', 'three', 'four', 'five', 'six'];

export const parentJobs = {
    agent: agent,
    army: army,
    list: ['agent', 'army'],
}

const jobObject = {
    intelligence: intelligence,
    lawEnforcement: lawEnforcement,
    corporate: corporate,
    cavalry: cavalry,
    infantry: infantry,
    support: support,
    list: ['intelligence', 'lawEnforcement', 'corporate', 'cavalry', 'infantry', 'support']
}

export default jobObject
// export const  = {
//     title: ,
//     qualification: ,
//     qualificationStat: ,
//     qualificationDC: ,
//     description: ,
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
//     ],
//     specialtiesList: [],
// }

// const = {
//     title:,
//     survivalSkill,
//     survivalDC,
//     advancementSkill,
//     advancementDC,
//     eventList,
//     mishapList,
//     ranks,
//     skills,
//     benefits
// }

// const rewardDetails = {
//     rewardType: ['skill', 'stat', 'benefit', 'qualification', 'advancement', ]
// }