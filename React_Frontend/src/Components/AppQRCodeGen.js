import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import uuid from 'react-uuid';
import QRcode from 'qrcode';
import { axiosConfiguration } from '../variable/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons'

function AppQRCodeGen() {

    const [url, setURL] = useState("");
    const [name, setName] = useState("");
    const [qrcode, setQR] = useState("");
    const [errors, setError] = useState("");
    const [showQR, setShowQR] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [tokenAlert, setTokenAlert] = useState([]);

    async function postTable(e) {
        e.preventDefault();
        let x = +name;
        const Table = {
            "table": x
        }
        await axios.post(`${axiosConfiguration.url}/api/url`, {
            Table
        }).then((response) => {
            setURL(response.data);
            setError(null);
            setTokenAlert([
                <Alert className="mt-3" variant="success" key={uuid()}>
                    Token: {response.data.slice(-10)}
                    {/* <br />
                    Token URL: {response.data} */}
                </Alert>
            ]);
            setShowError(false);
            setShowSuccess(true);
            autoHideSuccess();
            console.log(response.data);
            QRcode.toDataURL(response.data).then(setQR);
            setShowQR(true);
        }).catch(e => {
            setError(e.response.data);
            setShowError(true);
            autoHideError();
            setShowQR(false);
            setTokenAlert([]);
            console.log(e.response.data);
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

    function autoHideError() {
        setTimeout(() => {setShowError(false)}, 3500)
    }

    function autoHideSuccess() {
        setTimeout(() => {setShowSuccess(false)}, 3500)
    }

    return (
        <Container>
            <Card className="mt-3 shadow p-3 mb-5 bg-white rounded">
                <Card.Body>
                    <Card.Title>QR Code generator </Card.Title>
                    <Row>
                        <Col>
                            <Form onSubmit={postTable}>
                                <Form.Group>
                                    <Form.Label>Enter table</Form.Label>
                                    <Form.Control type="number" placeholder="Enter table" value={name} onChange={(e) => setName(e.target.value)} />
                                    <Alert variant="danger" show={showError} className="mt-3">{errors && <div>{errors}</div>}</Alert>
                                    <Alert variant="success" show={showSuccess} className="mt-3">QR code is ready</Alert>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="d-flex justify-content-center">Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center mt-3 mb-3">
                            <Button onClick={qr} variant="outline-secondary">Generate QR Code <FontAwesomeIcon icon={faQrcode} /></Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            {showQR && <Image src={qrcode} width={200} height={200} />}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            {tokenAlert}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AppQRCodeGen
