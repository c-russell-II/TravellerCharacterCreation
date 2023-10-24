import { AnySkill, skillState } from "./SkillsSlice";

export default function setSkillHandler (skillState: skillState, skillList: AnySkill[], specialtyList: string[], value: number) {
    const final: {[key: string]: AnySkill} = {};
    return final;
}

const setSkillHandler2 = (skills, skillList, specialtyList, value) => {
    const needsSpecialties = skillList.filter(e => specialtyList[e])
    const noSpecialties = skillList.filter(e => !needsSpecialties.includes(e));

    const filteredSpecialtyList = {};

    const filterSpecialtyArray = (e) => {
        const filtered = specialtyList[e].filter(f => skills[e][f] < value);
        filteredSpecialtyList[e] = filtered
        if (filtered.length === 0) {
            filteredSpecialtyList[e] = null;
            return;
        }
        if (filtered.length === 1) {
            filteredSpecialtyList[e] = filtered[0]
            return;
        }
        return;
    }
    const filterAnySpecialty = (e) => {
        const filtered = skills[e].specialtiesList.filter((f) => skills[e][f] < value);
        filteredSpecialtyList[e] = filtered
        if (filtered.length === 0) { filteredSpecialtyList[e] = null; }
        if (filtered.length === 1) { filteredSpecialtyList[e] = filtered[0] }
        return;
    }
    Object.keys(specialtyList).forEach((e) => {
        if (specialtyList[e] === 'any') { filterAnySpecialty(e); return}

        if (Array.isArray(specialtyList[e])) { filterSpecialtyArray(e); return}

        if (skills[e][specialtyList[e]] < value) { filteredSpecialtyList[e] = specialtyList[e]; return; }

        filteredSpecialtyList[e] = null;
        return;
    })

    const filteredNoSpecialties = noSpecialties.filter((e) => skills[e].value < value);
    const filteredSpecialtySkills = needsSpecialties.filter((e) => filteredSpecialtyList[e]);
    const finalArray = filteredNoSpecialties.concat(filteredSpecialtySkills);
    return {filteredNoSpecialties: filteredNoSpecialties, filteredSpecialties: filteredSpecialtySkills, filteredSpecialtyList: filteredSpecialtyList, allSkills: finalArray}
};
