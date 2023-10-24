import { ParentCareers } from './ParentCareers';
import React from "react";
import { useSelector } from "react-redux";
import {parentJobs} from "../../CareerDetails/CareerDetails";
import { Card, Col, Row } from 'react-bootstrap';
import placeholder from '../../../assets/placeholder.png'
import { RootState } from '../../../app/store';
import { ParentCareer } from '../../CareerDetails/CareerTyping';

export const CareerChooser = () => {
    const name = useSelector((state: RootState) => state.chara.charaName);

    const careerList = parentJobs.list as string[]
    return (
        <div className="jobBoard">
            <h2>Select Your Career, {name}!</h2>
            <Row xl={4} lg={3} m={3} style={{width: '90%', marginLeft:'5%', marginRight:'5%'}}>
            {careerList.map((e, i) => {
                return (
                    <Col key={`Key for Career List column at index ${i}`} style={{marginTop: '4vh'}}>
                    <Card style={{height: '40vh', overflow: 'auto'}}>
                        <Card.Img variant="top" src={placeholder}/>
                        <ParentCareers key={`Key for Career List card & ParentCareers Component at index ${i}`} parentCareer={parentJobs[e] as ParentCareer}/>
                    </Card>
                    </Col>
                )
            })}
            </Row>
        </div>
    )
}

