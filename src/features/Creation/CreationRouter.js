import { Route, Routes } from "react-router-dom";
import { BackgroundSkillsChoice } from "./BackgroundSkills";
import { ClassicContainer } from "./Classic/ClassicContainer";
import { CharacterCreation } from "./Default/CharacterCreation";

const CreationRouter = (props) => {
	return (
		<Routes>
			<Route path="character_creation" element={<CharacterCreation />} />
			<Route
				path="classic_character_creation"
				element={<ClassicContainer />}
			/>
			<Route
				path="background_skills"
				element={<BackgroundSkillsChoice />}
			/>
		</Routes>
	);
};

export default CreationRouter;
