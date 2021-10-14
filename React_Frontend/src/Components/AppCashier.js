import React,{ useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Table, Button, Modal, Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister } from '@fortawesome/free-solid-svg-icons'


function AppCashier() {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDeny, setShowDeny] = useState(false);
    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = () => setShowConfirm(true);
    const handleCloseDeny = () => setShowDeny(false);
    const handleShowDeny = () => setShowDeny(true);
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
