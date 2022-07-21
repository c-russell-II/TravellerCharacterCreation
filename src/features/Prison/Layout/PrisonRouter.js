import React from "react";
import { Route, Routes } from "react-router-dom";
import Freedom from "../Outcomes/Freedom";
import PrisonAdvanced from "../Outcomes/PrisonAdvanced";
import PrisonEntry from "../Layout/PrisonContainer";
import PrisonLayout from "../Layout/PrisonLayout";
import PrisonPassed from "../Outcomes/PrisonPassed";
import PrisonTerm from "../PrisonTerm";
import SurvivedPrison from "../Outcomes/SurvivedPrison";
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