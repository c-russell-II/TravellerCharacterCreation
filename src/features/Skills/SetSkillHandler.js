const setSkillHandler = (skills, skillList, specialtyList, value) => {
    const needsSpecialties = skillList.filter(e => specialtyList[e])
    const noSpecialties = skillList.filter(e => !needsSpecialties.includes(e));

    const filteredSpecialtyList = {};
    Object.keys(specialtyList).forEach((e) => {
        if (Array.isArray(specialtyList[e])) {
            const filtered = specialtyList[e].filter(f => skills[e][f] < value);
            if (filtered.length > 1) {
                filteredSpecialtyList[e] = filtered;
                return;
            } else if (filtered.length === 1) {
                filteredSpecialtyList[e] = filtered[0]
                return;
            }
            filteredSpecialtyList[e] = null;
            return;
        } else if (specialtyList[e] === 'any') {
            const filtered = skills[e].specialtiesList.filter((f) => skills[e][f] < value);
            if (filtered.length > 1) {
                filteredSpecialtyList[e] = filtered;
                return;
            } else if (filtered.length === 1) {
                filteredSpecialtyList[e] = filtered[0]
                return;
            }
            filteredSpecialtyList[e] = null;
            return;
        } else { 
            if (skills[e][specialtyList[e]] < value) {
                filteredSpecialtyList[e] = specialtyList[e]
                return;
            }
            filteredSpecialtyList[e] = null;
            return;
        }
    })

    const filteredNoSpecialties = noSpecialties.filter((e) => skills[e].value < value);
    const filteredSpecialtySkills = needsSpecialties.filter((e) => filteredSpecialtyList[e]);
    const finalArray = filteredNoSpecialties.concat(filteredSpecialtySkills);
    return {filteredNoSpecialties: filteredNoSpecialties, filteredSpecialties: filteredSpecialtySkills, filteredSpecialtyList: filteredSpecialtyList, allSkills: finalArray}
};

export default setSkillHandler