import {useHistory} from 'react-router-dom'
import InventoryItem from "./InventoryItem"

const ItemList = ({items}) => {
    const history = useHistory();

    const handleClick = (e) => {
        console.log('Clicked it', e);
        history.push('/item/' + e)    
    }

    return (
        <table className="inventory-list">
            <thead>
                <tr>
                    <th>Selected</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Location</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item)=>(
                        <InventoryItem onClick={handleClick} item={item} key={item.id}/>
                    ))
                }
            </tbody>
        </table>
    )
}

export default ItemList