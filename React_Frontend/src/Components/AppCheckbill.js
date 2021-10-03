import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';

function AppCheckbill() {
    
    var today = new Date(),
    dateToday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(dateToday);
    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center"><h3>Ordishes</h3></Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center"><p>1518 Pracharat 1 Road,Wongsawang,<br/> Bangsue, Bangkok 10800 Thailand.</p></Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center"><p>Tel:000-000-0000</p></Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center"><p>Email:ordishes@test.com</p></Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <p>Date: {dateToday}</p>
                </Col>
                <Col className="d-flex justify-content-center">
                    <p>Check:</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table responsive="sm" size="sm" >
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
                        </tbody>
                    </Table>
                </Col>
            </Row>
            

        </Container>
    )
}

export default AppCheckbill
