import userOrder from '../data/userOrder'
import './AppTableCheckbill.css'
function AppTableCheckbill() {
    
    return (
        <div className="container">
            <table>
                <tr>
                    <th>Menu</th>
                    <th>Amount</th>
                    <th>Price</th>
                </tr>

                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                </tr>
            </table>
            <div className="sumary-price-container">
                <div className="text-sum">
                    <h6>Sum</h6>
                </div>
                <div className="text-price">
                    <p>199$</p>
                </div>
            </div>
        </div>
    )
}

export default AppTableCheckbill
