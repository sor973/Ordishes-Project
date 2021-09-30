import './AppMenu.css';
import SteakItem from '../SteakItem/SteakItem';
import menus from '../data/menus';



function AppMenu() {

    const menuElements = menus.map((menu, index) => {
        return <SteakItem key={index} menu={menu}/>;
    })

    return (
        <div className="app">
            <div className="app-grid">
                {menuElements}
            </div>
        </div>
    );
}

export default AppMenu;
