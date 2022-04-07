import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {CharacterCreation} from './features/Character/CharacterCreation';
import {TermContainer} from './features/Term/termContainer.js';
import {LandingPage} from './features/Organization/LandingPage';
import { CareerChooser } from './features/Organization/CareerChoice';
import { BackgroundSkillsChoice } from './features/Character/backgroundSkills';
import { UniversityChoice } from './features/education/UniversityChoice';
import { MilitaryAcademyTerm } from './features/education/MilitaryAcademyTerm';
import { UniversityTerm } from './features/education/UniversityTerm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import { ClassicContainer } from './features/Character/Classic/ClassicContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/background_skills" element={<BackgroundSkillsChoice/>}/>
        <Route path="/character_creation" element={<CharacterCreation/>}/>
        <Route path="/classic_character_creation" element={<ClassicContainer/>}/>
        <Route path="/choose_education" element={<UniversityChoice/>}/>
        <Route path="/university_term/:term" element={<UniversityTerm/>}/>
        <Route path="/mil_academy/:branch" element={<MilitaryAcademyTerm/>}/>
        <Route path="/choose_career" element={<CareerChooser />}/>
        <Route path="/term/:career" element={<TermContainer/>}/>
      </Routes>
    </Router>
      );
}

export default App;
