import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addBenefit } from "../../../Career/careerSlice";
import { AdditionalBenefitEventReward } from "../../../CareerDetails/CareerTyping";
import { resolveEvent } from "../../../TermSlice/TermSlice";

const AddBenefit = (props: {event: AdditionalBenefitEventReward}) => {
    const {paramCareer} = useParams();
    const career = typeof paramCareer === 'string' ? paramCareer : '';
    const event = props.event;
    // const benefitCount = useSelector((state: RootState)=> state.careers.careerInfo[career].benefits)
    const dispatch = useDispatch();
    if (career === '') {
        console.warn("Param for career was undefined.")
        return <>You ended up on this page with no career in the URL paramaters - if you didn't do this on purpose, I'm impressed. And annoyed.</>
    }
    //TODO: Handle the 'all' value in benefit value!
    const value = event.value

    const handleClick = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        dispatch(addBenefit({job: career, value: value}))
        dispatch(resolveEvent());
        return;
    }
    return (
        <>
            <button onClick={handleClick}>{value > 0 ? 'Great.' : 'Damn.'}</button>
        </>
    )
}

export default AddBenefit;