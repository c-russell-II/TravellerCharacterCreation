import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {CharacterCreation} from './features/Character/CharacterCreation';
import {TermRouter} from './features/Term/termRouter.js';
import {LandingPage} from './features/Organization/LandingPage';
import { CareerChooser } from './features/Organization/CareerChoice';
import { BackgroundSkillsChoice } from './features/Skills/BackgroundSkills';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import { ClassicContainer } from './features/Character/Classic/ClassicContainer';
import { BenefitsContainer } from './features/Career/benefitsContainer';
import PrintPage from './features/Organization/PrintPage';
import PrisonContainer from './features/Prison/PrisonContainer';
import Layout from './features/Organization/Layout';
import './App.css';
import Qualification from './features/Organization/Qualification/Qualification';
import QualFail from './features/Organization/Qualification/QualFail';
import CareerChoiceLayout from './features/Organization/CareerChoiceLayout';
import DraftHandler from './features/Organization/Qualification/DraftHandler';
import DrifterRedirect from './features/Organization/Qualification/DrifterRedirect';
import EducationRouter from './features/education/EducationRouter';

function App() {
  return (
    <div className="outer">
    <div className="app" >
      <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<LandingPage/>}/>
            <Route path="background_skills" element={<BackgroundSkillsChoice/>}/>
            <Route path="character_creation" element={<CharacterCreation/>}/>
            <Route path="classic_character_creation" element={<ClassicContainer/>}/>
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
      </Router>
    </div>
    </div>
      );
}

export default App;
