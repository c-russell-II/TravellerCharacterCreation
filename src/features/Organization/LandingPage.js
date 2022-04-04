import React from "react";
import {Link} from 'react-router-dom';
export const LandingPage = (props) => {
    return(
        <div className="landing">
            <h1>Landing Page</h1>
            <p>This page should end up containing a brief description, and maybe some existing information...</p>
            <Link to="/character_creation"> Begin Character Creation... </Link>
        </div>
    )
}