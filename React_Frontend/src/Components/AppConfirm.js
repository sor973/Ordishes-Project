import React,{ useEffect, useRef } from 'react'
import { Container, Row, Col, Table, Button, Alert, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import uuid from 'react-uuid';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrashAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { axiosConfiguration } from '../variable/axios';
import { TokenAuth } from '../functions/tokenAuth';

function AppConfirm({Order}) {
    const [orderArray, setOrderArray] = useState(loopThroughMenu());
    const [alertArray, setAlertArray] = useState([]);
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
            <td>
                <div className="d-flex justify-content-center"><Button disabled={!Object.keys(Order.order).length} onClick={cancelAllOrder} size="sm" variant="outline-danger">Cancel All <FontAwesomeIcon icon={faTrashAlt} /></Button></div>
            </td>
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

    async function changedata() {
        var MenuObjectString = localStorage.getItem("menu");
        var MenuObject = JSON.parse(MenuObjectString);
        const OrderArray = [];
        let UserOrderKey = Object.keys(Order.order);
        UserOrderKey.map(orderid => {
            let menudata = MenuObject[Order.order[orderid]["menuid"]-1];
            var Orderdata = {} ;
            Orderdata["name"] = menudata.title;
            Orderdata["num"] = Order.order[orderid].quantity;
            Orderdata["val"] = menudata.price;
            Orderdata["menuid"] = Order.order[orderid].menuid;
            return OrderArray.push(Orderdata);
        })
        return OrderArray
    }
    console.log(Order.order);
    async function submitOrder(){
        const OrderArray = await changedata();
        const Customerorder = {
            "datatype" : 2,
            "table" : 15,
            "token":"12345",
            "list" : OrderArray,
            "status" : "let's cooking"
        }
        const Customerorder2 = {
            "datatype" : 7,
            "table": 15,
            "token":"12345",
            "menu" : Order.order
        }
        await axios.post(`${axiosConfiguration.url}/api/order`, {
            Customerorder,Customerorder2
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
            {redirect}
            <Card className="mt-3 shadow p-3 mb-5 bg-white rounded">
                <Card.Title>Order</Card.Title>
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
