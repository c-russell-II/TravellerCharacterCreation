import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import CareerTerm from "../CareerTerm/CareerTerm";
import TermContainer from "../CareerTermContainer/TermContainer";
import { TermMidPoint } from "../CareerTermMidPoint/TermMidPoint";
import { TermFailed } from "../CareerTermFailed/TermFailed";
import AdvancedTerm from "../CareerAdvancedTerm/AdvancedTerm";
import jobObject from "../CareerDetails/CareerDetails";
import TermNoPromotion from "../CareerNoPromoTerm/TermNoPromotion";


const TermRouter = (props) => {
    const {career} = useParams();
    const title = jobObject[career].title
    return (
        <div className="term">
        <h1>{title}</h1>
        <Routes>
            <Route path="/" element={<TermContainer/>}>
                <Route path="start" element={<CareerTerm/>}/>
                <Route path="survived" element={<TermMidPoint/>}/>
                <Route path="failed" element={<TermFailed/>}/>
                <Route path="advanced" element={<AdvancedTerm/>}/>
                <Route path="passed" element={<TermNoPromotion/>}/>
            </Route>
        </Routes>
        </div>
    )
}

export default TermRouter