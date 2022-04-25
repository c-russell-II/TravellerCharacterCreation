import React from "react";
import { Route, Routes } from "react-router-dom";
import Freedom from "./Freedom";
import PrisonAdvanced from "./PrisonAdvanced";
import PrisonEntry from "./PrisonContainer";
import PrisonLayout from "./PrisonLayout";
import PrisonPassed from "./PrisonPassed";
import PrisonTerm from "./PrisonTerm";
import SurvivedPrison from "./SurvivedPrison";
const PrisonRouter = (props) => {

    return (
        <Routes>
            <Route path="/" element={<PrisonLayout/>}/>
                <Route index element={<PrisonEntry/>}/>
                <Route path="start" element={<PrisonTerm/>}/>
                <Route path="survival" element={<SurvivedPrison/>}/>
                <Route path="passed" element={<PrisonPassed/>}/>
                <Route path="advanced" element={<PrisonAdvanced/>}/>
                <Route path="freedom" element={<Freedom/>}/>
        </Routes>
    )
}

export default PrisonRouter;