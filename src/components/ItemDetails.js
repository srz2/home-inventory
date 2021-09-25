import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../useFetch'
import AddItem from './AddItem'

const ItemDetails = ({updateExistingItem, deleteExistingItem}) => {
    const {id} = useParams()
    const history = useHistory();
    const { data: item, isLoading, error } = useFetch('http://localhost:8000/items/' + id)

    const deleteItem = () => {
        console.log('Internal delete', item.id);
        const r = window.confirm(`Do you really want to delete ${item.name}?`);
        if (r !== true) {
            return;
        }
        deleteExistingItem(item)
        history.push('/')
    }

    const updateItem = () => {
        console.log('Internal update', item.id);
        updateExistingItem(item);
        history.push('/');
    }

    return (
        <div>
            {isLoading && <h2>Loading item {id}...</h2>}
            {error && <h2>Error occured (Fetch Item {id}): {error}</h2>}
            {item && (
                <div className="item-container">
                    <div className="item-details">
                        <AddItem updateExistingItem={updateItem} existingItem={item} deleteExistingItem={deleteItem} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ItemDetails