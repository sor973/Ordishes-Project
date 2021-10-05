import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import menus from './data/menus';

function Menu() {

    const listofmenu = async () => {
        var menulist = [];
        try {
            const response = await axios.get("http://localhost:8000/api/menu");
            menulist.push(response.data.menu);
            console.log(menulist[0]);
            return menulist[0];
        } catch (err) {
            console.log(err);
        }
    }
    var menu = listofmenu();
    
    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center">
                    this is cashier
                </Col>
            </Row>
        </Container>
    )
}


export default Menu;
// export listofmenu;