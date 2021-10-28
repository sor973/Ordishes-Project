import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Table, Button, Modal,} from 'react-bootstrap';
import React, { useState, useEffect,} from 'react'
import uuid from 'react-uuid';
import axios from 'axios';
import { axiosConfiguration } from '../variable/axios';

function AppCashier({Order2}) {
    var tokenObject = localStorage.getItem("token");
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDeny, setShowDeny] = useState(false);
    const [showCashier, setShowCashier] = useState(true);
    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = () => setShowConfirm(true);
    const handleCloseDeny = () => setShowDeny(false);
    const handleShowDeny = () => setShowDeny(true);
    var list_CustomerOrder = [];
    const [orderArray, setOrderArray] = useState([]);

    useEffect(() => {
        async function checkbill() {
            await listoforder()
            setOrderArray(loopThroughMenu());
        }
        checkbill()
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    async function listoforder() {
            list_CustomerOrder = Order2.allmenu;
    }

    function loopThroughMenu() {
        var TotalPrice = 0;
        var tableArray = [];
        let UserOrderKey = Object.keys(list_CustomerOrder);
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

    async function checkoutOrder(){
        var tokenObject = localStorage.getItem("token");
        const Checkout = {
            "datatype" : 9,
            "token": Order2.token
        }
        await axios.post(`${axiosConfiguration.url}/api/checkout`, {
            Checkout
        }).then((response) => {
            setShowConfirm(false);
            setShowCashier(false);
            // window.location.reload(true);
        }).catch((err) => {
            console.log(err)
        })
    }

    async function checkoutOrderdeny(){
        const Checkout = {
            "datatype" : "a",
            "token": Order2.token
        }
        await axios.post(`${axiosConfiguration.url}/api/checkout`, {
            Checkout
        }).then((response) => {
            setShowConfirm(false);
            setShowCashier(false);
            // window.location.reload(true);
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <Container>
            {showCashier && <Card className="mt-3 shadow p-3 mb-5 bg-white rounded">
                <Card.Body>
                    <Card.Title>Table {Order2.table}</Card.Title>
                    <Row>
                        <Col>
                            <Table striped responsive="sm" size="sm">
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
                        <Col className="d-flex justify-content-center">
                            <Button variant="danger" onClick={handleShowDeny}>Deny</Button>
                            <Modal
                                show={showDeny}
                                onHide={handleCloseDeny}
                                backdrop="static"
                                keyboard={false}
                                centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Are you sure?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Are you sure you want to <span className="text-danger"><strong>deny</strong></span> this payment?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseDeny}>No</Button>
                                    <Button variant="primary" onClick={checkoutOrderdeny}>Yes</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Button variant="success" onClick={handleShowConfirm}>Confirm</Button>
                            <Modal
                                show={showConfirm}
                                onHide={handleCloseConfirm}
                                backdrop="static"
                                keyboard={false}
                                centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Are you sure?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Are you sure you want to <span className="text-success"><strong>confirm</strong></span> this payment?</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseConfirm}>No</Button>
                                    <Button variant="primary" onClick={checkoutOrder} >Yes</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>}
        </Container>
    )
}

export default AppCashier
