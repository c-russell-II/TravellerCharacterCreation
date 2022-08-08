import React from 'react';
import {Routes, Route} from "react-router-dom"
import {CharacterCreation} from './features/Creation/Default/CharacterCreation';
import {TermRouter} from './features/CareerTermRouter/termRouter';
import {LandingPage} from './features/Organization/Landing Page/LandingPage';
import { CareerChooser } from './features/Organization/CareerChoice/CareerChoice';
import { BackgroundSkillsChoice } from './features/Creation/BackgroundSkills';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import { ClassicContainer } from './features/Creation/Classic/ClassicContainer';
import { BenefitsContainer } from './features/Benefits/benefitsContainer';
import PrintPage from './features/Organization/Utilities/PrintPage';
import PrisonContainer from './features/Prison/Layout/PrisonContainer';
import Layout from './features/Organization/Utilities/Layout';
import './App.css';
import Qualification from './features/Organization/Qualification/Qualification';
import QualFail from './features/Organization/Qualification/QualFail';
import CareerChoiceLayout from './features/Organization/CareerChoice/CareerChoiceLayout';
import DraftHandler from './features/Organization/Qualification/DraftHandler';
import DrifterRedirect from './features/Organization/Qualification/DrifterRedirect';
import EducationRouter from './features/education/Utilities/EducationRouter';
import PrisonRouter from './features/Prison/Layout/PrisonRouter';

function App() {
  return (
          <Routes>
            <Route path="/" element={<Layout/>} basename="tcc">
              <Route index element={<LandingPage/>}/>
              <Route path="background_skills" element={<BackgroundSkillsChoice/>}/>
              <Route path="character_creation" element={<CharacterCreation/>}/>
              <Route path="classic_character_creation" element={<ClassicContainer/>}/>
              <Route path="prisoner/*" element={<PrisonRouter/>}/>
              <Route path="education/*" element={<EducationRouter/>}/>
              <Route path="choose_career/" element={<CareerChoiceLayout />}>
                <Route index element={<CareerChooser/>}/>
                <Route path="drafted" element={<DraftHandler/>}/>
                <Route path="drift" element={<DrifterRedirect/>}/>
                <Route path="qualification/:career" element={<Qualification/>}/>
                <Route path="qualification/:career/failed" element={<QualFail/>}/>
              </Route>
              <Route path="term/:career/*" element={<TermRouter/>}/>
              <Route path="leave_career/:career" element={<BenefitsContainer/>}/>
              <Route path="prison" element={<PrisonContainer/>}/>
              <Route path="print" element={<PrintPage/>}/>
            </Route>
          </Routes>
      );
}

export default App;
