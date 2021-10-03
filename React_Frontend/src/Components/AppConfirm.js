import React from 'react'
import { Container, Row, Col, Table, CloseButton, Button } from 'react-bootstrap'
import UserOrder from './data/userOrder';

function AppConfirm() {

    function randomnum() {
        return Math.floor(Math.random() * 50);
    }
    function cancelButton(){
        if(randomnum() >= 25){
            return(<Button variant="danger" size="sm">Cancel</Button>)
        }
        return (<Button variant="danger" size="sm" disabled>Cancel</Button>);
    }
    var TotalPrice = 0;
    var tableArray = [];
    function loopThroughMenu(){
        let UserOrderKey = Object.keys(UserOrder);
        UserOrderKey.map(predata => {
            let data = UserOrder[predata];
            TotalPrice+=data.sumPrice;
            tableArray.push(<tr>
                <td>
                    {data.menuName}
                </td>
                <td>
                    {data.amount}
                </td>
                <td>
                    {data.pricePerDish}$
                </td>
                <td>
                    {data.sumPrice}$
                </td>
                <td>
                    <div className="d-flex justify-content-center">
                        {cancelButton()}
                    </div>
                </td>
            </tr>);
        });
        tableArray.push(<tr>
            <td colSpan="3">Total Price</td>
            <td colSpan="2">{TotalPrice}$</td>
        </tr>);
    }
    loopThroughMenu();
    return (
        <Container >
            <Row className="mt-3">
                <Col>
                    <Table responsive="sm" size="sm" > 
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableArray}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Button>Submit</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default AppConfirm
