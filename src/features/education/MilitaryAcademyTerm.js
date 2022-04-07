import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { parentJobs } from "../Career/CareerDetails";
import { useDispatch, useSelector } from "react-redux";
import {increaseToZero} from '../Skills/SkillsSlice';

export const MilitaryAcademyTerm = (props) => {
    const dispatch = useDispatch();
    const stats = useSelector(state => state.stats);
    const {branch} = useParams();
    const basicTraining = parentJobs[branch].skills.service;
    useEffect(() => {
        basicTraining.forEach((e) => {dispatch(increaseToZero(e.skill))})
    }, [])
    return (
        <div className="military_academy">
            <h3>Ooyah, Hoorah, Hooah!</h3>
        </div>
    )
}