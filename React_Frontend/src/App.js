import 'bootstrap/dist/css/bootstrap.min.css';
import { useState , useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import uuid from 'react-uuid'
import './App.css';

import AppNavbar from './Components/AppNavbar';
import AppMenu from './Components/AppMenu';
import AppConfirm from './Components/AppConfirm';
import AppStatus from './Components/AppStatus';
import AppCheckbill from './Components/AppCheckbill';
import AppTokenLogin from './Components/AppTokenLogin';

import AppNavbarCashier from './Components/AppNavbarCashier';
import AppCashier from './Components/AppCashier';
import AppQRCodeGen from './Components/AppQRCodeGen';
import { Order } from './functions/OrderOperation';
import listofmenu from './functions/getMenu';
import listoforder from './functions/getOrder';
import getable from './functions/getTable';

function App() {

    var menuArray = [];
    const [menuArray2,setArray] = useState([]);
    var orderArray = [];
    const [orderArray2,setOrder] = useState([]);
    
    useEffect(() => {
        async function runapp() {
            await loopThroughMenu();
            setArray(menuArray);
        }
        async function runapp2() {
            await loopThroughOrder();
            setOrder(orderArray);
        }
        runapp()
        runapp2()
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    async function loopThroughMenu() {
        await listofmenu();   
        await getable();
        let MenuObjectString = localStorage.getItem("menu");
        let MenuObject = JSON.parse(MenuObjectString);
        for (let ind = 0; ind < MenuObject.length; ind++) {
            menuArray.push(<AppMenu key={uuid()} menuindex={ind} Order={Order} />);
            
        }
    }

    async function loopThroughOrder() {
        var Allorder = await listoforder();   
        for (let ind = 0; ind < Allorder.length; ind++) {
            orderArray.push(<AppCashier key={uuid()} orderindex={ind} Order2={Allorder[ind]} />);
        }
    }
    
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <AppTokenLogin />
                </Route>
                <Route exact path='/menu'>
                    <AppNavbar />
                    <Container>
                        <Row className="d-flex justify-content-center mt-3">
                            {menuArray2}
                        </Row>
                    </Container>
                </Route>

                <Route exact path='/confirm'>
                    <AppNavbar />
                    <AppConfirm Order={Order} />
                </Route>

                <Route exact path='/status'>
                    <AppNavbar />
                    <AppStatus />
                </Route>

                <Route exact path='/checkbill'>
                    <AppNavbar />
                    <AppCheckbill />
                </Route>

                {/*Cashier and token */}
                <Route exact path='/cashier'>
                    <AppNavbarCashier />
                    <Container>
                        <Row className="d-flex justify-content-center mt-3">
                            {orderArray2}
                        </Row>
                    </Container>
                </Route>
                <Route exact path='/qrcodegen'>
                    <AppNavbarCashier />
                    <AppQRCodeGen />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
