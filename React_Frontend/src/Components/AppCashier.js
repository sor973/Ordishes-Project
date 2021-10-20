import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Table, Button, Modal,} from 'react-bootstrap';
import React, { useState, useEffect,} from 'react'
import uuid from 'react-uuid';



function AppCashier({Order2}) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDeny, setShowDeny] = useState(false);
    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = () => setShowConfirm(true);
    const handleCloseDeny = () => setShowDeny(false);
    const handleShowDeny = () => setShowDeny(true);
    var list_CustomerOrder = [];
    // const [CustomerArray,setCustomerArray] = useState([]);
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

    return (
        <Container>
            <Card className="mt-3 shadow p-3 mb-5 bg-white rounded">
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
                                    <Button variant="primary">Yes</Button>
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
                                    <Button variant="primary">Yes</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AppCashier
