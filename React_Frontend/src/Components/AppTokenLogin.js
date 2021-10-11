import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Redirect, useLocation } from 'react-router-dom'
import QueryString from 'query-string';

const tokenCheck = new RegExp(/^[A-Za-z0-9]+$/);

function AppTokenLogin() { 
    const params = QueryString.parse(useLocation().search);
    var initialErrorStatus = true;
    if(params.token){initialErrorStatus = false;}
    const [token, settoken] = useState(params.token || "");
    const [errorstatus, seterrorstatus] = useState(initialErrorStatus);
    const [showerror, setshowerror] = useState(false);
    const [errortext, seterrortext] = useState("");
    const [redirect, setredirect] = useState();
    // settoken(params.token);
    // console.log(params);
    useEffect(()=>{
        if(params.token&&tokenCheck.test(token)){
            submitHandling();
        }
        return;
        },[]); // eslint-disable-line react-hooks/exhaustive-deps

    function changeHandling(e){
        settoken(e.target.value);
        if(tokenCheck.test(e.target.value)){
            return seterrorstatus(false);
        }
        return seterrorstatus(true);
    }

    async function submitHandling(e){
        if(e) e.preventDefault();
        setshowerror(false);
        if(token === ""){
            setshowerror(true);
            seterrortext("Empty Token")
            return;
        }
        if(!tokenCheck.test(token)){
            setshowerror(true);
            seterrortext("Invalid Token.")
            return;
        }
        alert("Done!");
        // localStorage.setItem("token", token);
        return setredirect(<Redirect to="/menu" />);
    }

    return (
        <Container className="mt-3">
            <h3 className="text-center">Token Login</h3>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Token</Form.Label>
                            <Form.Control type="text" placeholder="Enter Token" value={token}  onChange={changeHandling}/>
                            <Form.Text className="text-muted">
                                Token will expire in 24 hr.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={errorstatus} onClick={submitHandling}>Submit</Button>
                    </Form>
                </Col>
            </Row>
            {showerror && <Container className="d-flex justify-content-center align-items-center my-3">
                <Alert variant="danger" className="text-center">{errortext}</Alert>
            </Container>}
            {redirect}
        </Container>
    )
}

export default AppTokenLogin
