import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Navbar } from 'react-bootstrap'
function AppNavbarCashier() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/cashier">Ordishes</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/cashier">Cashier</Nav.Link>
                    <Nav.Link href="/qrcodegen">QR Code Gen</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AppNavbarCashier
