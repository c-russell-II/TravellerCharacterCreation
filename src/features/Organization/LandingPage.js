import React from "react";
import {Link} from 'react-router-dom';
export const LandingPage = (props) => {
    return(
        <div className="landing">
            <h1>Landing Page</h1>
            <p>This page should end up containing a brief description, and maybe some existing information...</p>
            <p>Choose either classic or default character creation- classic is the "roll dice, assign stats" system, and default is point-buy. need to balance that point buy.</p>
            <Link to="/character_creation"> Default Character Creation</Link> <br/>
            <Link to="/classic_character_creation">Classic Character Creation</Link>
        </div>
    )
}