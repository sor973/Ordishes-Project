import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import './App.css';

import AppNavbar from './Components/AppNavbar';
import AppMenu from './Components/AppMenu';
import AppConfirm from './Components/AppConfirm';
import AppCheckbill from './Components/AppCheckbill';
import AppTokenLogin from './Components/AppTokenLogin';

import AppNavbarCashier from './Components/AppNavbarCashier';
import AppCashier from './Components/AppCashier';
import AppQRCodeGen from './Components/AppQRCodeGen';


function App() {
    var menuArray = [];
    function randomID() {
        let rand = Math.floor(Math.random() * 6);
        if (rand === 0) rand = 1;
        return rand;
    }
    function loopThroughMenu(times) {
        for (let ind = 0; ind < times; ind++) {
            let ID = randomID();
            menuArray.push(<AppMenu menuid={ID} />);
        }
    }
    loopThroughMenu(10);
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
                            {menuArray}
                        </Row>
                    </Container>
                </Route>

                <Route exact path='/confirm'>
                    <AppNavbar />
                    <AppConfirm />
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
