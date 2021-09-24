import { useParams } from 'react-router-dom'
import useFetch from '../useFetch'
import AddItem from './AddItem'

const ItemDetails = () => {
    const {id} = useParams()
    const { data: item, isLoading, error } = useFetch('http://localhost:8000/items/' + id)

    const updateExistingItem = (item) => {
        console.log('Updating item', id);
        fetch('http://localhost:8000/items/' + id, {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
    }

    return (
        <div className="item-container">
            {isLoading && <h2>Loading item {id}...</h2>}
            {error && <h2>Error occured (Fetch Item {id}): {error}</h2>}
            {item && (
                <div className="item-details">
                    <AddItem updateExistingItem={updateExistingItem} existingItem={item} />
                </div>
            )}
        </div>
    )
}

export default ItemDetails