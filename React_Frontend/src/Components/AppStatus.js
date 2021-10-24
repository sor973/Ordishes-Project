import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom'
import { TokenAuth } from '../functions/tokenAuth';
import axios from 'axios';
import { axiosConfiguration } from '../variable/axios';
import uuid from 'react-uuid';
function AppStatus() {

    const [redirect, setredirect] = useState();
    const componentIsMounted = useRef(true);
    var tokenObject = localStorage.getItem("token");
    var list_CustomerOrder = [];
    const [orderArray, setOrderArray] = useState([]);

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

    useEffect(() => {
        async function checkbill() {
            await statusrequest()
            setOrderArray(loopThroughMenu());
        }
        checkbill()
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    async function statusrequest() {
        const Customerorder = {
            "datatype": 3,
            "table" : 15,
            "token" : tokenObject
        };
        await axios.post(`${axiosConfiguration.url}/api/order`, {
            Customerorder
        }).then((response) => {
            list_CustomerOrder = response.data.status;
            
        }).catch((err) => {
            console.log(err)
        })
    }

    function loopThroughMenu() {
        var tableArray = [];
        let UserOrderKey = Object.keys(list_CustomerOrder);
        UserOrderKey.map(orderid => {
            let orderdata = list_CustomerOrder[orderid];
            return tableArray.push(<tr key={uuid()}>
                <td>
                    {orderdata.name}
                </td>
                <td>
                    {orderdata.status}
                </td>
            </tr>);
        });
        return tableArray;
    }

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
                                {orderArray}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default AppStatus
