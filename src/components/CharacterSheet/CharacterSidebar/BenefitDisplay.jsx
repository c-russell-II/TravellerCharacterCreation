import React from 'react';
import { useSelector } from 'react-redux';

const BenefitDisplay = (props) => {
    const benefits = useSelector(state => state.misc.benefits);
    return (
        <></>
    )
}

export default BenefitDisplay;