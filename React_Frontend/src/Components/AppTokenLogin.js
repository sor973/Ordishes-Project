import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function AppTokenLogin() {
    return (
        <Container className="mt-3">
            <h3 className="text-center">Token Login</h3>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Token</Form.Label>
                            <Form.Control type="text" placeholder="Enter Token" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AppTokenLogin
