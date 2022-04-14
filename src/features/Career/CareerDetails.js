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
//     qualification: ,
//     qualificationStat: ,
//     qualificationDC: ,
//     description: ,
//     eventList: {},
//     mishapList: [],
//     skills: {},
//     benefits: [],
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