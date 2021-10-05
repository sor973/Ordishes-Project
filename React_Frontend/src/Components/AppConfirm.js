import React from 'react'
import { Container, Row, Col, Table, Button, Alert } from 'react-bootstrap'
import menus from './data/menus';
import uuid from 'react-uuid';
import { useState } from 'react';
// import UserOrder from './data/userOrder';

function AppConfirm({Order}) {
    const [orderArray, setOrderArray] = useState(loopThroughMenu());
    const [alertArray, setAlertArray] = useState([]);
    function loopThroughMenu(){
        var TotalPrice = 0;
        var tableArray = [];
        let UserOrderKey = Object.keys(Order.order);
        UserOrderKey.map(orderid => {
            let orderdata = Order.order[orderid]
            let menudata = menus[orderdata["menuid"]-1];
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
                        <Button variant="danger" onClick={()=>{Order.delOrder(orderid);updateOrderArray();}} size="sm">Cancel</Button>
                    </div>
                </td>
            </tr>);
        });
        tableArray.push(<tr key={uuid()}>
            <td colSpan="3">Total Price</td>
            <td>{TotalPrice}$</td>
            <td><div className="d-flex justify-content-center"><Button disabled={!Object.keys(Order.order).length} onClick={cancelAllOrder} size="sm" variant="danger">Cancel All</Button></div></td>
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
    }
    function submitOrder(){
        Order.order = {};
        Order.clearOrder();
        setOrderArray(loopThroughMenu());
        setAlertArray([
            <Alert variant="success" key={uuid()}>
                All orders have been sent to the kitchen!
            </Alert>
        ]);
    }
    return (
        <Container >
            <Row className="mt-3">
                <Col>
                    <Table responsive="sm" size="sm" > 
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
                    <Button disabled={!Object.keys(Order.order).length} onClick={submitOrder}>Submit</Button>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mt-3">
                    {alertArray}
                </Col>
            </Row>
        </Container>
    )
}

export default AppConfirm
