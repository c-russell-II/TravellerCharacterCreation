import {agent, intelligence, lawEnforcement, corporate} from './CareerDetails/Agent'
import { cavalry, infantry, support, army } from './CareerDetails/Army'
import { citizen, colonist, manager, worker } from './CareerDetails/Citizen'
// const eventArray = ['one', 'two', 'three', 'four', 'five', 'six'];

export const parentJobs = {
    agent: agent,
    army: army,
    citizen: citizen,
    list: ['agent', 'army', 'citizen']
}

const jobObject = {
    intelligence: intelligence,
    lawEnforcement: lawEnforcement,
    corporate: corporate,
    cavalry: cavalry,
    infantry: infantry,
    support: support,
    manager: manager,
    worker: worker,
    colonist: colonist,
}

export default jobObject
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
//     ],
//     specialtiesList: [],
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

// const rewardDetails = {
//     rewardType: ['skill', 'stat', 'benefit', 'qualification', 'advancement', ]
// }