import './App.css';
import { useState } from 'react';
import AddItem from './components/AddItem';
import Header from './components/Header';
import ItemList from './components/ItemList';
import useFetch from './useFetch';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ItemDetails from './components/ItemDetails';
import config from './config'

function App() {
  const itemsUrl = config.LOCAL_DEV ? 'http://localhost:8000/items' : 'https://srz2-home-inventory-api.herokuapp.com/items'
  const [dialogVisable, setDialogVisable] = useState(false);
  const {data: items, isLoading, error} = useFetch(itemsUrl)

    function toggleAddDialog() {
        setDialogVisable(!dialogVisable);
    }

    function addNewItem(item) {
      fetch(itemsUrl, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          api_key: config.API_KEY
        },
        body: JSON.stringify(item)
      })
      .then(() => {
        if (!item.createSimilar) {
          console.log('Refreshing');
          window.location.reload(false);
        } else {console.log('Wont Refresh');}
      })
    }

    function updateExistingItem(item) {
      console.log('Updating item', item._id);
      fetch(itemsUrl + '/' + item._id, {
          method:"PUT",
          headers: {
              'Content-Type': 'application/json',
              api_key: config.API_KEY
          },
          body: JSON.stringify(item)
      })
      .then(() => {
        window.location.reload(false);
      })
    }

    function deleteExistingItem(item) {
      console.log('Deleting item', item._id);
      fetch(itemsUrl + '/' + item._id, {
          method:"DELETE",
          headers: {
              'Content-Type': 'application/json',
              api_key: config.API_KEY
          },
      })
      .then(() => {
        window.location.reload(false);
      })
    }

  return (
    <Router>
      <div className="App">
        <Header toggleAddDialog={toggleAddDialog}/>
        <Switch>
          <Route exact path="/">
            {dialogVisable && <AddItem toggleAddDialog={toggleAddDialog} addNewItem={addNewItem}/>} 
            {isLoading && <h2>Loading inventory...</h2>}
            {error && <p>ERROR: {error}</p>}
            {items && !dialogVisable && <ItemList items={items.items}/>}
          </Route>
          <Route path="/item/:id">
            <ItemDetails itemsUrl={itemsUrl} updateExistingItem={updateExistingItem} deleteExistingItem={deleteExistingItem} />
          </Route>
          <Route path="*">
            <h2>Path not found</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
