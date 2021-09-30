import userOrder from '../data/userOrder'
import UserOrderList from '../UserOrderList/UserOrderList';
import './AppConfirmOrder.css';

function AppConfirmOrder() {

    const userOrderElement = userOrder.map((menu, index) => {
        return <UserOrderList key={index} usermenu={menu} />            
    });

    return (
        <div>
            <div className="confirm-list">
                <table>
                    <tr>
                        <th>Menu</th>
                        <th>amount</th>
                    </tr>

                </table>
                {userOrderElement}
            
            </div>
            <div className="btn-submit-block">
                <button className="btn-submit">Submit</button>
            </div>
        </div>
    )
}

export default AppConfirmOrder
