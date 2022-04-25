import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import CareerTerm from "./CareerTerm";
import TermContainer from "./TermContainer";
import { TermMidPoint } from "./TermMidPoint";
import { TermFailed } from "./TermFailed";
import AdvancedTerm from "./AdvancedTerm";
import jobObject from "../Career/CareerDetails";
import TermNoPromotion from "./TermNoPromotion";


export const TermRouter = (props) => {
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