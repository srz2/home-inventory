import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../useFetch'
import AddItem from './AddItem'

const ItemDetails = ({itemsUrl, updateExistingItem, deleteExistingItem}) => {
    const {id} = useParams()
    const history = useHistory();
    const { data: item, isLoading, error } = useFetch(itemsUrl + '/' + id)

    const deleteItem = () => {
        console.log('Internal delete', item.item._id);
        const r = window.confirm(`Do you really want to delete ${item.item.name}?`);
        if (r !== true) {
            return;
        }
        deleteExistingItem(item.item)
        history.push('/')
    }

    const updateItem = () => {
        console.log('Internal update', item.item._id);
        updateExistingItem(item.item);
        history.push('/');
    }

    return (
        <div>
            {isLoading && <h2>Loading item {id}...</h2>}
            {error && <h2>Error occured (Fetch Item {id}): {error}</h2>}
            {item && (
                <div className="item-container">
                    <div className="item-details">
                        <AddItem updateExistingItem={updateItem} existingItem={item.item} deleteExistingItem={deleteItem} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ItemDetails