
import React from 'react'
import moment from 'moment';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

function AppCheckbill() {
    /*
    var listorder = [];
    var tokenObject = localStorage.getItem("token");
    async function listoforder() {
        const Customerorder = {
            "datatype" : 6,
            "status" : "client",
            "token" : tokenObject
        };
        await axios.post("http://localhost:8000/api/order", {
            Customerorder
        }).then((response) => {
            listorder = response.data;
        }).catch((err) => {
            console.log(err)
        })
    }
    listoforder();

    async function checkbill() {

        
    }
    */
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
                                <tr>
                                    <td>steak t-bone</td>
                                    <td>2</td>
                                    <td>10</td>
                                    <td>20</td>
                                </tr>
                                <tr>
                                    <td>steak t-bone</td>
                                    <td>2</td>
                                    <td>10</td>
                                    <td>20</td>
                                </tr>
                                <tr>
                                    <td>steak t-bone</td>
                                    <td>2</td>
                                    <td>10</td>
                                    <td>20</td>
                                </tr>
                                <tr>
                                    <td>steak t-bone</td>
                                    <td>2</td>
                                    <td>10</td>
                                    <td>20</td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><strong>Total Price :</strong></td>
                                    <td><strong>60</strong></td>
                                </tr>
                                <tr>
                                    <td colSpan="3">Tax 7% :</td>
                                    <td>4.2</td>
                                </tr>
                                <tr>
                                    <td colSpan="3"><strong>Pay amount :</strong></td>
                                    <td><strong>64.2</strong></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center"><h6>Thank You </h6></Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button variant="outline-success">Check bill <FontAwesomeIcon icon={faMoneyCheckAlt} /></Button>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default AppCheckbill
