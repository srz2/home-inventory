import './App.css';
import { useState } from 'react';
import AddItem from './components/AddItem';
import Header from './components/Header';
import ItemList from './components/ItemList';
import useFetch from './useFetch';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ItemDetails from './components/ItemDetails';

function App() {
  const [dialogVisable, setDialogVisable] = useState(false);
  const {data: items, isLoading, error} = useFetch('http://localhost:8000/items')

    function toggleAddDialog() {
        setDialogVisable(!dialogVisable);
    }

    function addNewItem(item) {
      fetch('http://localhost:8000/items', {
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
      console.log('Updating item', item.id);
      fetch('http://localhost:8000/items/' + item.id, {
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
      console.log('Deleting item', item.id);
      fetch('http://localhost:8000/items/' + item.id, {
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
            {items && <ItemList items={items}/>}
          </Route>
          <Route path="/sayhello">
            <h2>Hello, World</h2>
          </Route>
          <Route path="/item/:id">
            <ItemDetails updateExistingItem={updateExistingItem} deleteExistingItem={deleteExistingItem} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
