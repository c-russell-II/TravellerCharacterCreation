import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./reset.css";
import LandingPageTwo from "./Pages/Landing Page/LandingPageTwo";
import LandingPage from "./Pages/Landing Page/LandingPage";
import BenefitsContainer from "./components/BenefitContainer/BenefitsContainer";
import PrintPage from "./components/CharacterSheet/PrintPage";
import Layout from "./features/Organization/Layout";
import Qualification from "./Pages/GetNewCareer/Qualification/Qualification";
import QualFail from "./Pages/GetNewCareer/Qualification/QualFail";
import CareerChoiceLayout from "./Pages/GetNewCareer/CareerChoice/CareerChoiceLayout";
import DraftHandler from "./Pages/GetNewCareer/Qualification/DraftHandler";
import DrifterRedirect from "./Pages/GetNewCareer/Qualification/DrifterRedirect";
import { BackgroundSkillsChoice } from "./Pages/CreateCharacter/Creation/BackgroundSkills";
import { ClassicContainer } from "./Pages/CreateCharacter/Creation/Classic/ClassicContainer";
import { CharacterCreation } from "./Pages/CreateCharacter/Creation/Default/CharacterCreation";

import Freedom from "./Pages/Prison/Outcomes/Freedom";
import PrisonAdvanced from "./Pages/Prison/Outcomes/PrisonAdvanced";
import PrisonEntry from "./Pages/Prison/Layout/PrisonContainer";
import PrisonLayout from "./Pages/Prison/Layout/PrisonLayout";
import PrisonPassed from "./Pages/Prison/Outcomes/PrisonPassed";
import PrisonTerm from "./Pages/Prison/PrisonTerm";
import SurvivedPrison from "./Pages/Prison/Outcomes/SurvivedPrison";

import { CareerChooser } from "./Pages/GetNewCareer/CareerChoice/CareerChoice";
import EducationLayout from "./Pages/education/Utilities/EducationLayout";
import MilAcadNoGraduate from "./Pages/education/MilitaryAcademy/MilAcadNoGraduate";
import MilitaryAcademyGraduation from "./Pages/education/MilitaryAcademy/MilitaryAcademyGraduation";
import { MilitaryAcademyTerm } from "./Pages/education/MilitaryAcademy/MilitaryAcademyTerm";
import { UniversityChoice } from "./Pages/education/Term/UniversityChoice";
import { UniversityTerm } from "./Pages/education/Term/UniversityTerm";

import CareerTerm from "./Pages/CareerTerm/Entry";
import TermContainer from "./features/CareerTermContainer/TermContainer";
import { TermEventPort } from "./features/CareerTermMidPoint/TermEventPort";
import { TermFailed } from "./features/CareerTermFailed/TermFailed";
import AdvancedTerm from "./features/CareerAdvancedTerm/AdvancedTerm";
import TermNoPromotion from "./features/CareerNoPromoTerm/TermNoPromotion";
import "./universalstyles.css";
//TODO: consider replacing the react & bootstrap popups with my own versions!
import "bootstrap/dist/css/bootstrap.min.css";
import "reactjs-popup/dist/index.css";

//TODO: Fix styles in university choice and probably other places ; ~;
//TODO: Styles specific to skill-ups, stat-ups, and more!
const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <Layout />,
			children: [
				{ index: true, element: <LandingPage /> },
				{
					path: "creation/*",
					children: [
						{
							path: "character_creation",
							element: <CharacterCreation />,
						},
						{
							path: "classic_character_creation",
							element: <ClassicContainer />,
						},
						{
							path: "background_skills",
							element: <BackgroundSkillsChoice />,
						},
						///creation/background_skills
					],
				},

				{
					path: "prisoner/*",
					element: <PrisonLayout />,
					children: [
						{ index: true, element: <PrisonEntry /> },
						{ path: "start", element: <PrisonTerm /> },
						{ path: "survival", element: <SurvivedPrison /> },
						{ path: "passed", element: <PrisonPassed /> },
						{ path: "advanced", element: <PrisonAdvanced /> },
						{ path: "freedom", element: <Freedom /> },
					],
				},
				{
					path: "education/*",
					element: <EducationLayout />,
					children: [
						{ index: true, element: <UniversityChoice /> },
						{
							path: "university_term",
							element: <UniversityTerm />,
						},
						{
							path: "mil_academy/:branch",
							element: <MilitaryAcademyTerm />,
						},
						{
							path: "mil_academy/:branch/graduated",
							element: <MilitaryAcademyGraduation />,
						},
						{
							path: "mil_academy/:branch/no_graduate",
							element: <MilAcadNoGraduate />,
						},
					],
				},
				{
					path: "choose_career/",
					element: <CareerChoiceLayout />,
					children: [
						{ index: true, element: <CareerChooser /> },
						{ path: "drafted", element: <DraftHandler /> },
						{ path: "drift", element: <DrifterRedirect /> },
						{
							path: "qualification/:career",
							element: <Qualification />,
						},
						{
							path: "qualification/:career/failed",
							element: <QualFail />,
						},
					],
				},
				{
					path: "term/:career/*",
					element: <TermContainer />,
					children: [
						{ path: "start", element: <CareerTerm /> },
						{ path: "survived", element: <TermEventPort /> },
						{ path: "failed", element: <TermFailed /> },
						{ path: "advanced", element: <AdvancedTerm /> },
						{ path: "passed", element: <TermNoPromotion /> },
					],
				},
				{
					path: "leave_career/:career",
					element: <BenefitsContainer />,
				},
				{ path: "print", element: <PrintPage /> },
			],
		},
	] /*{basename: "tcc"}*/
);
const container = document.getElementById("root");
if (!container) {
	throw new Error("No root element found");
}
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
