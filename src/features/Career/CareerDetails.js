import {agent, intelligence, lawEnforcement, corporate} from './CareerDetails/Agent'
import { cavalry, infantry, supportArmy, army } from './CareerDetails/Army'
import { citizen, colonist, manager, worker } from './CareerDetails/Citizen'
import { barbarian, drifter, scavenger, wanderer } from './CareerDetails/Drifter'
import { artist, entertainer, journalist, performer } from './CareerDetails/Entertainer'
import { groundAssault, marine, starMarine, supportMarine } from './CareerDetails/Marine'
import { broker, freeTrader, merchant, merchantMarine } from './CareerDetails/Merchant'
import { engineerGunner, flight, lineCrew, navy } from './CareerDetails/Navy'
import { administrator, dilettante, diplomat, noble } from './CareerDetails/Noble'
import { enforcer, pirate, rogue, thief } from './CareerDetails/Rogue'
import { fieldResearcher, physician, scholar, scientist } from './CareerDetails/Scholar'
import { courier, explorer, scout, surveyor } from './CareerDetails/Scout'

export const parentJobs = {
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
