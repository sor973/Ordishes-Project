import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Button, Form, ButtonGroup} from 'react-bootstrap'
import menus from './data/menus';


function AppMenu({menuid}) {
    var menuindex = (menuid||1) - 1;
    var menu = menus[menuindex]
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
                                                <div className="input-group d-flex justify-content-between">
                                                    <ButtonGroup aria-label="Basic example" className="my-2">
                                                        <Button variant="danger" disabled={!dish} onClick={()=>decreaseDishAmount()}>-</Button>
                                                        <Button variant="outline-secondary" disabled>{dish}</Button>
                                                        <Button variant="success" disabled={maxDishStatus} onClick={()=>increaseDishAmount()}>+</Button>
                                                    </ButtonGroup>
                                                    <Button variant="outline-success" disabled={!dish} className="my-2">Order</Button>
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
