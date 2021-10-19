import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom'
import { TokenAuth } from '../functions/tokenAuth';

function AppStatus() {

    const [redirect, setredirect] = useState();
    const componentIsMounted = useRef(true);

    useEffect(()=>{
        async function doAuth(){
            if(!localStorage.getItem('token')) if(componentIsMounted.current) return setredirect(<Redirect to="/" />);
            let getTokenStatus = await TokenAuth.tokenAuthCheck(localStorage.getItem('token'))
            if(!getTokenStatus){
                if(componentIsMounted.current) return setredirect(<Redirect to="/" />);
            }
        } 
        doAuth();
        return () => {
            componentIsMounted.current = false;
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            {redirect}
            <Card className="mt-3 shadow p-3 mb-5 bg-white rounded">
                <Card.Title>Status</Card.Title>
                <Row>
                    <Col>
                        <Table striped responsive="sm" size="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                </tr>

                            </thead>
                            <tbody>
                                <tr>
                                    <td>Sirloin steak</td>
                                    <td>Cooking</td>
                                </tr>
                                <tr>
                                    <td>Sirloin steak</td>
                                    <td>Cooking</td>
                                </tr>
                                <tr>
                                    <td>Sirloin steak</td>
                                    <td>Cooking</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default AppStatus
