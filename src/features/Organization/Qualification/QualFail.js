import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const QualFail = (props) => {
    const drafted = useSelector(state => state.chara.drafted);
    return (
        <>
            <h2>Failure...</h2>
            <p>Having failed to qualify for the career you chose, You must decide what to do next.</p>
            {!drafted && <Link to="../drafted">Enter the Draft</Link> }<br/>
            <Link to="../drift">Choose something new.</Link>
        </>
    )
}
export default QualFail