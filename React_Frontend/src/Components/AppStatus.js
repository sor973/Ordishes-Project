import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

function AppStatus() {
    return (
        <Container>
            <Card className="mt-3 shadow p-3 mb-5 bg-white rounded">
                <Card.Title>Status</Card.Title>
                <Row>
                    <Col>
                        <Table striped responsive="sm" size="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                </tr>

                            </thead>
                            <tbody>
                                <tr>
                                    <td>Sirloin steak</td>
                                    <td>Cooking</td>
                                </tr>
                                <tr>
                                    <td>Sirloin steak</td>
                                    <td>Cooking</td>
                                </tr>
                                <tr>
                                    <td>Sirloin steak</td>
                                    <td>Cooking</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default AppStatus
