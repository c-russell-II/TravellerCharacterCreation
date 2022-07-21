import React from "react";
import { Route, Routes } from "react-router-dom";
import EducationLayout from "./EducationLayout";
import MilAcadNoGraduate from "../MilitaryAcademy/MilAcadNoGraduate";
import MilitaryAcademyGraduation from "../MilitaryAcademy/MilitaryAcademyGraduation";
import { MilitaryAcademyTerm } from "../MilitaryAcademy/MilitaryAcademyTerm";
import { UniversityChoice } from "../Term/UniversityChoice";
import { UniversityTerm } from "../Term/UniversityTerm";

const EducationRouter = (props) => {

    return (
        <Routes>
            <Route path="/*" element={<EducationLayout/>}/>
                <Route index element={<UniversityChoice/>}/>
                <Route path="university_term" element={<UniversityTerm/>}/>
                <Route path="mil_academy/:branch" element={<MilitaryAcademyTerm/>}/>
                <Route path="mil_academy/:branch/no_graduate" element={<MilAcadNoGraduate/>}/>
                <Route path="mil_academy/:branch/graduated" element={<MilitaryAcademyGraduation/>}/>
        </Routes>
    )
}

export default EducationRouter;