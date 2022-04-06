import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {CharacterCreation} from './features/Character/CharacterCreation';
import {Term} from './features/Term/termRender.js';
import {LandingPage} from './features/Organization/LandingPage';
import { CareerChooser } from './features/Organization/CareerChoice';
import { BackgroundSkillsChoice } from './features/Character/backgroundSkills';
import { UniversityChoice } from './features/education/UniversityChoice';
import { MilitaryAcademyTerm } from './features/education/MilitaryAcademyTerm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/background_skills" element={<BackgroundSkillsChoice/>}/>
        <Route path="/character_creation" element={<CharacterCreation/>}/>
        <Route path="/choose_education" element={<UniversityChoice/>}/>
        <Route path="/mil_academy/:branch" element={<MilitaryAcademyTerm/>}/>
        <Route path="/choose_career" element={<CareerChooser />}/>
        <Route path="/term/:career" element={<Term/>}/>
      </Routes>
    </Router>
      );
}

export default App;
