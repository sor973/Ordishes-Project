import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Button, Form, ButtonGroup, Modal, Container, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { TokenAuth } from '../functions/tokenAuth';

function AppMenu({menuindex, Order}) {
    let MenuObjectString = localStorage.getItem("menu");
    let MenuObject = JSON.parse(MenuObjectString);
    let menuid = menuindex + 1;
    var menu = MenuObject[menuindex]
    const maxDishAmount = 10;
    const [dish, updateDish] = useState(0);
    const [maxDishStatus, updateMaxDishStatus] = useState(false);
    const [redirect, setredirect] = useState();
    const [detail, setDetail] = useState('');
    const componentIsMounted = useRef(true);

    const[showOrder, setShowOrder] = useState(false);

    useEffect(()=>{
        async function doAuth(){
            if(!localStorage.getItem('token')) if(componentIsMounted.current) return setredirect(<Redirect to="/" />);
            let getTokenStatus = await TokenAuth.tokenAuthCheck(localStorage.getItem('token'))
            if(!getTokenStatus){
                if(componentIsMounted.current) return setredirect(<Redirect to="/" />);
            }
        } 
        doAuth();
        return () => {
            componentIsMounted.current = false;
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function decreaseDishAmount(){
        if(dish > 0){
            let currentDishAmount = dish;
            updateDish(currentDishAmount-1);
            updateMaxDishStatus(false);
        }
    }
    
    function increaseDishAmount(){
        if(dish < maxDishAmount){
            let currentDishAmount = dish;
            if(currentDishAmount+1 >= maxDishAmount) updateMaxDishStatus(true);
            updateDish(currentDishAmount+1);
        }
    }

    function startOrder(){
        Order.addOrder(menuid, dish, detail);
        updateDish(0);
    }

    return (
        <Col sm="12" lg="4">
            <Row>
                <Col md>
                    <Card className="mb-3 shadow p-3 mb-4 bg-white rounded">
                        <Card.Img variant="top" src={menu.thumbnailUrl} className="card-img-top" />
                        <Card.Body>
                            <Card.Title>
                                <Row>
                                    <Col>
                                        {menu.title}
                                    </Col>
                                    <Col>
                                        <p className="text-right"><strong>{menu.price}$</strong></p>
                                    </Col>
                                </Row>
                            </Card.Title>
                            <Row>
                                <Col md="12" className="d-flex align-items-center">
                                    <Card.Text>
                                        This is the title in card bootstrap
                                    </Card.Text>
                                </Col >
                                <Col md="12" className="mt-2">
                                    <Form>
                                        <Row>
                                            <Col>
                                                <div className="input-group d-flex justify-content-between">
                                                    {/* <ButtonGroup aria-label="Basic example" className="my-2">
                                                        <Button variant="danger" disabled={!dish} onClick={()=>decreaseDishAmount()}><FontAwesomeIcon icon={faMinus} /></Button>
                                                        <Button variant="outline-light" className="text-dark" disabled><strong>{dish}</strong></Button>
                                                        <Button variant="success" disabled={maxDishStatus} onClick={()=>increaseDishAmount()}><FontAwesomeIcon icon={faPlus} /></Button>
                                                    </ButtonGroup>
                                                    <Button variant="outline-success" disabled={!dish} onClick={() => startOrder()} className="my-2">Order <FontAwesomeIcon icon={faUtensils} /></Button> */}
                                                    <p></p>
                                                    <Button variant="outline-success" onClick={() => setShowOrder(true)} className="mt-4">Order !</Button>
                                                    <Modal show={showOrder}
                                                        onHide={() => setShowOrder(false)}
                                                        // backdrop="static"
                                                        keyboard={false}
                                                    >
                                                        <Modal.Header closeButton>
                                                            <h5>{menu.title}</h5>
                                                        </Modal.Header>
                                                        <Image src={menu.thumbnailUrl} className="p-3" style={{height:"30vh", width:"100%", borderRadius:"1.25rem"}}/>
                                                        <Row className="m-3">
                                                            <Col>Price</Col>
                                                            <Col className="text-right">{menu.price}$</Col>
                                                        </Row>
                                                        <Row className="mx-3">
                                                            <Col>
                                                                <Form>
                                                                    <Form.Group>
                                                                        <Form.Label>Detail (optional)</Form.Label>
                                                                        <Form.Control type="text" placeholder="Enter detail here" onChange={event => setDetail(event.target.value)} />
                                                                    </Form.Group>
                                                                </Form>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mx-3">
                                                            <Col className="d-flex justify-content-center">
                                                                <ButtonGroup aria-label="Basic example" className="my-2">
                                                                    <Button variant="danger" disabled={!dish} onClick={() => decreaseDishAmount()}><FontAwesomeIcon icon={faMinus} /></Button>
                                                                    <Button variant="outline-light" className="text-dark" disabled><strong>{dish}</strong></Button>
                                                                    <Button variant="success" disabled={maxDishStatus} onClick={() => increaseDishAmount()}><FontAwesomeIcon icon={faPlus} /></Button>
                                                                </ButtonGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mx-3">
                                                            <Col className="d-flex justify-content-center">
                                                                <Button variant="outline-success" disabled={!dish} onClick={() => startOrder()} className="my-3 px-4">Order <FontAwesomeIcon icon={faUtensils} /></Button>
                                                            </Col>
                                                        </Row>
                                                        {/* <Card>
                                                            <Card.Img variant="top" src={menu.thumbnailUrl} className="card-img-top" className="m-3" />
                                                            <Card.Body>
                                                                <Card.Title>
                                                                    {menu.title}
                                                                </Card.Title>
                                                                <Row>
                                                                    <Col>

                                                                    </Col>
                                                                </Row>
                                                            </Card.Body>
                                                        </Card> */}

                                                    </Modal>
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
            {redirect}
        </Col>
    )
}

export default AppMenu
