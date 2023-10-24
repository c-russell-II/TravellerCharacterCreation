import {agent, intelligence, lawEnforcement, corporate} from './CareerFiles/Agent'
import { cavalry, infantry, supportArmy, army } from './CareerFiles/Army'
import { citizen, colonist, manager, worker } from './CareerFiles/Citizen'
import { barbarian, drifter, scavenger, wanderer } from './CareerFiles/Drifter'
import { artist, entertainer, journalist, performer } from './CareerFiles/Entertainer'
import { groundAssault, marine, starMarine, supportMarine } from './CareerFiles/Marine'
import { broker, freeTrader, merchant, merchantMarine } from './CareerFiles/Merchant'
import { engineerGunner, flight, lineCrew, navy } from './CareerFiles/Navy'
import { administrator, dilettante, diplomat, noble } from './CareerFiles/Noble'
import { enforcer, pirate, rogue, thief } from './CareerFiles/Rogue'
import { fieldResearcher, physician, scholar, scientist } from './CareerFiles/Scholar'
import { courier, explorer, scout, surveyor } from './CareerFiles/Scout'
import { CareerSpecialty, ParentCareer } from './CareerTyping'

export const parentJobs: {[key: string]: ParentCareer | string[]} = {
    agent: agent,
    army: army,
    citizen: citizen,
    drifter: drifter,
    entertainer: entertainer,
    marine: marine,
    merchant: merchant,
    navy: navy,
    noble: noble,
    rogue: rogue,
    scholar: scholar,
    scout: scout,
    list: ['agent', 'army', 'citizen', 'drifter', 'entertainer', 'marine', 'merchant', 'navy', 'noble', 'rogue', 'scholar', 'scout']
}

const jobObject: {[key:string]: CareerSpecialty} = {
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
    flight: flight,
    administrator: administrator,
    diplomat: diplomat,
    dilettante: dilettante,
    thief: thief,
    enforcer: enforcer,
    pirate: pirate,
    fieldResearcher: fieldResearcher,
    scientist: scientist,
    physician: physician,
    courier: courier,
    surveyor: surveyor,
    explorer: explorer,
}

export default jobObject
