import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"

const AddItem = ({toggleAddDialog, addNewItem, updateExistingItem, existingItem, deleteExistingItem}) => {

    const history = useHistory();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [location, setLocation] = useState('');
    const [color, setColor] = useState('');
    const [estimatedCost, setEstimatedCost] = useState(0.0);
    const [sku, setSku] = useState('');
    const [tags, setTags] = useState([]);

    function clearGUI() {
        setName('');
        setDescription('');
        setQuantity(1);
        setLocation('');
        setColor('')
        setEstimatedCost(0.0);
        setSku('');
        setTags([]);
    }

    const goToInventory = () => {
        history.goBack()
    }
    
    const handleSubmitNewItem = (e) => {
        e.preventDefault();

        const newItem = {name, description, quantity, location, color, estimatedCost, sku, tags};
        if (existingItem){
            existingItem.name = name;
            existingItem.description = description;
            existingItem.quantity = quantity;
            existingItem.location = location;
            existingItem.color = color;
            existingItem.estimatedCost = estimatedCost;
            existingItem.sku = sku;
            existingItem.tags = tags;
            console.log('Attempt to Update:', existingItem);
            updateExistingItem(existingItem);
        } else {
            console.log('Attempt to Create:', newItem);
            addNewItem(newItem);
        }
    }

    const handleClear = () => {
        clearGUI();
    }

    const handleChangedTags = (e) => {
        const str = e.target.value;

        // Create tag array based on:
        //     split on commas
        //     trim empty spaces
        //     remove empty strings
        const newTags = str.split(",").map(function(item){
            return item.trim();
        }).filter(function(item){return item !== '';});

        setTags(newTags);
    }

    function loadItemToGUI(item){
        console.log('Loading existing', item._id);
        setName(item.name);
        setDescription(item.description);
        setQuantity(item.quantity);
        setLocation(item.location);
        setColor(item.color)
        setEstimatedCost(item.estimatedCost);
        setSku(item.sku);
        setTags(item.tags);
    }

    useEffect(() => {
        if (existingItem){
            loadItemToGUI(existingItem)
        }
    }, [existingItem])

    return (
        <div className="add-item-dialog">
            {existingItem && <h2>Update item <span className="current-item-highlight">{name}</span></h2>}
            {!existingItem && <h2>Add A New Item</h2>}
            <form onSubmit={handleSubmitNewItem}>
                <div className="add-item-section">
                    <input required type="text" name="itemName" placeholder="Item Name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                    <input type="number" name="itemQuantity" placeholder="Quantity" defaultValue={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="add-item-section">
                    <input type="text" name="itemDescription" placeholder="Description" defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="add-item-section">
                    <input type="text" name="itemLocation" placeholder="Location" defaultValue={location} onChange={(e) => setLocation(e.target.value)}/>
                    <input type="text" name="itemColor" placeholder="Color" defaultValue={color} onChange={(e) => setColor(e.target.value)} />
                    <label>$</label>
                    <input type="number" step="0.01" min="0.0" name="itemEstCost" defaultValue={estimatedCost} placeholder="Est. Cost" onChange={(e) => setEstimatedCost(e.target.value)} />
                    <input type="text" name="itemSKU" placeholder="SKU #" defaultValue={sku} onChange={(e) => setSku(e.target.value)} />
                </div>
                <div className="add-item-section">
                    <input type="text" name="itemNewTag" placeholder="New Tags (comma separated)" defaultValue={tags.join(', ')} onChange={handleChangedTags} />
                    <label id="lblTagCount">Tags: {tags.length}</label>
                </div>
                {existingItem && (
                    <div className="add-item-section add-item-actions">
                        <button type="button" onClick={goToInventory}>Go Back To Inventory</button>
                        <button type="button" className="btn-delete" onClick={deleteExistingItem}>Delete Item</button>
                        <button type="submit" className="submit">Update Item</button>
                    </div>
                )}
                {!existingItem && (
                    <div className="add-item-section add-item-actions">
                        <button type="button" onClick={toggleAddDialog}>Close</button>
                        <button type="reset" onClick={handleClear}>Clear</button>
                        <button className="submit" type="submit">Add Item</button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default AddItem