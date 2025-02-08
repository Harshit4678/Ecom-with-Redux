import ListItem from "./ListItem";
import { useEffect, useState } from "react";
// import Form from "./Layout/form";
import axios from "axios";
import Loader from "./UI/loader";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Products = () => {
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search).get("search");
  // const [presentItems, setPresentItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        let slug = `items.json`;
        if (params.category) {
          slug = `items-${params.category}.json`;
        }
        if (queryParams) {
          slug += `?search=${queryParams}`;
        }
        // items-category-1.json
        const response = await axios.get(
          ` https://ecom-1ef8b-default-rtdb.firebaseio.com/${slug}`
        );
        const data = response.data;

        if (!data) {
          handleNotFound();
          return;
        }

        const transformedData = data.map((item, index) => {
          return {
            ...item,
            quantity: 0,
            discountedPrice: Number(item.discountedPrice),
            id: `${params.category}-${index}`,
          };
        });
        // setLoader(false);
        setItems(transformedData);
      } catch (error) {
        // setLoader(false);
        console.log("Error: ", error);
        // alert("Some error occured");
      } finally {
        setLoader(false);
      }
    }
    fetchItems();

    return () => {
      setItems([]);
      setLoader(true);
    };
  }, [params.category, queryParams]);

  const handleNotFound = () => {
    navigate("/404");
  };

  return (
    <>
      {loader && <Loader />}
      <div className="product-list">
        <div className="product-list--wrapper">
          {items.map((item) => {
            return (
              <ListItem
                // onAdd={handleAddItem}
                // onRemove={handleRemoveItem}
                key={item.id}
                data={item}
                // UpdateItemTitle={UpdateItemTitle}
              ></ListItem>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
