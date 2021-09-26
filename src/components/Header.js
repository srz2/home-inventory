import {Link} from 'react-router-dom'

const Header = ({toggleAddDialog}) => {

    function reloadToHome() {
        window.location.reload(false);
    }

    return (
        <div className="header">
            <h2 onClick={reloadToHome}>Home Inventory</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li className="special" onClick={toggleAddDialog}>Add New</li>
            </ul>
        </div>
    )
}

export default Header