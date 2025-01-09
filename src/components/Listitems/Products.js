import ListItem from "./ListItem";
import { useEffect, useState } from "react";
// import Form from "./Layout/form";
import axios from "axios";
import Loader from "./UI/loader";

const Products = ({ onAddItem, onRemoveItem, eventState }) => {
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(true);
  // const [presentItems, setPresentItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get(
          "https://ecom-1ef8b-default-rtdb.firebaseio.com/items.json"
        );
        const data = response.data;
        const transformedData = data.map((item, index) => {
          return {
            ...item,
            quantity: 0,
            id: index,
          };
        });
        // setLoader(false);
        setItems(transformedData);
      } catch (error) {
        // setLoader(false);
        console.log("Error: ", error);
        alert("Some error occured");
      } finally {
        setLoader(false);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    if (eventState.id > -1) {
      if (eventState.type === 1) {
        handleAddItem(eventState.id);
      } else if (eventState.type === -1) {
        handleRemoveItem(eventState.id);
      }
    }
  }, [eventState]);

  const handleAddItem = (id) => {
    // if (presentItems.indexOf(id) > -1) {
    //   return;
    // }
    // setPresentItems([...presentItems, id]);

    let data = [...items];
    let index = data.findIndex((i) => i.id === id);
    data[index].quantity += 1;
    setItems([...data]);
    onAddItem(data[index]);
  };

  const handleRemoveItem = (id) => {
    // let index = presentItems.indexOf(id);
    // if (index > -1) {
    //   let items = [...presentItems];
    //   items.splice(index, 1);
    //   setPresentItems([...items]);

    // }
    let data = [...items];
    let index = data.findIndex((i) => i.id === id);
    if (data[index].quantity !== 0) {
      data[index].quantity -= 1;
      setItems([...data]);
      onRemoveItem(data[index]);
    }
  };

  // const UpdateItemTitle = async (itemId) => {
  //   console.log(`Item with ID  :  ${itemId}`);
  //   try {
  //     let title = `Update Title #Item-${itemId}`;
  //     await axios.patch(
  //       `https://ecom-1ef8b-default-rtdb.firebaseio.com/items/${itemId}.json`,
  //       {
  //         title: title,
  //       }
  //     );
  //     let data = [...items];
  //     let index = data.findIndex((e) => e.id === itemId);
  //     data[index]["title"] = title;

  //     setItems(data);
  //   } catch (error) {
  //     console.log("Error Updating the data!");
  //   }
  // };

  return (
    <>
      <div className="product-list">
        <div className="product-list--wrapper">
          {items.map((item) => {
            return (
              <ListItem
                onAdd={handleAddItem}
                onRemove={handleRemoveItem}
                key={item.id}
                data={item}
                // UpdateItemTitle={UpdateItemTitle}
              ></ListItem>
            );
          })}
        </div>
      </div>
      {loader && <Loader />}
    </>
  );
};

export default Products;
