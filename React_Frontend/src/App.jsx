import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './Components/AppMenu/AppMenu.css';
import './App.css';
import AppHeader from './Components/AppHeader/AppHeader';
import AppMenu from './Components/AppMenu/AppMenu';
import AppConfirmOrder from './Components/AppConfirmOrder/AppConfirmOrder';
import AppCheckbill from './Components/AppCheckbill/AppCheckbill';
import Navbar from './Components/Navbar/Navbar';
import Cashdetail from './Components/Cashier/Cashdetail';
import CashQR from './Components/QRgenerate/CashQR';
import SubCash from './Components/Cashier/Button/SubCash';

function App() {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route exact path='/'>
                        <div>
                            <h1>Ordishes</h1>
                        </div>
                    </Route>
                    <Route exact path='/menu'>
                        <div>
                            <AppHeader />
                            <AppMenu />
                        </div>
                    </Route>
                    <Route exact path='/comfirmorder'>
                        <div>
                            <AppHeader />
                            <AppConfirmOrder />
                        </div>
                    </Route>
                    <Route exact path='/checkbill'>
                        <div>
                            <AppHeader />
                            <AppCheckbill />
                        </div>
                    </Route>

{/*Cashier and token */}
                    <Route exact path="/token">
                        <nav className="CashierHead" >
                            <h1>Cashier</h1>
                        </nav>
                        <Cashdetail />
                        <SubCash />
                        <Navbar />
                    </Route>
                    <Route path="/qr">
                        <nav className="QRHead" >
                            <h1>QR code generate</h1>
                        </nav>
                        <CashQR />
                        <Navbar />
                    </Route>
                </Switch>
            </div>
        </Router>

        
    )
}

export default App
