const InventoryItem = ({item, onClick}) => {
    const handleClick = () => {
        onClick(item._id)
    }

    return (
        <tr onClick={handleClick} className="inventory-item">
            <td></td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.location}</td>
            <td>{item.notes}</td>
        </tr>
    )
}

export default InventoryItem