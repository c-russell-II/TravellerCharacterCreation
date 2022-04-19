import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {CharacterCreation} from './features/Character/CharacterCreation';
import {TermRouter} from './features/Term/termRouter.js';
import {LandingPage} from './features/Organization/LandingPage';
import { CareerChooser } from './features/Organization/CareerChoice';
import { BackgroundSkillsChoice } from './features/Skills/BackgroundSkills';
import { UniversityChoice } from './features/education/UniversityChoice';
import { MilitaryAcademyTerm } from './features/education/MilitaryAcademyTerm';
import { UniversityTerm } from './features/education/UniversityTerm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import { ClassicContainer } from './features/Character/Classic/ClassicContainer';
import { BenefitsContainer } from './features/Career/benefitsContainer';
import PrintPage from './features/Organization/PrintPage';
import PrisonContainer from './features/Prison/PrisonContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/background_skills" element={<BackgroundSkillsChoice/>}/>
        <Route path="/character_creation" element={<CharacterCreation/>}/>
        <Route path="/classic_character_creation" element={<ClassicContainer/>}/>
        <Route path="/choose_education" element={<UniversityChoice/>}/>
        <Route path="/university_term" element={<UniversityTerm/>}/>
        <Route path="/mil_academy/:branch" element={<MilitaryAcademyTerm/>}/>
        <Route path="/choose_career" element={<CareerChooser />}/>
        <Route path="/term/:career/*" element={<TermRouter/>}/>
        <Route path="/leave_career/:career" element={<BenefitsContainer/>}/>
        <Route path="/prison" element={<PrisonContainer/>}/>
        <Route path="/print" element={<PrintPage/>}/>
      </Routes>
    </Router>
      );
}

export default App;
