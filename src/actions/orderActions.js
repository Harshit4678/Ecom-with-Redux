import axios from "axios";

export const fetchOrderHistory = (callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://ecom-1ef8b-default-rtdb.firebaseio.com/orders.json`
      );
      const data = response.data;
      console.log("Fetched order data:", data);

      // Flatten the nested structure
      const transformedData = Object.keys(data).flatMap((orderId) =>
        Object.keys(data[orderId]).map((subOrderId) => ({
          id: subOrderId,
          ...data[orderId][subOrderId],
        }))
      );

      console.log("Transformed order data:", transformedData);
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
