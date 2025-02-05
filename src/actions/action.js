import axios from "axios";

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
          items: Cart.items,
          totalAmount: Cart.totalAmount,
          date: new Date().toISOString(),
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

export const fetchUserProfile = (callback) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    if (!auth.idToken) {
      return callback({
        error: true,
        data: {
          error: "Please Login to view profile",
        },
      });
    }
    try {
      const response = await axios.get(
        `https://ecom-1ef8b-default-rtdb.firebaseio.com/users/${auth.localId}.json?auth=${auth.idToken}`
      );
      dispatch({
        type: "FETCH_USER_PROFILE",
        payload: response.data,
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

export const updateUserProfile = (details, callback) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    if (!auth.idToken) {
      return callback({
        error: true,
        data: {
          error: "Please Login to update profile",
        },
      });
    }
    try {
      await axios.put(
        `https://ecom-1ef8b-default-rtdb.firebaseio.com/users/${auth.localId}.json?auth=${auth.idToken}`,
        details
      );
      dispatch({
        type: "UPDATE_USER_PROFILE",
        payload: details,
      });
      return callback({
        error: false,
        data: details,
      });
    } catch (error) {
      return callback({
        error: true,
        ...error.response,
      });
    }
  };
};
