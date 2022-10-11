import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./features/Organization/Landing Page/LandingPage";
import { CareerChooser } from "./features/Organization/CareerChoice/CareerChoice";
import "bootstrap/dist/css/bootstrap.min.css";
import "reactjs-popup/dist/index.css";
import { BenefitsContainer } from "./features/Benefits/benefitsContainer";
import PrintPage from "./features/Organization/Utilities/PrintPage";
import PrisonContainer from "./features/Prison/Layout/PrisonContainer";
import Layout from "./features/Organization/Utilities/Layout";
import "./App.css";
import Qualification from "./features/Organization/Qualification/Qualification";
import QualFail from "./features/Organization/Qualification/QualFail";
import CareerChoiceLayout from "./features/Organization/CareerChoice/CareerChoiceLayout";
import DraftHandler from "./features/Organization/Qualification/DraftHandler";
import DrifterRedirect from "./features/Organization/Qualification/DrifterRedirect";
import EducationRouter from "./features/education/Utilities/EducationRouter";
import PrisonRouter from "./features/Prison/Layout/PrisonRouter";
import { Suspense } from "react";

const CreationRouter = lazy(() => import("./features/Creation/CreationRouter"));
const TermRouter = lazy(async () => await import("./features/CareerTermRouter/termRouter"));

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />} basename="tcc">
				<Route index element={<LandingPage />} />
				<Route
					path="creation/*"
					element={
						<Suspense fallback={<span>Loading...</span>}>
							<CreationRouter />
						</Suspense>
					}
				/>
				<Route path="prisoner/*" element={<PrisonRouter />} />
				<Route path="education/*" element={<EducationRouter />} />
				<Route path="choose_career/" element={<CareerChoiceLayout />}>
					<Route index element={<CareerChooser />} />
					<Route path="drafted" element={<DraftHandler />} />
					<Route path="drift" element={<DrifterRedirect />} />
					<Route
						path="qualification/:career"
						element={<Qualification />}
					/>
					<Route
						path="qualification/:career/failed"
						element={<QualFail />}
					/>
				</Route>
				<Route
					path="term/:career/*"
					element={
						<Suspense fallback={<span>Loading...</span>}>
							<TermRouter />
						</Suspense>
					}
				/>
				<Route
					path="leave_career/:career"
					element={<BenefitsContainer />}
				/>
				<Route path="prison" element={<PrisonContainer />} />
				<Route path="print" element={<PrintPage />} />
			</Route>
		</Routes>
	);
}

export default App;
