import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Navbar } from 'react-bootstrap'
function AppNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/menu">Ordishes</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/menu">Menu</Nav.Link>
                    <Nav.Link href="/confirm">Confirm order</Nav.Link>
                    <Nav.Link href="/checkbill">Check bill</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AppNavbar
