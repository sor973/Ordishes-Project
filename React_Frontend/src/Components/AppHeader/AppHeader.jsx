import './AppHeader.css';

function AppHeader() {
    return (
        <header className="app-header">
            <div>
                <h1>Ordishes</h1>
            </div>
            <div>
                <a className="app-header-link" href="/menu">Menu</a>
                <a className="app-header-link" href="/comfirmorder">Confirm</a>
                <a className="app-header-link" href="/checkbill">Check bill</a>
            </div>
        </header>
    )
}
export default AppHeader;