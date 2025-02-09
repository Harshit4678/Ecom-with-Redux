import axios from "axios";

export const fetchOrderHistory = (callback) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    if (!auth.idToken) {
      return callback({
        error: true,
        data: {
          error: "Please Login to view order history",
        },
      });
    }

    try {
      const response = await axios.get(
        `https://ecom-1ef8b-default-rtdb.firebaseio.com/orders/${auth.localId}.json?auth=${auth.idToken}`
      );
      const data = response.data;

      // Flatten the nested structure
      const transformedData = Object.keys(data).map((orderId) => ({
        id: orderId,
        ...data[orderId],
      }));

      dispatch({
        type: "FETCH_ORDER_HISTORY",
        payload: transformedData,
      });
      callback();
    } catch (error) {
      console.log(error);
      callback();
    }
  };
};
