const Search = ({setSearchItems, results}) => {

    const handleTextChange = (e) => {
        const text = e.target.value.toLowerCase();
        setSearchItems(text)
    }

    return (
        <div className="search-container">
            <label>Search:</label>
            <input type="text" name="txtSearch" id="txtSearch" placeholder="Search for Items" onChange={handleTextChange}/>
            {results && <label>Results: {results.length}</label>}
        </div>
    )
}

export default Search