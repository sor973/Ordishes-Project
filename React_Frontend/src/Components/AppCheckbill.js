
import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid';
import moment from 'moment';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { axiosConfiguration } from '../variable/axios';

function AppCheckbill() {
    
    var list_CustomerOrder = [];
    const [orderArray, setOrderArray] = useState([]);
    useEffect(() => {
        async function checkbill() {
            await listoforder()
            setOrderArray(loopThroughMenu());
        }
        checkbill()
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    var tokenObject = localStorage.getItem("token");
    async function listoforder() {
        const Customerorder = {
            "datatype": 6,
            "status": "checkout",
            "token": "12345"
        };
        await axios.post(`${axiosConfiguration.url}/api/order`, {
            Customerorder
        }).then((response) => {
            list_CustomerOrder = response.data;
            console.log(list_CustomerOrder);
        }).catch((err) => {
            console.log(err)
        })
    }


    function loopThroughMenu() {
        var MenuObjectString = localStorage.getItem("menu");
        var MenuObject = JSON.parse(MenuObjectString);
        var TotalPrice = 0;
        var tableArray = [];
        let UserOrderKey = Object.keys(list_CustomerOrder);
        UserOrderKey.map(orderid => {
            let orderdata = list_CustomerOrder[orderid];
            let menudata = MenuObject[orderdata["menuid"] - 1];
            TotalPrice += orderdata.quantity * menudata.price;
            return tableArray.push(<tr key={uuid()}>
                <td>
                    {menudata.title}
                </td>
                <td>
                    {orderdata.quantity}
                </td>
                <td>
                    {menudata.price}$
                </td>
                <td>
                    {orderdata.quantity * menudata.price}$
                </td>
            </tr>);
        });
        tableArray.push(<tr key={uuid()}>
            <td colSpan="3"><strong>Total Price</strong></td>
            <td><strong>{TotalPrice}$</strong></td>
        </tr>);
        return tableArray;
    }

    async function checkbill() {
        const Checkout = {
            "datatype": 8,
            "token": "12345",
            "allmenu": list_CustomerOrder
        }
        await axios.post(`${axiosConfiguration.url}/cashier`, {
            Checkout
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <Container>
            <Card className="mt-3 shadow p-3 mb-5 bg-white rounded">
                <Row className="mt-3">
                    <Col className="d-flex justify-content-center"><h3>Ordishes <FontAwesomeIcon icon={faUtensils} /></h3></Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center"><p>1518 Pracharat 1 Road,Wongsawang,<br /> Bangsue, Bangkok 10800 Thailand.</p></Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center"><p>Tel: 000-000-0000</p></Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center"><p>Email: ordishes@test.com</p></Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <p>Date: {moment().format('DD/MM/YYYY')}</p>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <p>Time: {moment().format('HH:mm')}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped responsive="sm" size="sm" >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderArray}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center"><h6>Thank You </h6></Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button variant="outline-success" >Check bill <FontAwesomeIcon icon={faMoneyCheckAlt} /></Button>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default AppCheckbill
