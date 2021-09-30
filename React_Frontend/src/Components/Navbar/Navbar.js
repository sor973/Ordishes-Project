import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <div className="Navbar" >
            <div className="links">
                <Link to="/token">Cashier</Link>
                <Link to="/qr">QR code generate</Link>
            </div>
        </div>
    );
}

export default Navbar;