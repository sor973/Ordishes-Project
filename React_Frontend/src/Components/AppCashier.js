import React,{ useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Table, Button, Modal, Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister } from '@fortawesome/free-solid-svg-icons'


function AppCashier() {
<<<<<<< HEAD
    
=======
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
>>>>>>> 4fdc975c12d9f72629bb56cb5840bbc43b96aa07
    return (
        <Container>
            <Card className="mt-3 shadow p-3 mb-5 bg-white rounded">
                <Card.Body>
                    <Card.Title>Table 12</Card.Title>
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
                                    <tr>
                                        <td>Sirloin steak</td>
                                        <td>2</td>
                                        <td>10$</td>
                                        <td>20$</td>
                                    </tr>
                                    <tr>
                                        <td>Sirloin steak</td>
                                        <td>2</td>
                                        <td>10$</td>
                                        <td>20$</td>
                                    </tr>
                                    <tr>
                                        <td>Sirloin steak</td>
                                        <td>2</td>
                                        <td>10$</td>
                                        <td>20$</td>
                                    </tr>
                                    <tr>
                                        <td>Sirloin steak</td>
                                        <td>2</td>
                                        <td>10$</td>
                                        <td>20$</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3"><strong>Subtotal</strong> :</td>
                                        <td><strong>80$</strong></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">Net Total :</td>
                                        <td>74.4$</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">Tax 7% :</td>
                                        <td>5.6$</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button variant="danger">deny</Button>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Button variant="success" onClick={handleShow}>confirm</Button>
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                                centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Are you sure?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Are you sure you want to confirm the payment?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                                    <Button variant="success">Confirm</Button>
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
