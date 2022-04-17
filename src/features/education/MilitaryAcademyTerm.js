import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { parentJobs } from "../Career/CareerDetails";
import { useDispatch} from "react-redux";
import {increaseToZero} from '../Skills/SkillsSlice';

export const MilitaryAcademyTerm = (props) => {
    const dispatch = useDispatch();
    const {branch} = useParams();
    const basicTraining = parentJobs[branch].skills.service;
    useEffect(() => {
        basicTraining.forEach((e) => {dispatch(increaseToZero(e.skill))})
    }, [basicTraining, dispatch])
    return (
        <div className="military_academy">
            <h3>Ooyah, Hoorah, Hooah!</h3>
        </div>
    )
}