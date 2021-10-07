import React from 'react'
import { Container, Row, Col, Table, Button, Alert, Card } from 'react-bootstrap';
import uuid from 'react-uuid';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrashAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { axiosConfiguration } from '../variable/axios';

function AppConfirm({Order}) {
    const [orderArray, setOrderArray] = useState(loopThroughMenu());
    const [alertArray, setAlertArray] = useState([]);
    function loopThroughMenu(){
        var MenuObjectString = localStorage.getItem("menu");
        var MenuObject = JSON.parse(MenuObjectString);
        var TotalPrice = 0;
        var tableArray = [];
        let UserOrderKey = Object.keys(Order.order);
        UserOrderKey.map(orderid => {
            let orderdata = Order.order[orderid]
            let menudata = MenuObject[orderdata["menuid"]-1];
            TotalPrice+=orderdata.quantity*menudata.price;
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
                    {orderdata.quantity*menudata.price}$
                </td>
                <td>
                    <div className="d-flex justify-content-center">
                        <FontAwesomeIcon className="text-danger" icon={faTimes} onClick={()=>{Order.delOrder(orderid);updateOrderArray();}} size="lg" style={{"cursor": "pointer"}}/>
                    </div>
                </td>
            </tr>);
        });
        tableArray.push(<tr key={uuid()}>
            <td colSpan="3"><strong>Total Price</strong></td>
            <td><strong>{TotalPrice}$</strong></td>
            <td><div className="d-flex justify-content-center"><Button disabled={!Object.keys(Order.order).length} onClick={cancelAllOrder} size="sm" variant="outline-danger">Cancel All <FontAwesomeIcon icon={faTrashAlt} /></Button></div></td>
        </tr>);
        return tableArray;
    }
    function updateOrderArray(){
        setOrderArray(loopThroughMenu());
    }
    function cancelAllOrder(){
        Order.order = {};
        Order.clearOrder();
        setOrderArray(loopThroughMenu());
        setAlertArray([
            <Alert variant="info" key={uuid()}>
                All orders have been canceled!
            </Alert>
        ]);
        console.log(orderArray)
    }
    async function submitOrder(){
        const Customerorder = {
            "datatype" : 2,
            "menu" : Order.order,
            "token":"12345",
            "orderid": uuid()
        }
        await axios.post(`${axiosConfiguration.url}/api/order`, {
            Customerorder
        }).then((response) => {
            Order.order = {};
            Order.clearOrder();
            setOrderArray(loopThroughMenu());
            setAlertArray([
                <Alert variant="success" key={uuid()}>
                    All orders have been sent to the kitchen!
                </Alert>
            ]);
            console.log(response.data);
        }).catch((err) => {
            console.log(err)
        })
    }
    return (

        <Container >
            <Card className="mt-3 shadow p-3 mb-5 bg-white rounded">
                <Row>
                    <Col>
                        <Table striped responsive="sm" size="sm" >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th className="text-center">Cancel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderArray}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button variant="success" disabled={!Object.keys(Order.order).length} onClick={submitOrder}>Submit Order <FontAwesomeIcon icon={faUtensils} /></Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center mt-3">
                        {alertArray}
                    </Col>
                </Row>
            </Card>


        </Container>
    )
}

export default AppConfirm
