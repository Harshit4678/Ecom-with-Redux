import axios from "axios";
import Cart from "../components/Listitems/Cart/cart";

export const addItemHandler = (item) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        item: item,
      },
    });
  };
};

export const removeItemHandler = (id) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        id: id,
      },
    });
  };
};

export const clearCartHandler = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_CART",
    });
  };
};

export const placeOrderHandler = (callback) => {
  return async (dispatch, getState) => {
    try {
      const { auth, Cart } = getState();
      if (!auth.idToken) {
        return callback({
          error: true,
          data: {
            error: "Please Login to place order",
          },
        });
      }
      const response = await axios.post(
        `https://ecom-1ef8b-default-rtdb.firebaseio.com/orders/${auth.localId}.json?auth=${auth.idToken}`,
        {
          ...Cart,
        }
      );
      dispatch({
        type: "CLEAR_CART",
      });
      return callback({
        error: false,
        data: response.data,
      });
    } catch (error) {
      return callback({
        error: true,
        ...error.response,
      });
    }
  };
};
