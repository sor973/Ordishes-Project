import 'bootstrap/dist/css/bootstrap.min.css';
import { useState , useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import uuid from 'react-uuid'
import './App.css';

import AppNavbar from './Components/AppNavbar';
import AppMenu from './Components/AppMenu';
import AppConfirm from './Components/AppConfirm';
import AppCheckbill from './Components/AppCheckbill';
import AppTokenLogin from './Components/AppTokenLogin';

import AppNavbarCashier from './Components/AppNavbarCashier';
import AppCashier from './Components/AppCashier';
import AppQRCodeGen from './Components/AppQRCodeGen';
import { Order } from './functions/OrderOperation';
import listofmenu from './functions/getMenu'

function App() {

    useEffect(() => {
        async function runapp() {
            await loopThroughMenu();
            setArray(menuArray);
        }
        runapp()
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    
    const [menuArray2,setArray] = useState([]);

    var menuArray = [];

    async function loopThroughMenu() {
        await listofmenu();   
        let MenuObjectString = localStorage.getItem("menu");
        let MenuObject = JSON.parse(MenuObjectString);
        for (let ind = 0; ind < MenuObject.length; ind++) {
            menuArray.push(<AppMenu key={uuid()} menuindex={ind} Order={Order} />);
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

                <Route exact path='/checkbill'>
                    <AppNavbar />
                    <AppCheckbill />
                </Route>

                {/*Cashier and token */}
                <Route exact path='/cashier'>
                    <AppNavbarCashier />
                    <AppCashier />
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
