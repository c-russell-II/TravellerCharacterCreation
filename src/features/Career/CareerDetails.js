import {agent, intelligence, lawEnforcement, corporate} from './CareerDetails/Agent'
import { cavalry, infantry, supportArmy, army } from './CareerDetails/Army'
import { citizen, colonist, manager, worker } from './CareerDetails/Citizen'
import { barbarian, drifter, scavenger, wanderer } from './CareerDetails/Drifter'
import { artist, entertainer, journalist, performer } from './CareerDetails/Entertainer'
import { groundAssault, marine, starMarine, supportMarine } from './CareerDetails/Marine'
import { broker, freeTrader, merchant, merchantMarine } from './CareerDetails/Merchant'
import { engineerGunner, flight, lineCrew, navy } from './CareerDetails/Navy'

export const parentJobs = {
    agent: agent,
    army: army,
    citizen: citizen,
    drifter: drifter,
    entertainer: entertainer,
    marine: marine,
    merchant: merchant,
    navy: navy,
    list: ['agent', 'army', 'citizen', 'drifter', 'entertainer', 'marine', 'merchant', 'navy']
}

const jobObject = {
    intelligence: intelligence,
    lawEnforcement: lawEnforcement,
    corporate: corporate,
    cavalry: cavalry,
    infantry: infantry,
    supportArmy: supportArmy,
    manager: manager,
    worker: worker,
    colonist: colonist,
    barbarian: barbarian,
    wanderer: wanderer,
    scavenger: scavenger,
    artist: artist,
    journalist: journalist,
    performer: performer,
    supportMarine: supportMarine,
    starMarine: starMarine,
    groundAssault: groundAssault,
    merchantMarine: merchantMarine,
    freeTrader: freeTrader,
    broker: broker,
    lineCrew: lineCrew,
    engineerGunner: engineerGunner,
    flight: flight
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