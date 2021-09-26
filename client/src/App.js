import './App.css';
import { useState } from 'react';
import AddItem from './components/AddItem';
import Header from './components/Header';
import ItemList from './components/ItemList';
import useFetch from './useFetch';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ItemDetails from './components/ItemDetails';

function App() {
  const itemsUrl = 'http://localhost:8000/items'
  const [dialogVisable, setDialogVisable] = useState(false);
  const {data: items, isLoading, error} = useFetch(itemsUrl)

    function toggleAddDialog() {
        setDialogVisable(!dialogVisable);
    }

    function addNewItem(item) {
      fetch(itemsUrl, {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      })
      .then(() => {
        window.location.reload(false);
      })
    }

    function updateExistingItem(item) {
      console.log('Updating item', item._id);
      fetch(itemsUrl + '/' + item._id, {
          method:"PUT",
          headers: {
              'Content-Type': 'application/json'
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
              'Content-Type': 'application/json'
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
            {items && <ItemList items={items.items}/>}
          </Route>
          <Route path="/item/:id">
            <ItemDetails itemsUrl={itemsUrl} updateExistingItem={updateExistingItem} deleteExistingItem={deleteExistingItem} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
