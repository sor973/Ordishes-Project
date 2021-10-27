import React,{ useEffect, useRef } from 'react'
import { Container, Row, Col, Button, Alert, Card, Badge } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import uuid from 'react-uuid';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrashAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { axiosConfiguration } from '../variable/axios';
import { TokenAuth } from '../functions/tokenAuth';
import moment from 'moment';

function AppConfirm({Order}) {
    var tokenObject = localStorage.getItem("token");
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
            let menudata = MenuObject[orderdata["menuid"] - 1];
            TotalPrice += orderdata.quantity * menudata.price;
            return tableArray.push(
                <Card key={uuid()} className="my-2">
                    <Card.Body>
                        <Card.Title>
                            <Row xs="auto">
                                <Col xs={2}><Badge variant="success">x{orderdata.quantity}</Badge></Col>
                                <Col xs={7}>{menudata.title}</Col>
                                <Col xs={3} className="text-right">{menudata.price}$</Col>
                            </Row>
                        </Card.Title>
                        <Row xs="auto">
                            <Col xs={10} ><p>{orderdata.detail}</p></Col>
                            <Col xs={2} className="d-flex justify-content-between"><span></span><FontAwesomeIcon className="text-danger text-right" icon={faTimes} onClick={() => { Order.delOrder(orderid); updateOrderArray(); }} size="lg" style={{ "cursor": "pointer" }} /></Col>
                        </Row>

                    </Card.Body>
                </Card>);
        });
        tableArray.push(
            <Row>
                <Col className="d-flex justify-content-between my-2">
                    <strong>Total Price : {TotalPrice}$</strong>
                    <div className="d-flex justify-content-center"><Button disabled={!Object.keys(Order.order).length} onClick={cancelAllOrder} size="sm" variant="outline-danger">Cancel All <FontAwesomeIcon icon={faTrashAlt} /></Button></div>
                </Col>
            </Row>);
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
            Orderdata["status"] = "cooking";
            Orderdata["detail"] = Order.order[orderid].detail;
            return OrderArray.push(Orderdata);
        })
        return OrderArray
    }
    
    async function submitOrder(){
        const OrderArray = await changedata();
        var tableObject = localStorage.getItem("table");
        const Customerorder = {
            "datatype" : 2,
            "time" : moment().format('HH:mm'),
            "table" : tableObject,
            "token":tokenObject,
            "menu" : OrderArray,
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
            {redirect}
            <Card className="mt-3 shadow p-3 mb-5 bg-white rounded">
                <Card.Title>Order</Card.Title>
                <Row>
                    <Col>
                        {orderArray}
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center my-2">
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
