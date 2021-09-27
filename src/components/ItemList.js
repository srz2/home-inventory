import { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import InventoryItem from "./InventoryItem"
import Search from './Search';

const ItemList = ({items}) => {
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState(null);
    const [displayItems, setDisplayItems] = useState(null);

    const handleClick = (e) => {
        console.log('Clicked it', e);
        history.push('/item/' + e)    
    }

    function handleNewSearchTerm(term) {
        // Trim and null it if empty
        term = term.trim()
        if (term === ''){
            term = null;
        }
        setSearchTerm(term)
    }

    useEffect(()=>{
        if (!searchTerm){
            // If search term doesn't exist, set display items to null
            setDisplayItems(null);
        }
        else {
            // Split int array of terms
            var terms = searchTerm.split(' ').map((term)=> { return term.toLowerCase().trim()}).filter((term)=>{return term !== ''});

            // loop through each item
            const subsetItems = items.filter(function(item) {
                // Find specific conditions for each item
                var foundInName = false;
                var foundInLocation = false;
                var foundInTags = false;

                // Consider each search term
                terms.forEach(term => {

                    // Case insenstive - term is in name
                    foundInName = foundInName || item.name.toLowerCase().includes(term);

                    // Case insensitive = term is in location
                    foundInLocation = foundInLocation || item.location.toLowerCase().includes(term);

                    // Case insensitive = term is in tag array
                    foundInTags = foundInTags || item.tags.includes(term)
                });

                // If any condition is true, show item as result
                return foundInName || foundInLocation || foundInTags;
            })
            // Set the subset as the displaying items
            setDisplayItems(subsetItems);
        }

    }, [items, searchTerm])

    return (
        <div className="inventory-container">
            <Search setSearchItems={handleNewSearchTerm} />
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
                    { !displayItems &&
                        items.map((item)=>(
                            <InventoryItem onClick={handleClick} item={item} key={item._id}/>
                        ))
                    }
                    { displayItems &&
                        displayItems.map((item)=>(
                            <InventoryItem onClick={handleClick} item={item} key={item._id}/>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ItemList