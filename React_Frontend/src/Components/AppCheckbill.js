import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom';
import uuid from 'react-uuid';
import moment from 'moment';
import { Container, Row, Col, Table, Card, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { axiosConfiguration } from '../variable/axios';
import { TokenAuth } from '../functions/tokenAuth';

function AppCheckbill() {

    var list_CustomerOrder = [];
    const [CustomerArray,setCustomerArray] = useState([]);
    const [orderArray, setOrderArray] = useState([]);
    var tokenObject = localStorage.getItem("token");
    const [redirect, setredirect] = useState();
    const componentIsMounted = useRef(true);
    const [show, setShow] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{
        async function checkbill() {
            await listoforder()
            setOrderArray(loopThroughMenu());
        }
        async function doAuth(){
            if(!localStorage.getItem('token')) if(componentIsMounted.current) return setredirect(<Redirect to="/" />);
            let getTokenStatus = await TokenAuth.tokenAuthCheck(localStorage.getItem('token'))
            if(!getTokenStatus){
                if(componentIsMounted.current) return setredirect(<Redirect to="/" />);
            }
            if(componentIsMounted.current) await checkbill();
        }
        doAuth();
        return () => {
            componentIsMounted.current = false;
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function listoforder() {
        const Customerorder = {
            "datatype": 6,
            "status": "checkout",
            "token": tokenObject
        };
        await axios.post(`${axiosConfiguration.url}/api/order`, {
            Customerorder
        }).then((response) => {
            list_CustomerOrder = response.data;
            setCustomerArray(response.data);
        }).catch((err) => {
            console.log(err)
        })
    }

    function loopThroughMenu() {
        var TotalPrice = 0;
        var tableArray = [];
        let UserOrderKey = Object.keys(list_CustomerOrder);
        if(UserOrderKey.length === 0) {
            setDisableButton(true);
        }else{
            setDisableButton(false);
        }
        UserOrderKey.map(orderid => {
            let orderdata = list_CustomerOrder[orderid];
            TotalPrice += orderdata.num * orderdata.val;
            return tableArray.push(<tr key={uuid()}>
                <td>
                    {orderdata.name}
                </td>
                <td>
                    {orderdata.num}
                </td>
                <td>
                    {orderdata.val}$
                </td>
                <td>
                    {orderdata.num * orderdata.val}$
                </td>
            </tr>);
        });
        tableArray.push(<tr key={uuid()}>
            <td colSpan="3"><strong>Subtotal</strong> :</td>
            <td><strong>{TotalPrice}$</strong></td>
        </tr>);
        tableArray.push(<tr key={uuid()}>
            <td colSpan="3">Net Total :</td>
            <td>{TotalPrice-(TotalPrice*7/100)}$</td>
        </tr>);
        tableArray.push(<tr key={uuid()}>
            <td colSpan="3">Tax 7% :</td>
            <td>{TotalPrice*7/100}$</td>
        </tr>);
        return tableArray;
    }

    async function checkbill() {
        console.log(CustomerArray);
        setShow(false);
        setDisableButton(true);
        const Checkout = {
            "datatype": 8,
            "table" : 15,
            "token": tokenObject,
            "allmenu": CustomerArray
        }
        await axios.post(`${axiosConfiguration.url}/api/checkout`, {
            Checkout
        }).catch((err) => {
            console.log(err)
        })
        console.log("send");
    }

    return (
        <Container>
            {redirect}
            <Card className="mt-3 shadow p-3 mb-5 bg-white rounded">
                <Row className="mt-3">
                    <Col className="d-flex justify-content-center"><h3>Ordishes <FontAwesomeIcon icon={faUtensils} /></h3></Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center"><p>1518 Pracharat 1 Road,Wongsawang,<br /> Bangsue, Bangkok 10800 Thailand.</p></Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center"><p>Tel : 000-000-0000</p></Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center"><p>Email : ordishes@test.com</p></Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <p>Date : {moment().format('DD/MM/YYYY')}</p>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <p>Time : {moment().format('HH:mm')}</p>
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
                        <Button variant="outline-success" onClick={handleShow} disabled={disableButton} >Check bill <FontAwesomeIcon icon={faMoneyCheckAlt} /></Button>
                        {console.log(!orderArray.length)}
                        <Modal
                            show={show}
                            onHide={handleClose}
                            // backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Are you sure?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are you sure to submit?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>No</Button>
                                <Button variant="primary" onClick={checkbill}>Yes</Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default AppCheckbill
