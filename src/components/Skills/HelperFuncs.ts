import { AllSkills, skillState } from "../../features/Skills/SkillsSlice";

export const getSpecialtyList = (
	skillState: skillState,
	skill: string,
	list: string[] | string | null
) => {
	const currSkill = skillState[skill as keyof AllSkills];
	if (!currSkill.specialties || list === null) {
		return null;
	}
	if (list === "any") {
		return currSkill.specialtiesList;
	}
	if (Array.isArray(list)) {
		return list;
	}
	return [list];
};
