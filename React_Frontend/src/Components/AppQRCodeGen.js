import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, Alert, Figure } from 'react-bootstrap';
import axios from 'axios';
import QRcode from 'qrcode';

function AppQRCodeGen() {

    const [url, setURL] = useState("");
    const [name, setName] = useState("");
    const [qrcode, setQR] = useState("");
    const [errors, setError] = useState("");
    const [show, setShow] = useState(false);

    async function postTable(e) {
        e.preventDefault()
        let x = +name;
        const Table = {
            "table": x
        }

        await axios.post("http://localhost:8000/urlapi", {
            Table
        }).then((response) => {
            setURL(response.data);
            setError(null)
            setShow(false)
            console.log(response.data);

        }).catch(e => {
            setError(e.response.data);
            setShow(true)
            console.log(e.response.data)
        })

    }

    function qr(e) {
        e.preventDefault();
        if (name !== "") {
            QRcode.toDataURL(url).then(setQR);
        } else {
            console.log("error")
        }
    }

    console.log(qrcode);

    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <Form onSubmit={postTable}>
                        <Form.Group>
                            <Form.Label>Enter table</Form.Label>
                            <Form.Control type="number" placeholder="Enter table" value={name} onChange={(e) => setName(e.target.value)} />
                            <Alert variant="danger" show={show} className="mt-3">{ errors && <div>{errors}</div> }</Alert>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="d-flex justify-content-center">Submit</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mt-3 mb-3">
                    <Button onClick={qr} variant="outline-secondary">Generate QR Code</Button>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Image src={qrcode} width={200} height={200} />
                </Col>
            </Row>
        </Container>
    )
}

export default AppQRCodeGen
