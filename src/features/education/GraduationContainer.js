import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genericIncrease } from "../Character/SkillsSlice";
import { changeStat } from "../Character/StatsSlice";
import { SelectSpecialty } from "../Skills/selectSpecialty";

export const Graduation = (props) => {
    const {major, minor, specialty, graduate, honors} = props;
    const dispatch = useDispatch();
    const edu = useSelector(state => state.stats.edu);
    const skills = useSelector(state => state.skills);
    const [needSpecialty, setNeedSpecialty] = useState(false);

    useEffect(() => {
        if (graduate) {
            dispatch(changeStat({edu: edu+2}))
            if (specialty) {
                dispatch(genericIncrease({skill: major, specialty: specialty}))
            }
            dispatch(genericIncrease({skill: major}))
            if (skills[minor].specialties) {
                setNeedSpecialty(true);
            } else {
                dispatch(genericIncrease({skill: minor}))
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSpecialty = (spec) => {
        dispatch(genericIncrease({skill: minor, specialty:spec}));
        setNeedSpecialty(false);
        return;
    }

    return (
        <div>
            <p>WAAAAAAAAAAGh</p>
            {needSpecialty &&
                <SelectSpecialty skill={minor} list={skills[minor].specialtiesList} passSpecialty={handleSpecialty}/>
            }
        </div>
    )
}