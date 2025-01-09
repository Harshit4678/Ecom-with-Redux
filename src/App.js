import "./App.css";
// import ListItem from "./components/ListItem";
import Products from "./components/Listitems/Products.js";
import Header from "./components/Listitems/Layout/header.js";
import Subheader from "./components/Listitems/Layout/Subheader.js";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [eventQueue, setEventQueue] = useState({
    id: "",
    type: "",
  });

  const handleAddItem = (item) => {
    let items = [...cartItems];
    let index = items.findIndex((i) => i.id === item.id);
    if (index > -1) {
      items[index] = item;
    } else {
      items.push(item);
    }
    setCartItems([...items]);
    // setCartItems(cartItems + 1);
  };

  const handleRemoveItem = (item) => {
    let items = [...cartItems];
    let index = items.findIndex((i) => i.id === item.id);
    if (items[index].quantity === 0) {
      items.splice(index, 1);
    } else {
      items[index] = item;
    }
    setCartItems([...items]);
    // setCartItems(cartItems - 1);
  };

  // type === -1, decrease
  // type ===1 , increase
  const handleEventQueue = (id, type) => {
    setEventQueue({
      id,
      type,
    });
  };

  return (
    <div>
      <Header
        count1={cartItems.length}
        items={cartItems}
        onHandleEvent={handleEventQueue}
      ></Header>
      <Subheader></Subheader>
      <Products
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        eventState={eventQueue}
      ></Products>
    </div>
  );
}

export default App;
