import React from "react";
import { useSelector, useDispatch } from "react-redux";


export const UniversityTerm = (props) => {
    const stats = useSelector(state => state.stats);
    return (
        <div className="university_term">
            <h3>School years, year: {}</h3>
        </div>
    )
}