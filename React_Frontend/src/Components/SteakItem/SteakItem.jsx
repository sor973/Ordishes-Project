import './SteakItem.css';

function SteakItem(props) {
    const { menu } = props;
    return (
        <div className="steak-item">
            <img src={menu.thumbnailUrl} />
            <div className="grid">
                <div className="content">
                    <h5>{menu.title}</h5>
                </div>
                <div className="content">
                    <p className="price">{menu.price}</p>
                    <button className="choose-button-item">Choose</button>
                </div>
            </div>
        </div>
    )
}
export default SteakItem;