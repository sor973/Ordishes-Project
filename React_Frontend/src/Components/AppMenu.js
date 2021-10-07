import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Button, Form, ButtonGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faUtensils } from '@fortawesome/free-solid-svg-icons'

function AppMenu({menuindex, Order}) {
    let MenuObjectString = localStorage.getItem("menu");
    let MenuObject = JSON.parse(MenuObjectString);
    let menuid = menuindex + 1;
    var menu = MenuObject[menuindex]
    const maxDishAmount = 10;
    const [dish, updateDish] = useState(0);
    const [maxDishStatus, updateMaxDishStatus] = useState(false);

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
        Order.addOrder(menuid, dish);
        updateDish(0);
    }

    return (
        <Col sm="12" lg="4">
            <Row>
                <Col md>
                    <Card className="mb-3 shadow p-3 mb-5 bg-white rounded">
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
                                                <div className="input-group d-flex justify-content-between">
                                                    <ButtonGroup aria-label="Basic example" className="my-2">
                                                        <Button variant="danger" disabled={!dish} onClick={()=>decreaseDishAmount()}><FontAwesomeIcon icon={faMinus} /></Button>
                                                        <Button variant="outline-light" className="text-dark" disabled><strong>{dish}</strong></Button>
                                                        <Button variant="success" disabled={maxDishStatus} onClick={()=>increaseDishAmount()}><FontAwesomeIcon icon={faPlus} /></Button>
                                                    </ButtonGroup>
                                                    <Button variant="outline-success" disabled={!dish} onClick={()=>startOrder()} className="my-2">Order <FontAwesomeIcon icon={faUtensils} /></Button>
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
