import './UserOrderList.css';

function UserOrderList(props) {
    const { usermenu } = props;

    return (
        <div>

            <tr>
                <td>{usermenu.menuName}</td>
                <td style={{ "textAlign": "center" }}>{usermenu.amount}</td>
            </tr>
        </div>
    )
}

export default UserOrderList
