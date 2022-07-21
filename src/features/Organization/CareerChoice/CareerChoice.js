import { ParentCareers } from './ParentCareers';
import React from "react";
import { useSelector } from "react-redux";
import {parentJobs} from "../../Career/CareerDetails";
import { Card, Col, Row } from 'react-bootstrap';
import placeholder from '../../../assets/placeholder.png'

export const CareerChooser = (props) => {
    const name = useSelector(state => state.chara.charaName);
    return (
        <div className="jobBoard">
            <h2>Select Your Career, {name}!</h2>
            <Row xl={4} lg={3} m={3} style={{width: '90%', marginLeft:'5%', marginRight:'5%'}}>
            {parentJobs.list.map((e, i) => {
                return (
                    <Col key={i} style={{marginTop: '4vh'}}>
                    <Card style={{height: '40vh', overflow: 'auto'}}>
                        <Card.Img variant="top" src={placeholder}/>
                        <ParentCareers key={i} e={parentJobs[e]}/>
                    </Card>
                    </Col>
                )
            })}
            </Row>
        </div>
    )
}

