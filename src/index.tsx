import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./reset.css";
import LandingPageTwo from "./features/Organization/Landing Page/LandingPageTwo";
import LandingPage from "./features/Organization/Landing Page/LandingPage";
import BenefitsContainer from "./features/Benefits/BenefitsContainer";
import PrintPage from "./features/Organization/Utilities/PrintPage";
import Layout from "./features/Organization/Utilities/Layout";
import Qualification from "./features/Organization/Qualification/Qualification";
import QualFail from "./features/Organization/Qualification/QualFail";
import CareerChoiceLayout from "./features/Organization/CareerChoice/CareerChoiceLayout";
import DraftHandler from "./features/Organization/Qualification/DraftHandler";
import DrifterRedirect from "./features/Organization/Qualification/DrifterRedirect";
import { BackgroundSkillsChoice } from "./features/Creation/BackgroundSkills";
import { ClassicContainer } from "./features/Creation/Classic/ClassicContainer";
import { CharacterCreation } from "./features/Creation/Default/CharacterCreation";

import Freedom from "./features/Prison/Outcomes/Freedom";
import PrisonAdvanced from "./features/Prison/Outcomes/PrisonAdvanced";
import PrisonEntry from "./features/Prison/Layout/PrisonContainer";
import PrisonLayout from "./features/Prison/Layout/PrisonLayout";
import PrisonPassed from "./features/Prison/Outcomes/PrisonPassed";
import PrisonTerm from "./features/Prison/PrisonTerm";
import SurvivedPrison from "./features/Prison/Outcomes/SurvivedPrison";

import { CareerChooser } from "./features/Organization/CareerChoice/CareerChoice";
import EducationLayout from "./features/education/Utilities/EducationLayout";
import MilAcadNoGraduate from "./features/education/MilitaryAcademy/MilAcadNoGraduate";
import MilitaryAcademyGraduation from "./features/education/MilitaryAcademy/MilitaryAcademyGraduation";
import { MilitaryAcademyTerm } from "./features/education/MilitaryAcademy/MilitaryAcademyTerm";
import { UniversityChoice } from "./features/education/Term/UniversityChoice";
import { UniversityTerm } from "./features/education/Term/UniversityTerm";
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
