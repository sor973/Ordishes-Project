import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form, InputGroup as div } from 'react-bootstrap'
import menus from './data/menus';


function AppMenu({menuid}) {
    var menuindex = (menuid||1) - 1;
    var menu = menus[menuindex]

    return (
        <Col sm="12" lg="4">
            <Row>
                <Col md>
                    <Card className="mb-3">
                        <Card.Img variant="top" src={menu.thumbnailUrl} className="card-img-top" />
                        <Card.Body>
                            <Card.Title>
                                {menu.title}
                            </Card.Title>
                            <Row>
                                <Col md="12" className="mt-1 d-flex align-items-center">
                                    <Card.Text>
                                        This is the title in card bootstrap<br/>Price: {menu.price}$
                                    </Card.Text>
                                </Col >
                                <Col md="12" className="mt-2">
                                    <Form>
                                        <Row>
                                            <Col>
                                                <div className="input-group">
                                                    <select className="custom-select" id="inputGroupSelect04">
                                                        <option selected>Choose...</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                    <div className="input-group-append">
                                                        <button className="btn btn-outline-secondary" type="button">Order</button>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Col>
    )
}

export default AppMenu
