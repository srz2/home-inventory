import {Link} from 'react-router-dom'

const Header = ({toggleAddDialog}) => {
    return (
        <div className="header">
            <h2>Home Inventory</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/sayhello">Say Hello</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li className="special" onClick={toggleAddDialog}>Add New</li>
            </ul>
        </div>
    )
}

export default Header